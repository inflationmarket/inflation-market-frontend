// Minimal ABIs needed for basic integration

export const ERC20_ABI = [
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function balanceOf(address owner) external view returns (uint256)',
  'function decimals() external view returns (uint8)'
];

export const VAULT_ABI = [
  'function deposit(address token, uint256 amount) external returns (uint256 shares)',
  'function availableBalance(address user, address token) external view returns (uint256)',
];

export const POSITION_MANAGER_ABI = [
  'function openPosition(bool isLong, uint256 collateralAmount, uint256 leverage, uint256 minPrice, uint256 maxPrice) external returns (bytes32)',
  'function closePosition(bytes32 positionId) external returns (int256 pnl)',
  'function addMargin(bytes32 positionId, uint256 amount) external',
  'function removeMargin(bytes32 positionId, uint256 amount) external'
];

export const VAMM_ABI = [
  'function getMarkPrice() external view returns (uint256)',
  'function getPriceForTrade(int256 size) external view returns (uint256 newMarkPrice, uint256 priceImpact)'
];

export const INDEX_ORACLE_ABI = [
  'function getIndexPrice() external view returns (uint256)'
];

export const FUNDING_CALCULATOR_ABI = [
  'function currentFundingRate() external view returns (int256)'
];
