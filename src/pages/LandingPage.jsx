import React from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';
import { MARKETS } from '../config/constants';
import { HOME_FAQS } from '../components/faq/FAQSection';

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
  const navigate = useNavigate();

  const handleStartTrading = () => {
    navigate('/app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            Protect Your Wealth from Inflation
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
            Take direct positions on inflation markets. Go long to hedge your purchasing power, or short if you expect deflation. Start with US CPI or explore specialized markets.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button onClick={handleStartTrading} className="text-lg px-10 py-6">
              Start Trading <ArrowRight className="w-5 h-5 ml-2" />
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
              <span className="text-gray-300 text-sm font-medium">Non-custodial</span>
            </div>
            <div className="flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <div className="w-8 h-8 rounded-md bg-yellow-500/10 text-yellow-500 flex items-center justify-center flex-shrink-0">
                <Sigma className="w-5 h-5" />
              </div>
              <span className="text-gray-300 text-sm font-medium">MPC + Chainlink</span>
            </div>
            <div className="flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <div className="w-8 h-8 rounded-md bg-yellow-500/10 text-yellow-500 flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <span className="text-gray-300 text-sm font-medium">Perpetual markets</span>
            </div>
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
              Hedge macro risks you actually face—like inflation and housing—using perpetuals anchored to real economic data instead of crypto spot prices.
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Start Trading?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Test the platform on Arbitrum Sepolia. Connect your wallet and explore our inflation markets with no risk to real funds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleStartTrading} className="text-lg px-8 py-6">
                Open Trade Ticket <ArrowRight className="w-5 h-5 ml-2" />
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

