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
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Card } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';
import { MARKETS } from '../config/constants';
import { HOME_FAQS } from '../components/faq/FAQSection';
import UserJourneyModal from '../components/landing/UserJourneyModal';
import InfoTooltip from '../components/ui/InfoTooltip';

const formatPercent = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? `${num.toFixed(2)}%` : '—';
};

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
  const [showJourneyModal, setShowJourneyModal] = useState(false);

  const handleStartTrading = () => {
    setShowJourneyModal(true);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (HOME_FAQS || []).slice(0, 8).map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
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
  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />
      <UserJourneyModal isOpen={showJourneyModal} onClose={() => setShowJourneyModal(false)} />

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
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-500 mb-6">
            <Zap className="w-4 h-4" />
            Non-custodial • Decentralized • Testnet demo
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            The Savings Account That Beats Inflation
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
            Protect your purchasing power with perpetual positions anchored to real US CPI and Treasury data. Your savings are hedged against inflation through continuous, non-custodial markets—not speculative crypto prices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button onClick={handleStartTrading} className="text-lg px-10 py-6">
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Link to="/markets">
              <Button variant="ghost" className="text-lg px-10 py-6 w-full">
                Browse Markets
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <div className="w-8 h-8 rounded-md bg-yellow-500/10 text-yellow-500 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-gray-300 text-sm font-medium inline-flex items-center">
                Non-custodial
                <InfoTooltip
                  title="Non-Custodial"
                  content="You maintain complete control of your funds at all times. Smart contracts handle collateral and settlement—no intermediaries, no withdrawal limits, no counterparty risk."
                />
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <div className="w-8 h-8 rounded-md bg-yellow-500/10 text-yellow-500 flex items-center justify-center flex-shrink-0">
                <Sigma className="w-5 h-5" />
              </div>
              <span className="text-gray-300 text-sm font-medium inline-flex items-center">
                MPC + Chainlink
                <InfoTooltip
                  title="Hybrid Oracle"
                  content="Multi-Party Computation (MPC) aggregates real US CPI and Treasury data from official sources (BLS, Federal Reserve), delivered on-chain via Chainlink for tamper-proof verification."
                />
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <div className="w-8 h-8 rounded-md bg-yellow-500/10 text-yellow-500 flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <span className="text-gray-300 text-sm font-medium inline-flex items-center">
                Perpetual markets
                <InfoTooltip
                  title="Perpetual Markets"
                  content="No expiry dates—ever. Hold positions for days, months, or years. Funding payments automatically keep market price aligned with real economic index data."
                />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Markets Ticker (auto-scroll, no scrollbar) */}
      <section className="px-4 -mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-1 text-xs text-gray-400 px-1">
            <span>Live market prices</span>
            <span className="text-[11px] text-gray-500">Real-time perpetual rates • Updated continuously</span>
          </div>
          <div className="border border-white/10 rounded-xl bg-white/5 ticker">
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
        </div>
      </section>

      {/* How It Actually Works */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Actually Works</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A perpetual swap mechanism that keeps your savings anchored to real economic data
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-blue-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xl">1</div>
                <h3 className="text-xl font-bold text-white inline-flex items-center">
                  Real Data Oracle
                  <InfoTooltip
                    title="How the Oracle Works"
                    content="We use a hybrid system: MPC nodes aggregate data from Bureau of Labor Statistics (CPI) and Federal Reserve (Treasury yields), then Chainlink delivers it on-chain with cryptographic proofs. This ensures data integrity and prevents manipulation."
                  />
                </h3>
              </div>
              <p className="text-gray-300 mb-3">MPC + Chainlink oracle delivers verified US CPI and Treasury yield data on-chain from official sources (BLS, Federal Reserve).</p>
              <div className="text-sm text-blue-400 font-mono bg-blue-500/10 rounded px-3 py-2">
                Index Price = f(CPI, Treasury Yields)
              </div>
            </Card>

            <Card className="border-green-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-xl">2</div>
                <h3 className="text-xl font-bold text-white inline-flex items-center">
                  Perpetual Positions
                  <InfoTooltip
                    title="Long & Short Positions"
                    content="Unlike traditional futures that expire monthly/quarterly, perpetuals never expire. Go LONG to hedge inflation (savers), or SHORT to speculate on deflation (traders). Both sides are needed for liquidity and fair pricing."
                  />
                </h3>
              </div>
              <p className="text-gray-300 mb-3">Open long positions to hedge inflation, or short positions to speculate. No expiry dates—hold for days, months, or years. Your position value tracks the inflation index.</p>
              <div className="text-sm text-green-400 font-mono bg-green-500/10 rounded px-3 py-2">
                Position Value ≈ Collateral × (1 ± ΔCPI)
              </div>
            </Card>

            <Card className="border-purple-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xl">3</div>
                <h3 className="text-xl font-bold text-white inline-flex items-center">
                  Funding Mechanism
                  <InfoTooltip
                    title="How Funding Works"
                    content="The 'funding rate' is a continuous payment between long and short positions. When the market price drifts above the real economic index, longs pay shorts (incentive to close). When it's below, shorts pay longs. This keeps prices anchored to reality, not speculation."
                  />
                </h3>
              </div>
              <p className="text-gray-300 mb-3">Automatic rebalancing keeps market price aligned with real economic data. When mark ≠ index, funding flows between longs and shorts.</p>
              <div className="text-sm text-purple-400 font-mono bg-purple-500/10 rounded px-3 py-2">
                Funding = λ × (Mark - Index) / Index
              </div>
            </Card>
          </div>

          {/* Example Flow Diagram */}
          <Card className="bg-gradient-to-br from-white/5 to-white/0 border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">The Complete Flow</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-xl bg-yellow-500/20 border-2 border-yellow-500/40 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="text-sm font-semibold text-white mb-1">You Deposit</div>
                <div className="text-xs text-gray-400">$10,000 USDC</div>
              </div>
              <div className="hidden md:block text-yellow-500 text-2xl">→</div>
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-xl bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-sm font-semibold text-white mb-1">Open Long</div>
                <div className="text-xs text-gray-400">Hedge inflation risk</div>
              </div>
              <div className="hidden md:block text-yellow-500 text-2xl">→</div>
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-xl bg-blue-500/20 border-2 border-blue-500/40 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-sm font-semibold text-white mb-1">CPI Rises 3%</div>
                <div className="text-xs text-gray-400">Real economic data</div>
              </div>
              <div className="hidden md:block text-yellow-500 text-2xl">→</div>
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-xl bg-purple-500/20 border-2 border-purple-500/40 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-sm font-semibold text-white mb-1">Position Gains</div>
                <div className="text-xs text-gray-400">Purchasing power preserved</div>
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center mb-4">
              <p className="text-sm text-blue-200">
                <strong>Result:</strong> While traditional savings lose 3% to inflation, your position tracks the CPI increase, preserving your purchasing power.
              </p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-purple-200">
                  <strong>Two-Sided Market:</strong> The protocol requires both long positions (hedgers protecting against inflation) and short positions (speculators or those expecting deflation) to create liquidity and fair price discovery. Funding payments flow between these sides to keep the market price aligned with the real economic index.
                </div>
              </div>
            </div>
          </Card>

          {/* Key Differences */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="border-red-500/30">
              <h4 className="text-lg font-bold text-red-400 mb-3">❌ Traditional Savings</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>0.5% interest while inflation runs at 3%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Lose 2.5% purchasing power annually</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>No protection mechanism</span>
                </li>
              </ul>
            </Card>

            <Card className="border-green-500/30">
              <h4 className="text-lg font-bold text-green-400 mb-3">✅ Inflation Market</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Position gains track CPI increases</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Purchasing power preserved or increased</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Anchored to real US Treasury + CPI data</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Inflation Market */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-yellow-500/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Inflation Market?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The only protocol that anchors your savings to real economic data instead of speculative crypto prices
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Hedge Inflation Risk',
                description: 'Long positions protect savings from rising prices. Your position value tracks CPI increases, preserving purchasing power.'
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Speculate on Deflation',
                description: 'Short positions profit when inflation falls. Express bearish macro views or hedge against deflationary environments.'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Earn Funding Yields',
                description: 'Funding flows continuously between longs and shorts. When you\'re on the right side of the market imbalance, you earn passive yield.'
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
              <div className="flex items-center gap-2 mb-2 text-yellow-500"><TrendingUp className="w-4 h-4"/><span className="text-white font-semibold">Choose your market</span></div>
              <p className="text-sm text-gray-300">Select from US CPI or specialized inflation indices. Set your leverage (1x-20x).</p>
            </Card>
            <Card>
              <div className="flex items-center gap-2 mb-2 text-yellow-500"><CheckCircle className="w-4 h-4"/><span className="text-white font-semibold">Open your position</span></div>
              <p className="text-sm text-gray-300">Go long to hedge or short to speculate. Your collateral stays under your control.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-2 border-yellow-500/40 text-center p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Test the platform on Arbitrum Sepolia. Connect your wallet and explore our inflation markets with no risk to real funds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleStartTrading} className="text-lg px-8 py-6">
                Get Started <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Link to="/markets">
                <Button variant="ghost" className="text-lg px-8 py-6 w-full">
                  Browse Markets
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}

