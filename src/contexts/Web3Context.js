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
    console.log('🔌 [Web3Context] connectWallet called');
    if (isConnecting) {
      console.log('⚠️  [Web3Context] Already connecting, ignoring duplicate call');
      return; // avoid double prompts/freezes
    }
    let safetyTimeout;
    try {
      console.log('⏳ [Web3Context] Setting isConnecting = true');
      setIsConnecting(true);
      setError(null);
      safetyTimeout = setTimeout(() => {
        console.log('⏱️  [Web3Context] Safety timeout triggered (20s)');
        // If something stalls (no extension prompt or blocked), stop spinner
        setIsConnecting(false);
      }, 20000);

      console.log('🔍 [Web3Context] Checking window.ethereum...');
      if (typeof window === 'undefined' || !window.ethereum) {
        console.error('❌ [Web3Context] window.ethereum not found');
        throw new Error('Please install MetaMask to use this dApp');
      }
      console.log('✅ [Web3Context] window.ethereum exists:', window.ethereum.isMetaMask ? 'MetaMask' : 'Other provider');

      // Request account access (handle user-reject gracefully)
      let accounts = [];
      try {
        console.log('📢 [Web3Context] Requesting accounts (MetaMask should popup now)...');
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('✅ [Web3Context] Got accounts:', accounts.length, accounts[0]);
      } catch (reqErr) {
        if (reqErr && reqErr.code === 4001) {
          console.log('❌ [Web3Context] User rejected connection');
          setError('User rejected connection');
          return;
        }
        console.error('❌ [Web3Context] Request accounts error:', reqErr);
        throw reqErr;
      }

      console.log('⏳ [Web3Context] Creating ethers provider...');
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      console.log('✅ [Web3Context] Provider created');

      console.log('⏳ [Web3Context] Getting signer...');
      const web3Signer = await web3Provider.getSigner();
      console.log('✅ [Web3Context] Signer created');

      console.log('⏳ [Web3Context] Getting network...');
      const network = await web3Provider.getNetwork();
      console.log('✅ [Web3Context] Network:', network.chainId.toString());

      setAccount(accounts[0]);
      setProvider(web3Provider);
      setSigner(web3Signer);
      setChainId(Number(network.chainId));

      console.log('💾 [Web3Context] Saving to localStorage');
      try { localStorage.setItem('im_connected', '1'); } catch (_) {}

      console.log('🎉 [Web3Context] Connection complete!');
    } catch (err) {
      console.error('❌ [Web3Context] Connection error:', err);
      setError(err.message);
    } finally {
      console.log('🏁 [Web3Context] Setting isConnecting = false');
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
