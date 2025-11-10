import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';
import {
  Shield,
  TrendingUp,
  DollarSign,
  Clock,
  Unlock,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Building2,
  Landmark,
  Coins,
  Globe,
  Users,
  Zap,
  RefreshCw,
  Target,
  BarChart3
} from 'lucide-react';

export default function ComparisonsPage() {
  const [activeTab, setActiveTab] = useState('savers');

  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">How Does Inflation Market Compare?</h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            A realistic, data-driven comparison of inflation hedging options. We break down the actual differences so you can make informed decisions about protecting your purchasing power.
          </p>
        </header>

        {/* Tab Selection */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setActiveTab('savers')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'savers'
                ? 'bg-green-500/20 text-green-400 border-2 border-green-500/40'
                : 'bg-white/5 text-gray-400 border-2 border-white/10 hover:border-white/20'
            }`}
          >
            <Shield className="w-5 h-5 inline-block mr-2" />
            For Savers & Hedgers
          </button>
          <button
            onClick={() => setActiveTab('traders')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'traders'
                ? 'bg-blue-500/20 text-blue-400 border-2 border-blue-500/40'
                : 'bg-white/5 text-gray-400 border-2 border-white/10 hover:border-white/20'
            }`}
          >
            <TrendingUp className="w-5 h-5 inline-block mr-2" />
            For Traders & Speculators
          </button>
        </div>

        {/* Savers Comparison */}
        {activeTab === 'savers' && (
          <div className="space-y-12">
            {/* Quick Comparison Table */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Quick Comparison: Inflation Protection Options</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left p-4 text-gray-400 font-semibold">Feature</th>
                      <th className="text-center p-4 text-green-400 font-semibold">Inflation Market</th>
                      <th className="text-center p-4 text-gray-400 font-semibold">I Bonds</th>
                      <th className="text-center p-4 text-gray-400 font-semibold">TIPS</th>
                      <th className="text-center p-4 text-gray-400 font-semibold">Gold/Commodities</th>
                      <th className="text-center p-4 text-gray-400 font-semibold">High-Yield Savings</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-300 font-medium">CPI Tracking</td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><AlertCircle className="w-5 h-5 text-yellow-400 mx-auto" /></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-300 font-medium">Instant Liquidity</td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">12-month lock</div></td>
                      <td className="text-center p-4"><AlertCircle className="w-5 h-5 text-yellow-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">Bond market</div></td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-300 font-medium">No Purchase Limits</td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">$10k/year max</div></td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-300 font-medium">Non-Custodial</td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="text-center p-4"><AlertCircle className="w-5 h-5 text-yellow-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">If self-custody</div></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-300 font-medium">Permissionless Access</td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">US citizens only</div></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">Brokerage required</div></td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">KYC required</div></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-300 font-medium">24/7 Trading</td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">Market hours</div></td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><AlertCircle className="w-5 h-5 text-yellow-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-300 font-medium">No Expiry Date</td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">Perpetual</div></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">30-year maturity</div></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">Fixed maturity</div></td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-300 font-medium">Typical Annual Cost</td>
                      <td className="text-center p-4 text-green-400 font-semibold">~0.3% funding</td>
                      <td className="text-center p-4 text-gray-400">0% (fixed rate)</td>
                      <td className="text-center p-4 text-gray-400">~0.15% (ETF)</td>
                      <td className="text-center p-4 text-gray-400">~0.5% (ETF)</td>
                      <td className="text-center p-4 text-gray-400">0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Detailed Comparisons */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Detailed Breakdown</h2>

              {/* vs I Bonds */}
              <Card className="border-blue-500/30">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">vs. I Bonds (Series I Savings Bonds)</h3>
                    <p className="text-sm text-gray-400">US Treasury inflation-indexed savings bonds</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-3">✅ Inflation Market Advantages</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <Unlock className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Instant Liquidity:</strong> Close positions anytime with no penalties. I Bonds have a 12-month minimum hold period and forfeit 3 months interest if sold before 5 years.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <DollarSign className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>No Purchase Limits:</strong> Hedge any amount. I Bonds cap purchases at $10,000/year per person ($15k including tax refunds).
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Globe className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Global Access:</strong> Permissionless protocol open to anyone with a wallet. I Bonds are restricted to US citizens/residents only.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <RefreshCw className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Perpetual Positions:</strong> Hold indefinitely without maturity concerns. I Bonds stop earning interest after 30 years.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Funding Rate Income:</strong> Earn additional yield when you're on the favorable side of the market imbalance.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-3">⚠️ I Bonds Advantages</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Government Guarantee:</strong> Backed by the full faith and credit of the US government. No liquidation risk, no counterparty risk.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Fixed Base Rate:</strong> Guaranteed fixed rate (currently 0.9% + CPI) that never goes below zero. Inflation Market positions can lose value if on wrong side.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <DollarSign className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Tax Benefits:</strong> Federal tax only (no state/local taxes), and can defer until redemption or 30 years. Education exclusion available.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-blue-200">
                    <strong>Bottom Line:</strong> I Bonds are excellent for US-based savers with limited capital ($10k/year) who want guaranteed protection with no complexity. Inflation Market is better for larger amounts, global users, or those who need liquidity and flexibility.
                  </p>
                </div>
              </Card>

              {/* vs TIPS */}
              <Card className="border-purple-500/30">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">vs. TIPS (Treasury Inflation-Protected Securities)</h3>
                    <p className="text-sm text-gray-400">US Treasury bonds with principal adjusted for CPI</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-3">✅ Inflation Market Advantages</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>No Maturity Date:</strong> Perpetual positions with no need to roll. TIPS mature in 5, 10, or 30 years and must be repurchased.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Unlock className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Non-Custodial:</strong> You control your collateral via smart contracts. TIPS require a brokerage account (custody risk).
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>24/7 Trading:</strong> No market hours, weekends, or holidays. TIPS trade during standard bond market hours only.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Globe className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Permissionless:</strong> No KYC, no accreditation, no geography restrictions. TIPS require brokerage account with compliance.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <DollarSign className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Lower Entry Barriers:</strong> Start with any amount. TIPS typically require $1,000 minimum (or ETF wrapper with fees).
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-3">⚠️ TIPS Advantages</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>US Government Backing:</strong> Zero credit risk, backed by US Treasury. No smart contract risk.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Fixed Coupon Income:</strong> Guaranteed semi-annual interest payments adjusted for CPI. Predictable cash flow.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Building2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Institutional Acceptance:</strong> Widely accepted in traditional portfolios, pension funds, and retirement accounts (IRA-eligible).
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <DollarSign className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Deep Liquidity:</strong> $1.7+ trillion market with tight bid-ask spreads through major brokerages.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <p className="text-sm text-purple-200">
                    <strong>Bottom Line:</strong> TIPS are ideal for traditional investors seeking government-backed safety and institutional acceptance. Inflation Market offers superior flexibility, global access, and non-custodial control—but requires comfort with DeFi and smart contract risk.
                  </p>
                </div>
              </Card>

              {/* vs Gold/Commodities */}
              <Card className="border-yellow-500/30">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center">
                    <Coins className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">vs. Gold & Commodity Hedges</h3>
                    <p className="text-sm text-gray-400">Physical gold, gold ETFs, commodity baskets</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-3">✅ Inflation Market Advantages</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Direct CPI Correlation:</strong> Position value tracks actual US CPI increases 1:1. Gold has imperfect correlation (~0.5-0.6 historically) and can diverge significantly.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <BarChart3 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Lower Volatility:</strong> Anchored to stable CPI data. Gold can swing ±20% annually even when inflation is stable.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>No Storage Costs:</strong> Pure digital collateral in smart contracts. Physical gold requires secure storage (~0.5-1% annually) or ETF fees.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <RefreshCw className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Funding Rate Income:</strong> Earn yield from funding payments. Gold generates no income (negative real return after storage).
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Programmable:</strong> Composable with DeFi protocols, can build automated strategies. Gold/commodities are static holdings.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-3">⚠️ Gold/Commodities Advantages</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>5,000+ Year Track Record:</strong> Proven store of value across civilizations. Inflation Market is a new protocol (higher risk).
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>No Technology Risk:</strong> Physical gold has no smart contract risk, no oracle risk, no protocol risk. It just exists.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Globe className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Universal Acceptance:</strong> Recognized globally, liquid in any country. Not dependent on blockchain infrastructure.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Upside Potential:</strong> Gold can outperform CPI during crises (e.g., 1970s: gold +2,300%, CPI +112%). Inflation Market caps gains at CPI.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-sm text-yellow-200">
                    <strong>Bottom Line:</strong> Gold is a time-tested hedge with no technology risk, but it's volatile and has imperfect CPI correlation. Inflation Market provides precise CPI tracking with lower volatility—ideal for those who want mathematical certainty over historical precedent.
                  </p>
                </div>
              </Card>

              {/* vs High-Yield Savings */}
              <Card className="border-red-500/30">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">vs. High-Yield Savings Accounts</h3>
                    <p className="text-sm text-gray-400">Online banks offering 4-5% APY (Marcus, Ally, etc.)</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-3">✅ Inflation Market Advantages</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>True Inflation Protection:</strong> Long positions gain when CPI rises, directly preserving purchasing power. Savings accounts lose real value when inflation exceeds APY.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <BarChart3 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Better Real Returns:</strong> If CPI is 4% and APY is 4.5%, real return is 0.5%. Inflation Market long position captures full 4% + funding rate.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Unlock className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Non-Custodial:</strong> No bank can freeze your account, impose withdrawal limits, or fail. Smart contracts execute automatically.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Globe className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Global Access:</strong> Permissionless protocol. High-yield savings require US residency, SSN, and pass KYC/AML checks.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-3">⚠️ Savings Account Advantages</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>FDIC Insurance:</strong> Up to $250k per depositor protected by US government. Zero risk of losing principal.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Simplicity:</strong> Deposit money, earn interest, withdraw anytime. No smart contracts, oracles, or DeFi concepts to understand.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <DollarSign className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Guaranteed Returns:</strong> APY is locked and predictable. Inflation Market funding rates fluctuate based on market dynamics.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Building2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Mainstream Acceptance:</strong> Compatible with traditional banking (ACH, wire transfers, bill pay). Easy to move fiat in/out.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-200">
                    <strong>Reality Check:</strong> When CPI is 3.5% and savings APY is 4.5%, you're earning a 1% real return—adequate for stability. But when inflation spikes to 7% (like 2022), that same 4.5% APY means you're losing 2.5% purchasing power annually. Inflation Market long positions would have tracked that 7% increase, preserving your buying power. The trade-off: FDIC safety vs. true inflation protection.
                  </p>
                </div>
              </Card>
            </section>

            {/* Real-World Scenarios */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Real-World Performance Scenarios</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Scenario 1: Normal Inflation */}
                <Card className="border-blue-500/30">
                  <h3 className="text-xl font-bold text-white mb-4">📊 Scenario 1: Stable Inflation (3% CPI)</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
                      <div className="font-semibold text-green-400">Inflation Market (Long)</div>
                      <div className="text-gray-300">$10,000 → $10,300</div>
                      <div className="text-xs text-gray-400">+3% position value + funding rate</div>
                    </div>
                    <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                      <div className="font-semibold text-blue-400">I Bonds</div>
                      <div className="text-gray-300">$10,000 → $10,390</div>
                      <div className="text-xs text-gray-400">3% CPI + 0.9% fixed rate</div>
                    </div>
                    <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                      <div className="font-semibold text-purple-400">TIPS</div>
                      <div className="text-gray-300">$10,000 → $10,320</div>
                      <div className="text-xs text-gray-400">3% CPI + 0.2% coupon (current)</div>
                    </div>
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                      <div className="font-semibold text-yellow-400">Gold</div>
                      <div className="text-gray-300">$10,000 → $10,180</div>
                      <div className="text-xs text-gray-400">1.8% (imperfect correlation)</div>
                    </div>
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded">
                      <div className="font-semibold text-red-400">High-Yield Savings (4.5%)</div>
                      <div className="text-gray-300">$10,000 → $10,450</div>
                      <div className="text-xs text-gray-400">Real return: 1.5% after inflation</div>
                    </div>
                  </div>
                </Card>

                {/* Scenario 2: High Inflation */}
                <Card className="border-orange-500/30">
                  <h3 className="text-xl font-bold text-white mb-4">🔥 Scenario 2: High Inflation (7% CPI, like 2022)</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
                      <div className="font-semibold text-green-400">Inflation Market (Long)</div>
                      <div className="text-gray-300">$10,000 → $10,700</div>
                      <div className="text-xs text-gray-400">+7% tracks CPI exactly</div>
                    </div>
                    <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                      <div className="font-semibold text-blue-400">I Bonds</div>
                      <div className="text-gray-300">$10,000 → $10,790</div>
                      <div className="text-xs text-gray-400">7% CPI + 0.9% fixed (best option)</div>
                    </div>
                    <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                      <div className="font-semibold text-purple-400">TIPS</div>
                      <div className="text-gray-300">$10,000 → $10,720</div>
                      <div className="text-xs text-gray-400">7% CPI + 0.2% coupon</div>
                    </div>
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                      <div className="font-semibold text-yellow-400">Gold</div>
                      <div className="text-gray-300">$10,000 → $10,350</div>
                      <div className="text-xs text-gray-400">~5% (50% correlation)</div>
                    </div>
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded">
                      <div className="font-semibold text-red-400">High-Yield Savings (4.5%)</div>
                      <div className="text-gray-300">$10,000 → $10,450</div>
                      <div className="text-xs text-red-400">Real loss: -2.5% purchasing power</div>
                    </div>
                  </div>
                </Card>

                {/* Scenario 3: Deflation */}
                <Card className="border-cyan-500/30">
                  <h3 className="text-xl font-bold text-white mb-4">❄️ Scenario 3: Deflation (-2% CPI)</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded">
                      <div className="font-semibold text-red-400">Inflation Market (Long)</div>
                      <div className="text-gray-300">$10,000 → $9,800</div>
                      <div className="text-xs text-gray-400">-2% position loss (wrong side)</div>
                    </div>
                    <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                      <div className="font-semibold text-blue-400">I Bonds</div>
                      <div className="text-gray-300">$10,000 → $10,000</div>
                      <div className="text-xs text-gray-400">Floor at 0% (principal protected)</div>
                    </div>
                    <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                      <div className="font-semibold text-purple-400">TIPS</div>
                      <div className="text-gray-300">$10,000 → $9,820</div>
                      <div className="text-xs text-gray-400">-2% principal + 0.2% coupon</div>
                    </div>
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                      <div className="font-semibold text-yellow-400">Gold</div>
                      <div className="text-gray-300">$10,000 → $9,500</div>
                      <div className="text-xs text-gray-400">-5% (often falls in deflation)</div>
                    </div>
                    <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
                      <div className="font-semibold text-green-400">High-Yield Savings (4.5%)</div>
                      <div className="text-gray-300">$10,000 → $10,450</div>
                      <div className="text-xs text-green-400">Real gain: 6.5% purchasing power!</div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <p className="text-sm text-orange-200">
                  <strong>Key Insight (Long Positions):</strong> Inflation Market long positions excel when CPI is rising (the primary concern for savers). In deflationary scenarios (rare in modern economies), traditional savings accounts win. I Bonds offer the best of both worlds with principal protection—but with strict limits and lock-up periods.
                </p>
              </div>
            </section>

            {/* Short Position Scenarios */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Short Position Performance</h2>
              <p className="text-gray-400 mb-6 text-center max-w-3xl mx-auto">
                If you believe inflation will fall or want to hedge against deflationary environments, short positions offer the inverse exposure. Here's how shorts perform:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Scenario 1: Normal Inflation - Short Loses */}
                <Card className="border-red-500/30">
                  <h3 className="text-xl font-bold text-white mb-4">📊 Scenario 1: Stable Inflation (3% CPI) - Short Position</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded">
                      <div className="font-semibold text-red-400">Inflation Market (Short)</div>
                      <div className="text-gray-300">$10,000 → $9,700</div>
                      <div className="text-xs text-red-400">-3% position value (wrong side)</div>
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded">
                      <p className="text-xs text-blue-200">
                        <strong>Analysis:</strong> When inflation rises and you're short, you lose. Your position loses 3% while the real CPI gained 3%. This is the opposite of hedging—you're speculating that inflation will be lower than expected.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Scenario 2: High Inflation - Short Gets Crushed */}
                <Card className="border-red-500/30">
                  <h3 className="text-xl font-bold text-white mb-4">🔥 Scenario 2: High Inflation (7% CPI) - Short Position</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded">
                      <div className="font-semibold text-red-400">Inflation Market (Short)</div>
                      <div className="text-gray-300">$10,000 → $9,300</div>
                      <div className="text-xs text-red-400">-7% position loss (very wrong side)</div>
                    </div>
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded">
                      <p className="text-xs text-red-200">
                        <strong>Warning:</strong> Short positions in high inflation environments lose significantly. In 2022 when CPI hit 7%, shorts would have lost 7% while longs preserved purchasing power. Only short if you have conviction that inflation will fall.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Scenario 3: Deflation - Short Wins */}
                <Card className="border-green-500/30">
                  <h3 className="text-xl font-bold text-white mb-4">❄️ Scenario 3: Deflation (-2% CPI) - Short Position</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
                      <div className="font-semibold text-green-400">Inflation Market (Short)</div>
                      <div className="text-gray-300">$10,000 → $10,200</div>
                      <div className="text-xs text-green-400">+2% position gain (right side!)</div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded">
                      <p className="text-xs text-green-200">
                        <strong>Payoff:</strong> Short positions profit when CPI falls (deflation). Rare in modern economies, but if you correctly predict deflationary periods (2008-2009, COVID-19 initial shock), shorts deliver positive returns. Use for macro speculation or hedging deflationary business models.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <p className="text-sm text-purple-200">
                  <strong>Key Insight (Short Positions):</strong> Shorts are for speculators who believe inflation will undershoot expectations or for businesses that benefit from deflation. Historical data shows inflation is more common than deflation in developed economies (3% average since 1990), making shorts a contrarian bet. Use with conviction and risk management.
                </p>
              </div>
            </section>
          </div>
        )}

        {/* Traders Comparison */}
        {activeTab === 'traders' && (
          <div className="space-y-12">
            {/* Quick Comparison Table */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Quick Comparison: Macro Trading Platforms</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left p-4 text-gray-400 font-semibold">Feature</th>
                      <th className="text-center p-4 text-blue-400 font-semibold">Inflation Market</th>
                      <th className="text-center p-4 text-gray-400 font-semibold">Crypto Perps<br/>(dYdX, GMX)</th>
                      <th className="text-center p-4 text-gray-400 font-semibold">TradFi Futures<br/>(CME, ICE)</th>
                      <th className="text-center p-4 text-gray-400 font-semibold">Prediction Markets<br/>(Polymarket)</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-300 font-medium">Real Economic Data</td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">US CPI + Treasury</div></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">Crypto prices</div></td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">CPI derivatives</div></td>
                      <td className="text-center p-4"><AlertCircle className="w-5 h-5 text-yellow-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">Binary events</div></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-300 font-medium">Permissionless</td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">Accreditation req.</div></td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-300 font-medium">Perpetual (No Expiry)</td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">Quarterly rolls</div></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">Fixed resolution</div></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-300 font-medium">Leverage Available</td>
                      <td className="text-center p-4 text-blue-400 font-semibold">Up to 10x</td>
                      <td className="text-center p-4 text-gray-400">Up to 20x+</td>
                      <td className="text-center p-4 text-gray-400">5-10x typical</td>
                      <td className="text-center p-4 text-gray-400">None</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-300 font-medium">Liquidity Depth</td>
                      <td className="text-center p-4 text-yellow-400">Low (new protocol)</td>
                      <td className="text-center p-4 text-green-400">High ($100M+ OI)</td>
                      <td className="text-center p-4 text-green-400">Very High ($B)</td>
                      <td className="text-center p-4 text-yellow-400">Medium ($M)</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-300 font-medium">24/7 Trading</td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-300 font-medium">Non-Custodial</td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                      <td className="text-center p-4"><AlertCircle className="w-5 h-5 text-yellow-400 mx-auto" /><div className="text-xs text-gray-500 mt-1">Varies by DEX</div></td>
                      <td className="text-center p-4"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="text-center p-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-300 font-medium">Trading Fees</td>
                      <td className="text-center p-4 text-blue-400 font-semibold">0.05-0.1%</td>
                      <td className="text-center p-4 text-gray-400">0.05-0.1%</td>
                      <td className="text-center p-4 text-gray-400">$1-5 per contract</td>
                      <td className="text-center p-4 text-gray-400">2-5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Detailed Comparisons */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Detailed Breakdown</h2>

              {/* vs Crypto Perps */}
              <Card className="border-purple-500/30">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">vs. Crypto Perpetual DEXs (dYdX, GMX, Hyperliquid)</h3>
                    <p className="text-sm text-gray-400">Decentralized perps for BTC, ETH, and crypto altcoins</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-3">✅ Inflation Market Advantages</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Real Economic Exposure:</strong> Trade on US CPI and Treasury yields—actual macro indicators. Crypto perps only offer exposure to speculative crypto price movements.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <BarChart3 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Lower Volatility:</strong> CPI moves 2-7% annually. BTC can swing ±60% in a year, making it unsuitable for hedging real purchasing power.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Predictable Data Source:</strong> Government CPI releases are scheduled and verifiable. Crypto prices are driven by sentiment, news, and manipulation.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Macro Fundamentals:</strong> Trade your view on inflation, Fed policy, and economic cycles—not crypto narratives or meme coins.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-3">⚠️ Crypto Perps Advantages</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <DollarSign className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Deep Liquidity:</strong> dYdX has $500M+ daily volume. Inflation Market is new with limited liquidity (higher slippage risk).
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Higher Leverage:</strong> Up to 20-50x leverage available. More capital efficiency for experienced traders.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Upside Potential:</strong> Crypto can 10x in bull markets. CPI is capped at single-digit growth, limiting max gains.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Globe className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Proven Infrastructure:</strong> Battle-tested protocols with years of track record, billions in TVL, and robust risk management.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <p className="text-sm text-purple-200">
                    <strong>Bottom Line:</strong> Crypto perps are for speculating on crypto price movements. Inflation Market is for expressing views on real economic data (inflation, monetary policy). Different tools for different strategies—use crypto perps for crypto exposure, Inflation Market for macro hedging.
                  </p>
                </div>
              </Card>

              {/* vs TradFi Futures */}
              <Card className="border-orange-500/30">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">vs. Traditional Finance Futures (CME, ICE)</h3>
                    <p className="text-sm text-gray-400">Institutional inflation swaps and CPI futures</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-3">✅ Inflation Market Advantages</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <Globe className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Permissionless Access:</strong> No accreditation, no minimum capital, no KYC. TradFi inflation swaps require institutional status and $100k+ minimums.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <RefreshCw className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Perpetual Positions:</strong> No quarterly rolls, no expiry management. TradFi futures require rolling contracts every 3 months (cost and friction).
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Unlock className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Non-Custodial:</strong> Smart contracts hold collateral, you control keys. TradFi requires margin accounts with brokers (counterparty risk).
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>24/7 Trading:</strong> Markets never close. CME futures trade only during exchange hours (9:30am-4pm ET + limited after-hours).
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Composability:</strong> Integrate with DeFi protocols, build automated strategies. TradFi is siloed and manual.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-3">⚠️ TradFi Futures Advantages</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <DollarSign className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Massive Liquidity:</strong> CME CPI futures have billions in open interest. Tight spreads, instant fills, minimal slippage.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Regulatory Oversight:</strong> CFTC-regulated, clearinghouse guarantees. No smart contract risk, no oracle risk, no protocol risk.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Building2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Institutional Acceptance:</strong> Recognized by pension funds, hedge funds, and corporate treasuries. Auditable and compliant.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Decades of History:</strong> Proven infrastructure with long track record. CME Group founded in 1898—not a new experiment.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <p className="text-sm text-orange-200">
                    <strong>Bottom Line:</strong> TradFi inflation swaps are the gold standard for institutions—deep liquidity, regulatory safety, proven infrastructure. Inflation Market brings the same economic exposure to retail and global users who are locked out of TradFi due to minimums, accreditation, or geography. Trade-off: DeFi flexibility vs. institutional safety.
                  </p>
                </div>
              </Card>

              {/* vs Prediction Markets */}
              <Card className="border-cyan-500/30">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">vs. Prediction Markets (Polymarket, Kalshi)</h3>
                    <p className="text-sm text-gray-400">Binary outcome markets for macro events</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-3">✅ Inflation Market Advantages</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <BarChart3 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Continuous Price Exposure:</strong> Your position tracks CPI changes continuously. Prediction markets only pay on binary outcomes (e.g., "Will CPI be above 3%?").
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <RefreshCw className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Perpetual Positions:</strong> Hold for years without worrying about resolution dates. Prediction markets resolve and close at specific dates.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <DollarSign className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Lower Fees:</strong> 0.05-0.1% trading fees. Polymarket charges 2-5% spreads on low-liquidity markets.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Leverage Available:</strong> Up to 10x leverage for capital efficiency. Prediction markets are 1:1 (no leverage).
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>True Hedging:</strong> Position value moves proportionally with CPI. Binary bets don't provide granular hedging—you win or lose 100%.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-3">⚠️ Prediction Markets Advantages</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Simplicity:</strong> Easy to understand: "Will X happen? Yes or No." No need to understand perpetuals, funding rates, or leverage.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Defined Risk:</strong> Max loss is known upfront (amount invested). Leveraged perps can liquidate you if you're wrong.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Globe className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Diverse Markets:</strong> Bet on elections, sports, geopolitics, company earnings—not just economic indicators.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Lower Complexity:</strong> No funding rates, no liquidation risk, no margin management. Buy shares, wait for resolution, collect winnings.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <p className="text-sm text-cyan-200">
                    <strong>Bottom Line:</strong> Prediction markets are for binary bets on specific outcomes (e.g., "Will CPI exceed 4% in Q1 2025?"). Inflation Market is for continuous exposure to CPI changes—better for hedging real purchasing power over time. Use prediction markets for event-based speculation, Inflation Market for macro hedging strategies.
                  </p>
                </div>
              </Card>
            </section>

            {/* When to Use What */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-6">When to Use What?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-green-500/30">
                  <h3 className="text-xl font-bold text-green-400 mb-4">✅ Choose Inflation Market When You Want To...</h3>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Trade directly on US CPI and Treasury data (real macro fundamentals)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Express long-term views on inflation without quarterly contract rolls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Avoid KYC, accreditation, and minimum capital requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Maintain non-custodial control of your funds (no broker risk)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Access 24/7 trading with no market hour restrictions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Build composable strategies with DeFi protocols</span>
                    </li>
                  </ul>
                </Card>

                <Card className="border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">⚠️ Choose Alternatives When You Need...</h3>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Deep Liquidity:</strong> Use TradFi futures (CME) or established crypto perps (dYdX) if you're trading large size ($1M+)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Zero Tech Risk:</strong> Use I Bonds or TIPS if you can't tolerate smart contract risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Crypto Price Exposure:</strong> Use crypto perps (GMX, Hyperliquid) if you want to trade BTC/ETH, not economic data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Binary Event Bets:</strong> Use prediction markets (Polymarket) for yes/no outcomes on specific dates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Regulatory Compliance:</strong> Use TradFi if you need CFTC oversight and institutional auditability</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </section>
          </div>
        )}

        {/* CTA Section */}
        <section className="pt-8">
          <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-2 border-yellow-500/40 text-center p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Test the platform on Arbitrum Sepolia. Connect your wallet and explore our inflation markets with no risk to real funds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/app">
                <Button className="text-lg px-8 py-6 w-full">
                  Get Started <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/markets">
                <Button variant="ghost" className="text-lg px-8 py-6 w-full">
                  Browse Markets
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
