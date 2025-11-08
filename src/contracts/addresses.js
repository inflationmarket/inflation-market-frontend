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

// Returns addresses for a specific market id if configured via env.
// Fallback: for 'inflation', use base addresses; otherwise empty if not set.
export const getMarketAddresses = (marketId) => {
  const base = getAddresses();
  const key = String(marketId || '').toUpperCase().replace(/[^A-Z0-9]/g, '_');
  if (!key || key === 'INFLATION') {
    return {
      chainId: base.chainId,
      rpcUrl: base.rpcUrl,
      vamm: base.vamm,
      indexOracle: base.indexOracle,
      fundingCalculator: base.fundingCalculator,
    };
  }
  const pick = (name) => process.env[`REACT_APP_${name}_${key}`] || '';
  return {
    chainId: base.chainId,
    rpcUrl: base.rpcUrl,
    vamm: pick('VAMM'),
    indexOracle: pick('INDEX_ORACLE'),
    fundingCalculator: pick('FUNDING_CALC'),
  };
};
