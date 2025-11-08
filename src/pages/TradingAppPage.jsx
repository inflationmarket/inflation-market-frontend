import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, ChevronDown, Wallet, X, AlertTriangle, Activity, ShoppingCart, Stethoscope, Home, Flame, GraduationCap, Globe, TrendingUp, DollarSign } from 'lucide-react';
import { Button, Card, PyramidLogo } from '../components/ui/primitives';
import MarginManagementModal from '../components/positions/MarginManagementModal';
import CloseConfirmModal from '../components/positions/CloseConfirmModal';
import { useToast } from '../components/toast/ToastProvider';
import usePositionManager from '../hooks/usePositionManager';
import { MARKETS } from '../config/constants';
import { useAppState } from '../app';
import { useContracts } from '../hooks/useContracts';
import useMarketData from '../hooks/useMarketData';
import useTokenBalance from '../hooks/useTokenBalance';

const MARKET_ICON_MAP = {
  inflation: Activity,
  'cost-of-living': Globe,
  'essentials-pack': ShoppingCart,
  'healthcare-shield': Stethoscope,
  'rent-housing-shield': Home,
  'fuel-commuter': Flame,
  'education-shield': GraduationCap,
  housing: Home,
  gdp: BarChart3,
};

function TradingHeader({ onSwitchNetwork }) {
  const { account, connect, disconnect, isLoading } = useAppState();
  const { addresses } = useContracts();
  const navigate = useNavigate();
  const bal = useTokenBalance(addresses.usdc, account?.address);

  const handleConnectClick = async () => {
    console.log('🖱️  [TradingHeader] Connect button clicked');
    console.log('🔍 [TradingHeader] account:', account);
    console.log('🔍 [TradingHeader] connect function:', typeof connect);
    console.log('🔍 [TradingHeader] isLoading:', isLoading);
    try {
      await connect();
      console.log('✅ [TradingHeader] connect() completed');
    } catch (error) {
      console.error('❌ [TradingHeader] connect() error:', error);
    }
  };

  return (
    <header className="border-b border-yellow-500/20 sticky top-0 z-40 bg-black backdrop-blur-xl bg-opacity-90">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
                <PyramidLogo className="w-5 h-5 text-black" />
              </div>
              <span className="font-bold text-white hidden sm:inline">Inflation Market</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <Link to="/markets" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Markets</Link>
              <Link to="/portfolio" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Portfolio</Link>
              <Link to="/learn" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Learn</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {account?.isConnected && (
              <>
                <span className="hidden lg:inline-flex items-center px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-300">
                  Chain: {addresses.chainId}
                </span>
                <span className="hidden md:inline-flex items-center px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-300">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {bal ? bal.value.toLocaleString() : '...'}
                </span>
              </>
            )}
            {!account?.isConnected ? (
              <Button onClick={handleConnectClick} loading={isLoading}>
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Connect</span>
              </Button>
            ) : (
              <div className="relative group">
                <Button>
                  {account.address?.slice(0, 6)}...{account.address?.slice(-4)}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
                <div className="absolute right-0 top-full mt-2 w-56 bg-gray-900 border border-yellow-500/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <button onClick={() => navigator.clipboard.writeText(account.address)} className="w-full px-4 py-3 text-left text-sm text-white hover:bg-yellow-500/10 transition-colors">Copy Address</button>
                  <div className="border-t border-yellow-500/20" />
                  <button onClick={onSwitchNetwork} className="w-full px-4 py-3 text-left text-sm text-yellow-500 hover:bg-yellow-500/10 transition-colors">Switch Network</button>
                  <div className="border-t border-yellow-500/20" />
                  <button onClick={() => { disconnect(); navigate('/'); }} className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2">
                    <X className="w-4 h-4" /> Disconnect
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

function MarketSelectorCompact({ markets, selectedMarket, onSelectMarket }) {
  const [isOpen, setIsOpen] = useState(false);
  const currentMarket = markets.find(m => m.id === selectedMarket) || markets[0];
  const Icon = MARKET_ICON_MAP[currentMarket.id] || Activity;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-500/30 rounded-xl transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-left">
            <div className="text-white font-semibold text-sm">{currentMarket.name}</div>
            <div className="text-xs text-gray-400 truncate max-w-[200px]">{currentMarket.description}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-white font-bold">${currentMarket.price.toFixed(2)}</div>
            <div className={`text-xs font-semibold ${currentMarket.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {currentMarket.change24h >= 0 ? '+' : ''}{currentMarket.change24h.toFixed(2)}%
            </div>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 max-h-[60vh] overflow-y-auto bg-gray-900 border border-yellow-500/20 rounded-xl shadow-2xl z-50">
            <div className="p-2 space-y-1">
              {markets.map((market) => {
                const MarketIcon = MARKET_ICON_MAP[market.id] || Activity;
                const isActive = selectedMarket === market.id;
                return (
                  <button
                    key={market.id}
                    onClick={() => {
                      onSelectMarket(market.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-yellow-500/10 border border-yellow-500/30'
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center flex-shrink-0">
                        <MarketIcon className="w-4 h-4 text-yellow-500" />
                      </div>
                      <div className="text-left">
                        <div className="text-white font-medium text-sm">{market.name}</div>
                        <div className="text-xs text-gray-400">{market.description.slice(0, 40)}...</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold text-sm">${market.price.toFixed(2)}</div>
                      <div className={`text-xs font-semibold ${market.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {market.change24h >= 0 ? '+' : ''}{market.change24h.toFixed(2)}%
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="p-3 border-t border-white/10">
              <Link
                to="/markets"
                onClick={() => setIsOpen(false)}
                className="block text-center text-xs text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                View all markets →
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function TradingTicket({ market, disabled, mismatch }) {
  const [isLong, setIsLong] = useState(true);
  const [collateral, setCollateral] = useState('');
  const [leverage, setLeverage] = useState(5);
  const slippageBps = 50; // Default slippage
  const { account, positions, setPositions } = useAppState();
  const { addToast } = useToast();
  const positionManager = usePositionManager();
  const { addresses } = useContracts();
  const tokenBal = useTokenBalance(addresses.usdc, account?.address);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const live = useMarketData();

  const positionSize = collateral ? parseFloat(collateral) * leverage : 0;
  const entryPrice = (live && live.markPriceNum != null) ? live.markPriceNum : market.price;
  const liquidationPrice = isLong ? entryPrice * (1 - 1 / leverage) * 0.95 : entryPrice * (1 + 1 / leverage) * 1.05;
  const fee = positionSize * 0.001;

  const disabledReason = !account?.isConnected
    ? 'Connect wallet'
    : mismatch
    ? 'Wrong network'
    : !collateral || parseFloat(collateral) <= 0
    ? 'Enter amount'
    : null;

  const handleSubmit = async () => {
    if (disabledReason) return;
    try {
      setIsSubmitting(true);
      const res = await positionManager.openPosition({
        isLong,
        collateralAmount: parseFloat(collateral),
        leverageX: leverage,
        slippageBps
      });
      const newPosition = {
        id: Math.random().toString(36).slice(2),
        onchainId: res?.positionId || null,
        market: market.id,
        isLong,
        size: positionSize,
        collateral: parseFloat(collateral),
        leverage,
        entryPrice,
        liquidationPrice,
        openedAt: Date.now(),
      };
      setPositions([...(positions || []), newPosition]);
      addToast(`${isLong ? 'Long' : 'Short'} position opened successfully!`, 'success');
      setCollateral('');
    } catch (error) {
      const msg = error?.message || 'Failed to open position';
      addToast(msg.includes('user rejected') ? 'Transaction cancelled' : 'Failed to open position', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={disabled ? 'pointer-events-none opacity-50' : ''}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Trade {market.name}</h2>
        <p className="text-sm text-gray-400">{market.description}</p>
      </div>

      {/* Live market data */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-yellow-500/5 to-yellow-500/0 border border-yellow-500/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-400 mb-1">Mark Price</div>
            <div className="text-lg font-bold text-white">
              {live.loading ? '...' : live.markPriceNum != null ? `$${live.markPriceNum.toLocaleString()}` : `$${market.price.toFixed(2)}`}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">24h Change</div>
            <div className={`text-lg font-bold ${market.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {market.change24h >= 0 ? '+' : ''}{market.change24h.toFixed(2)}%
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Funding APR</div>
            <div className="text-lg font-bold text-white">
              {market.fundingRateAPR.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      {/* Long/Short selector */}
      <div className="mb-6">
        <label className="text-sm text-gray-400 mb-3 block">Direction</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setIsLong(true)}
            className={`relative px-6 py-4 rounded-xl font-semibold text-sm transition-all ${
              isLong
                ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/20'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            <TrendingUp className="w-5 h-5 mx-auto mb-1" />
            Long (Buy)
          </button>
          <button
            type="button"
            onClick={() => setIsLong(false)}
            className={`relative px-6 py-4 rounded-xl font-semibold text-sm transition-all ${
              !isLong
                ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/20'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            <TrendingUp className="w-5 h-5 mx-auto mb-1 rotate-180" />
            Short (Sell)
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {/* Amount */}
        <div>
          <label className="text-sm text-gray-400 mb-2 flex items-center justify-between">
            <span>Amount (USDC)</span>
            {account?.isConnected && tokenBal && (
              <button
                onClick={() => setCollateral(String(tokenBal.value))}
                className="text-xs text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                Max: {tokenBal.value.toLocaleString()}
              </button>
            )}
          </label>
          <input
            type="number"
            value={collateral}
            onChange={(e) => setCollateral(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 focus:bg-white/10 transition-all"
          />
        </div>

        {/* Leverage */}
        <div>
          <label className="text-sm text-gray-400 mb-2 flex items-center justify-between">
            <span>Leverage</span>
            <span className="text-white font-semibold">{leverage}x</span>
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={leverage}
            onChange={(e) => setLeverage(Number(e.target.value))}
            className="w-full accent-yellow-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1x</span>
            <span>5x</span>
            <span>10x</span>
            <span>20x</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Position Size</span>
            <span className="text-white font-semibold">${positionSize.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Entry Price</span>
            <span className="text-white">${entryPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Liq. Price</span>
            <span className="text-red-400">${liquidationPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Est. Fee</span>
            <span className="text-white">${fee.toFixed(2)}</span>
          </div>
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={!!disabledReason || isSubmitting}
          loading={isSubmitting}
          className={`w-full py-4 text-lg font-bold ${
            isLong
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
              : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
          }`}
        >
          {disabledReason || (isLong ? 'Open Long Position' : 'Open Short Position')}
        </Button>
      </div>
    </Card>
  );
}

function PositionCard({ p, mark, onManage, onClose }) {
  const pnl = p.isLong ? (mark - p.entryPrice) * (p.size / p.entryPrice) : (p.entryPrice - mark) * (p.size / p.entryPrice);
  const bufferPct = p.liquidationPrice && mark ? (p.isLong ? ((mark - p.liquidationPrice) / mark) * 100 : ((p.liquidationPrice - mark) / mark) * 100) : null;

  return (
    <Card className="hover:border-yellow-500/30 transition-all">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.isLong ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {p.isLong ? 'LONG' : 'SHORT'}
            </span>
            <span className="text-white font-semibold">{MARKETS.find(m => m.id === p.market)?.name || p.market}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <div className="text-gray-400 text-xs">PnL</div>
              <div className={`font-bold ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">Size</div>
              <div className="text-white font-semibold">${(p.size || 0).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">Leverage</div>
              <div className="text-white font-semibold">{(p.leverage || 0).toFixed(1)}x</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">Buffer</div>
              <div className="text-white font-semibold">{bufferPct != null ? bufferPct.toFixed(1) + '%' : '-'}</div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onManage}
          >
            Manage
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </Card>
  );
}

function PositionsList() {
  const { account, positions, setPositions } = useAppState();
  const { addToast } = useToast();
  const positionManager = usePositionManager();
  const { addresses } = useContracts();
  const bal = useTokenBalance(addresses.usdc, account?.address);
  const data = useMarketData();
  const [selected, setSelected] = useState(null);
  const [showMargin, setShowMargin] = useState(false);
  const [showClose, setShowClose] = useState(false);

  if (!account?.isConnected) {
    return (
      <Card className="p-12 text-center">
        <Wallet className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Connect Wallet</h3>
        <p className="text-gray-400">Connect to view your positions</p>
      </Card>
    );
  }

  if (!positions || positions.length === 0) {
    return (
      <Card className="p-12 text-center">
        <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No Active Positions</h3>
        <p className="text-gray-400">Open your first position using the trade ticket</p>
      </Card>
    );
  }

  const totalCollateral = positions.reduce((sum, p) => sum + (p.collateral || 0), 0);
  const totalSize = positions.reduce((sum, p) => sum + (p.size || 0), 0);
  const mark = (data && data.markPriceNum != null) ? data.markPriceNum : 100;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-sm text-gray-400 mb-1">Active Positions</div>
          <div className="text-2xl font-bold text-white">{positions.length}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-400 mb-1">Total Collateral</div>
          <div className="text-2xl font-bold text-white">${totalCollateral.toLocaleString()}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-400 mb-1">Total Size</div>
          <div className="text-2xl font-bold text-yellow-500">${totalSize.toLocaleString()}</div>
        </Card>
      </div>

      {/* Positions */}
      <div className="space-y-4">
        {positions.map((p, idx) => (
          <PositionCard
            key={p.id || idx}
            p={p}
            mark={mark}
            onManage={() => { setSelected(p); setShowMargin(true); }}
            onClose={() => { setSelected(p); setShowClose(true); }}
          />
        ))}
      </div>

      {/* Modals */}
      <MarginManagementModal
        isOpen={showMargin && !!selected}
        onClose={() => { setShowMargin(false); setSelected(null); }}
        position={selected ? {
          id: selected.id || '',
          direction: selected.isLong ? 'long' : 'short',
          collateral: selected.collateral || 0,
          leverage: selected.leverage || 0,
          liquidationPrice: selected.liquidationPrice || 0,
          healthRatio: 1.5,
        } : null}
        maxAddAmount={bal?.value || 0}
        maxRemoveAmount={(selected?.collateral || 0) * 0.9}
        onAddMargin={async (amount) => {
          try {
            await positionManager.addMargin({ positionId: selected?.onchainId, amount });
            addToast('Margin added successfully', 'success');
            setShowMargin(false);
          } catch (err) {
            addToast('Failed to add margin', 'error');
          }
        }}
        onRemoveMargin={async (amount) => {
          try {
            await positionManager.removeMargin({ positionId: selected?.onchainId, amount });
            addToast('Margin removed successfully', 'success');
            setShowMargin(false);
          } catch (err) {
            addToast('Failed to remove margin', 'error');
          }
        }}
      />
      <CloseConfirmModal
        isOpen={showClose && !!selected}
        onClose={() => { setShowClose(false); setSelected(null); }}
        position={selected}
        onConfirm={async () => {
          try {
            await positionManager.closePosition({ positionId: selected?.onchainId });
            setPositions(positions.filter(p => p.id !== selected?.id));
            addToast('Position closed successfully', 'success');
            setShowClose(false);
          } catch (err) {
            addToast('Failed to close position', 'error');
          }
        }}
      />
    </div>
  );
}

export default function TradingAppPage() {
  const { selectedMarket, setSelectedMarket } = useAppState();
  const currentMarket = MARKETS.find(m => m.id === selectedMarket) || MARKETS[0];
  const { addresses } = useContracts();
  const [walletChainId, setWalletChainId] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({ method: 'eth_chainId' })
        .then((id) => setWalletChainId(parseInt(id, 16)))
        .catch(() => {});
      const handler = (id) => setWalletChainId(parseInt(id, 16));
      window.ethereum.on('chainChanged', handler);
      return () => window.ethereum.removeListener('chainChanged', handler);
    }
  }, []);

  const mismatch = walletChainId != null && addresses.chainId && walletChainId !== addresses.chainId;

  const switchNetwork = async () => {
    if (!window.ethereum) {
      addToast('No wallet detected. Please install MetaMask.', 'error');
      return;
    }
    const chainNum = Number(addresses.chainId || 0);
    const hexChainId = '0x' + chainNum.toString(16);
    const defaults = (id) => {
      if (id === 421614) {
        return {
          chainName: 'Arbitrum Sepolia',
          rpcUrls: [addresses.rpcUrl || 'https://sepolia-rollup.arbitrum.io/rpc'],
          blockExplorerUrls: ['https://sepolia.arbiscan.io'],
          nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        };
      }
      return {
        chainName: `Custom Chain ${addresses.chainId}`,
        rpcUrls: addresses.rpcUrl ? [addresses.rpcUrl] : [],
        blockExplorerUrls: [],
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      };
    };
    try {
      await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: hexChainId }] });
      addToast('Network switched', 'success');
    } catch (e) {
      if (e && (e.code === 4902 || String(e.message || '').toLowerCase().includes('unrecognized chain'))) {
        const params = { chainId: hexChainId, ...defaults(chainNum) };
        if (!params.rpcUrls || params.rpcUrls.length === 0) {
          addToast('RPC URL missing. Set REACT_APP_RPC_URL.', 'error');
          return;
        }
        try {
          await window.ethereum.request({ method: 'wallet_addEthereumChain', params: [params] });
          addToast('Network added and switched', 'success');
        } catch (addErr) {
          if (addErr?.code === 4001) addToast('User rejected network add', 'error');
          else addToast('Failed to add network', 'error');
        }
      } else if (e?.code === 4001) {
        addToast('User rejected network switch', 'error');
      } else {
        addToast('Failed to switch network', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black">
      <TradingHeader onSwitchNetwork={switchNetwork} />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Network mismatch warning */}
        {mismatch && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
              <div>
                <div className="text-white font-bold">Wrong Network</div>
                <div className="text-sm text-gray-300">Please switch to the configured network to trade.</div>
              </div>
            </div>
            <Button onClick={switchNetwork} variant="danger">Switch Network</Button>
          </div>
        )}

        {/* Available Markets Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Available Markets</h2>
            <Link to="/markets" className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MARKETS.map((market) => {
              const Icon = MARKET_ICON_MAP[market.id] || Activity;
              const isActive = selectedMarket === market.id;
              return (
                <button
                  key={market.id}
                  onClick={() => setSelectedMarket(market.id)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    isActive
                      ? 'border-yellow-500/60 bg-yellow-500/10 shadow-lg'
                      : 'border-white/10 bg-white/5 hover:border-yellow-500/30 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-yellow-500" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{market.name}</div>
                        <div className="text-xs text-gray-400 line-clamp-1">{market.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold text-sm">${market.price.toFixed(2)}</div>
                      <div className={`text-xs font-semibold ${market.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {market.change24h >= 0 ? '+' : ''}{market.change24h.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{market.releaseCadence}</span>
                    <span>APR: {market.fundingRateAPR.toFixed(1)}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Trading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trading Ticket - Left Column (takes 1/3 on large screens) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <TradingTicket market={currentMarket} disabled={mismatch} mismatch={mismatch} />
            </div>
          </div>

          {/* Positions & Info - Right Column (takes 2/3 on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            <PositionsList />
          </div>
        </div>
      </main>
    </div>
  );
}
