# 🎲 Lottery DApp

A decentralized lottery application built with **Solidity**, **Chainlink VRF**, and **Ethers.js**, allowing users to enter a lottery and pick a winner securely on the Ethereum blockchain.

---

## 🔗 Live Demo

🌐 [View the Live Site](https://sguoba.github.io/lottery-app/)

📍 **Testnet**: Sepolia (via MetaMask)

🧾 **Sample Contract Address** (Deployed):  
`0xfae528d5844df7c00528b15cbad3e9486069ff5a`

🧪 **Example Tx**:  
[View on Sepolia Etherscan](https://sepolia.etherscan.io/tx/0x778d0d4c1bd2d9311dadde48ab83cdd5a192863bdf1d55b4c1626503ade60fc12)

---

## 🧱 Tech Stack

- **Solidity** – Core smart contract
- **Chainlink VRF (planned)** – Secure randomness (currently using `keccak256`)
- **Ethers.js** – Front-end blockchain interaction
- **MetaMask** – Wallet connection and interaction
- **Remix + Sepolia** – Development and testing
- **GitHub Pages** – Front-end hosting

---

## 📁 Key Files

| File         | Description                              |
|--------------|------------------------------------------|
| `index.html` | UI layout and MetaMask connection logic  |
| `lottery.js` | Front-end logic interacting with contract |
| `style.css`  | Minimal styling for layout                |
| `Lottery.sol`| Smart contract source code (in `/contracts`) |
| `README.md`  | Project overview and setup instructions   |

---

## 🧪 Features

- ✅ Users can **enter the lottery** by paying 0.01 ETH.
- 🔒 Owner can **pick a winner** who receives the full pot.
- ⚠️ Reentrancy protection included.
- 💬 Auto-entry via `receive()` and `fallback()`.

---


## 🛠 Deployment Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/sguoba/lottery-app.git
   cd lottery-app