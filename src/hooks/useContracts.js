import { ethers } from 'ethers';
import { getAddresses } from '../contracts/addresses';
import { ERC20_ABI, VAULT_ABI, POSITION_MANAGER_ABI, VAMM_ABI, INDEX_ORACLE_ABI, FUNDING_CALCULATOR_ABI } from '../contracts/abis';
import { useProvider } from './useProvider';

export function useContracts() {
  const { getReadProvider, getSigner } = useProvider();
  const addr = getAddresses();

  const getRead = async () => {
    const provider = getReadProvider();
    return {
      erc20: (address) => new ethers.Contract(address, ERC20_ABI, provider),
      vault: addr.vault ? new ethers.Contract(addr.vault, VAULT_ABI, provider) : null,
      positionManager: addr.positionManager ? new ethers.Contract(addr.positionManager, POSITION_MANAGER_ABI, provider) : null,
      vamm: addr.vamm ? new ethers.Contract(addr.vamm, VAMM_ABI, provider) : null,
      indexOracle: addr.indexOracle ? new ethers.Contract(addr.indexOracle, INDEX_ORACLE_ABI, provider) : null,
      fundingCalc: addr.fundingCalculator ? new ethers.Contract(addr.fundingCalculator, FUNDING_CALCULATOR_ABI, provider) : null,
      addresses: addr,
    };
  };

  const getWrite = async () => {
    const signer = await getSigner();
    return {
      erc20: (address) => new ethers.Contract(address, ERC20_ABI, signer),
      vault: addr.vault ? new ethers.Contract(addr.vault, VAULT_ABI, signer) : null,
      positionManager: addr.positionManager ? new ethers.Contract(addr.positionManager, POSITION_MANAGER_ABI, signer) : null,
      vamm: addr.vamm ? new ethers.Contract(addr.vamm, VAMM_ABI, signer) : null,
      indexOracle: addr.indexOracle ? new ethers.Contract(addr.indexOracle, INDEX_ORACLE_ABI, signer) : null,
      fundingCalc: addr.fundingCalculator ? new ethers.Contract(addr.fundingCalculator, FUNDING_CALCULATOR_ABI, signer) : null,
      addresses: addr,
    };
  };

  return { getRead, getWrite, addresses: addr };
}
