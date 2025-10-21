// Contract ABIs for Inflation Market Protocol
// These are extracted from the compiled contract artifacts

// Import full contract JSONs
import PositionManagerArtifact from '../../../inflation-market-contracts/artifacts/contracts/PositionManager.sol/PositionManager.json';
import VaultArtifact from '../../../inflation-market-contracts/artifacts/contracts/Vault.sol/Vault.json';
import vAMMArtifact from '../../../inflation-market-contracts/artifacts/contracts/vAMM.sol/vAMM.json';
import FundingRateCalculatorArtifact from '../../../inflation-market-contracts/artifacts/contracts/FundingRateCalculator.sol/FundingRateCalculator.json';
import IndexOracleArtifact from '../../../inflation-market-contracts/artifacts/contracts/IndexOracle.sol/IndexOracle.json';
import LiquidatorArtifact from '../../../inflation-market-contracts/artifacts/contracts/Liquidator.sol/Liquidator.json';

// Extract just the ABI arrays
export const PositionManagerABI = PositionManagerArtifact.abi;
export const VaultABI = VaultArtifact.abi;
export const vAMMABI = vAMMArtifact.abi;
export const FundingRateCalculatorABI = FundingRateCalculatorArtifact.abi;
export const IndexOracleABI = IndexOracleArtifact.abi;
export const LiquidatorABI = LiquidatorArtifact.abi;

// Export all ABIs as an object for convenience
export const ABIS = {
  PositionManager: PositionManagerABI,
  Vault: VaultABI,
  vAMM: vAMMABI,
  FundingRateCalculator: FundingRateCalculatorABI,
  IndexOracle: IndexOracleABI,
  Liquidator: LiquidatorABI,
};

export default ABIS;
