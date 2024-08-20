# **OmniDeFi: Multi-Chain Decentralized Finance Platform using MPC powered by ZrSign**

### **Tagline: Empowering Cross-Chain Financial Freedom**

---

## **Introduction**

OmniDeFi is a cutting-edge decentralized finance platform that allows users to lend, borrow, and earn interest on assets across multiple blockchains. By leveraging LayerZero's omnichain capabilities and ZrSign's cross-chain transaction management, OmniDeFi ensures seamless, secure, and efficient asset transfer and management across various blockchain networks.

## **Features**

- **Cross-Chain Lending & Borrowing:** Lend and borrow assets across different blockchain networks seamlessly.
- **Interest Earning:** Deposit your assets into lending pools and earn competitive interest rates.
- **Secure Collateral Management:** Ensure the security of loans with robust collateral checks.
- **Omnichain Connectivity:** Leverage LayerZero for smooth and secure communication between multiple chains.
- **ZrSign Integration:** Utilize ZrSign for efficient cross-chain transactions, ensuring secure and authorized operations.
- **Dynamic Interest Rates:** Interest rates are dynamically calculated based on lending pool activity.
- **Comprehensive Wallet Management:** Manage and verify wallets across different chains using ZrSign keys.
- **Gas Optimization:** Optimized gas usage for cross-chain transactions, making it cost-effective for users.

## **How It Works**

### **1. Lending & Borrowing:**
- **Lending:** Users can deposit their assets into OmniDeFi's lending pools. These assets are then available for borrowers who can take out loans by providing sufficient collateral.
- **Borrowing:** Users request loans by locking up collateral. The system checks the collateral's sufficiency before approving the loan. Once approved, the loan is issued, and the borrower receives the funds.

### **2. Cross-Chain Transactions:**
- **ZrSign Key Request:** Users can request ZrSign keys for cross-chain operations. These keys are essential for performing transactions across different blockchain networks.
- **ZrSign Transaction Request:** Users initiate cross-chain transactions by sending a transaction request through ZrSign. The platform verifies the user's ownership and authorizes the transaction if valid.

### **3. Loan Repayment & Interest Calculation:**
- **Repayment:** Borrowers repay their loans over time. The platform tracks repayments, updating the loan balance and interest accordingly.
- **Interest Calculation:** Interest is dynamically calculated based on the lending pool's activity, ensuring a fair and competitive rate for all participants.

### **4. Wallet Management:**
- OmniDeFi manages user wallets across different chains by assigning and verifying ZrSign keys. Users can access and manage their assets securely, regardless of the blockchain network.

## **Technology Stack**

### **1. LayerZero:**
OmniDeFi is built on top of LayerZero, an omnichain interoperability protocol that facilitates seamless communication between different blockchains. LayerZero allows OmniDeFi to perform cross-chain transactions efficiently and securely, ensuring that users can interact with multiple blockchain networks without leaving the platform.

### **2. ZrSign:**
ZrSign is a crucial component of OmniDeFi, providing the necessary infrastructure for managing and executing cross-chain transactions. ZrSign handles key requests, transaction authorization, and wallet verification across different chains. By integrating ZrSign, OmniDeFi ensures that all cross-chain operations are secure, authorized, and efficient.

### **How We Utilize LayerZero and ZrSign:**
- **LayerZero** enables cross-chain communication, allowing OmniDeFi to interact with multiple blockchains. This ensures that users can lend, borrow, and manage assets across different networks seamlessly.
- **ZrSign** is integrated to manage the complexities of cross-chain transactions. It provides the necessary tools for key management, transaction authorization, and wallet verification, ensuring that all operations are secure and efficient.

### Smart Contract Overview: OmniDefi

The **OmniDefi** smart contract is a robust decentralized finance (DeFi) application designed to provide cross-chain financial services. It leverages the LayerZero protocol for cross-chain messaging and ZrSign for secure multi-chain interactions. Below is a detailed breakdown of the contract's components and functionality:

#### Key Features:
1. **Cross-Chain Asset Management**: 
   - Allows users to deposit, borrow, and repay assets across multiple blockchain networks.
   - Manages collateralization and liquidity pools to ensure secure and efficient lending and borrowing.

2. **ZrSign Integration**:
   - Utilizes ZrSign for secure cross-chain wallet management and transaction signing.
   - Supports both key requests and transaction submissions through ZrSign, ensuring interoperability across different blockchain networks.

