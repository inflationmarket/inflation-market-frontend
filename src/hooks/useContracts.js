import { useMemo } from 'react';
import { ethers } from 'ethers';
import { useContext } from 'react';
import { Web3Context } from '../contexts/Web3Context';
import { ABIS } from '../contracts/abis';
import { getContractAddresses } from '../contracts/addresses';

/**
 * Custom hook to get contract instances for the Inflation Market protocol
 * Returns contract instances with the user's signer attached
 *
 * @returns {Object} Contract instances
 * - positionManager: PositionManager contract instance
 * - vault: Vault contract instance
 * - vamm: vAMM contract instance
 * - fundingCalc: FundingRateCalculator contract instance
 * - indexOracle: IndexOracle contract instance
 * - liquidator: Liquidator contract instance
 * - usdc: USDC token contract instance
 * - addresses: Contract addresses for current network
 * - isReady: Boolean indicating if contracts are ready to use
 */
export const useContracts = () => {
  const { signer, provider, chainId, isConnected } = useContext(Web3Context);

  const contracts = useMemo(() => {
    // Return null if not connected or no chain ID
    if (!chainId) {
      return {
        positionManager: null,
        vault: null,
        vamm: null,
        fundingCalc: null,
        indexOracle: null,
        liquidator: null,
        usdc: null,
        addresses: null,
        isReady: false,
      };
    }

    // Get contract addresses for current network
    const addresses = getContractAddresses(chainId);

    if (!addresses) {
      console.warn(`No contract addresses configured for chain ID: ${chainId}`);
      return {
        positionManager: null,
        vault: null,
        vamm: null,
        fundingCalc: null,
        indexOracle: null,
        liquidator: null,
        usdc: null,
        addresses: null,
        isReady: false,
      };
    }

    // Use signer if connected, otherwise use provider for read-only operations
    const signerOrProvider = signer || provider;

    if (!signerOrProvider) {
      return {
        positionManager: null,
        vault: null,
        vamm: null,
        fundingCalc: null,
        indexOracle: null,
        liquidator: null,
        usdc: null,
        addresses,
        isReady: false,
      };
    }

    try {
      // Create contract instances
      const positionManager = new ethers.Contract(
        addresses.PositionManager,
        ABIS.PositionManager,
        signerOrProvider
      );

      const vault = new ethers.Contract(
        addresses.Vault,
        ABIS.Vault,
        signerOrProvider
      );

      const vamm = new ethers.Contract(
        addresses.vAMM,
        ABIS.vAMM,
        signerOrProvider
      );

      const fundingCalc = new ethers.Contract(
        addresses.FundingRateCalculator,
        ABIS.FundingRateCalculator,
        signerOrProvider
      );

      const indexOracle = new ethers.Contract(
        addresses.IndexOracle,
        ABIS.IndexOracle,
        signerOrProvider
      );

      const liquidator = new ethers.Contract(
        addresses.Liquidator,
        ABIS.Liquidator,
        signerOrProvider
      );

      // Standard ERC20 ABI for USDC
      const usdcABI = [
        'function balanceOf(address owner) view returns (uint256)',
        'function decimals() view returns (uint8)',
        'function symbol() view returns (string)',
        'function transfer(address to, uint amount) returns (bool)',
        'function approve(address spender, uint256 amount) returns (bool)',
        'function allowance(address owner, address spender) view returns (uint256)',
      ];

      const usdc = new ethers.Contract(
        addresses.USDC,
        usdcABI,
        signerOrProvider
      );

      return {
        positionManager,
        vault,
        vamm,
        fundingCalc,
        indexOracle,
        liquidator,
        usdc,
        addresses,
        isReady: true,
      };
    } catch (error) {
      console.error('Error creating contract instances:', error);
      return {
        positionManager: null,
        vault: null,
        vamm: null,
        fundingCalc: null,
        indexOracle: null,
        liquidator: null,
        usdc: null,
        addresses,
        isReady: false,
      };
    }
  }, [signer, provider, chainId, isConnected]);

  return contracts;
};

export default useContracts;
