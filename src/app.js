import React, { useState, useEffect, createContext, useContext } from 'react';
import { Wallet, TrendingUp, TrendingDown, AlertTriangle, Plus, X, Shield, Zap, Users, BarChart3, ArrowRight, Menu, Twitter, MessageCircle, CheckCircle, Info, ChevronDown, ChevronUp, DollarSign, Lock, Target, ArrowUp, ArrowDown } from 'lucide-react';
import { Web3Context } from './contexts/Web3Context';
import { Button, Card, Input, PyramidLogo } from './components/ui/primitives';
import { ToastProvider, useToast } from './components/toast/ToastProvider';

// ============================================================================
// CONFIGURATION & CONSTANTS
// ============================================================================

const CONFIG = {
  domain: 'Inflationmarket.com',
  contracts: {
    market: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    usdc: '0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892',
  },
  social: {
    twitter: 'https://twitter.com/inflationmarket',
    discord: 'https://discord.gg/inflationmarket',
    github: 'https://github.com/inflationmarket',
  },
};

// ============================================================================
// UTILITY FUNCTIONS - Data Formatting
// ============================================================================

const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const formatCurrency = (value, decimals = 2) => {
  const num = typeof value === 'bigint' ? Number(value) : value;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

const formatPercent = (value, decimals = 2) => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
};

const parseContractError = (error) => {
  const errorString = error?.message || error?.toString() || '';
  
  if (errorString.includes('insufficient')) return 'Insufficient funds';
  if (errorString.includes('rejected')) return 'Transaction cancelled';
  if (errorString.includes('slippage')) return 'Price slippage exceeded';
  if (errorString.includes('leverage')) return 'Invalid leverage amount';
  
  return 'Transaction failed. Please try again.';
};

// ============================================================================
// APP STATE CONTEXT
// ============================================================================

const AppStateContext = createContext(null);