3. **Omnichain Messaging**:
   - Employs LayerZero’s OApp infrastructure for cross-chain communication, enabling decentralized operations across different blockchains.
   - Supports message sending, receiving, and execution options with customizable gas limits and fee structures.

#### Key Structures and Variables:
- **ZrSignData**: Stores the address and gas limit for ZrSign interaction on each endpoint.
- **ZrSignReq**: Represents a request to ZrSign, including message type, sender, wallet index, and payload.
- **Loan**: Represents the details of a loan, including borrowed amount, collateral, interest rate, and due date.

#### Initialization:
- **initialize()**: Sets up the LayerZero endpoint and delegate, configures the contract owner, and initializes ZrSign locations for supported networks.

#### Core Functionalities:
1. **Asset Management**:
   - **deposit()**: Users can deposit assets into the contract, contributing to the liquidity pool.
   - **borrow()**: Users can borrow assets from the pool, provided they meet the collateralization requirements.
   - **repayLoan()**: Allows users to repay borrowed amounts and reclaim their collateral.

2. **Cross-Chain Requests**:
   - **reqZrKey()**: Initiates a cross-chain request for a ZrKey, essential for wallet management across chains.
   - **reqZrSendTx()**: Submits a transaction request across chains, leveraging ZrSign for execution on the target network.

3. **ZrSign Management**:
   - **setZrSignAddress()**: Sets the ZrSign contract address for a specific endpoint.
   - **setZrSignGas()**: Configures the gas limit for ZrSign interactions on a specific endpoint.
   - **getZrSign()**: Retrieves the ZrSign address and gas limit for a given endpoint.

4. **Messaging and Fee Estimation**:
   - **quote()**: Estimates the gas fee required for a cross-chain transaction, offering options for payment in native gas or ZRO token.
   - **send()**: Sends a message to a destination chain, utilizing LayerZero’s messaging system for execution.

#### Error Handling:
- **DestinationZrSignNotAvailable**: Triggered when a ZrSign contract is not available on the specified endpoint.
- **UnsupportedMsgType**: Raised when an unsupported message type is encountered.
- **UnauthorizedWalletOwner**: Ensures only authorized users can interact with their wallets.
- **ZrSignInteractionFailed**: Indicates a failure in the ZrSign interaction process.

#### Event Logging:
- **Response**: Emitted after a ZrSign interaction, indicating success and returning the response data.

#### Utility Functions:
- **balance()**: Retrieves the balance of a specific user.
- **addressToBytes32()**: Converts an Ethereum address to a `bytes32` format.

The **OmniDefi** smart contract exemplifies a secure, scalable, and flexible approach to cross-chain DeFi operations, enabling seamless interaction across multiple blockchain networks through LayerZero and ZrSign integration.

## **Setup & Deployment**

### **1. Prerequisites:**
- Node.js
- Hardhat
- Solidity 0.8.20

### **2. Clone the Repository:**
```bash
git clone https://github.com/your-repo/omnidefi.git
cd omnidefi
```

### **3. Install Dependencies:**
```bash
npm install
```

### **4. Compile Smart Contracts:**
```bash
npx hardhat compile
```

### **5. Deploy Smart Contracts:**
```bash
npx hardhat run scripts/deploy.js --network your-network
```

### **6. Testing:**
```bash
npx hardhat test
```

## **Future Enhancements**

- **Liquidity Mining:** Introduce liquidity mining to reward users for contributing assets to the lending pool.
- **Governance:** Implement a decentralized governance model, allowing users to participate in decision-making.
- **Cross-Chain Insurance:** Provide insurance options to protect users against cross-chain transaction failures.

## **Contributing**

We welcome contributions from the community! If you would like to contribute to OmniDeFi, please fork the repository, create a new branch, and submit a pull request.

### **1. Fork the Repository:**
```bash
git clone 
cd omnidefi
```

### **2. Create a New Branch:**
```bash
git checkout -b feature/your-feature-name
```

### **3. Make Your Changes and Commit:**
```bash
git commit -m "Your commit message"
```

### **4. Push to Your Fork:**
```bash
git push origin feature/your-feature-name
```

### **5. Submit a Pull Request:**
- Go to the original repository on GitHub.
- Click on "Pull Requests" and then click on "New Pull Request."


Thank you for using OmniDeFi, where the power of decentralized finance meets the freedom of cross-chain transactions!