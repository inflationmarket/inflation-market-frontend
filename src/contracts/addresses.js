export const NETWORKS = {
  ARBITRUM_SEPOLIA: 421614,
};

// Addresses are read from env to keep secrets/config out of the bundle history.
export const getAddresses = () => ({
  chainId: Number(process.env.REACT_APP_CHAIN_ID || NETWORKS.ARBITRUM_SEPOLIA),
  rpcUrl: process.env.REACT_APP_RPC_URL || '',
  usdc: process.env.REACT_APP_USDC || '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
  vault: process.env.REACT_APP_VAULT || '',
  positionManager: process.env.REACT_APP_POSITION_MANAGER || '',
  vamm: process.env.REACT_APP_VAMM || '',
  fundingCalculator: process.env.REACT_APP_FUNDING_CALC || '',
  indexOracle: process.env.REACT_APP_INDEX_ORACLE || '',
});
