// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

library SignTypes {
    struct ZrKeyReqParams {
        bytes32 walletTypeId;
        uint8 options;
    }

    struct WalletRegistry {
        uint8 status;
        uint8 options;
        uint256 value;
    }

    struct ReqRegistry {
        uint8 status;
        uint256 value;
    }

    struct ZrKeyResParams {
        bytes32 walletTypeId;
        address owner;
        uint256 walletIndex;
        string wallet;
        uint8 options;
        bytes authSignature;
    }

    struct ZrSignParams {
        bytes32 walletTypeId;
        uint256 walletIndex;
        bytes32 dstChainId;
        bytes payload; // For `zrSignHash`, this would be the hash converted to bytes
        bool broadcast; // Relevant for `zrSignTx`, must be ignored for others
    }

    struct SimpleTx {
        string to;
        uint256 value;
        bytes data;
    }

    function encodeSimple(SimpleTx memory self) public pure returns (bytes memory) {
        return abi.encodeWithSignature("transaction(string,uint256,bytes)", self.to, self.value, self.data);
    }

    function decodeSimpleTx(
        bytes calldata simpleTxData
    ) external pure returns (string memory to, uint256 value, bytes4 signature, bytes memory data) {
        // Extract the first 4 bytes for the function signature
        signature = bytes4(simpleTxData[:4]);

        // Decode the remaining data
        (to, value, data) = abi.decode(simpleTxData[4:], (string, uint256, bytes));
    }

    struct SigReqParams {
        bytes32 walletTypeId;
        uint256 walletIndex;
        bytes32 dstChainId;
        bytes payload;
        address owner;
        uint8 zrSignReqType;
        bool broadcast;
    }

    struct SignResParams {
        uint256 traceId;
        address owner;
        bytes metaData;
        bytes signature;
        bool broadcast;
        bytes authSignature;
    }
}
