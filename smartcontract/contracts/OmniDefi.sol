// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { OApp, MessagingFee, Origin } from "./OApp.sol";
import { MessagingReceipt } from "./oapp/OAppSender.sol";
import { OptionsBuilder } from "./oapp/libs/OptionsBuilder.sol";
import { IOAppCore, ILayerZeroEndpointV2 } from "./oapp/interfaces/IOAppCore.sol";
import { IZrSign } from "./interfaces/IZrSign.sol";
import { SignTypes } from "./libraries/SignTypes.sol";

contract OmniDefi is OApp {
    using OptionsBuilder for bytes;

    // Error Definitions
    error DestinationZrSignNotAvailable();
    error UnsupportedMsgType(uint8);
    error UnauthorizedWalletOwner(bytes32);
    error ZrSignInteractionFailed();
    error InsufficientCollateral();
    error InsufficientLiquidity();

    // Constants
    bytes32 public constant EVM_WALLET_TYPE_ID = 0xe146c2986893c43af5ff396310220be92058fb9f4ce76b929b80ef0d5307100a;
    uint8 public constant MSG_TYPE_KEY_REQ = 1;
    uint8 public constant MSG_TYPE_TX_REQ = 2;
    uint256 private constant COLLATERAL_FACTOR = 150;  // 150% collateralization

    // Structs
    struct ZrSignData {
        address location;
        uint128 gas;
    }
    
    struct ZrSignReq {
        uint8 msgType;
        uint8 zrOptions;
        address sender;
        uint256 zrWalletIndex;
        bytes payload;
    }

    struct Loan {
        uint256 amountBorrowed;
        uint256 collateralAmount;
        uint256 interestRate;
        uint256 dueDate;
    }

    // Global State Variables
    mapping(uint32 => ZrSignData) internal zrSignLocation;
    mapping(bytes32 => uint256) internal balances;
    mapping(bytes32 => Loan) internal loans;
    mapping(uint256 => bytes32) internal userWallets;
    mapping(bytes32 => uint256[]) internal userWalletIndexes;

    // Initialization Function
    function initialize(address _endpoint, address _delegate) initializer public {
        endpoint = ILayerZeroEndpointV2(_endpoint);

        if (_delegate == address(0)) revert InvalidDelegate();
        endpoint.setDelegate(_delegate);
        
        __Ownable_init(_delegate);

        
        // zrSignLocation[40106] = ZrSignData({ location: 0xA7AdF06a1D3a2CA827D4EddA96a1520054713E1c, gas: 300000 }); // Avalanche Fuji
        // zrSignLocation[40161] = ZrSignData({ location: 0xA7AdF06a1D3a2CA827D4EddA96a1520054713E1c, gas: 300000 }); // Ethereum Sepolia
        // zrSignLocation[40231] = ZrSignData({ location: 0xA7AdF06a1D3a2CA827D4EddA96a1520054713E1c, gas: 1000000 }); // Arbitrum Sepolia
        // zrSignLocation[40232] = ZrSignData({ location: 0xA7AdF06a1D3a2CA827D4EddA96a1520054713E1c, gas: 300000 }); // Optimism Sepolia
        // zrSignLocation[40245] = ZrSignData({ location: 0xA7AdF06a1D3a2CA827D4EddA96a1520054713E1c, gas: 300000 }); // Base Sepolia
        // zrSignLocation[40267] = ZrSignData({ location: 0xA7AdF06a1D3a2CA827D4EddA96a1520054713E1c, gas: 300000 }); // Polygon Amoy
    }

    // Function to Deposit Assets (Lending)
    function deposit(bytes32 assetTypeId, uint32 eid) external payable {
        balances[assetTypeId] += msg.value;
    }

    // Function to Borrow Assets
    function borrow(bytes32 assetTypeId, uint256 amount, uint32 eid) external {
        uint256 collateralRequired = (amount * COLLATERAL_FACTOR) / 100;
        if (balances[assetTypeId] < amount) revert InsufficientLiquidity();

        balances[assetTypeId] -= amount;
        loans[addressToBytes32(msg.sender)] = Loan({
            amountBorrowed: amount,
            collateralAmount: collateralRequired,
            interestRate: calculateInterestRate(assetTypeId),
            dueDate: block.timestamp + 30 days
        });

        // Transfer borrowed amount to user
        payable(msg.sender).transfer(amount);
    }

    // Function to Repay Loan
    function repayLoan(bytes32 assetTypeId) external payable {
        Loan storage loan = loans[addressToBytes32(msg.sender)];
        require(msg.value >= loan.amountBorrowed, "Repay amount too low");

        balances[assetTypeId] += msg.value;
        delete loans[addressToBytes32(msg.sender)];
    }

    // Internal Function to Calculate Interest Rate
    function calculateInterestRate(bytes32 assetTypeId) internal view returns (uint256) {
        // Implement logic to calculate interest rates based on supply and demand
        return 5;  // Placeholder value (5%)
    }

    // Cross-Chain Request for ZrKey
    function reqZrKey(
        bytes32 walletTypeId,
        uint8 zrOpts,
        uint32 eid
    ) public payable returns (MessagingReceipt memory receipt) {
        if (zrSignLocation[eid].location == address(0)) revert DestinationZrSignNotAvailable();

        SignTypes.ZrKeyReqParams memory params = SignTypes.ZrKeyReqParams({
            walletTypeId: walletTypeId,
            options: zrOpts
        });

        bytes memory call = abi.encodeWithSelector(IZrSign.zrKeyReq.selector, params);

        ZrSignReq memory lzCall = ZrSignReq({ 
            msgType: MSG_TYPE_KEY_REQ, 
            sender: msg.sender,
            zrOptions: zrOpts, 
            zrWalletIndex: 0,
            payload: call 
        });
        
        uint128 gasLimit = zrSignLocation[eid].gas;
        bytes memory options = createLzReceiveOption(gasLimit, uint128(msg.value));
        return send(eid, abi.encode(lzCall), options);
    }

    // Cross-Chain Request to Send Transaction
    function reqZrSendTx(
        bytes32 walletTypeId,
        uint256 walletIndex,
        bytes32 dstChainId,
        bytes memory payload,
        uint32 eid
    ) public payable returns (MessagingReceipt memory receipt) {
        if (zrSignLocation[eid].location == address(0)) revert DestinationZrSignNotAvailable();

        SignTypes.ZrSignParams memory params = SignTypes.ZrSignParams({
            walletTypeId: walletTypeId,
            walletIndex: walletIndex,
            dstChainId: dstChainId,
            payload: payload,
            broadcast: true
        });

        bytes memory call = abi.encodeWithSelector(IZrSign.zrSignTx.selector, params);

        ZrSignReq memory lzCall = ZrSignReq({ 
            msgType: MSG_TYPE_TX_REQ, 
            sender: msg.sender,
            zrOptions: 0, 
            zrWalletIndex: walletIndex,
            payload: call 
        });

        uint128 gasLimit = zrSignLocation[eid].gas;
        bytes memory options = createLzReceiveOption(gasLimit, uint128(msg.value));
        return send(eid, abi.encode(lzCall), options);
    }


    // Helper functions for ZrSign interaction

     function estimateZrKeyRequest(bytes32 walletTypeId, uint8 zrOpts, uint32 eid) public view returns (MessagingFee memory fee) {
        SignTypes.ZrKeyReqParams memory params = SignTypes.ZrKeyReqParams({
            walletTypeId: walletTypeId,
            options: zrOpts
        });

        bytes memory call = abi.encodeWithSelector(IZrSign.zrKeyReq.selector, params);

        uint128 gasLimit = zrSignLocation[eid].gas;
        bytes memory options = createLzReceiveOption(gasLimit, 0);
        return quote(eid, call, options, false);
    }

    // Function to send messages to the destination chain
    function send(
        uint32 _dstEid,
        bytes memory _message,
        bytes memory _options
    ) public payable returns (MessagingReceipt memory receipt) {
        return _send(_dstEid, _message, _options);
    }

    // Function to set the zrSign address for an endpoint ID
    function setZrSignAddress(uint32 _endpointID, address _zrSignAddress) public onlyOwner {
        zrSignLocation[_endpointID].location = _zrSignAddress;
    }

    // Function to set the zrSign gas for an endpoint ID
    function setZrSignGas(uint32 _endpointID, uint128 _zrGas) public onlyOwner {
        zrSignLocation[_endpointID].gas = _zrGas;
    }

    // Function to set the zrSign address and gas for an endpoint ID
    function setZrSign(uint32 _endpointID, address _zrSignAddress, uint128 _zrGas) public onlyOwner {
        zrSignLocation[_endpointID].location = _zrSignAddress;
        zrSignLocation[_endpointID].gas = _zrGas;
    }

    // Function to get the zrSign address for an endpoint ID
    function getZrSign(uint32 _endpointID) public view returns (address, uint128) {
        return (zrSignLocation[_endpointID].location, zrSignLocation[_endpointID].gas);
    }

    function getWalletIndexes(bytes32 owner) public view returns (uint256[] memory) {
        return userWalletIndexes[owner];
    }

    function getWalletAddress(uint256 walletIndex) public view returns (string memory) {
        return IZrSign(zrSignLocation[endpoint.eid()].location).getZrKey(EVM_WALLET_TYPE_ID, address(this), walletIndex);
    }

    /**
     * @notice Sends a message from the source chain to a destination chain.
     * @param _dstEid The endpoint ID of the destination chain.
     * @param _payload The message payload to be sent.
     * @param _options Additional options for message execution.
     * @dev Encodes the message as bytes and sends it using the `_lzSend` internal function.
     * @return receipt A `MessagingReceipt` struct containing details of the message sent.
     */
    function _send(
        uint32 _dstEid,
        bytes memory _payload,
        bytes memory _options
    ) internal returns (MessagingReceipt memory receipt) {
        receipt = _lzSend(_dstEid, _payload, _options, MessagingFee(msg.value, 0), payable(msg.sender));
    }

    /**
     * @notice Quotes the gas needed to pay for the full omnichain transaction in native gas or ZRO token.
     * @param _dstEid Destination chain's endpoint ID.
     * @param _payload The message payload.
     * @param _options Message execution options (e.g., for sending gas to destination).
     * @param _payInLzToken Whether to return fee in ZRO token.
     * @return fee A `MessagingFee` struct containing the calculated gas fee in either the native token or ZRO token.
     */
    function quote(
        uint32 _dstEid,
        bytes memory _payload,
        bytes memory _options,
        bool _payInLzToken
    ) public view returns (MessagingFee memory fee) {
        fee = _quote(_dstEid, _payload, _options, _payInLzToken);
    }

    function getCallData(bytes32 walletTypeId, uint8 zrOpts) external pure returns (bytes memory) {
        SignTypes.ZrKeyReqParams memory params = SignTypes.ZrKeyReqParams({
            walletTypeId: walletTypeId,
            options: zrOpts
        });
        return abi.encodeWithSelector(IZrSign.zrKeyReq.selector, params);
    }

    function getOptionsData(uint128 gas, uint128 value) external pure returns (bytes memory) {
        return createLzReceiveOption(gas, value);
    }

    event Response(bool success, bytes response);

 // Function to Handle Received Messages
    /**
     * @dev Internal function override to handle incoming messages from another chain.
     * @param _origin A struct containing information about the message sender.
     * @param _guid A unique global packet identifier for the message.
     * @param payload The encoded message payload being received.
     * @param _executor The address of the Executor responsible for processing the message.
     * @param _extraData Arbitrary data appended by the Executor to the message.
     *
     * Decodes the received payload and processes it as per the business logic defined in the function.
     */
    function _lzReceive(
        Origin calldata _origin,
        bytes32 _guid,
        bytes calldata payload,
        address _executor,
        bytes calldata _extraData
    ) internal override {
        address payable zrSignAddress = payable(zrSignLocation[endpoint.eid()].location);
        if (zrSignAddress == address(0)) revert DestinationZrSignNotAvailable();
        
        ZrSignReq memory params = abi.decode(payload,(ZrSignReq));

        string[] memory wallets = IZrSign(zrSignAddress).getZrKeys(EVM_WALLET_TYPE_ID, address(this));
        bytes32 sender = addressToBytes32(params.sender);
        uint256 walletIndex;
        uint totalFee;

        if (params.msgType == MSG_TYPE_KEY_REQ) {
            walletIndex = wallets.length;
            userWallets[walletIndex] = sender;
            userWalletIndexes[sender].push(walletIndex);

            (, , totalFee) = IZrSign(zrSignAddress).estimateFee(params.zrOptions, 0);
        } else if (params.msgType == MSG_TYPE_TX_REQ) {
            (, , totalFee) = IZrSign(zrSignAddress).estimateFee(EVM_WALLET_TYPE_ID, address(this), walletIndex, 0);

            walletIndex = params.zrWalletIndex;
            if (userWallets[walletIndex] != sender) {
                revert UnauthorizedWalletOwner(sender);
            }
        } else {
            revert UnsupportedMsgType(params.msgType);
        }

        balances[sender] += msg.value;
        require(balances[sender] >= totalFee, "insufficient balance");

        balances[sender] -= totalFee;
        (bool success, bytes memory responseData) = zrSignAddress.call{ value: totalFee }(params.payload);
        if (!success) {
            revert ZrSignInteractionFailed();
        }
        emit Response(success, responseData);
    }

    
    /// @notice get user balance.
    /// @param user user address padded to 32 bytes.
    /// @return uint258-available user balance in native assets.
    function balance(bytes32 user) public view returns (uint256) {
        return balances[user];
    }

    // function withdrawBalance(bytes)

    /// @notice Creates options for executing `lzReceive` on the destination chain.
    /// @param _gas The gas amount for the `lzReceive` execution.
    /// @param _value The msg.value for the `lzReceive` execution.
    /// @return bytes-encoded option set for `lzReceive` executor.
    function createLzReceiveOption(uint128 _gas, uint128 _value) public pure returns (bytes memory) {
        return OptionsBuilder.newOptions().addExecutorLzReceiveOption(_gas, _value);
    }

    /// @notice Creates options for executing `lzCompose` on the destination chain.
    /// @param _index The composed message's index for the `lzCompose` execution.
    /// @param _gas The gas amount for the `lzCompose` execution.
    /// @param _value The msg.value for the `lzCompose` execution.
    /// @return bytes-encoded option set for `lzCompose` executor.
    function createLzComposeOption(uint16 _index, uint128 _gas, uint128 _value) public pure returns (bytes memory) {
        return OptionsBuilder.newOptions().addExecutorLzComposeOption(_index, _gas, _value);
    }

    function addressToBytes32(address addr) public pure returns (bytes32) {
        return bytes32(uint256(uint160(addr)));
    }
}
