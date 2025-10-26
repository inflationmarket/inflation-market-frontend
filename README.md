# Inflation Market - Frontend

The first decentralized perpetual futures market for real-world economic data.

## Live Demo
https://test.inflationmarket.com

## Tech Stack
- React 18 (Create React App)
- Tailwind CSS
- Lucide Icons
- Ethers v6
- Vercel (Hosting)

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Deployment
Automatically deploys to Vercel on push to `main`.

Ensure required env vars are set in Vercel Project Settings:
- `REACT_APP_CHAIN_ID`
- `REACT_APP_RPC_URL`
- `REACT_APP_USDC`
- `REACT_APP_VAULT`
- `REACT_APP_POSITION_MANAGER`
- `REACT_APP_VAMM`
- `REACT_APP_FUNDING_CALC`
- `REACT_APP_INDEX_ORACLE`

## License
MIT

