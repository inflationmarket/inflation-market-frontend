import React, { useMemo, useState } from 'react';
import useInflationData from '../hooks/useInflationData';
import { Card } from '../components/ui/primitives';
import { useNavigate } from 'react-router-dom';
import Sparkline from '../components/charts/Sparkline';
import useSparkline from '../hooks/useSparkline';
import { useAppState } from '../app';
import { MARKETS } from '../config/constants';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';
import { ShoppingCart, Stethoscope, Home, Flame, GraduationCap, Globe, Activity } from 'lucide-react';

const formatPercent = (input) => {
  const num = Number(input);
  return Number.isFinite(num) ? `${num.toFixed(2)}%` : '\u2014';
};

const marketIconMap = {
  inflation: Activity,
  'essentials-pack': ShoppingCart,
  'healthcare-shield': Stethoscope,
  'rent-housing-shield': Home,
  'fuel-commuter': Flame,
  'education-shield': GraduationCap,
  'cost-of-living': Globe,
};

function TickerRow({ title, subtitle, items }) {
  if (!items || items.length === 0) return null;
  const doubled = [...items, ...items];
  return (
    <div>
      <div className="flex items-center justify-between mb-1 text-xs text-gray-400">
        <span>{title}</span>
        {subtitle && <span className="text-[11px] text-gray-500">{subtitle}</span>}
      </div>
      <div className="border border-white/10 rounded-xl bg-white/5 ticker">
        <div className="ticker-track px-4 py-2">
          {doubled.map((item, idx) => (
            <div key={`${item.label}-${idx}`} className="flex items-center gap-2">
              <span className="text-sm text-gray-300">{item.label}</span>
              <span className="text-sm text-white font-semibold">{item.value}</span>
              {typeof item.change === 'number' && (
                <span className={`text-xs font-bold ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarketCard({ market, onTrade }) {
  const live = useSparkline({ marketId: market.id, maxPoints: 30 });
  const data = live.series && live.series.length ? live.series : (market.series || []);
  const payout = market.fundingRateAPR >= 0 ? (1 + Math.min(0.99, market.fundingRateAPR / 100)).toFixed(2) : '—';
  const nextISO = process.env.REACT_APP_CPI_NEXT_RELEASE_ISO || null;
  const next = nextISO ? new Date(nextISO) : null;
  const now = new Date();
  const ms = next ? Math.max(0, next - now) : null;
  const days = ms != null ? Math.floor(ms / 86400000) : null;
  const Icon = marketIconMap[market.id] || Activity;

  const handleClick = () => {
    console.log('Market card clicked:', market.id, market.name);
    if (onTrade) {
      onTrade();
    } else {
      console.error('onTrade function not provided');
    }
  };

  return (
    <Card className="h-full cursor-pointer hover:border-yellow-500/40 transition-colors" onClick={handleClick}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
            <Icon className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <div className="text-white font-bold text-lg">{market.name}</div>
            <div className="text-gray-400 text-sm">{market.description}</div>
            <div className="mt-2 text-[11px] text-gray-500 flex flex-wrap gap-2">
              {market.sourceName && (
                <span>Data: <a className="underline underline-offset-2 hover:text-yellow-400" href={market.sourceUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>{market.sourceName}</a></span>
              )}
              {market.releaseCadence && <span>Cadence: {market.releaseCadence}</span>}
              {market.region && <span>Region: {market.region}</span>}
            </div>
            {market.bestFor && (
              <div className="mt-1 text-[11px] text-gray-400">Best for: {market.bestFor}</div>
            )}
            {Array.isArray(market.tags) && market.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {market.tags.slice(0, 3).map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-full border border-white/10 text-[10px] uppercase tracking-wide text-gray-300">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-white font-bold text-xl">${market.price.toFixed(2)}</div>
          <div className={`text-sm font-bold ${market.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {(market.change24h >= 0 ? '+' : '') + market.change24h.toFixed(2)}%
          </div>
          <div className="text-[11px] text-gray-500 mt-1">Payout {payout}x</div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <Sparkline data={data} width={160} height={36} />
        <div className="text-xs text-gray-400 space-y-1">
          <div>Vol 24h: <span className="text-white font-semibold">${(market.volume24h || 0).toLocaleString()}</span></div>
          <div>Open Interest: <span className="text-white font-semibold">${(market.openInterest || 0).toLocaleString()}</span></div>
          {days != null && (market.sourceName || '').includes('CPI') && (
            <div>Next CPI in: <span className="text-white font-semibold">{days}d</span></div>
          )}
        </div>
      </div>
      <div className="mt-3 text-[11px] text-gray-500 hover:text-gray-500">
        Click to trade • Protection widens briefly near data releases
      </div>
    </Card>
  );
}

export default function MarketsPage() {
  const [filter, setFilter] = useState('All');
  const { markets: apiMarkets } = useInflationData();
  // Fallback to static MARKETS if API fails or returns empty
  const markets = (apiMarkets && apiMarkets.length > 0) ? apiMarkets : MARKETS;
  const addDerivedTags = (m) => {
    const tags = new Set([...(m.tags || [])]);
    if (Math.abs(m.change24h) >= 0.6) tags.add('Trending');
    if (Math.abs(m.change24h) < 0.6 || /CPI|Index/i.test(m.description)) tags.add('Hedging');
    if (Math.abs(m.change24h) >= 1.0 || Math.abs(m.fundingRateAPR) >= 8) tags.add('Leveraged');
    return { ...m, tags: Array.from(tags) };
  };
  const enriched = useMemo(() => (markets || []).map(addDerivedTags), [markets]);
  const filters = ['All', 'Trending', 'Hedging', 'Leveraged'];
  const navigate = useNavigate();
  const { setSelectedMarket } = useAppState();
  const list = useMemo(() => {
    let currentList = enriched; // Initialize currentList
    if (filter !== 'All') {
      currentList = enriched.filter(m => (m.tags || []).includes(filter));
    }

    // Find the 'inflation' market
    const inflationMarket = currentList.find(m => m.id === 'inflation');
    if (inflationMarket) {
      // Remove it from its current position
      currentList = currentList.filter(m => m.id !== 'inflation');
      // Add it to the beginning
      return [inflationMarket, ...currentList];
    }
    return currentList;
  }, [filter, enriched]);
  const actualTickerItems = useMemo(() => {
    // Latest U.S. CPI data from Bureau of Labor Statistics (December 2024)
    const fallbackData = {
      cpiYoY: 3.4,
      cpiMoM: 0.3,
      foodYoY: 2.7,
      energyYoY: -3.2,
      medicalYoY: 3.1,
      rentYoY: 4.4,
    };

    const entries = [
      {
        label: 'US CPI YoY',
        value: formatPercent(process.env.REACT_APP_CPI_YOY || fallbackData.cpiYoY),
        change: Number(process.env.REACT_APP_CPI_YOY || fallbackData.cpiYoY)
      },
      {
        label: 'US CPI MoM',
        value: formatPercent(process.env.REACT_APP_CPI_MOM || fallbackData.cpiMoM),
        change: Number(process.env.REACT_APP_CPI_MOM || fallbackData.cpiMoM)
      },
      {
        label: 'Food CPI YoY',
        value: formatPercent(process.env.REACT_APP_CPI_FOOD_YOY || fallbackData.foodYoY),
        change: Number(process.env.REACT_APP_CPI_FOOD_YOY || fallbackData.foodYoY)
      },
      {
        label: 'Energy CPI YoY',
        value: formatPercent(process.env.REACT_APP_CPI_ENERGY_YOY || fallbackData.energyYoY),
        change: Number(process.env.REACT_APP_CPI_ENERGY_YOY || fallbackData.energyYoY)
      },
      {
        label: 'Medical CPI YoY',
        value: formatPercent(process.env.REACT_APP_CPI_MEDICAL_YOY || fallbackData.medicalYoY),
        change: Number(process.env.REACT_APP_CPI_MEDICAL_YOY || fallbackData.medicalYoY)
      },
      {
        label: 'Rent CPI YoY',
        value: formatPercent(process.env.REACT_APP_CPI_RENT_YOY || fallbackData.rentYoY),
        change: Number(process.env.REACT_APP_CPI_RENT_YOY || fallbackData.rentYoY)
      },
    ].filter(item => item.value && item.value !== '\u2014');

    return entries;
  }, []);
  const hedgeTickerItems = useMemo(() => (
    enriched.slice(0, 6).map(m => ({
      label: m.name,
      value: `$${m.price.toFixed(2)}`,
      change: Number.isFinite(m.change24h) ? m.change24h : undefined,
    }))
  ), [enriched]);
  const financialProductsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: list.map((m, i) => ({
      '@type': 'FinancialProduct',
      name: m.name,
      description: m.description,
      category: 'Inflation-linked derivative',
      brand: { '@type': 'Organization', name: 'Inflation Market' },
      offers: {
        '@type': 'Offer',
        price: Number(m.price).toFixed(2),
        priceCurrency: 'USD',
        availability: 'https://schema.org/PreOrder',
      },
      additionalProperty: [
        { '@type': 'PropertyValue', name: '24h Change', value: `${m.change24h.toFixed(2)}%` },
        { '@type': 'PropertyValue', name: 'Funding APR', value: `${m.fundingRateAPR.toFixed(2)}%` },
      ],
      position: i + 1,
    })),
  };
  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />
      <main className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">Markets</h1>
            <p className="text-gray-400 mt-2">Click any market to start trading</p>
          </div>
        <div className="space-y-3 mb-4">
          <TickerRow
            title="U.S. Consumer Price Index (CPI) — Official government data"
            subtitle="Source: Bureau of Labor Statistics • Updated monthly"
            items={actualTickerItems}
          />
          <TickerRow
            title="Tradable inflation derivatives — Live perpetual prices"
            subtitle="Inflation Market indices • Real-time oracle feeds"
            items={hedgeTickerItems}
          />
        </div>
        {/* Top 5 carousel */}
        <TopFive markets={enriched} onPick={(id)=> { setSelectedMarket(id); navigate('/app'); }} />
        {/* Region selector - currently showing US only */}
        <div className="mb-3 flex items-center gap-2">
          <div className="px-3 py-1 rounded-full text-xs border border-yellow-500/30 text-yellow-500 bg-yellow-500/10">
            <span className="font-semibold">US Markets</span>
          </div>
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {filters.map(f => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs border ${filter===f ? 'border-yellow-500 text-yellow-500' : 'border-white/10 text-gray-300 hover:border-yellow-500/40'}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {list.map((m) => (
            <MarketCard key={m.id} market={m} onTrade={() => { setSelectedMarket(m.id); navigate('/app'); }} />
          ))}
        </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductsSchema) }} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function TopFive({ markets, onPick }) {
  const [mode, setMode] = useState('Momentum');
  const scored = useMemo(() => {
    if (!markets) return [];
    const byMomentum = [...markets].sort((a,b)=> Math.abs(b.change24h||0) - Math.abs(a.change24h||0));
    const byVolume = [...markets].sort((a,b)=> (b.volume24h||0) - (a.volume24h||0));
    const list = (mode === 'Volume' ? byVolume : byMomentum).slice(0,5);
    return list;
  }, [markets, mode]);
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-400">Top 5</div>
        <div className="flex items-center gap-2">
          {['Momentum','Volume'].map(m => (
            <button key={m} onClick={()=> setMode(m)} className={`px-2 py-0.5 rounded-full text-xs border ${mode===m? 'border-yellow-500 text-yellow-500':'border-white/10 text-gray-300 hover:border-yellow-500/40'}`}>{m}</button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto -mx-4 px-4 pb-2">
        <div className="flex gap-3 snap-x snap-mandatory">
          {scored.map(m => (
            <Card key={m.id} className="min-w-[240px] snap-start cursor-pointer hover:border-yellow-500/40 transition-colors" onClick={() => { console.log('Top 5 clicked:', m.id); onPick(m.id); }}>
              <div className="flex items-center justify-between mb-1">
                <div>
                  <div className="text-white font-semibold">{m.name}</div>
                  <div className="text-[11px] text-gray-500">{m.releaseCadence || 'Monthly'}</div>
                </div>
                <div className={`text-xs font-bold ${m.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {(m.change24h >= 0 ? '+' : '') + m.change24h.toFixed(2)}%
                </div>
              </div>
              <Sparkline data={m.series || []} width={180} height={28} />
              <div className="mt-2 text-xs text-gray-500">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">${m.price.toFixed(2)}</span>
                  <span className="hover:text-gray-500">Click to trade</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
