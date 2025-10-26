import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, CheckCircle, ChevronDown, Wallet, X } from 'lucide-react';
import { Button, Card } from '../components/ui/primitives';
import { useToast } from '../components/toast/ToastProvider';
import usePositionManager from '../hooks/usePositionManager';
import { MARKETS } from '../config/constants';
import { useAppState } from '../app';

function TradingHeader({ onNavigate }) {
  const { account, connect, disconnect, isLoading } = useAppState();

  return (
    <header className="border-b border-yellow-500/20 sticky top-0 z-40 bg-black/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="font-bold text-white">Inflation Market</Link>
          </div>
          <div className="flex items-center gap-2">
            {!account.isConnected ? (
              <Button onClick={connect} loading={isLoading}>
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            ) : (
              <div className="relative group">
                <Button>
                  {account.address?.slice(0, 6)}...{account.address?.slice(-4)}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-yellow-500/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <button
                    onClick={() => navigator.clipboard.writeText(account.address)}
                    className="w-full px-4 py-3 text-left text-sm text-white hover:bg-yellow-500/10 transition-colors flex items-center gap-2"
                  >
                    Copy Address
                  </button>
                  <div className="border-t border-yellow-500/20" />
                  <button onClick={disconnect} className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2">
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
                  {`${market.change24h >= 0 ? '+' : ''}${market.change24h.toFixed(2)}%`}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400">Funding APR</div>
                <div className={`text-sm font-bold ${market.fundingRateAPR >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {`${market.fundingRateAPR >= 0 ? '+' : ''}${market.fundingRateAPR.toFixed(1)}%`}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TradingInterface({ market }) {
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
  const positionManager = usePositionManager();
  const [isLong, setIsLong] = useState(true);
  const [collateral, setCollateral] = useState('');
  const [leverage, setLeverage] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const positionSize = collateral ? parseFloat(collateral) * leverage : 0;

  const handleSubmit = async () => {
    console.log('Open position flow started');
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
    try {
      const receipt = await positionManager.openPosition({
        isLong,
        collateralAmount: parseFloat(collateral),
        leverageX: leverage,
        slippageBps: 50,
      });

      const newPosition = {
        id: receipt.transactionHash,
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
      setCollateral('');
    } catch (error) {
      const msg = error?.message || 'Failed to open position';
      addToast(msg.includes('user rejected') ? 'Transaction cancelled' : 'Failed to open position', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Trade {market.name}</h2>
        <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-xs font-bold text-yellow-500">
          PROTOTYPE
        </span>
      </div>

      <div className="flex gap-2 mb-6">
        <Button variant={isLong ? 'success' : 'ghost'} onClick={() => setIsLong(true)}>
          Long
        </Button>
        <Button variant={!isLong ? 'danger' : 'ghost'} onClick={() => setIsLong(false)}>
          Short
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Collateral (USDC)</label>
          <input
            type="number"
            value={collateral}
            onChange={(e) => setCollateral(e.target.value)}
            placeholder="0.00"
            className="w-full bg-black border border-yellow-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
          />
          <div className="text-xs text-gray-400 mt-1">Balance: ${account.balance?.toFixed?.(2) || account.balance}</div>
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-2 block">Leverage (1-20x)</label>
          <input
            type="range"
            min="1"
            max="20"
            value={leverage}
            onChange={(e) => setLeverage(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1x</span>
            <span>20x</span>
          </div>
        </div>
      </div>

      <Button variant={isLong ? 'success' : 'danger'} className="w-full" onClick={handleSubmit} disabled={!account.isConnected || isSubmitting} loading={isSubmitting}>
        {isSubmitting ? 'Opening Position...' : `Open ${isLong ? 'Long' : 'Short'}`}
      </Button>
    </Card>
  );
}

function OrderSummary({ market }) {
  const collateral = '1000';
  const leverage = 5;
  const isLong = true;

  const positionSize = parseFloat(collateral || 0) * leverage;
  const tradingFee = positionSize * 0.001;
  const liquidationPrice = isLong ? market.price * (1 - (1 / leverage) * 0.97) : market.price * (1 + (1 / leverage) * 0.97);

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Order Summary</h2>
        <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-full text-xs font-bold text-blue-400">SAMPLE CALC</span>
      </div>
      <div className="space-y-4">
        {[
          { label: 'Entry Price', value: `$${market.price.toFixed(2)}`, color: 'white' },
          { label: 'Position Size', value: `$${positionSize.toLocaleString()}` , color: 'yellow' },
          { label: 'Trading Fee (0.1%)', value: `$${tradingFee.toLocaleString()}`, color: 'white' },
          { label: 'Liquidation Price', value: `$${liquidationPrice.toFixed(2)}`, color: 'red' },
        ].map((item, i) => (
          <div key={i} className="flex justify-between py-3 border-b border-yellow-500/10">
            <span className="text-gray-400">{item.label}</span>
            <span className={`font-bold ${item.color === 'yellow' ? 'text-yellow-500' : item.color === 'red' ? 'text-red-500' : 'text-white'}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function PositionsInterface() {
  const { account, positions } = useAppState();
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
          <div className="text-2xl font-bold text-white">${totalCollateral.toLocaleString()}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-400 mb-1">Total Size</div>
          <div className="text-2xl font-bold text-yellow-500">${totalSize.toLocaleString()}</div>
        </Card>
      </div>
    </div>
  );
}

export default function TradingAppPage({ onNavigate }) {
  const { selectedMarket, setSelectedMarket } = useAppState();
  const [activeTab, setActiveTab] = useState('trade');
  const currentMarket = MARKETS.find(m => m.id === selectedMarket) || MARKETS[0];

  return (
    <div className="min-h-screen bg-black">
      <TradingHeader onNavigate={onNavigate} />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <MarketSelector markets={MARKETS} selectedMarket={selectedMarket} onSelectMarket={setSelectedMarket} />
        <div className="flex gap-2 mb-6 mt-6">
          <Button variant={activeTab === 'trade' ? 'primary' : 'ghost'} onClick={() => setActiveTab('trade')}>Trade</Button>
          <Button variant={activeTab === 'positions' ? 'primary' : 'ghost'} onClick={() => setActiveTab('positions')}>Positions</Button>
        </div>
        {activeTab === 'trade' && <TradingInterface market={currentMarket} />}
        {activeTab === 'positions' && <PositionsInterface />}
      </main>
    </div>
  );
}
