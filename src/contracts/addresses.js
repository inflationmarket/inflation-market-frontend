// Contract Addresses for Different Networks
// Update these addresses after deployment

export const CONTRACT_ADDRESSES = {
  // Localhost / Hardhat Network (Chain ID: 31337)
  31337: {
    PositionManager: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // Update after deployment
    Vault: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    vAMM: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    FundingRateCalculator: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    IndexOracle: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
    Liquidator: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
    USDC: '0x0165878A594ca255338adfa4d48449f69242Eb8F', // Mock USDC
  },

  // Sepolia Testnet (Chain ID: 11155111)
  11155111: {
    PositionManager: '0x0000000000000000000000000000000000000000', // Update after deployment
    Vault: '0x0000000000000000000000000000000000000000',
    vAMM: '0x0000000000000000000000000000000000000000',
    FundingRateCalculator: '0x0000000000000000000000000000000000000000',
    IndexOracle: '0x0000000000000000000000000000000000000000',
    Liquidator: '0x0000000000000000000000000000000000000000',
    USDC: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', // Sepolia USDC
  },

  // Ethereum Mainnet (Chain ID: 1)
  1: {
    PositionManager: '0x0000000000000000000000000000000000000000', // Update after deployment
    Vault: '0x0000000000000000000000000000000000000000',
    vAMM: '0x0000000000000000000000000000000000000000',
    FundingRateCalculator: '0x0000000000000000000000000000000000000000',
    IndexOracle: '0x0000000000000000000000000000000000000000',
    Liquidator: '0x0000000000000000000000000000000000000000',
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // Mainnet USDC
  },

  // Polygon Mainnet (Chain ID: 137)
  137: {
    PositionManager: '0x0000000000000000000000000000000000000000', // Update after deployment
    Vault: '0x0000000000000000000000000000000000000000',
    vAMM: '0x0000000000000000000000000000000000000000',
    FundingRateCalculator: '0x0000000000000000000000000000000000000000',
    IndexOracle: '0x0000000000000000000000000000000000000000',
    Liquidator: '0x0000000000000000000000000000000000000000',
    USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // Polygon USDC
  },
};

// Network names for display
export const NETWORK_NAMES = {
  31337: 'Localhost',
  11155111: 'Sepolia Testnet',
  1: 'Ethereum Mainnet',
  137: 'Polygon',
};

// Supported networks
export const SUPPORTED_CHAIN_IDS = [31337, 11155111, 1, 137];

// Default network (localhost for development)
export const DEFAULT_CHAIN_ID = 31337;

// Helper function to get contract addresses for a specific network
export const getContractAddresses = (chainId) => {
  const addresses = CONTRACT_ADDRESSES[chainId];
  if (!addresses) {
    console.warn(`No contract addresses found for chain ID: ${chainId}`);
    return null;
  }
  return addresses;
};

// Helper function to check if a network is supported
export const isSupportedNetwork = (chainId) => {
  return SUPPORTED_CHAIN_IDS.includes(chainId);
};

// Helper function to get network name
export const getNetworkName = (chainId) => {
  return NETWORK_NAMES[chainId] || 'Unknown Network';
};

export default CONTRACT_ADDRESSES;