const AppStateProvider = ({ children }) => {
  // Import Web3 context for real wallet integration
  const web3 = useContext(Web3Context);

  const [selectedMarket, setSelectedMarket] = useState('inflation');
  const [positions, setPositions] = useState([]);

  // Map Web3 wallet state to app account state
  const account = {
    address: web3?.account || null,
    isConnected: web3?.isConnected || false,
    balance: web3?.isConnected ? 0 : 50000, // Real balance will be fetched from smart contracts
  };

  // Use Web3 connect function
  const connect = async () => {
    if (web3?.connectWallet) {
      await web3.connectWallet();
    }
  };

  // Use Web3 disconnect function
  const disconnect = () => {
    if (web3?.disconnectWallet) {
      web3.disconnectWallet();
    }
    setPositions([]);
  };

  return (
    <AppStateContext.Provider value={{
      account,
      selectedMarket,
      setSelectedMarket,
      positions,
      setPositions,
      connect,
      disconnect,
      isLoading: web3?.isConnecting || false,
      setIsLoading: () => {}, // Not needed with real Web3
      web3, // Expose web3 context for contract interactions
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within AppStateProvider');
  return context;
};

// ============================================================================
// MARKETS DATA
// ============================================================================

const MARKETS = [
  { 
    id: 'inflation', 
    name: 'Inflation', 
    description: 'U.S. Consumer Price Index',
    price: 101.25, 
    change24h: 0.75,
    fundingRate: 0.023,
    fundingRateAPR: 8.5,
    volume24h: 2400000,
    openInterest: 8700000
  },
  { 
    id: 'housing', 
    name: 'Housing', 
    description: 'S&P Case-Shiller National Index',
    price: 98.42, 
    change24h: -0.34,
    fundingRate: -0.015,
    fundingRateAPR: -4.2,
    volume24h: 1200000,
    openInterest: 3200000
  },
  { 
    id: 'gdp', 
    name: 'GDP Growth', 
    description: 'Real GDP Growth Rate',
    price: 102.15, 
    change24h: 1.20,
    fundingRate: 0.041,
    fundingRateAPR: 12.3,
    volume24h: 800000,
    openInterest: 2100000
  }
];

// ============================================================================
// MAIN APP
// ============================================================================

export default function InflationMarketApp() {
  return (
    <ToastProvider>
      <AppStateProvider>
        <AppRouter />
      </AppStateProvider>
    </ToastProvider>
  );
}

const AppRouter = () => {
  const [currentPage, setCurrentPage] = useState('landing');

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pages = {
    landing: <LandingPage onNavigate={navigate} />,
    app: <TradingAppPage onNavigate={navigate} />,
    about: <AboutPage onNavigate={navigate} />,
    'how-it-works': <HowItWorksPage onNavigate={navigate} />,
    whitepaper: <WhitepaperPage onNavigate={navigate} />,
    roadmap: <RoadmapPage onNavigate={navigate} />,
  };

  return pages[currentPage] || pages.landing;
};

// ============================================================================
// LANDING PAGE
// ============================================================================

function LandingPage({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
                <nav className="border-b border-yellow-500/20 bg-black/90 backdrop-blur-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
              <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center">
                <PyramidLogo className="w-6 h-6 text-black" />
              </div>
              <h1 className="text-xl font-bold text-white">Inflation Market</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => onNavigate('how-it-works')} className="text-gray-300 hover:text-yellow-500">How It Works</button>
              <button onClick={() => onNavigate('whitepaper')} className="text-gray-300 hover:text-yellow-500">Whitepaper</button>
              <button onClick={() => onNavigate('roadmap')} className="text-gray-300 hover:text-yellow-500">Roadmap</button>
              <button onClick={() => onNavigate('about')} className="text-gray-300 hover:text-yellow-500">About</button>
              <button onClick={() => onNavigate('app')} className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-bold">Launch App</button>
            </div>

            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3 border-t border-yellow-500/20">
              <button onClick={() => { onNavigate('how-it-works'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-yellow-500">How It Works</button>
              <button onClick={() => { onNavigate('whitepaper'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-yellow-500">Whitepaper</button>
              <button onClick={() => { onNavigate('roadmap'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-yellow-500">Roadmap</button>
              <button onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-yellow-500">About</button>
              <button onClick={() => { onNavigate('app'); setMobileMenuOpen(false); }} className="w-full px-6 py-2 bg-yellow-500 text-black rounded-lg font-bold">Launch App</button>
            </div>
          )}
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
            <span className="text-yellow-500 text-sm font-medium">🚀 Live on Testnet • Democratizing Macro Risk Management</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Hedge Inflation.
            <br />
            <span className="text-yellow-500">Protect Your Future.</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-4 max-w-3xl mx-auto">
            The world's first decentralized perpetual futures market for real-world economic data. 
            Trade CPI, GDP, and housing markets without intermediaries.
          </p>

          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            Inspired by Nobel laureate Robert Shiller's vision of democratized macro risk hedging, 
            Inflation Market brings institutional-grade economic derivatives to everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button onClick={() => onNavigate('app')} className="text-lg">
              Start Trading <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="ghost" className="text-lg" onClick={() => onNavigate('how-it-works')}>
              <Info className="w-5 h-5" /> How It Works
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '$4.3M', label: '24h Volume' },
              { value: '2,431', label: 'Active Positions' },
              { value: '$14.1M', label: 'Open Interest' },
              { value: '847', label: 'Total Users' }
            ].map((stat, i) => (
              <Card key={i} className="hover:border-yellow-500/40 transition-all">
                <div className="text-3xl font-bold text-yellow-500 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Inflation Market Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-yellow-500/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Inflation Market?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The macroeconomic risks you face every day—inflation, housing crashes, GDP volatility—are now tradeable, 
              hedgeable, and accessible to everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Hedge Inflation Risk',
                description: 'Protect your savings from rising prices. Go long on CPI perpetuals and profit when inflation erodes purchasing power.'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Earn Funding Yields',
                description: 'Take the other side and earn consistent funding payments. Short inflation when you believe prices will stabilize.'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Speculate on Economics',
                description: 'Trade your macro views. Bullish on housing? Bearish on GDP? Express your thesis with leverage up to 20x.'
              }
            ].map((feature, i) => (
              <Card key={i} className="text-center hover:border-yellow-500/40 transition-all">
                <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, Powerful, Decentralized
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Open a position in three steps. No KYC. No intermediaries. Just pure DeFi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                step: '1',
                title: 'Connect Wallet',
                description: 'Link your Web3 wallet. We support MetaMask, WalletConnect, and all major providers.',
                icon: <Wallet className="w-6 h-6" />
              },
              {
                step: '2',
                title: 'Choose Your Position',
                description: 'Select a market (CPI, Housing, GDP), decide long or short, and set your leverage.',
                icon: <Target className="w-6 h-6" />
              },
              {
                step: '3',
                title: 'Start Trading',
                description: 'Deposit collateral and open your position. Track P&L in real-time and close whenever you want.',
                icon: <TrendingUp className="w-6 h-6" />
              }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white/5 border border-yellow-500/20 rounded-2xl p-8 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-xl">
                      {step.step}
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-yellow-500/30" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={() => onNavigate('how-it-works')} variant="ghost" className="text-lg">
              Learn More About The Protocol <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Markets Overview */}
      <section className="py-20 px-4 bg-gradient-to-b from-yellow-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Available Markets
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Trade perpetual futures on the world's most important economic indicators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {MARKETS.map((market, i) => (
              <Card key={i} className="hover:border-yellow-500/40 transition-all cursor-pointer" onClick={() => onNavigate('app')}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{market.name}</h3>
                    <p className="text-sm text-gray-400">{market.description}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-bold ${
                    market.change24h >= 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                  }`}>
                    {formatPercent(market.change24h)}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Index Price</span>
                    <span className="text-lg font-bold text-white">${market.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">24h Volume</span>
                    <span className="text-sm font-bold text-yellow-500">${formatCurrency(market.volume24h / 1000000, 1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Funding APR</span>
                    <span className={`text-sm font-bold ${market.fundingRateAPR >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {formatPercent(market.fundingRateAPR, 1)}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-2 border-yellow-500/40 text-center p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of traders already hedging their inflation risk and earning yields on Inflation Market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => onNavigate('app')} className="text-lg">
                Launch App <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="ghost" className="text-lg" onClick={() => onNavigate('whitepaper')}>
                Read Whitepaper
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <footer className="border-t border-yellow-500/20 bg-black py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
                  <PyramidLogo className="w-5 h-5 text-black" />
                </div>
                <span className="font-bold text-white">Inflation Market</span>
              </div>
              <p className="text-sm text-gray-400">{CONFIG.domain}</p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <div className="space-y-2">
                <button onClick={() => onNavigate('how-it-works')} className="block text-sm text-gray-400 hover:text-yellow-500">How It Works</button>
                <button onClick={() => onNavigate('whitepaper')} className="block text-sm text-gray-400 hover:text-yellow-500">Whitepaper</button>
                <button onClick={() => onNavigate('roadmap')} className="block text-sm text-gray-400 hover:text-yellow-500">Roadmap</button>
                <button onClick={() => onNavigate('about')} className="block text-sm text-gray-400 hover:text-yellow-500">About</button>
                <button onClick={() => onNavigate('app')} className="block text-sm text-gray-400 hover:text-yellow-500">Launch App</button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Community</h4>
              <div className="space-y-2">
                <a href={CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-yellow-500 flex items-center gap-2">
                  <Twitter className="w-4 h-4" /> Twitter
                </a>
                <a href={CONFIG.social.discord} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-yellow-500 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Discord
                </a>
                <a href={CONFIG.social.github} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-yellow-500 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" /> GitHub
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <div className="space-y-2">
                <a href="mailto:security@inflationmarket.com" className="block text-sm text-gray-400 hover:text-yellow-500">Security</a>
                <a href="mailto:support@inflationmarket.com" className="block text-sm text-gray-400 hover:text-yellow-500">Support</a>
              </div>
            </div>
          </div>

          <div className="border-t border-yellow-500/20 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Inflation Market. All rights reserved.</p>
            <p className="mt-2 text-xs text-yellow-500">⚠️ Testnet Demo - {CONFIG.domain}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================================================
// TRADING APP PAGE
// ============================================================================

function TradingAppPage({ onNavigate }) {
  const { account, selectedMarket, setSelectedMarket } = useAppState();
  const [activeTab, setActiveTab] = useState('trade');
  const currentMarket = MARKETS.find(m => m.id === selectedMarket) || MARKETS[0];

  return (
    <div className="min-h-screen bg-black">
      <TradingHeader onNavigate={onNavigate} />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <MarketSelector
          markets={MARKETS}
          selectedMarket={selectedMarket}
          onSelectMarket={setSelectedMarket}
        />

        <div className="flex gap-2 mb-6 mt-6">
          <Button
            variant={activeTab === 'trade' ? 'primary' : 'ghost'}
            onClick={() => setActiveTab('trade')}
          >
            Trade
          </Button>
          <Button
            variant={activeTab === 'positions' ? 'primary' : 'ghost'}
            onClick={() => setActiveTab('positions')}
          >
            Positions
          </Button>
        </div>

        {activeTab === 'trade' && <TradingInterface market={currentMarket} />}
        {activeTab === 'positions' && <PositionsInterface />}
      </main>
    </div>
  );
}

// ============================================================================
// TRADING HEADER
// ============================================================================

function TradingHeader({ onNavigate }) {
  const { account, connect, disconnect, isLoading } = useAppState();

  return (
    <header className="border-b border-yellow-500/20 bg-black/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('landing')} className="text-gray-400 hover:text-yellow-500">← Back</button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center">
                <PyramidLogo className="w-6 h-6 text-black" />
              </div>
              <h1 className="text-xl font-bold text-white">Inflation Market</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {account.isConnected && (
              <div className="hidden md:block px-4 py-2 bg-white/5 rounded-lg border border-yellow-500/20">
                <div className="text-xs text-gray-400">Balance</div>
                <div className="text-sm font-bold text-white">{formatCurrency(account.balance)} USDC</div>
              </div>
            )}
            
            {!account.isConnected ? (
              <Button onClick={connect} loading={isLoading}>
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            ) : (
              <div className="relative group">
                <Button>
                  {formatAddress(account.address)}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-yellow-500/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(account.address);
                      // You can add a toast notification here
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-white hover:bg-yellow-500/10 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Address
                  </button>
                  <div className="border-t border-yellow-500/20"></div>
                  <button
                    onClick={disconnect}
                    className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Disconnect
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================================================
// MARKET SELECTOR
// ============================================================================

function MarketSelector({ markets, selectedMarket, onSelectMarket }) {
  return (
    <div className="mb-6">
      <h2 className="text-sm text-gray-400 mb-3 uppercase font-semibold">Select Market</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {markets.map((market) => (
          <button
            key={market.id}
            onClick={() => onSelectMarket(market.id)}
            className={`text-left p-4 rounded-xl border transition-all ${
              selectedMarket === market.id
                ? 'bg-yellow-500/10 border-yellow-500'
                : 'bg-white/5 border-yellow-500/20 hover:border-yellow-500/40'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-white">{market.name}</h3>
                <p className="text-xs text-gray-400">{market.description}</p>
              </div>
              {selectedMarket === market.id && <CheckCircle className="w-6 h-6 text-yellow-500" />}
            </div>
            <div className="flex justify-between items-end mt-3">
              <div>
                <div className="text-2xl font-bold text-white">${market.price.toFixed(2)}</div>
                <div className={`text-sm font-bold ${market.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatPercent(market.change24h)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400">Funding APR</div>
                <div className={`text-sm font-bold ${market.fundingRateAPR >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatPercent(market.fundingRateAPR, 1)}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TRADING INTERFACE
// ============================================================================

function TradingInterface({ market }) {
  const { account } = useAppState();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TradingForm market={market} />
      <OrderSummary market={market} />
    </div>
  );
}

function TradingForm({ market }) {
  const { account, positions, setPositions } = useAppState();
  const { addToast } = useToast();
  const [isLong, setIsLong] = useState(true);
  const [collateral, setCollateral] = useState('');
  const [leverage, setLeverage] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const positionSize = collateral ? parseFloat(collateral) * leverage : 0;

  const handleSubmit = async () => {
    if (!account.isConnected) {
      addToast('Please connect your wallet', 'error');
      return;
    }

    if (!collateral || parseFloat(collateral) <= 0) {
      addToast('Please enter a valid collateral amount', 'error');
      return;
    }

    if (parseFloat(collateral) > account.balance) {
      addToast('Insufficient balance', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate transaction
    setTimeout(() => {
      const newPosition = {
        id: Date.now(),
        type: isLong ? 'Long' : 'Short',
        size: positionSize,
        entryPrice: market.price,
        collateral: parseFloat(collateral),
        leverage: leverage,
        liquidationPrice: isLong ? market.price * 0.95 : market.price * 1.05,
        openedAt: Date.now(),
      };

      setPositions([...positions, newPosition]);
      addToast(`${isLong ? 'Long' : 'Short'} position opened successfully!`, 'success');
      
      // Reset form
      setCollateral('');
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Card>
      <h2 className="text-xl font-bold text-white mb-6">Open Position</h2>
      
      {!account.isConnected && (
        <div className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-sm text-yellow-500">⚠️ Connect wallet to trade</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button
          variant={isLong ? 'success' : 'ghost'}
          onClick={() => setIsLong(true)}
          disabled={isSubmitting}
        >
          <TrendingUp className="w-5 h-5" />Long
        </Button>
        <Button
          variant={!isLong ? 'danger' : 'ghost'}
          onClick={() => setIsLong(false)}
          disabled={isSubmitting}
        >
          <TrendingDown className="w-5 h-5" />Short
        </Button>
      </div>

      <Input
        label="Collateral (USDC)"
        type="number"
        value={collateral}
        onChange={(e) => setCollateral(e.target.value)}
        placeholder="0.00"
        disabled={isSubmitting}
        helperText={`Available: ${formatCurrency(account.balance)} USDC`}
      />

      <div className="my-6">
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-400">Leverage</label>
          <span className="text-lg font-bold text-white">{leverage}x</span>
        </div>
        <input
          type="range"
          min="1"
          max="20"
          value={leverage}
          onChange={(e) => setLeverage(parseInt(e.target.value))}
          className="w-full"
          disabled={isSubmitting}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1x</span>
          <span>20x</span>
        </div>
      </div>

      <Button
        variant={isLong ? 'success' : 'danger'}
        className="w-full"
        onClick={handleSubmit}
        disabled={!account.isConnected || isSubmitting}
        loading={isSubmitting}
      >
        {isSubmitting ? 'Opening Position...' : `Open ${isLong ? 'Long' : 'Short'}`}
      </Button>
    </Card>
  );
}

function OrderSummary({ market }) {
  const [collateral, setCollateral] = useState('1000');
  const [leverage, setLeverage] = useState(5);
  const [isLong, setIsLong] = useState(true);

  const positionSize = parseFloat(collateral || 0) * leverage;
  const tradingFee = positionSize * 0.001;
  const liquidationPrice = isLong ? market.price * (1 - (1 / leverage) * 0.97) : market.price * (1 + (1 / leverage) * 0.97);

  return (
    <Card>
      <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
      <div className="space-y-4">
        {[
          { label: 'Entry Price', value: `$${market.price.toFixed(2)}`, color: 'white' },
          { label: 'Position Size', value: `$${formatCurrency(positionSize)}`, color: 'yellow' },
          { label: 'Trading Fee (0.1%)', value: `$${formatCurrency(tradingFee)}`, color: 'white' },
          { label: 'Liquidation Price', value: `$${liquidationPrice.toFixed(2)}`, color: 'red' },
        ].map((item, i) => (
          <div key={i} className="flex justify-between py-3 border-b border-yellow-500/10">
            <span className="text-gray-400">{item.label}</span>
            <span className={`font-bold ${item.color === 'yellow' ? 'text-yellow-500' : item.color === 'red' ? 'text-red-500' : 'text-white'}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ============================================================================
// POSITIONS INTERFACE
// ============================================================================

function PositionsInterface() {
  const { account, positions, setPositions } = useAppState();
  const { addToast } = useToast();
  const [closingId, setClosingId] = useState(null);

  const handleClosePosition = (positionId) => {
    setClosingId(positionId);
    
    setTimeout(() => {
      setPositions(positions.filter(p => p.id !== positionId));
      addToast('Position closed successfully!', 'success');
      setClosingId(null);
    }, 1500);
  };

  if (!account.isConnected) {
    return (
      <Card className="p-12 text-center">
        <Wallet className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Connect Wallet</h3>
        <p className="text-gray-400">Connect to view your positions</p>
      </Card>
    );
  }

  if (positions.length === 0) {
    return (
      <Card className="p-12 text-center">
        <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No Positions</h3>
        <p className="text-gray-400">Open your first position to get started</p>
      </Card>
    );
  }

  const totalCollateral = positions.reduce((sum, p) => sum + p.collateral, 0);
  const totalSize = positions.reduce((sum, p) => sum + p.size, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-sm text-gray-400 mb-1">Total Positions</div>
          <div className="text-2xl font-bold text-white">{positions.length}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-400 mb-1">Total Collateral</div>
          <div className="text-2xl font-bold text-white">${formatCurrency(totalCollateral)}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-400 mb-1">Total Size</div>
          <div className="text-2xl font-bold text-yellow-500">${formatCurrency(totalSize)}</div>
        </Card>
      </div>

      <div className="space-y-4">
        {positions.map((position) => (
          <PositionCard
            key={position.id}
            position={position}
            onClose={handleClosePosition}
            isClosing={closingId === position.id}
          />
        ))}
      </div>
    </div>
  );
}

function PositionCard({ position, onClose, isClosing }) {
  const pnl = ((101.25 - position.entryPrice) / position.entryPrice) * position.size * (position.type === 'Long' ? 1 : -1);
  const pnlPercent = (pnl / position.collateral) * 100;

  return (
    <Card className={`border ${position.type === 'Long' ? 'border-green-500/30' : 'border-red-500/30'}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
        <div className="flex items-center gap-3 mb-4 lg:mb-0">
          <div className={`px-3 py-1 rounded-lg font-bold ${
            position.type === 'Long' ? 'bg-green-500' : 'bg-red-500'
          } text-white flex items-center gap-2`}>
            {position.type === 'Long' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {position.type}
          </div>
          <div>
            <div className="text-lg font-bold text-white">Inflation Index</div>
            <div className="text-sm text-gray-400">Opened {new Date(position.openedAt).toLocaleDateString()}</div>
          </div>
        </div>

        <div className={`text-right px-4 py-2 rounded-lg ${
          pnl >= 0 ? 'bg-green-500/20 border border-green-500/40' : 'bg-red-500/20 border border-red-500/40'
        }`}>
          <div className="text-xs text-gray-400">Unrealized PnL</div>
          <div className={`text-2xl font-bold ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
          </div>
          <div className={`text-sm ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {formatPercent(pnlPercent)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-400 mb-1">Size</div>
          <div className="text-lg font-bold text-white">${formatCurrency(position.size)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Collateral</div>
          <div className="text-lg font-bold text-white">${formatCurrency(position.collateral)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Leverage</div>
          <div className="text-lg font-bold text-yellow-500">{position.leverage}x</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Entry Price</div>
          <div className="text-lg font-bold text-white">${position.entryPrice.toFixed(2)}</div>
        </div>
      </div>

      <Button
        variant="danger"
        onClick={() => onClose(position.id)}
        disabled={isClosing}
        loading={isClosing}
        className="w-full"
      >
        {isClosing ? 'Closing...' : <><X className="w-4 h-4" />Close Position</>}
      </Button>
    </Card>
  );
}

// ============================================================================
// HOW IT WORKS PAGE
// ============================================================================

function HowItWorksPage({ onNavigate }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-black">
      <SimpleHeader onNavigate={onNavigate} title="How It Works" />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">How Inflation Market Works</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A complete guide to protecting your savings and trading macroeconomic risk
          </p>
        </div>

        {/* What Is Inflation Market */}
        <section className="mb-16">
          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-2 border-yellow-500/40">
            <h2 className="text-3xl font-bold text-white mb-6">What Is Inflation Market?</h2>
            <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
              <p>
                Inflation Market is a <strong className="text-white">perpetual futures protocol</strong> that lets you hedge against—or speculate on—real-world economic data. Unlike traditional crypto perps that track volatile tokens, our perpetuals are anchored to <strong className="text-yellow-500">macroeconomic indices</strong> like inflation (CPI), GDP growth, and national housing prices.
              </p>
              <p>
                <strong className="text-white">The primary use case?</strong> Protecting your savings. If you hold stablecoins or cash, inflation slowly erodes your purchasing power. Inflation Market gives you a tool to hedge that risk—think of it as "insurance" against a weakening economy.
              </p>
              <p>
                But it's not just for hedging. Sophisticated traders can also use the protocol to express directional views on the economy, earn funding yields, or arbitrage between market expectations and oracle data.
              </p>
            </div>
          </Card>
        </section>

        {/* The Core Mechanism */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">The Core Mechanism: Real Yield Tracking</h2>
          
          <Card className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-4">What Our Index Actually Tracks</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Our flagship perpetual doesn't just track raw inflation. Instead, it tracks <strong className="text-yellow-500">Real Yield</strong>—a measure of the economy's true health:
            </p>
            <div className="bg-black/50 rounded-xl p-6 border border-yellow-500/30 mb-4">
              <p className="text-2xl font-bold text-white text-center">
                Real Yield = Treasury Yields − Inflation Rate
              </p>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong className="text-white">• Higher Real Yields = Stronger Economy</strong><br/>
                When Treasury rates rise faster than inflation, the economy is healthy. Your money keeps its value, and interest income is meaningful.
              </p>
              <p>
                <strong className="text-white">• Lower Real Yields = Weaker Economy</strong><br/>
                When inflation outpaces Treasury rates, purchasing power erodes. Savings lose value even as nominal prices rise.
              </p>
            </div>
          </Card>

          <Card className="bg-blue-500/10 border-blue-500/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-500" />
              Understanding the Two Prices
            </h3>
            <div className="space-y-4 text-gray-300">
              <div>
                <p className="text-lg font-bold text-white mb-2">Index Price (Oracle Price)</p>
                <p>This is the <strong className="text-blue-400">true, real-world value</strong> of the economic index, delivered by Chainlink oracles. It updates hourly based on official government data (CPI, Treasury yields, etc.). Think of this as "ground truth."</p>
              </div>
              <div>
                <p className="text-lg font-bold text-white mb-2">Mark Price (Market Price)</p>
                <p>This is the <strong className="text-blue-400">live trading price</strong> determined by supply and demand in the perpetual market. It can deviate from the Index Price based on market sentiment, but funding payments continuously push it back toward the Index Price.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Long vs Short - CORRECTED */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Long vs Short: Which Position Protects You?</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* SHORT Position - PRIMARY HEDGE */}
            <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 border-2 border-red-500/40 rounded-2xl p-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
                  <Shield className="w-10 h-10 text-white" strokeWidth={3} />
                </div>
                <h3 className="text-3xl font-bold text-white">SHORT</h3>
              </div>
              
              <div className="bg-black/50 rounded-xl p-6 mb-6 border border-red-500/30">
                <p className="text-xl text-white font-semibold mb-4 text-center">
                  "I want to protect my savings from inflation"
                </p>
                <p className="text-gray-300 text-center">
                  You profit when the economy weakens (inflation rises faster than yields)
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-bold text-white mb-2">When to Go Short (Hedge Your Savings):</p>
                <div className="space-y-2">
                  {[
                    'You hold stablecoins or cash and want inflation protection',
                    'Inflation is accelerating (CPI rising month-over-month)',
                    'Federal Reserve is behind the curve on rate hikes',
                    'Supply chain disruptions or energy shocks expected',
                    'You believe real yields will compress or go negative'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 bg-black/30 rounded-lg p-3">
                      <Shield className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* LONG Position - SPECULATIVE */}
            <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border-2 border-green-500/40 rounded-2xl p-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-white" strokeWidth={3} />
                </div>
                <h3 className="text-3xl font-bold text-white">LONG</h3>
              </div>
              
              <div className="bg-black/50 rounded-xl p-6 mb-6 border border-green-500/30">
                <p className="text-xl text-white font-semibold mb-4 text-center">
                  "I believe the economy will strengthen"
                </p>
                <p className="text-gray-300 text-center">
                  You profit when real yields improve (rates rise faster than inflation)
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-bold text-white mb-2">When to Go Long (Bet on Recovery):</p>
                <div className="space-y-2">
                  {[
                    'You believe inflation will cool faster than expected',
                    'Federal Reserve is aggressively raising rates',
                    'Economic data shows slowing price growth',
                    'You want to earn funding payments from worried savers',
                    'You believe real yields will expand (economy stabilizing)'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 bg-black/30 rounded-lg p-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Insight Box */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
              Critical Understanding: Why SHORT = Hedge
            </h3>
            <div className="space-y-4 text-lg text-gray-300">
              <p>
                <strong className="text-white">If you're holding $10,000 in USDC today</strong>, and inflation runs at 5% annually while Treasury yields are only 3%, you're losing 2% in real purchasing power every year. That $10,000 will only buy $9,800 worth of goods next year.
              </p>
              <p>
                <strong className="text-yellow-500">By going SHORT on the Real Yield perpetual</strong>, you profit as real yields compress (inflation outpacing rates). The gains from your short position offset the erosion of your stablecoin holdings. You've effectively hedged your savings.
              </p>
              <p>
                Conversely, <strong className="text-white">going LONG</strong> is a bet that the economy will improve—rates will rise faster than inflation, stabilizing or expanding real yields. This is profitable when economic conditions strengthen, but it doesn't protect your savings from inflation in a deteriorating environment.
              </p>
            </div>
          </div>
        </section>

        {/* How Funding Payments Work */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">How Funding Payments Work</h2>
          
          <Card className="mb-6">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Perpetual futures don't expire, so we need a mechanism to keep the <strong className="text-white">Mark Price</strong> (market price) anchored to the <strong className="text-white">Index Price</strong> (oracle price). That mechanism is <strong className="text-yellow-500">funding payments</strong>.
            </p>

            <div className="bg-black/50 rounded-xl p-6 mb-6 border border-yellow-500/30">
              <h3 className="text-xl font-bold text-white mb-4">The Rule:</h3>
              <div className="space-y-3 text-gray-300">
                <p>
                  <strong className="text-green-500">• If Mark Price {'>'} Index Price</strong> (market is "overheated")<br/>
                  → Longs pay Shorts. This incentivizes shorts to enter and longs to exit, pulling the Mark Price back down.
                </p>
                <p>
                  <strong className="text-red-500">• If Mark Price {'<'} Index Price</strong> (market is "undervalued")<br/>
                  → Shorts pay Longs. This incentivizes longs to enter and shorts to exit, pushing the Mark Price back up.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-white">Funding Rate Formula:</strong>
              </p>
              <div className="bg-black/50 rounded-lg p-4 border border-yellow-500/20 font-mono text-sm">
                Funding Rate = (Mark Price − Index Price) / Index Price × Coefficient
              </div>
              <p className="text-sm">
                The coefficient controls how aggressively the funding rate scales. Payments are exchanged continuously between long and short positions.
              </p>
            </div>
          </Card>

          <Card className="bg-blue-500/10 border-blue-500/30">
            <h3 className="text-xl font-bold text-white mb-4">Real-World Example</h3>
            <div className="space-y-3 text-gray-300">
              <p>
                Imagine the <strong className="text-white">Index Price</strong> (real yield) is 100.00, but massive demand for shorts (savers hedging) has pushed the <strong className="text-white">Mark Price</strong> to 102.00.
              </p>
              <p>
                The funding rate turns positive: <strong className="text-yellow-500">Shorts pay Longs +0.5% per day</strong>.
              </p>
              <p>
                This has two effects:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Traders see an opportunity to go long and earn that +0.5% daily yield.</li>
                <li>Some shorts close their positions to stop paying funding.</li>
              </ul>
              <p>
                As a result, the Mark Price drifts back toward 100.00. The system self-corrects.
              </p>
            </div>
          </Card>
        </section>

        {/* Step by Step Guide */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Step-by-Step: Opening Your First Position</h2>
          
          <div className="space-y-6">
            {[
              {
                num: 1,
                title: 'Connect Your Wallet',
                icon: <Wallet className="w-6 h-6" />,
                content: 'Use MetaMask, WalletConnect, or any Web3 wallet. No KYC. No email. Just connect and you\'re ready.'
              },
              {
                num: 2,
                title: 'Deposit Collateral',
                icon: <DollarSign className="w-6 h-6" />,
                content: 'Deposit USDC (or other accepted stablecoins) as margin. This is what backs your position and determines your maximum leverage.'
              },
              {
                num: 3,
                title: 'Choose Your Position',
                icon: <Target className="w-6 h-6" />,
                content: 'Decide: Are you hedging (SHORT to protect savings) or speculating (LONG on recovery)? Select your leverage (1x-20x) and position size.'
              },
              {
                num: 4,
                title: 'Monitor & Manage',
                icon: <BarChart3 className="w-6 h-6" />,
                content: 'Track your unrealized P&L in real-time. Add or remove collateral as needed. Close your position anytime—no expiry, no forced settlement.'
              }
            ].map((step, i) => (
              <div key={i} className="bg-white/5 border border-yellow-500/20 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setActiveStep(activeStep === i ? -1 : i)}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-xl">
                      {step.num}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="text-yellow-500">{step.icon}</div>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      </div>
                    </div>
                  </div>
                  {activeStep === i ? <ChevronUp className="w-6 h-6 text-yellow-500" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
                </button>
                {activeStep === i && (
                  <div className="p-6 pt-0 border-t border-yellow-500/20">
                    <p className="text-gray-300 text-lg">{step.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Risk Considerations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Risk Considerations</h2>
          
          <Card className="border-red-500/30">
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white mb-2">Leverage Amplifies Losses</p>
                  <p>While 20x leverage can magnify gains, it can also wipe out your collateral quickly if the market moves against you. Start small.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white mb-2">Liquidation Risk</p>
                  <p>If your position's losses exceed your maintenance margin, you'll be liquidated. Monitor your margin ratio closely and add collateral if needed.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white mb-2">Funding Costs</p>
                  <p>If you're on the wrong side of the funding rate, you'll pay continuously. Factor this into your holding costs for long-term positions.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white mb-2">Oracle Lag</p>
                  <p>The Index Price updates hourly based on official data, which itself can lag real-world conditions by days or weeks. Market sentiment may front-run oracle updates.</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Protect Your Savings?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Open your first position in minutes. No KYC. No intermediaries.
          </p>
          <Button onClick={() => onNavigate('app')} className="text-lg">
            Launch App <ArrowRight className="w-5 h-5" />
          </Button>
        </section>
      </main>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

// ============================================================================
// WHITEPAPER PAGE
// ============================================================================

function WhitepaperPage({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('abstract');

  const sections = [
    { id: 'abstract', title: '1. Abstract' },
    { id: 'vision', title: '2. Vision & Motivation' },
    { id: 'principles', title: '3. Design Principles' },
    { id: 'market', title: '4. Market Design' },
    { id: 'funding', title: '5. Funding & Pricing' },
    { id: 'collateral', title: '6. Collateral & Liquidation' },
    { id: 'amm', title: '7. AMM & Liquidity' },
    { id: 'governance', title: '8. Governance' },
    { id: 'regulatory', title: '9. Regulatory Positioning' },
    { id: 'markets', title: '10. Example Markets' },
    { id: 'economic', title: '11. Economic Rationale' },
    { id: 'roadmap', title: '12. Implementation' },
    { id: 'conclusion', title: '13. Conclusion' }
  ];

  return (
    <div className="min-h-screen bg-black">
      <SimpleHeader onNavigate={onNavigate} title="Whitepaper" />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white/5 rounded-xl border border-yellow-500/20 p-4">
              <h3 className="text-sm font-bold text-yellow-500 mb-4 uppercase">Contents</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id);
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`block w-full text-left text-sm py-2 px-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-yellow-500 text-black font-bold'
                        : 'text-gray-400 hover:text-yellow-500 hover:bg-white/5'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="mb-12">
              <div className="inline-block mb-4 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
                <span className="text-yellow-500 text-sm font-medium flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Technical Whitepaper
                </span>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                Inflation Market
              </h1>
              <p className="text-2xl text-gray-400">
                A Non-Custodial Protocol for Macro Risk Hedging
              </p>
            </div>

            {/* 1. Abstract */}
            <section id="abstract" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">1</div>
                Abstract
              </h2>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-8">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  This whitepaper presents <strong className="text-white">Inflation Market</strong>, a decentralized, non-custodial protocol designed to enable open participation in markets for macroeconomic risks such as inflation, GDP growth, and national housing prices. Inspired by the Nobel Prize-winning work of <strong className="text-yellow-500">Robert J. Shiller</strong>, the protocol allows individuals, institutions, and DAOs to hedge or gain exposure to real-world economic indicators through <strong className="text-white">perpetual futures</strong> that never expire.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Unlike traditional derivatives platforms, Inflation Market operates as a <strong className="text-white">transparent, autonomous protocol</strong> governed by smart contracts. Its design ensures on-chain settlement, decentralized oracle integration, and permissionless access, while avoiding centralized custody or investment management functions.
                </p>
              </div>
            </section>

            {/* 2. Vision and Motivation */}
            <section id="vision" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">2</div>
                Vision and Motivation
              </h2>
              <div className="bg-white/5 border border-yellow-500/20 rounded-2xl p-8">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Robert Shiller's core insight was that society's <strong className="text-white">largest risks are macroeconomic</strong>—inflation, GDP volatility, or housing market crashes—yet these are precisely the risks individuals cannot insure against. The Inflation Market protocol aims to fulfill that vision by:
                </p>
                <div className="space-y-4">
                  {[
                    'Democratizing access to macro risk-hedging tools',
                    'Allowing decentralized, transparent price discovery on key economic variables',
                    'Creating liquid, rolling markets for hedging systemic risks'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-black/30 rounded-lg p-4">
                      <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      </div>
                      <span className="text-gray-300 text-lg">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-lg text-gray-300 leading-relaxed mt-6">
                  In contrast to prediction markets or short-term financial derivatives, Inflation Market perpetuals are <strong className="text-yellow-500">continuous, perpetual exposure instruments</strong> with fair funding mechanisms that reflect real-world economic data rather than speculative asset prices.
                </p>
              </div>
            </section>

            {/* 3. Design Principles */}
            <section id="principles" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">3</div>
                Design Principles
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: <Lock className="w-6 h-6" />, title: 'Non-Custodial', desc: 'All positions, collateral, and settlements occur on-chain under user control' },
                  { icon: <Shield className="w-6 h-6" />, title: 'Transparency', desc: 'All funding, oracle updates, and index sources are verifiable and auditable' },
                  { icon: <Users className="w-6 h-6" />, title: 'Open Participation', desc: 'Any user or DAO can enter or exit markets without intermediary permission' },
                  { icon: <Target className="w-6 h-6" />, title: 'Oracle Integrity', desc: 'Macroeconomic data sourced from decentralized oracle networks with verifiable provenance' },
                  { icon: <Zap className="w-6 h-6" />, title: 'Perpetual Liquidity', desc: 'Contracts have no expiry; funding rates ensure long-term equilibrium' }
                ].map((principle, i) => (
                  <div key={i} className="bg-white/5 border border-yellow-500/20 rounded-xl p-6">
                    <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-4">
                      {principle.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{principle.title}</h3>
                    <p className="text-gray-400 text-sm">{principle.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Market Design Overview */}
            <section id="market" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">4</div>
                Market Design Overview
              </h2>
              <div className="bg-white/5 border border-yellow-500/20 rounded-2xl p-8 mb-6">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Each Inflation Market perpetual corresponds to a specific <strong className="text-yellow-500">economic index</strong> such as the Consumer Price Index (CPI), GDP growth rate, or national housing index.
                </p>
                
                <h3 className="text-xl font-bold text-white mb-4 mt-8">Core Architecture</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Smart Contracts', desc: 'Manage collateral, funding, liquidation, and settlement autonomously' },
                    { label: 'Oracle Layer', desc: 'Aggregates macroeconomic data from multiple sources' },
                    { label: 'Liquidity Layer', desc: 'AMM or hybrid orderbook for pricing and matching positions' },
                    { label: 'Governance Layer', desc: 'Token-based or DAO-driven risk parameter updates' }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-4">
                      <span className="text-yellow-500 font-bold">{item.label}:</span>
                      <span className="text-gray-300 ml-2">{item.desc}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-white mb-4 mt-8">Index Oracles</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Each oracle publishes verified values of real-world indices, using:
                </p>
                <div className="space-y-2">
                  {[
                    'Official data sources (e.g., Bureau of Labor Statistics, Federal Reserve, S&P CoreLogic)',
                    'Decentralized relayers providing signed attestations',
                    'Time-weighted median aggregation to resist manipulation'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. Funding and Pricing Model */}
            <section id="funding" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">5</div>
                Funding and Pricing Model
              </h2>
              <div className="space-y-6">
                <Card>
                  <h3 className="text-xl font-bold text-white mb-4">Continuous Funding</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                      <span>Funding flows continuously between longs and shorts to maintain price stability</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                      <span>The rate is bounded per epoch to prevent excessive volatility</span>
                    </div>
                  </div>
                </Card>

                <Card>
                  <h3 className="text-xl font-bold text-white mb-4">Log-Level Contracts</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    To ensure long-term scale invariance, the contract trades on <strong className="text-yellow-500">log of index level</strong>, aligning with real-world inflation or growth rates.
                  </p>
                </Card>
              </div>
            </section>

            {/* 6. Collateral and Liquidation Framework */}
            <section id="collateral" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">6</div>
                Collateral and Liquidation
              </h2>
              <div className="bg-white/5 border border-yellow-500/20 rounded-2xl p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { icon: <DollarSign className="w-6 h-6" />, label: 'Collateral', value: 'Stablecoins or tokenized treasuries accepted as margin' },
                    { icon: <TrendingUp className="w-6 h-6" />, label: 'Leverage', value: 'Conservative (1–20x) given market volatility' },
                    { icon: <AlertTriangle className="w-6 h-6" />, label: 'Liquidation', value: 'Triggered when margin ratio falls below maintenance level' },
                    { icon: <Shield className="w-6 h-6" />, label: 'Insurance Fund', value: 'Protocol-owned buffer covers oracle lags or black-swan events' }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-yellow-500">{item.icon}</div>
                        <h3 className="text-lg font-bold text-white">{item.label}</h3>
                      </div>
                      <p className="text-gray-300">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 7. AMM and Liquidity Model */}
            <section id="amm" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">7</div>
                AMM and Liquidity Model
              </h2>
              <Card>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Two potential market-making designs:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { num: '1', title: 'Virtual AMM (vAMM)', desc: 'Similar to Perpetual Protocol; synthetic reserves and funding anchor to oracle fair values' },
                    { num: '2', title: 'Cost-Function AMM', desc: 'Logarithmic or quadratic curve provides continuous liquidity, earning funding and trading fees' }
                  ].map((model) => (
                    <div key={model.num} className="bg-black/30 rounded-lg p-6 border border-yellow-500/10">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold flex-shrink-0">
                          {model.num}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">{model.title}</h3>
                          <p className="text-gray-300">{model.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* 8. Governance and Decentralization */}
            <section id="governance" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">8</div>
                Governance
              </h2>
              <Card>
                <div className="space-y-6">
                  {[
                    { icon: <Users className="w-6 h-6" />, title: 'Protocol DAO', desc: 'Governs parameters such as funding coefficient, leverage limits, and index onboarding' },
                    { icon: <Target className="w-6 h-6" />, title: 'Oracle Governance', desc: 'Decentralized committee verifies data sources and manages oracle relayers' },
                    { icon: <CheckCircle className="w-6 h-6" />, title: 'Transparent Auditing', desc: 'All index definitions, updates, and oracle attestations are on-chain and IPFS-archived' }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500 flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-gray-300">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* 9. Regulatory Positioning */}
            <section id="regulatory" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">9</div>
                Regulatory Positioning
              </h2>
              <Card>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  To remain compliant while enabling open participation:
                </p>
                <div className="space-y-4">
                  {[
                    { icon: <Shield className="w-5 h-5" />, text: 'The protocol operates as software infrastructure, not a broker or investment manager' },
                    { icon: <Lock className="w-5 h-5" />, text: 'No custody: Users retain control of their assets at all times' },
                    { icon: <Users className="w-5 h-5" />, text: 'Open access: Smart contracts are publicly deployed with regional compliance' },
                    { icon: <Shield className="w-5 h-5" />, text: 'Transparency: Funding rates, index sources, and oracle attestations are open and auditable' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 bg-black/30 rounded-lg p-5">
                      <div className="text-yellow-500 flex-shrink-0 mt-0.5">{item.icon}</div>
                      <span className="text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* 10. Example Markets */}
            <section id="markets" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">10</div>
                Example Markets
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <TrendingUp className="w-8 h-8" />,
                    title: 'Inflation',
                    subtitle: 'CPI Index',
                    underlying: 'U.S. CPI-U (monthly, NSA)',
                    useCase: 'Savers hedge inflation exposure; investors speculate on inflation surprises'
                  },
                  {
                    icon: <Target className="w-8 h-8" />,
                    title: 'Housing',
                    subtitle: 'Home Price Index',
                    underlying: 'S&P CoreLogic National Case–Shiller HPI',
                    useCase: 'Homeowners or lenders hedge regional housing market fluctuations'
                  },
                  {
                    icon: <BarChart3 className="w-8 h-8" />,
                    title: 'GDP Growth',
                    subtitle: 'Economic Growth',
                    underlying: 'Real GDP Growth Rate (quarterly)',
                    useCase: 'Firms and DAOs hedge against recessionary risks'
                  }
                ].map((market, i) => (
                  <Card key={i}>
                    <div className="w-16 h-16 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-4">
                      {market.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{market.title}</h3>
                    <p className="text-sm text-yellow-500 mb-4">{market.subtitle}</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Underlying:</p>
                        <p className="text-sm text-white">{market.underlying}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Use Case:</p>
                        <p className="text-sm text-gray-300">{market.useCase}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* 11. Economic Rationale */}
            <section id="economic" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">11</div>
                Economic Rationale
              </h2>
              <Card>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Inflation Market serves as a <strong className="text-yellow-500">macro-financial primitive</strong>, enabling:
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {[
                    { icon: <Shield className="w-6 h-6" />, text: 'Inflation risk hedging for stablecoin holders' },
                    { icon: <Target className="w-6 h-6" />, text: 'Macro diversification for institutional portfolios' },
                    { icon: <BarChart3 className="w-6 h-6" />, text: 'Continuous expectation formation for policymakers' }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-5">
                      <div className="text-yellow-500 mb-3">{item.icon}</div>
                      <p className="text-gray-300 text-sm">{item.text}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-white mb-4">Key Risks</h3>
                <div className="space-y-3">
                  {[
                    'Oracle reliability and data revision risk',
                    'Low liquidity in early stages',
                    'Potential regulatory reinterpretation'
                  ].map((risk, i) => (
                    <div key={i} className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{risk}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* 12. Implementation Roadmap */}
            <section id="roadmap" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">12</div>
                Implementation Roadmap
              </h2>
              <Card>
                <div className="space-y-4">
                  {[
                    { phase: '1', title: 'Research & Simulation', desc: 'Economic modeling, oracle calibration, and historical backtesting', status: 'Complete' },
                    { phase: '2', title: 'Testnet MVP', desc: 'CPI log-perpetual with synthetic oracle data', status: 'In Progress' },
                    { phase: '3', title: 'Oracle Integration', desc: 'Chainlink/UMA-style multi-source oracle system', status: 'Planned' },
                    { phase: '4', title: 'Mainnet Launch', desc: 'Fully non-custodial CPI perpetual market with insurance fund', status: 'Planned' },
                    { phase: '5', title: 'Expansion', desc: 'Add housing and GDP indices; governance decentralization', status: 'Future' }
                  ].map((milestone) => (
                    <div key={milestone.phase} className="bg-black/30 rounded-lg p-6 border border-yellow-500/10">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-xl flex-shrink-0">
                          {milestone.phase}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold text-white">{milestone.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              milestone.status === 'Complete' ? 'bg-green-500/20 text-green-500' :
                              milestone.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-500' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {milestone.status}
                            </span>
                          </div>
                          <p className="text-gray-300">{milestone.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* 13. Conclusion */}
            <section id="conclusion" className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">13</div>
                Conclusion
              </h2>
              <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-2 border-yellow-500/40 rounded-2xl p-8">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  <strong className="text-white">Inflation Market</strong> operationalizes Robert Shiller's vision of a world where individuals and institutions can manage society's largest, most pervasive economic risks. By leveraging blockchain technology and decentralized governance, the protocol creates a transparent, permissionless system for sharing macro risk—without centralized intermediaries or custodial control.
                </p>
                <p className="text-xl text-white leading-relaxed font-semibold">
                  This innovation bridges economic theory and decentralized finance, turning Shiller's dream of <span className="text-yellow-500">social risk management</span> into a practical, global, on-chain reality.
                </p>
              </div>
            </section>

            {/* CTA */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience Inflation Market?</h2>
              <p className="text-xl text-gray-400 mb-8">
                Try the protocol on our testnet deployment
              </p>
              <Button onClick={() => onNavigate('app')}>
                Launch App <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

// ============================================================================
// ROADMAP PAGE
// ============================================================================

function RoadmapPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-black">
      <SimpleHeader onNavigate={onNavigate} title="Roadmap" />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Our Roadmap</h1>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
            Building the foundational risk management layer for the new financial system
          </p>
        </div>

        {/* Vision Statement */}
        <Card className="mb-16 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-2 border-yellow-500/40">
          <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            We will achieve this through a focused, three-phase roadmap that systematically expands our product from a niche tool for innovators into an essential piece of global financial infrastructure.
          </p>
        </Card>

        {/* Phase 1 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl">
              1
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Launch & Liquidity</h2>
              <p className="text-yellow-500 font-semibold">The First 12-18 Months</p>
            </div>
          </div>

          <Card className="mb-6 border-blue-500/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-500" />
              Goal
            </h3>
            <p className="text-gray-300 text-lg">
              Launch the Inflation Market perpetuals protocol and establish it as the undisputed leader for on-chain inflation hedging.
            </p>
          </Card>

          <div className="space-y-4">
            {[
              {
                title: 'Security-First Mainnet Launch',
                items: [
                  'Deploy fully audited protocol on Arbitrum',
                  'Launch simplified "Savings" focused interface',
                  'Implement collateral caps for maximum security'
                ],
                status: 'In Progress'
              },
              {
                title: 'Liquidity Mining Program',
                items: [
                  'Targeted incentives for market makers',
                  'Solve the "chicken and egg" problem',
                  'Ensure counterparty availability for savers'
                ],
                status: 'Planned'
              },
              {
                title: 'INFL Governance Token Launch',
                items: [
                  'Launch INFL token after stable volume achieved',
                  'Distribute to early users and liquidity providers',
                  'Enable community governance via Inflation Market DAO',
                  'Vote on fees, collateral types, and treasury management'
                ],
                status: 'Planned'
              },
              {
                title: 'Professional Trading Interface',
                items: [
                  'Advanced charting and position analytics',
                  'Historical data and detailed stats',
                  'Serve sophisticated traders and speculators'
                ],
                status: 'Planned'
              }
            ].map((milestone, i) => (
              <Card key={i} className="hover:border-blue-500/40 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    Milestone {i + 1}: {milestone.title}
                  </h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    milestone.status === 'Complete' ? 'bg-green-500/20 text-green-500' :
                    milestone.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {milestone.status}
                  </span>
                </div>
                <ul className="space-y-2">
                  {milestone.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Phase 2 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-2xl">
              2
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Expansion & Composability</h2>
              <p className="text-yellow-500 font-semibold">Years 2-3</p>
            </div>
          </div>

          <Card className="mb-6 border-green-500/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-green-500" />
              Goal
            </h3>
            <p className="text-gray-300 text-lg">
              Expand beyond our initial market and solidify Inflation Market as a core "money lego" within the broader DeFi ecosystem.
            </p>
          </Card>

          <div className="space-y-4">
            {[
              {
                title: 'Multi-Market Expansion',
                items: [
                  'Launch National Housing Price Index Perpetuals',
                  'Launch Real GDP Growth Perpetuals',
                  'Transform into a true "macro market" platform'
                ]
              },
              {
                title: 'Cross-Chain Deployment',
                items: [
                  'Deploy on additional L2s and EVM chains',
                  'Meet users where they are',
                  'Tap into new liquidity ecosystems'
                ]
              },
              {
                title: 'Deep DeFi Integration',
                items: [
                  'Make instruments composable with major protocols',
                  'Enable positions as collateral in Aave',
                  'Create structured products combining real-yield hedges',
                  'Build the foundation for DeFi composability'
                ]
              }
            ].map((milestone, i) => (
              <Card key={i} className="hover:border-green-500/40 transition-all">
                <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Milestone {i + 1}: {milestone.title}
                </h4>
                <ul className="space-y-2">
                  {milestone.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Phase 3 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-2xl">
              3
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">The Macro-Hedging Primitive</h2>
              <p className="text-yellow-500 font-semibold">Years 3-5</p>
            </div>
          </div>

          <Card className="mb-6 border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-500" />
              Goal
            </h3>
            <p className="text-gray-300 text-lg">
              Evolve beyond our own platform and become the foundational, B2B risk management layer for the entire on-chain economy.
            </p>
          </Card>

          <div className="space-y-4">
            {[
              {
                title: 'Macro Risk Factory Protocol',
                items: [
                  'Deploy open-source Agreement Factory',
                  'Enable DAOs to mint customized hedging instruments',
                  'Support fixed-term treasury management needs',
                  'Provide B2B infrastructure for institutions'
                ]
              },
              {
                title: 'Institutional On-Ramp',
                items: [
                  'Partner with DAOs and crypto funds',
                  'Help institutions hedge multi-million dollar treasuries',
                  'Enable long-term economic risk management',
                  'Scale to enterprise-level adoption'
                ]
              },
              {
                title: 'Self-Sustaining Ecosystem',
                items: [
                  'Liquid consumer-facing perpetuals market',
                  'Robust institution-facing infrastructure protocol',
                  'Two-sided ecosystem feeding each other',
                  'Fully governed by INFL token holders'
                ]
              }
            ].map((milestone, i) => (
              <Card key={i} className="hover:border-purple-500/40 transition-all">
                <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  Milestone {i + 1}: {milestone.title}
                </h4>
                <ul className="space-y-2">
                  {milestone.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline Visual */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Timeline Overview</h2>
          <div className="bg-white/5 border border-yellow-500/20 rounded-2xl p-8">
            <div className="space-y-6">
              {[
                { phase: 'Phase 1', timeline: 'Months 1-18', color: 'blue', label: 'Launch & Liquidity' },
                { phase: 'Phase 2', timeline: 'Years 2-3', color: 'green', label: 'Expansion & Composability' },
                { phase: 'Phase 3', timeline: 'Years 3-5', color: 'purple', label: 'Macro-Hedging Primitive' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-24 h-24 rounded-lg bg-${item.color}-500/20 border-2 border-${item.color}-500/40 flex items-center justify-center flex-shrink-0`}>
                    <div className="text-center">
                      <div className={`text-${item.color}-500 font-bold text-sm`}>{item.phase}</div>
                      <div className="text-white text-xs mt-1">{item.timeline}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{item.label}</h3>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className={`bg-${item.color}-500 h-2 rounded-full`} style={{width: `${i === 0 ? '30%' : '0%'}`}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-2 border-yellow-500/40 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Join Us on This Journey</h2>
          <p className="text-xl text-gray-400 mb-8">
            Be part of building the future of on-chain risk management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => onNavigate('app')}>
              Launch App <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="ghost" onClick={() => onNavigate('whitepaper')}>
              Read Whitepaper
            </Button>
          </div>
        </section>
      </main>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

// ============================================================================
// ABOUT PAGE
// ============================================================================

function AboutPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-black">
      <SimpleHeader onNavigate={onNavigate} title="About" />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-white mb-8">About Inflation Market</h1>
        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 text-lg">
            To democratize access to inflation hedging tools. Everyone deserves the ability to protect 
            their wealth and profit from macroeconomic trends.
          </p>
        </Card>
        
        <Card>
          <h2 className="text-2xl font-bold text-white mb-4">Technology Stack</h2>
          <div className="space-y-2 text-gray-300">
            <p>• Smart Contracts: Solidity ^0.8.20</p>
            <p>• Frontend: React with Modern UX</p>
            <p>• Blockchain: Arbitrum (L2)</p>
            <p>• Oracles: Chainlink Price Feeds</p>
            <p>• Security: Full audit and testing</p>
          </div>
        </Card>
      </main>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

// ============================================================================
// SHARED COMPONENTS
// ============================================================================

function SimpleHeader({ onNavigate, title }) {
  return (
    <header className="border-b border-yellow-500/20 bg-black/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center">
              <PyramidLogo className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-xl font-bold text-white">Inflation Market</h1>
          </div>
          <Button onClick={() => onNavigate('app')}>Launch App</Button>
        </div>
      </div>
    </header>
  );
}

function SharedFooter({ onNavigate }) {
  return (
    <footer className="border-t border-yellow-500/20 bg-black py-12 px-4 mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
                <PyramidLogo className="w-5 h-5 text-black" />
              </div>
              <span className="font-bold text-white">Inflation Market</span>
            </div>
            <p className="text-sm text-gray-400">{CONFIG.domain}</p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <div className="space-y-2">
              <button onClick={() => onNavigate('how-it-works')} className="block w-full text-left text-sm text-gray-400 hover:text-yellow-500">How It Works</button>
              <button onClick={() => onNavigate('whitepaper')} className="block w-full text-left text-sm text-gray-400 hover:text-yellow-500">Whitepaper</button>
              <button onClick={() => onNavigate('roadmap')} className="block w-full text-left text-sm text-gray-400 hover:text-yellow-500">Roadmap</button>
              <button onClick={() => onNavigate('about')} className="block w-full text-left text-sm text-gray-400 hover:text-yellow-500">About</button>
              <button onClick={() => onNavigate('app')} className="block w-full text-left text-sm text-gray-400 hover:text-yellow-500">Launch App</button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Community</h4>
            <div className="space-y-2">
              <a href={CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-yellow-500 flex items-center gap-2">
                <Twitter className="w-4 h-4" /> Twitter
              </a>
              <a href={CONFIG.social.discord} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-yellow-500 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> Discord
              </a>
              <a href={CONFIG.social.github} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-yellow-500 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> GitHub
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <div className="space-y-2">
              <a href="mailto:security@inflationmarket.com" className="block text-sm text-gray-400 hover:text-yellow-500">Security</a>
              <a href="mailto:support@inflationmarket.com" className="block text-sm text-gray-400 hover:text-yellow-500">Support</a>
            </div>
          </div>
        </div>

        <div className="border-t border-yellow-500/20 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 Inflation Market. All rights reserved.</p>
          <p className="mt-2 text-xs text-yellow-500">⚠️ Testnet Demo - {CONFIG.domain}</p>
        </div>
      </div>
    </footer>
  );
}
