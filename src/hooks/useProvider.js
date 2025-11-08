import { ethers } from 'ethers';
import { getAddresses } from '../contracts/addresses';

export function useProvider() {
  const { rpcUrl, chainId } = getAddresses();

  const defaultRpcFor = (id) => {
    if (id === 421614) return 'https://sepolia-rollup.arbitrum.io/rpc';
    return null;
    };

  const getReadProvider = () => {
    const url = rpcUrl && rpcUrl.length > 0 ? rpcUrl : defaultRpcFor(chainId);
    if (!url) throw new Error('RPC URL missing. Set REACT_APP_RPC_URL.');
    return new ethers.JsonRpcProvider(url, chainId);
  };

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
