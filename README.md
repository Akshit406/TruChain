# TruChain 🌐

TruChain is a decentralized supply chain tracking system built on the Ethereum blockchain. It ensures product authenticity and transparency by enabling multiple roles—**Admin**, **Manufacturer**, **Distributor**, **Retailer**, and **Consumer**—to interact through a trustless smart contract.

---

## ⚙️ Features

- ✅ **Admin Panel** to assign roles securely (route: `/admin`)
- 👥 Role-based dashboards for:
  - **Manufacturers** to add products
  - **Distributors** to mark products as shipped
  - **Retailers** to stock products
  - **Consumers** to purchase products
- 📦 Track product flow across the supply chain
- 🔐 Ethereum-based wallet login via MetaMask
- 🌓 Dark-themed modern UI with Tailwind CSS 3
- 📜 Smart contract logic in Solidity with role-based access control

---

## 🏗️ Tech Stack

| Layer        | Tech                        |
|--------------|-----------------------------|
| Frontend     | React 18, Tailwind CSS 3    |
| Smart Contracts | Solidity (Truffle)        |
| Blockchain   | Ethereum (tested on Ganache)|
| State Mgmt   | useState, useEffect, context |
| Web3         | Ethers.js or Web3.js        |
| Routing      | React Router v5             |

---