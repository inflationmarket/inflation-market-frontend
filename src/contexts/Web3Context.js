import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext(null);

// Export the context
export { Web3Context };

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider');
  }
  return context;
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  };

  // Connect wallet
  const connectWallet = useCallback(async () => {
    if (isConnecting) return; // avoid double prompts/freezes
    let safetyTimeout;
    try {
      setIsConnecting(true);
      setError(null);
      safetyTimeout = setTimeout(() => {
        // If something stalls (no extension prompt or blocked), stop spinner
        setIsConnecting(false);
      }, 20000);

      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('Please install MetaMask to use this dApp');
      }

      // Request account access (handle user-reject gracefully)
      let accounts = [];
      try {
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (reqErr) {
        if (reqErr && reqErr.code === 4001) {
          setError('User rejected connection');
          return;
        }
        throw reqErr;
      }

      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const web3Signer = await web3Provider.getSigner();
      const network = await web3Provider.getNetwork();

      setAccount(accounts[0]);
      setProvider(web3Provider);
      setSigner(web3Signer);
      setChainId(Number(network.chainId));

      try { localStorage.setItem('im_connected', '1'); } catch (_) {}

    } catch (err) {
      setError(err.message);
    } finally {
      setIsConnecting(false);
      try { if (safetyTimeout) clearTimeout(safetyTimeout); } catch (_) {}
    }
  }, [isConnecting]);

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setChainId(null);
    setError(null);
    try { localStorage.removeItem('im_connected'); } catch (_) {}
  };

  // Switch network
  const switchNetwork = async (targetChainId) => {
    try {
      if (!window.ethereum) throw new Error('MetaMask not installed');

      const chainIdHex = `0x${targetChainId.toString(16)}`;

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });

      return true;
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        return false;
      }
      setError(err.message);
      return false;
    }
  };

  // Add network to MetaMask
  const addNetwork = async (networkConfig) => {
    try {
      if (!window.ethereum) throw new Error('MetaMask not installed');

      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [networkConfig],
      });

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Listen for account changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (accounts[0] !== account) {
        setAccount(accounts[0]);
      }
    };

    const handleChainChanged = (chainIdHex) => {
      const newChainId = parseInt(chainIdHex, 16);
      setChainId(newChainId);
      // No full reload to avoid freezes; downstream hooks read chainId
    };

    const handleDisconnect = () => {
      disconnectWallet();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('disconnect', handleDisconnect);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      }
    };
  }, [account]);

  // Auto-connect if previously connected (non-blocking: avoid eth_requestAccounts on load)
  useEffect(() => {
    const autoConnect = async () => {
      if (typeof window === 'undefined' || !window.ethereum) return;
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const shouldAuto = (() => { try { return localStorage.getItem('im_connected') === '1'; } catch (_) { return false; } })();
        if (accounts.length > 0 && shouldAuto) {
          setIsConnecting(true);
          try {
            const web3Provider = new ethers.BrowserProvider(window.ethereum);
            const web3Signer = await web3Provider.getSigner();
            const network = await web3Provider.getNetwork();
            setAccount(accounts[0]);
            setProvider(web3Provider);
            setSigner(web3Signer);
            setChainId(Number(network.chainId));
          } finally {
            setIsConnecting(false);
          }
        }
      } catch (err) {
        setIsConnecting(false);
      }
    };
    autoConnect();
  }, []);

  const value = {
    account,
    provider,
    signer,
    chainId,
    isConnecting,
    error,
    isConnected: !!account,
    isMetaMaskInstalled: isMetaMaskInstalled(),
    connectWallet,
    disconnectWallet,
    switchNetwork,
    addNetwork,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

// Network configurations
export const NETWORKS = {
  MAINNET: {
    chainId: `0x1`,
    chainName: 'Ethereum Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  SEPOLIA: {
    chainId: `0xaa36a7`,
    chainName: 'Sepolia Testnet',
    nativeCurrency: { name: 'Sepolia ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://sepolia.infura.io/v3/'],
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
  },
  POLYGON: {
    chainId: `0x89`,
    chainName: 'Polygon Mainnet',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  ARBITRUM_SEPOLIA: {
    chainId: `0x66eee`,
    chainName: 'Arbitrum Sepolia',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://sepolia.arbiscan.io'],
  },
  LOCALHOST: {
    chainId: `0x7a69`,
    chainName: 'Localhost 8545',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['http://127.0.0.1:8545/'],
    blockExplorerUrls: [],
  },
};

export default Web3Provider;
