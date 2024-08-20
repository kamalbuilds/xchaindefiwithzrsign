// @ts-nocheck
"use client";
import React, { useState } from "react";
import { createThirdwebClient, prepareContractCall } from "thirdweb"
import { useSendTransaction, useReadContract } from "thirdweb/react";
import { getContract, defineChain } from "thirdweb";

const contractAddress = "0xD08F48e964cD0211f9b089A3594B29D5A92752e3";
const chain = defineChain(11155111);

const OmniDeFi = () => {
    const client = createThirdwebClient({ 
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      });


  const contract = getContract({ client, chain, address: contractAddress });

  // Initialize Contract
  const [endpoint, setEndpoint] = useState("");
  const [delegate, setDelegate] = useState("");

  const { mutate: sendTransaction } = useSendTransaction();

  const initializeContract = () => {
    const transaction = prepareContractCall({
      contract,
      method: "function initialize(address _endpoint, address _delegate)",
      params: [endpoint, delegate],
    });
    sendTransaction(transaction);
  };

  // Deposit Assets
  const [assetTypeId, setAssetTypeId] = useState<`0x${string}`>();
  const [eid, setEid] = useState("");

  const depositAssets = () => {
    const transaction = prepareContractCall({
      contract,
      method: "function deposit(bytes32 assetTypeId, uint32 eid) payable",
      params: [assetTypeId, eid],
    });
    sendTransaction(transaction);
  };

  // Request ZrKey
  const [walletTypeId, setWalletTypeId] = useState<`0x${string}`>();
  const [zrOpts, setZrOpts] = useState(0);

  const requestZrKey = () => {
    const transaction = prepareContractCall({
      contract,
      method: "function reqZrKey(bytes32 walletTypeId, uint8 zrOpts, uint32 eid) payable returns ((bytes32 guid, uint64 nonce, (uint256 nativeFee, uint256 lzTokenFee) fee) receipt)",
      params: [walletTypeId, zrOpts, eid],
    });
    sendTransaction(transaction);
  };

  // Set ZrSign
  const [zrSignAddress, setZrSignAddress] = useState("");
  const [zrGas, setZrGas] = useState("");

  const setZrSign = () => {
    const transaction = prepareContractCall({
      contract,
      method: "function setZrSign(uint32 _endpointID, address _zrSignAddress, uint128 _zrGas)",
      params: [eid, zrSignAddress, zrGas],
    });
    sendTransaction(transaction);
  };

  // Check Balance
  const [user, setUser] = useState<`0x${string}`>();
  const { data: balance, isLoading: isLoadingBalance } = useReadContract({
    contract,
    method: "function balance(bytes32 user) view returns (uint256)",
    params: [user],
  });

  // Get Msg Sender
  const { data: msgSender, isLoading: isLoadingSender } = useReadContract({
    contract,
    method: "function composeMsgSender() view returns (address sender)",
    params: [],
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">OmniDefi Dashboard</h1>

      {/* Initialize Contract */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Initialize Contract</h2>
        <input
          type="text"
          placeholder="Endpoint Address"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Delegate Address"
          value={delegate}
          onChange={(e) => setDelegate(e.target.value)}
          className="border p-2 rounded ml-2"
        />
        <button
          onClick={initializeContract}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        >
          Initialize
        </button>
      </div>

      {/* Deposit Assets */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Deposit Assets</h2>
        <input
          type="text"
          placeholder="Asset Type ID"
          value={assetTypeId}
          onChange={(e) => setAssetTypeId(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Endpoint ID"
          value={eid}
          onChange={(e) => setEid(e.target.value)}
          className="border p-2 rounded ml-2"
        />
        <button
          onClick={depositAssets}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        >
          Deposit
        </button>
      </div>

      {/* Request ZrKey */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Request ZrKey</h2>
        <input
          type="text"
          placeholder="Wallet Type ID"
          value={walletTypeId}
          onChange={(e) => setWalletTypeId(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="ZrOpts"
          value={zrOpts}
          onChange={(e) => setZrOpts(parseInt(e.target.value))}
          className="border p-2 rounded ml-2"
        />
        <input
          type="text"
          placeholder="Endpoint ID"
          value={eid}
          onChange={(e) => setEid(e.target.value)}
          className="border p-2 rounded ml-2"
        />
        <button
          onClick={requestZrKey}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        >
          Request ZrKey
        </button>
      </div>

      {/* Set ZrSign */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Set ZrSign</h2>
        <input
          type="text"
          placeholder="ZrSign Address"
          value={zrSignAddress}
          onChange={(e) => setZrSignAddress(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="ZrGas"
          value={zrGas}
          onChange={(e) => setZrGas(e.target.value)}
          className="border p-2 rounded ml-2"
        />
        <button
          onClick={setZrSign}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        >
          Set ZrSign
        </button>
      </div>

      {/* Check Balance */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Check Balance</h2>
        <input
          type="text"
          placeholder="User Address"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={() => {}}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        >
          Get Balance
        </button>
        {isLoadingBalance ? (
          <p>Loading...</p>
        ) : (
          <p>Balance: {balance ? balance.toString() : "N/A"}</p>
        )}
      </div>

      {/* Get Msg Sender */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Get Msg Sender</h2>
        <button
          onClick={() => {}}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Get Msg Sender
        </button>
        {isLoadingSender ? (
          <p>Loading...</p>
        ) : (
          <p>Msg Sender: {msgSender || "N/A"}</p>
        )}
      </div>
    </div>
  );
};

export default OmniDeFi;
