import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, ChevronDown, Wallet, X, AlertTriangle, Activity, HelpCircle, ShoppingCart, Stethoscope, Home, Flame, GraduationCap, Globe } from 'lucide-react';
import { Button, Card, PyramidLogo } from '../components/ui/primitives';
import MarginManagementModal from '../components/positions/MarginManagementModal';
import CloseConfirmModal from '../components/positions/CloseConfirmModal';
import { useToast } from '../components/toast/ToastProvider';
import usePositionManager from '../hooks/usePositionManager';
import { MARKETS } from '../config/constants';
import { useAppState } from '../app';
import { useContracts } from '../hooks/useContracts';
import { useProvider } from '../hooks/useProvider';
import useMarketData from '../hooks/useMarketData';
import useTokenBalance from '../hooks/useTokenBalance';
import { useMarketHistory } from '../contexts/MarketHistoryContext';
import Sparkline from '../components/charts/Sparkline';

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

  return (
    <header className="border-b border-yellow-500/20 sticky top-0 z-40 bg-black/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
              <PyramidLogo className="w-5 h-5 text-black" />
            </div>
            <Link to="/" className="font-bold text-white">Inflation Market</Link>
          </div>
          <div className="flex items-center gap-3">
            {account?.isConnected && (
              <>
                <span className="hidden md:inline-flex items-center px-2 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300">Chain: {addresses.chainId}</span>
                <span className="hidden md:inline-flex items-center px-2 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300">USDC: {bal ? bal.value.toLocaleString() : '...'}</span>
              </>
            )}
            {!account?.isConnected ? (
              <Button onClick={connect} loading={isLoading}><Wallet className="w-4 h-4" /> Connect</Button>
            ) : (
              <div className="relative group">
                <Button>{account.address?.slice(0, 6)}...{account.address?.slice(-4)}<ChevronDown className="w-4 h-4 ml-2" /></Button>
                <div className="absolute right-0 top-full mt-2 w-56 bg-gray-900 border border-yellow-500/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <button onClick={() => navigator.clipboard.writeText(account.address)} className="w-full px-4 py-3 text-left text-sm text-white hover:bg-yellow-500/10 transition-colors flex items-center gap-2">Copy Address</button>
                  <div className="border-t border-yellow-500/20" />
                  <button onClick={onSwitchNetwork} className="w-full px-4 py-3 text-left text-sm text-yellow-500 hover:bg-yellow-500/10 transition-colors flex items-center gap-2">Switch Network</button>
                  <div className="border-t border-yellow-500/20" />
                  <button onClick={() => { disconnect(); navigate('/'); }} className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"><X className="w-4 h-4" /> Disconnect</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function StatusBar() {
  const { addresses } = useContracts();
  const { getReadProvider, chainId } = useProvider();
  const [net, setNet] = useState(null);
  useEffect(() => {
    try {
      const p = getReadProvider();
      p.getNetwork().then(n => setNet(n)).catch(() => {});
    } catch (_) {}
  }, [getReadProvider]);
  const missing = useMemo(() => {
    const req = ['rpcUrl', 'vault', 'positionManager', 'vamm', 'indexOracle'];
    return req.filter(k => !addresses[k]);
  }, [addresses]);
  return (
    <div className="mb-4 grid gap-3 md:grid-cols-3">
      <Card>
        <div className="text-xs text-gray-400">Network</div>
        <div className="text-sm text-white">Env chainId: {chainId}{net ? (' Provider: ' + net.chainId) : ''}</div>
      </Card>
      <Card>
        <div className="text-xs text-gray-400">RPC</div>
        <div className="text-sm text-white truncate">{addresses.rpcUrl || '-'}</div>
      </Card>
      <Card>
        <div className="text-xs text-gray-400">Contracts</div>
        {missing.length === 0 ? (
          <div className="text-sm text-green-400">All set</div>
        ) : (
          <div className="text-sm text-yellow-500 flex items-center gap-2"><AlertTriangle className="w-4 h-4" />Missing: {missing.join(', ')}</div>
        )}
      </Card>
    </div>
  );
}

function MarketListItem({ market, isActive, onSelect }) {
  const { series } = useMarketHistory(market.id);
  const Icon = MARKET_ICON_MAP[market.id] || Activity;
  const chartData = (series && series.length ? series : market.series) || [];
  const volume = Number.isFinite(market.volume24h) ? market.volume24h : 0;
  const oi = Number.isFinite(market.openInterest) ? market.openInterest : 0;
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={() => onSelect(market.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(market.id);
        }
      }}
      className="group outline-none"
    >
      <Card
        className={`cursor-pointer w-full border transition-all ${
          isActive
            ? 'border-yellow-500/60 bg-yellow-500/10 shadow-[0_0_0_1px_rgba(234,179,8,0.25)]'
            : 'border-white/10 bg-white/5 hover:border-yellow-500/40 group-focus-visible:border-yellow-500/60 group-focus-visible:shadow-[0_0_0_1px_rgba(234,179,8,0.25)]'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
              <Icon className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <div className="text-white font-semibold text-base">{market.name}</div>
              <div className="text-[13px] text-gray-400">{market.description}</div>
              {market.bestFor && (
                <div className="text-[11px] text-gray-500 mt-1">Best for: {market.bestFor}</div>
              )}
              <div className="mt-2 flex flex-wrap gap-2 text-[10px] uppercase tracking-wide text-gray-500">
                {(market.tags || []).slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white font-bold text-lg">${market.price.toFixed(2)}</div>
            <div className={`text-xs font-bold ${market.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {(market.change24h >= 0 ? '+' : '') + market.change24h.toFixed(2)}%
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <Sparkline data={chartData} width={160} height={40} />
          <div className="text-xs text-gray-400 text-right">
            <div>Vol 24h: <span className="text-white font-semibold">${volume.toLocaleString()}</span></div>
            <div>Open Interest: <span className="text-white font-semibold">${oi.toLocaleString()}</span></div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function MarketSelector({ markets, selectedMarket, onSelectMarket }) {
  if (!Array.isArray(markets) || markets.length === 0) return null;
  return (
    <aside className="mb-6 space-y-4 lg:space-y-5 lg:sticky lg:top-32 lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto pr-1">
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="text-xs text-gray-400 uppercase font-semibold">Markets</div>
          <div className="text-[11px] text-gray-500">Tap any market card to load detailed analysis.</div>
        </div>
        <Link to="/markets" className="text-xs text-yellow-500 underline underline-offset-2 whitespace-nowrap">Markets hub</Link>
      </div>
      <div className="space-y-4">
        {markets.map((market) => (
          <MarketListItem
            key={market.id}
            market={market}
            isActive={selectedMarket === market.id}
            onSelect={onSelectMarket}
          />
        ))}
      </div>
    </aside>
  );
}

function Chip({ label, value }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border text-yellow-400 border-yellow-400/30 bg-yellow-400/10">
      <span className="text-gray-300">{label}:</span>
      <span className="font-semibold">{value}</span>
    </span>
  );
}

function SkeletonChip({ width = 40 }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5">
      <span className="skeleton" style={{ width, height: 10 }} />
    </span>
  );
}

function TradingInterface({ market, disabled, mismatch }) {
  const [isLong, setIsLong] = useState(true);
  const [collateral, setCollateral] = useState('');
  const [leverage, setLeverage] = useState(5);
  const [slippageBps, setSlippageBps] = useState(50);
  const live = useMarketData();
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${disabled ? 'pointer-events-none opacity-50' : ''}`}>
      <TradingForm
        market={market}
        isLong={isLong}
        setIsLong={setIsLong}
        collateral={collateral}
        setCollateral={setCollateral}
        leverage={leverage}
        setLeverage={setLeverage}
        slippageBps={slippageBps}
        setSlippageBps={setSlippageBps}
        mismatch={mismatch}
      >
        <div className="mb-3 flex flex-wrap gap-2">
          {live.loading ? (
            <>
              <SkeletonChip width={60} />
              <SkeletonChip width={60} />
              <SkeletonChip width={60} />
            </>
          ) : (
            <>
              <Chip label="Mark" value={live.markPriceNum != null ? `$${live.markPriceNum.toLocaleString()}` : '—'} />
              <Chip label="Index" value={live.indexPriceNum != null ? `$${live.indexPriceNum.toLocaleString()}` : '—'} />
              <Chip label="Funding" value={live.fundingRateNum != null ? live.fundingRateNum.toLocaleString() : '—'} />
            </>
          )}
        </div>
      </TradingForm>
      <OrderSummary market={market} isLong={isLong} collateral={collateral} leverage={leverage} />
    </div>
  );
}

function TradingForm({ market, isLong, setIsLong, collateral, setCollateral, leverage, setLeverage, slippageBps, setSlippageBps, mismatch, children }) {
  const { account, positions, setPositions } = useAppState();
  const { addToast } = useToast();
  const positionManager = usePositionManager();
  const { addresses } = useContracts();
  const tokenBal = useTokenBalance(addresses.usdc, account?.address);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showHow, setShowHow] = useState(false);
  const [budget, setBudget] = useState('100');
  const [coveragePct, setCoveragePct] = useState(10);
  const [assumedDelta, setAssumedDelta] = useState(5);
  const live = useMarketData();

  const positionSize = collateral ? parseFloat(collateral) * leverage : 0;

  const disabledReason = !account?.isConnected
    ? 'Connect wallet'
    : mismatch
    ? 'Wrong network'
    : !collateral || parseFloat(collateral) <= 0
    ? 'Enter collateral'
    : null;

  const handleSubmit = async () => {
    if (disabledReason) return;
    try {
      setIsSubmitting(true);
      const res = await positionManager.openPosition({ isLong, collateralAmount: parseFloat(collateral), leverageX: leverage, slippageBps });
      const entryPrice = (live && live.markPriceNum != null) ? live.markPriceNum : market.price;
      const newPosition = {
        id: Math.random().toString(36).slice(2),
        onchainId: res?.positionId || null,
        market: market.id,
        isLong,
        size: positionSize,
        collateral: parseFloat(collateral),
        leverage,
        entryPrice,
        liquidationPrice: isLong ? entryPrice * 0.95 : entryPrice * 1.05,
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
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Trade {market.name}</h2>
        <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-xs font-bold text-yellow-500">PROTOTYPE</span>
      </div>
      {/* Market strip */}
      <div className="mb-4 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-2">
        <div className="text-sm text-gray-300">{market.description}</div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-white font-semibold">${market.price.toFixed(2)}</div>
          <div className={`text-xs font-semibold ${market.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {market.change24h >= 0 ? '+' : ''}{market.change24h.toFixed(2)}%
          </div>
        </div>
      </div>
      {/* Long/Short selector */}
      <div className="mb-6">
        <div className="inline-flex rounded-xl overflow-hidden border border-white/10">
          <button
            type="button"
            onClick={() => setIsLong(true)}
            className={`px-6 py-2 text-sm font-semibold ${isLong ? 'bg-green-500 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
          >
            Long
          </button>
          <button
            type="button"
            onClick={() => setIsLong(false)}
            className={`px-6 py-2 text-sm font-semibold ${!isLong ? 'bg-red-500 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
          >
            Short
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 mb-2 flex items-center gap-1">Amount (USDC)
            <HelpCircle className="w-3.5 h-3.5 text-gray-500" title="Amount you put down as collateral for this position." />
          </label>
          <div className="flex items-center gap-2">
            <input type="number" step="any" inputMode="decimal" value={collateral} onChange={(e) => setCollateral(e.target.value)} placeholder="0.00" className="flex-1 bg-black border border-yellow-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500" />
            <Button variant="ghost" onClick={() => tokenBal && setCollateral((tokenBal.value || 0).toFixed(2))}>Max</Button>
          </div>
          <div className="flex gap-2 mt-2">
            {[
              { label: '25%', pct: 0.25 },
              { label: '50%', pct: 0.5 },
              { label: '75%', pct: 0.75 },
              { label: '100%', pct: 1 },
            ].map(o => (
              <button
                key={o.label}
                type="button"
                onClick={() => tokenBal && setCollateral(((tokenBal.value || 0) * o.pct).toFixed(2))}
                className="px-2 py-1 text-xs rounded border border-white/10 text-gray-300 hover:border-yellow-500/40"
              >
                {o.label}
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {tokenBal?.error ? (
              <span className="text-red-400">Balance error: {String(tokenBal.error)}</span>
            ) : (
              <>USDC balance: {tokenBal ? tokenBal.value.toLocaleString() : ''}</>
            )}
          </div>
          <div className="text-xs text-gray-500 mt-1">You can close or adjust anytime.</div>
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-2 flex items-center gap-1">Leverage (1-20x)
            <HelpCircle className="w-3.5 h-3.5 text-gray-500" title="Higher leverage increases position size but also liquidation risk." />
          </label>
          <div className="flex items-center gap-2 mb-2">
            {[2,5,10,15,20].map(v => (
              <button key={v} type="button" onClick={() => setLeverage(v)} className={`px-3 py-1 rounded border text-xs ${leverage===v? 'border-yellow-500 text-yellow-500' : 'border-white/10 text-gray-300 hover:border-yellow-500/40'}`}>{v}x</button>
            ))}
          </div>
          <input type="range" min="1" max="20" value={leverage} onChange={(e)=> setLeverage(parseInt(e.target.value || '1', 10))} className="w-full" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1x</span><span>20x</span></div>
          <div className="mt-2 text-xs text-gray-300">Current: <span className="text-white font-semibold">{leverage}x</span> <span className="text-gray-500">(higher leverage = higher risk)</span></div>
          <div className="mt-2 text-xs text-gray-400">Est. position size: <span className="text-white font-semibold">{isFinite(positionSize) ? `$${positionSize.toLocaleString()}` : '$0'}</span></div>
        </div>
        {/* Advanced options */}
        <div className="pt-1">
          <button type="button" onClick={() => setShowAdvanced(s => !s)} className="text-xs text-gray-400 hover:text-yellow-400">
            {showAdvanced ? 'Hide options' : 'More options'}
          </button>
          {showAdvanced && (
            <div className="mt-3 space-y-3">
              <div>
                <label className="text-sm text-gray-400 mb-2 flex items-center gap-1">Slippage (bps)
                  <HelpCircle className="w-3.5 h-3.5 text-gray-500" title="Max price movement you accept during order execution." />
                </label>
                <div className="flex items-center gap-2">
                  {[10,50,100].map(b => (
                    <button key={b} type="button" onClick={()=> setSlippageBps(b)} className={`px-3 py-1 rounded border text-xs ${slippageBps===b? 'border-yellow-500 text-yellow-500' : 'border-white/10 text-gray-300 hover:border-yellow-500/40'}`}>{b}</button>
                  ))}
                  <input type="number" value={slippageBps} onChange={e=> setSlippageBps(parseInt(e.target.value || '0', 10))} className="w-24 bg-black border border-white/10 rounded px-2 py-1 text-sm text-white" />
                </div>
              </div>
              {children}
            </div>
          )}
        </div>

        {/* How this works */}
        <div className="pt-3">
          <button type="button" onClick={() => setShowHow(s => !s)} className="text-xs text-gray-400 hover:text-yellow-400">
            {showHow ? 'Hide “How this works”' : 'How this works'}
          </button>
          {showHow && (
            <div className="mt-3 grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="text-gray-300">Set your monthly budget and coverage. We’ll show an example payout.</div>
                <div className="flex items-center gap-2">
                  <input type="number" step="any" inputMode="decimal" value={budget} onChange={(e)=> setBudget(e.target.value)} className="w-36 bg-black border border-white/10 rounded px-2 py-1 text-sm text-white" />
                  <span className="text-gray-400">USD / month</span>
                </div>
                <div className="flex items-center gap-2">
                  {[5,10,20].map(p => (
                    <button key={p} type="button" onClick={()=> setCoveragePct(p)} className={`px-3 py-1 rounded border text-xs ${coveragePct===p? 'border-yellow-500 text-yellow-500' : 'border-white/10 text-gray-300 hover:border-yellow-500/40'}`}>{p}% cover</button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-gray-300">Assume the index rises by:</div>
                <input type="range" min="0" max="15" value={assumedDelta} onChange={(e)=> setAssumedDelta(parseInt(e.target.value||'0',10))} className="w-full" />
                <div className="flex justify-between text-xs text-gray-400"><span>0%</span><span>15%</span></div>
                <div className="mt-2 bg-white/5 border border-white/10 rounded p-3">
                  {(() => {
                    const B = Math.max(0, parseFloat(budget)||0);
                    const cap = (B * (coveragePct/100));
                    const raw = (B * (assumedDelta/100));
                    const est = Math.min(cap, raw);
                    return (
                      <div>
                        <div className="text-gray-400">Example payout if index ↑ {assumedDelta}%:</div>
                        <div className="text-white font-bold text-lg">${est.toFixed(2)} <span className="text-xs text-gray-400">(cap ${cap.toFixed(2)})</span></div>
                        <div className="text-xs text-gray-500">Formula: min(budget × Δ%, budget × cover%)</div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <Button variant={isLong ? 'success' : 'danger'} className="w-full" onClick={handleSubmit} disabled={!!disabledReason || isSubmitting} loading={isSubmitting}>
          {isSubmitting ? 'Submitting...' : `Trade ${isLong ? 'Long' : 'Short'}`}
        </Button>
        {disabledReason && <div className="mt-2 text-xs text-gray-400">{disabledReason}</div>}
      </div>
    </Card>
  );
}

function OrderSummary({ market, isLong, collateral, leverage }) {
  const data = useMarketData();
  const entry = data.markPriceNum != null ? data.markPriceNum : market.price;
  const positionSize = (parseFloat(collateral || 0) || 0) * (leverage || 0);
  const tradingFee = positionSize * 0.001;
  const liquidationPrice = (isLong ? entry * (1 - (1 / Math.max(1, leverage)) * 0.97) : entry * (1 + (1 / Math.max(1, leverage)) * 0.97));
  const safetyBuffer = (() => {
    if (!isFinite(entry) || !isFinite(liquidationPrice) || entry <= 0) return null;
    if (isLong) return Math.max(0, (entry - liquidationPrice) / entry) * 100;
    return Math.max(0, (liquidationPrice - entry) / entry) * 100;
  })();
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Order Summary</h2>
        <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-full text-xs font-bold text-blue-400">Live</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="col-span-1 sm:col-span-2 bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="text-xs text-gray-400">Entry Price (est.)</div>
          <div className="text-2xl font-bold text-white">
            {Number.isFinite(entry) ? `$${entry.toFixed(2)}` : (
              <span className="inline-block skeleton" style={{ width: 120, height: 20 }} />
            )}
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="text-xs text-gray-400">Position Size</div>
          <div className="text-xl font-bold text-yellow-500">
            {Number.isFinite(positionSize) ? `$${positionSize.toLocaleString()}` : (
              <span className="inline-block skeleton" style={{ width: 80, height: 16 }} />
            )}
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="text-xs text-gray-400">Liquidation Price (est.)</div>
          <div className="text-xl font-bold text-red-400">
            {Number.isFinite(liquidationPrice) ? `$${liquidationPrice.toFixed(2)}` : (
              <span className="inline-block skeleton" style={{ width: 80, height: 16 }} />
            )}
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="text-xs text-gray-400 flex items-center gap-1">Safety Buffer
            <HelpCircle className="w-3.5 h-3.5 text-gray-500" title="Approx. distance to liquidation as a percentage." />
          </div>
          <div className="text-xl font-bold text-white">
            {safetyBuffer != null ? `${safetyBuffer.toFixed(1)}%` : (
              <span className="inline-block skeleton" style={{ width: 60, height: 16 }} />
            )}
          </div>
        </div>
      </div>
      <div className="mt-3">
        <button type="button" onClick={() => setShowDetails(s => !s)} className="text-xs text-gray-400 hover:text-yellow-400">
          {showDetails ? 'Hide details' : 'Show fee & funding'}
        </button>
        {showDetails && (
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-xs text-gray-400">Trading Fee (0.1%)</div>
              <div className="text-md font-bold text-white">
                {Number.isFinite(tradingFee) ? `$${tradingFee.toLocaleString()}` : (
                  <span className="inline-block skeleton" style={{ width: 60, height: 14 }} />
                )}
              </div>
            </div>
            {data.fundingRateNum != null && (
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-xs text-gray-400">Funding Rate (est.)</div>
                <div className="text-md font-bold text-white">{`${data.fundingRateNum.toLocaleString()} / epoch`}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

function HealthBadge({ health }) {
  const color = health >= 2 ? 'text-green-400' : health >= 1.2 ? 'text-yellow-400' : 'text-red-400';
  const label = health >= 2 ? 'Healthy' : health >= 1.2 ? 'Watch' : 'At Risk';
  return <span className={`${color} font-semibold`}>{label}</span>;
}

function PositionCard({ p, selectedMarket, data, onMargin, onClose }) {
  const mmr = Number(process.env.REACT_APP_MAINTENANCE_MARGIN_RATIO || '0.0625');
  const maintenance = p.size * mmr;
  const health = maintenance > 0 ? (p.collateral / maintenance) : 0;
  const { series, last } = useMarketHistory(p.market);
  const mark = (last != null) ? last : ((data?.markPriceNum != null && p.market === selectedMarket) ? data.markPriceNum : (p.entryPrice || 0));
  const entry = p.entryPrice || mark;
  const pnl = (Number.isFinite(mark) && Number.isFinite(entry) && entry > 0)
    ? ((p.isLong ? (mark - entry) : (entry - mark)) / entry) * (p.size || 0)
    : 0;
  const bufferPct = (Number.isFinite(mark) && Number.isFinite(p.liquidationPrice) && mark > 0)
    ? (p.isLong ? Math.max(0, (mark - p.liquidationPrice) / mark) : Math.max(0, (p.liquidationPrice - mark) / mark)) * 100
    : null;
  return (
    <Card className="flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold text-white">{p.market}</h3>
          <span className={`text-sm font-semibold ${p.isLong ? 'text-green-500' : 'text-red-500'}`}>{p.isLong ? 'Long' : 'Short'}</span>
        </div>
        <HealthBadge health={health} />
      </div>
      <div className="mb-3"><Sparkline data={series} width={160} height={36} /></div>
      <div className="flex-grow space-y-3 text-sm">
        <div className="flex justify-between"><span className="text-gray-400">Entry / Mark</span><span className="text-white">${Number(entry).toFixed(2)} / ${Number(mark).toFixed(2)}</span></div>
        <div className="flex justify-between"><span className="text-gray-400">PnL</span><span className={`${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>{(pnl >= 0 ? '+' : '') + '$' + Math.abs(pnl).toLocaleString()}</span></div>
        <div className="flex justify-between"><span className="text-gray-400">Size</span><span className="text-yellow-500">${(p.size || 0).toLocaleString()}</span></div>
        <div className="flex justify-between"><span className="text-gray-400">Collateral</span><span className="text-white">${(p.collateral || 0).toLocaleString()}</span></div>
        <div className="flex justify-between"><span className="text-gray-400">Leverage</span><span className="text-white">{(p.leverage || 0).toFixed(1)}x</span></div>
        <div className="flex justify-between"><span className="text-gray-400">Liq / Buffer</span><span className="text-white">${Number(p.liquidationPrice || 0).toFixed(2)} • {bufferPct != null ? bufferPct.toFixed(1) + '%' : '-'}</span></div>
      </div>
      <div className="mt-6 flex gap-2">
        <Button variant="ghost" size="sm" className="flex-1" onClick={onMargin}>Margin</Button>
        <Button variant="danger" size="sm" className="flex-1" onClick={onClose}>Close</Button>
      </div>
    </Card>
  );
}

function PositionsInterface() {
  const { account, positions, setPositions, selectedMarket } = useAppState();
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
        <h3 className="text-xl font-bold text-white mb-2">No Positions</h3>
        <p className="text-gray-400">Open your first position to get started</p>
      </Card>
    );
  }

  const totalCollateral = positions.reduce((sum, p) => sum + (p.collateral || 0), 0);
  const totalSize = positions.reduce((sum, p) => sum + (p.size || 0), 0);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {positions.map((p, idx) => (
          <PositionCard
            key={p.id || idx}
            p={p}
            selectedMarket={selectedMarket}
            data={data}
            onMargin={() => { setSelected(p); setShowMargin(true); }}
            onClose={() => { setSelected(p); setShowClose(true); }}
          />
        ))}
      </div>

      {/* Modals */}
      <MarginManagementModal
        isOpen={showMargin && !!selected}
        onClose={() => { setShowMargin(false); setSelected(null); }}
        position={{
          id: selected?.id || '',
          direction: selected?.isLong ? 'long' : 'short',
          collateral: selected?.collateral || 0,
          leverage: selected?.leverage || 0,
          liquidationPrice: selected?.liquidationPrice || 0,
          healthRatio: (() => {
            const mmr = Number(process.env.REACT_APP_MAINTENANCE_MARGIN_RATIO || '0.0625');
            const maintenance = (selected?.size || 0) * mmr;
            return maintenance > 0 ? ((selected?.collateral || 0) / maintenance) : 0;
          })(),
        }}
        maxAddAmount={bal?.value || 0}
        maxRemoveAmount={(selected?.collateral || 0) * 0.9}
        onAddMargin={async (amt) => {
          try {
            const id = selected?.onchainId || selected?.id;
            await positionManager.addMargin(id, amt);
            setPositions(positions.map(px => px.id === selected.id ? { ...px, collateral: (px.collateral || 0) + amt } : px));
            addToast('Margin added', 'success');
            setShowMargin(false); setSelected(null);
          } catch (e) { addToast('Failed to add margin', 'error'); }
        }}
        onRemoveMargin={async (amt) => {
          try {
            const id = selected?.onchainId || selected?.id;
            await positionManager.removeMargin(id, amt);
            setPositions(positions.map(px => px.id === selected.id ? { ...px, collateral: Math.max(0, (px.collateral || 0) - amt) } : px));
            addToast('Margin removed', 'success');
            setShowMargin(false); setSelected(null);
          } catch (e) { addToast('Failed to remove margin', 'error'); }
        }}
      />
      <CloseConfirmModal
        isOpen={showClose && !!selected}
        onClose={() => { setShowClose(false); setSelected(null); }}
        onConfirm={async () => {
          try {
            const id = selected?.onchainId || selected?.id;
            await positionManager.closePosition(id);
            setPositions(positions.filter(px => px.id !== selected.id));
            addToast('Position closed', 'success');
            setShowClose(false); setSelected(null);
          } catch (e) { addToast('Failed to close position', 'error'); }
        }}
        position={selected}
      />
    </div>
  );
}

function DataPanel() {
  const data = useMarketData();
  const mom = process.env.REACT_APP_CPI_MOM ? Number(process.env.REACT_APP_CPI_MOM) : null;
  const yoy = process.env.REACT_APP_CPI_YOY ? Number(process.env.REACT_APP_CPI_YOY) : null;
  const lastReleaseISO = process.env.REACT_APP_CPI_LAST_RELEASE_ISO || null;
  const nextReleaseISO = process.env.REACT_APP_CPI_NEXT_RELEASE_ISO || null;
  const lastRelease = lastReleaseISO ? new Date(lastReleaseISO) : null;
  const nextRelease = nextReleaseISO ? new Date(nextReleaseISO) : null;
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const countdown = nextRelease ? Math.max(0, nextRelease - now) : null;
  const days = countdown != null ? Math.floor(countdown / 86400000) : null;
  const hours = countdown != null ? Math.floor((countdown % 86400000) / 3600000) : null;
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card>
        <div className="text-xs text-gray-400">Mark Price</div>
        <div className="text-white text-xl">{data.markPriceNum != null ? data.markPriceNum.toLocaleString() : (data.markPrice !== null ? String(data.markPrice) : '-')}</div>
      </Card>
      <Card>
        <div className="text-xs text-gray-400">Index Price</div>
        <div className="text-white text-xl">{data.indexPriceNum != null ? data.indexPriceNum.toLocaleString() : (data.indexPrice !== null ? String(data.indexPrice) : '-')}</div>
      </Card>
      <Card>
        <div className="text-xs text-gray-400">Funding Rate</div>
        <div className="text-white text-xl">{data.fundingRateNum != null ? data.fundingRateNum.toLocaleString() : (data.fundingRate !== null ? String(data.fundingRate) : '-')}</div>
      </Card>
      <Card className="md:col-span-2">
        <div className="text-sm text-white font-bold mb-2">CPI Insights</div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-xs text-gray-400">MoM</div>
            <div className="text-white">{mom != null ? `${mom.toFixed(2)}%` : '-'}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">YoY</div>
            <div className="text-white">{yoy != null ? `${yoy.toFixed(2)}%` : '-'}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Last Release</div>
            <div className="text-white">{lastRelease ? lastRelease.toLocaleDateString() : '-'}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Next Release</div>
            <div className="text-white">{nextRelease ? (nextRelease.toLocaleDateString() + (countdown != null ? ' - ' + days + 'd ' + hours + 'h' : '')) : '-'}</div>
          </div>
        </div>
        <a href="https://www.bls.gov/cpi/" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-xs text-yellow-500">See source data (BLS CPI-U)</a>
      </Card>
      <div className="md:col-span-3 text-xs text-gray-500 flex items-center gap-2">
        <Activity className="w-3 h-3" /> {data.loading ? 'Loading...' : data.error ? `Error: ${data.error}` : `Updated ${new Date(data.lastUpdated).toLocaleTimeString()}`}
      </div>
    </div>
  );
}

export default function TradingAppPage() {
  const { selectedMarket, setSelectedMarket } = useAppState();
  const [activeTab, setActiveTab] = useState('trade');
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
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b0b] to-black">
      <TradingHeader onSwitchNetwork={switchNetwork} />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <StatusBar />
        {/* Release window banner (US CPI) */}
        {(() => {
          const nextISO = process.env.REACT_APP_CPI_NEXT_RELEASE_ISO || null;
          if (!nextISO) return null;
          const next = new Date(nextISO);
          const now = new Date();
          const ms = Math.max(0, next - now);
          const days = Math.floor(ms / 86400000);
          const hours = Math.floor((ms % 86400000) / 3600000);
          // Show banner for upcoming releases within ~10 days
          if (ms <= 10 * 86400000) {
            return (
              <Card className="mb-4 border-yellow-500/30 bg-yellow-500/5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-yellow-500 font-bold mb-1">Upcoming US CPI release</div>
                    <div className="text-sm text-gray-300">Next CPI in {days}d {hours}h. Protection widens briefly around the print to keep prices fair.</div>
                  </div>
                  <Link to="#" onClick={(e)=>{e.preventDefault(); setActiveTab('data');}} className="text-xs text-yellow-500 underline underline-offset-2">See data</Link>
                </div>
              </Card>
            );
          }
          return null;
        })()}
        {mismatch && (
          <Card className="mb-4 border-red-500/40 bg-red-500/10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-white font-bold mb-1">Wrong network detected</div>
                <div className="text-sm text-gray-300">Please switch to the configured test network to trade.</div>
              </div>
              <Button onClick={switchNetwork} variant="danger">Switch Network</Button>
            </div>
          </Card>
        )}
        <div className="lg:grid lg:grid-cols-[minmax(260px,320px)_1fr] lg:items-start lg:gap-6">
          <MarketSelector markets={MARKETS} selectedMarket={selectedMarket} onSelectMarket={setSelectedMarket} />
          <section className="mt-6 lg:mt-0 space-y-6">
            <div className="border-b border-yellow-500/20">
              <div className="flex gap-4 overflow-x-auto no-scrollbar">
                <button onClick={() => setActiveTab('trade')} className={`py-3 px-4 text-sm font-semibold whitespace-nowrap ${activeTab === 'trade' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>Trade</button>
                <button onClick={() => setActiveTab('positions')} className={`py-3 px-4 text-sm font-semibold whitespace-nowrap ${activeTab === 'positions' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>Positions</button>
                <button onClick={() => setActiveTab('data')} className={`py-3 px-4 text-sm font-semibold whitespace-nowrap ${activeTab === 'data' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-white'}`}>Data</button>
              </div>
            </div>
            <div className="transition-all duration-300">
              {activeTab === 'trade' && <TradingInterface market={currentMarket} disabled={mismatch} mismatch={mismatch} />}
              {activeTab === 'positions' && <PositionsInterface />}
              {activeTab === 'data' && <DataPanel />}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
