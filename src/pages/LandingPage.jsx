import React, { useState } from 'react';
import {
  ArrowRight,
  Zap,
  Shield,
  Users,
  Wallet,
  TrendingUp,
  CheckCircle,
  Sigma,
  RefreshCw,
  ShoppingCart,
  Stethoscope,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Card } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';
import { MARKETS } from '../config/constants';
import { HOME_FAQS } from '../components/faq/FAQSection';

const formatPercent = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? `${num.toFixed(2)}%` : '—';
};

const marketIconMap = {
  'cost-of-living': Activity,
  'essentials-pack': ShoppingCart,
  'healthcare-shield': Stethoscope,
};

const HERO_MARKETS = ['cost-of-living', 'essentials-pack', 'healthcare-shield'];

function TickerRow({ title, subtitle, items, showArrows = false, variant = 'default' }) {
  if (!items || items.length === 0) return null;
  const doubled = [...items, ...items];
  return (
    <div>
      <div className="flex items-center justify-between mb-1 text-xs text-gray-400">
        <span>{title}</span>
        {subtitle && <span className="text-[11px] text-gray-500">{subtitle}</span>}
      </div>
      <div className={`border border-white/10 rounded-xl bg-white/5 ticker ${variant === 'official' ? 'ticker-official' : ''} ${variant === 'hedge' ? 'ticker-hedge' : ''}`}>
        <div className="ticker-track px-4 py-2">
          {doubled.map((item, idx) => (
            <div key={`${item.label}-${idx}`} className="flex items-center gap-2">
              <span className="text-sm text-gray-300">{item.label}</span>
              <span className="text-sm text-white font-semibold">{item.value}</span>
              {showArrows && typeof item.change === 'number' && (
                <span className={`flex items-center gap-1 text-xs font-bold ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {item.change >= 0 ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {Math.abs(item.change).toFixed(2)}%
                </span>
              )}
              {!showArrows && typeof item.change === 'number' && (
                <span className={`text-xs font-bold ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {item.change >= 0 ? '+' : ''}
                  {item.change.toFixed(2)}%
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (HOME_FAQS || []).slice(0, 8).map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
  const heroMarkets = MARKETS.filter((m) => HERO_MARKETS.includes(m.id));
  const actualTickerItems = [
    {
      label: 'US CPI YoY',
      value: formatPercent(process.env.REACT_APP_CPI_YOY),
      change: Number(process.env.REACT_APP_CPI_YOY),
    },
    {
      label: 'US CPI MoM',
      value: formatPercent(process.env.REACT_APP_CPI_MOM),
      change: Number(process.env.REACT_APP_CPI_MOM),
    },
    {
      label: 'Food CPI YoY',
      value: formatPercent(process.env.REACT_APP_CPI_FOOD_YOY),
      change: Number(process.env.REACT_APP_CPI_FOOD_YOY),
    },
    {
      label: 'Energy CPI YoY',
      value: formatPercent(process.env.REACT_APP_CPI_ENERGY_YOY),
      change: Number(process.env.REACT_APP_CPI_ENERGY_YOY),
    },
    {
      label: 'Medical CPI YoY',
      value: formatPercent(process.env.REACT_APP_CPI_MEDICAL_YOY),
      change: Number(process.env.REACT_APP_CPI_MEDICAL_YOY),
    },
    {
      label: 'Rent CPI YoY',
      value: formatPercent(process.env.REACT_APP_CPI_RENT_YOY),
      change: Number(process.env.REACT_APP_CPI_RENT_YOY),
    },
  ].filter((item) => item.value && item.value !== '—' && Number.isFinite(item.change));
  if (actualTickerItems.length === 0) {
    const fallbackActual = [
      { label: 'US CPI YoY', change: 3.40 },
      { label: 'US CPI MoM', change: 0.32 },
      { label: 'Food CPI YoY', change: 3.25 },
      { label: 'Energy CPI YoY', change: -4.10 },
      { label: 'Medical CPI YoY', change: 5.80 },
      { label: 'Rent CPI YoY', change: 6.10 },
    ];
    fallbackActual.forEach((item) => {
      item.value = `${item.change.toFixed(2)}%`;
    });
    actualTickerItems.push(...fallbackActual);
  }
  const [activeMarketIndex, setActiveMarketIndex] = useState(0);
  const hasHeroMarkets = heroMarkets.length > 0;
  const activeMarket = hasHeroMarkets
    ? heroMarkets[(activeMarketIndex % heroMarkets.length + heroMarkets.length) % heroMarkets.length]
    : null;
  const ActiveMarketIcon = activeMarket ? (marketIconMap[activeMarket.id] || Activity) : null;
  const cycleHeroMarket = (direction) => {
    if (!hasHeroMarkets) return;
    setActiveMarketIndex((prev) => {
      const total = heroMarkets.length;
      const next = prev + direction;
      return ((next % total) + total) % total;
    });
  };
  const goToHeroMarket = (idx) => {
    if (!hasHeroMarkets) return;
    setActiveMarketIndex(idx);
  };
  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />

      <section className="px-4 pt-6">
        <div className="max-w-6xl mx-auto space-y-3">
          <TickerRow
            title="Official inflation benchmarks"
            subtitle="Source: U.S. Bureau of Labor Statistics"
            items={actualTickerItems}
            showArrows
            variant="official"
          />
        </div>
      </section>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-500 mb-6">
              <Zap className="w-4 h-4" />
              Non-custodial • Decentralized • Testnet demo
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Hedge Against Inflation: Start with US CPI
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Start by hedging against general US CPI. Our platform simplifies long or short positions, with a vision to expand into specialized inflation markets.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <div className="w-6 h-6 rounded-md bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-gray-300 text-sm">Non-custodial</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <div className="w-6 h-6 rounded-md bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                  <Sigma className="w-4 h-4" />
                </div>
                <span className="text-gray-300 text-sm">Hybrid MPC + Chainlink</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <div className="w-6 h-6 rounded-md bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <span className="text-gray-300 text-sm">Perpetual markets</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/app"><Button className="text-lg">Start Trading <ArrowRight className="w-5 h-5" /></Button></Link>
              <Link to="/whitepaper"><Button variant="ghost" className="text-lg">Read Whitepaper</Button></Link>
            </div>
          </div>

          <div className="relative">
            {activeMarket && (
              <Card className="relative overflow-hidden">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
                      {ActiveMarketIcon ? <ActiveMarketIcon className="w-5 h-5 text-yellow-500" /> : null}
                    </div>
                    <div>
                      <div className="text-white font-bold text-xl">{activeMarket.name}</div>
                      <div className="text-gray-400 text-sm">{activeMarket.description}</div>
                      {activeMarket.bestFor && (
                        <div className="text-xs text-gray-500 mt-2">Best for: {activeMarket.bestFor}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-2xl">${activeMarket.price.toFixed(2)}</div>
                    <div className={`text-sm font-bold ${activeMarket.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {(activeMarket.change24h >= 0 ? '+' : '') + activeMarket.change24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex flex-wrap gap-2">
                    {(activeMarket.tags || []).slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wide text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-right">
                    <div>Cadence: {activeMarket.releaseCadence || 'Monthly'}</div>
                    <div>Region: {activeMarket.region || 'US'}</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-end">
                  <Link to="/markets" className="text-sm text-yellow-500 underline underline-offset-2">Browse all markets</Link>
                </div>
              </Card>
            )}
            {heroMarkets.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => cycleHeroMarket(-1)}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/80 p-2 text-gray-300 hover:text-white hover:border-yellow-500/40 transition-colors"
                  aria-label="Previous market"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => cycleHeroMarket(1)}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/80 p-2 text-gray-300 hover:text-white hover:border-yellow-500/40 transition-colors"
                  aria-label="Next market"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            {heroMarkets.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4">
                {heroMarkets.map((market, idx) => (
                  <button
                    key={market.id}
                    type="button"
                    onClick={() => goToHeroMarket(idx)}
                    className={`h-2.5 w-2.5 rounded-full transition-colors ${idx === activeMarketIndex ? 'bg-yellow-500' : 'bg-white/20 hover:bg-white/40'}`}
                    aria-label={`View ${market.name}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Live Markets Ticker (auto-scroll, no scrollbar) */}
      <section className="px-4 -mt-8">
        <div className="max-w-6xl mx-auto border border-white/10 rounded-xl bg-white/5 ticker">
          <div className="ticker-track px-4 py-3">
            {[...MARKETS, ...MARKETS].map((m, i) => (
              <div key={m.id + '-' + i} className="flex items-center gap-2">
                <span className="text-sm text-gray-400">{m.name}</span>
                <span className="text-sm text-white font-semibold">${m.price.toFixed(2)}</span>
                <span className={`text-xs font-bold ${m.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>{m.change24h >= 0 ? '+' : ''}{m.change24h.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Inflation Market */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-yellow-500/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Inflation Market?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Hedge macro risks you actually faceâ€”like inflation and housingâ€”using perpetuals anchored to real data instead of crypto spot prices.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Hedge Inflation Risk',
                description: 'Protect savings from rising prices with CPI-linked markets and transparent data.'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Earn Funding Yields',
                description: 'Earn or pay funding as mark re-anchors to index; align positions with your macro view.'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Speculate on Economics',
                description: 'Express views on general CPI, with future expansion to sector-specific and global economic indicators.'
              }
            ].map((feature, i) => (
              <Card key={i} className="text-center hover:border-yellow-500/40 transition-all">
                <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 mx-auto mb-4">
                  {feature.icon}
                </div>
                <div className="text-xl font-bold text-white mb-2">{feature.title}</div>
                <div className="text-sm text-gray-400">{feature.description}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">How It Works</h2>
            <p className="text-lg text-gray-400">Three steps to get started with the test prototype.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <div className="flex items-center gap-2 mb-2 text-yellow-500"><Wallet className="w-4 h-4"/><span className="text-white font-semibold">Connect</span></div>
              <p className="text-sm text-gray-300">Connect your wallet and switch to the supported network.</p>
            </Card>
            <Card>
              <div className="flex items-center gap-2 mb-2 text-yellow-500"><TrendingUp className="w-4 h-4"/><span className="text-white font-semibold">Pick a market</span></div>
              <p className="text-sm text-gray-300">Start with the general US CPI market and set slippage.</p>
            </Card>
            <Card>
              <div className="flex items-center gap-2 mb-2 text-yellow-500"><CheckCircle className="w-4 h-4"/><span className="text-white font-semibold">Open a trade</span></div>
              <p className="text-sm text-gray-300">Confirm approvals, open the position, and monitor funding.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-2 border-yellow-500/40 text-center p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Launch the Test Prototype</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Open a position on the general US CPI market. You're always in control of your collateral.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/app"><Button className="text-lg">Trade <ArrowRight className="w-5 h-5" /></Button></Link>
            </div>
          </Card>
        </div>
      </section>

      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}

