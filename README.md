# Aave Yield DApp

A decentralized application (DApp) that allows users to seamlessly deposit assets into the Aave Protocol, earn yield, view balances, and withdraw funds. Built with Next.js (App Router), TailwindCSS, and Ethers.js.

---

## 🚀 Features

- Connect wallet wallet connect appkit
- Fetch Aave reserve data (APY, liquidity, token metadata)
- Deposit tokens into Aave v3
- Withdraw deposited tokens
- View deposited balance and live APY
- Fully responsive UI with TailwindCSS
- Clean and scalable folder structure


---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js 14 App Router, TailwindCSS |
| Yield Engine | Aave v3 Protocol |
| Network | Base / Polygon / Ethereum |

---

## 🔧 Setup Instructions

### 1. Clone Project
```bash
git clone https://github.com/lucidartdev/aave-yield-dapp.git
cd aave-yield-dapp



📚 How It Works

- User connects wallet
- Reserves + APY are fetched from Aave
- User selects an asset to deposit
- Approves ERC20
- Deposits through Aave Pool contract
- Dashboard updates balance and APY