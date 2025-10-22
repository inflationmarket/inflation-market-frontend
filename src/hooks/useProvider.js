import { ethers } from 'ethers';
import { getAddresses } from '../contracts/addresses';

export function useProvider() {
  const { rpcUrl, chainId } = getAddresses();

  const getReadProvider = () => new ethers.JsonRpcProvider(rpcUrl, chainId);

  const getSigner = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      return signer;
    }
    throw new Error('No injected provider (MetaMask) available');
  };

  return { getReadProvider, getSigner, chainId };
}
