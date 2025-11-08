import React from 'react';
import { Card } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';
import { Wallet, DollarSign, TrendingUp, CheckCircle, Shield, Sigma } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">How Inflation Market Works</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A complete guide to protecting your savings and trading macroeconomic risk
          </p>
        </div>

        {/* Value snapshot */}
        <section>
          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-2 border-yellow-500/40">
            <h2 className="text-3xl font-bold text-white mb-6">What Is Inflation Market?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-xl border border-yellow-500/30 bg-black/30 p-5">
                <div className="flex items-center gap-3 mb-2 text-yellow-500"><Shield className="w-5 h-5"/><span className="font-bold text-white">Non-custodial</span></div>
                <p className="text-gray-300 text-sm">Open, on-chain perpetuals tied to macro indexes (CPI, housing, GDP) — not crypto spot.</p>
              </div>
              <div className="rounded-xl border border-yellow-500/30 bg-black/30 p-5">
                <div className="flex items-center gap-3 mb-2 text-yellow-500"><Sigma className="w-5 h-5"/><span className="font-bold text-white">Mechanics</span></div>
                <p className="text-gray-300 text-sm">Hybrid oracle publishes the index. An AMM sets the mark price. Funding aligns mark to index.</p>
              </div>
              <div className="rounded-xl border border-yellow-500/30 bg-black/30 p-5">
                <div className="flex items-center gap-3 mb-2 text-yellow-500"><TrendingUp className="w-5 h-5"/><span className="font-bold text-white">Perpetuals</span></div>
                <p className="text-gray-300 text-sm">No expiry; add/remove margin, manage leverage, and close any time.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Five steps */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Five Steps</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="p-4 rounded-lg border border-yellow-500/20 bg-white/5">
              <div className="flex items-center gap-2 mb-2 text-yellow-500"><Wallet className="w-4 h-4"/><span className="text-white font-semibold">Connect</span></div>
              <p className="text-sm text-gray-300">Connect your wallet and select the supported network.</p>
            </div>
            <div className="p-4 rounded-lg border border-yellow-500/20 bg-white/5">
              <div className="flex items-center gap-2 mb-2 text-yellow-500"><DollarSign className="w-4 h-4"/><span className="text-white font-semibold">Fund</span></div>
              <p className="text-sm text-gray-300">Deposit USDC as margin. Start conservatively (e.g., 2-5x leverage).</p>
            </div>
            <div className="p-4 rounded-lg border border-yellow-500/20 bg-white/5">
              <div className="flex items-center gap-2 mb-2 text-yellow-500"><TrendingUp className="w-4 h-4"/><span className="text-white font-semibold">Select</span></div>
              <p className="text-sm text-gray-300">Choose CPI, housing, or GDP markets and set slippage/funding prefs.</p>
            </div>
            <div className="p-4 rounded-lg border border-yellow-500/20 bg-white/5">
              <div className="flex items-center gap-2 mb-2 text-yellow-500"><CheckCircle className="w-4 h-4"/><span className="text-white font-semibold">Open</span></div>
              <p className="text-sm text-gray-300">Approve, then confirm the trade. The AMM sets the mark price.</p>
            </div>
            <div className="p-4 rounded-lg border border-yellow-500/20 bg-white/5">
              <div className="flex items-center gap-2 mb-2 text-yellow-500"><Shield className="w-4 h-4"/><span className="text-white font-semibold">Manage</span></div>
              <p className="text-sm text-gray-300">Monitor funding and health. Add/remove margin. Close any time.</p>
            </div>
          </div>
        </section>

        {/* Funding & Pricing */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Funding and Pricing</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <div className="text-xl font-bold text-white mb-2">Index Oracle</div>
              <div className="text-gray-300">The hybrid MPC + Chainlink pipeline publishes the latest index value on-chain after multi-party verification.</div>
            </Card>
            <Card>
              <div className="text-xl font-bold text-white mb-2">Mark Price & AMM</div>
              <div className="text-gray-300">The AMM quotes a trade price (mark) that can drift from index. Funding payments between longs/shorts pull it back toward fair value.</div>
            </Card>
          </div>
          <Card className="bg-white/5 border-white/10">
            <div className="text-sm font-bold text-white mb-3">Simple math</div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="rounded-md bg-black/40 border border-white/10 p-3 font-mono text-yellow-200 overflow-x-auto">
                FundingRate ≈ k · (Mark − Index) / Index
                <div className="mt-2 text-xs text-gray-300">If mark is above index, longs pay shorts; if below, shorts pay longs. k controls how strongly funding pulls mark toward index.</div>
              </div>
              <div className="rounded-md bg-black/40 border border-white/10 p-3 font-mono text-yellow-200 overflow-x-auto">
                HealthRatio = Collateral / MaintenanceMargin
                <div className="mt-2 text-xs text-gray-300">Keep this ≥ 1.0. If it drops below 1, your position can be liquidated to protect the system.</div>
              </div>
            </div>
          </Card>
        </section>

        

        {/* Glossary (last) */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Glossary</h2>
          <Card>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
              <div>
                <div className="text-sm font-semibold text-white">CPI</div>
                <p>Consumer Price Index, a measure of average consumer price changes. Demo references CPI‑U (monthly, NSA).</p>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Index Price</div>
                <p>The oracle‑delivered value of the economic index (e.g., latest CPI level).</p>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Mark Price</div>
                <p>The AMM‑derived trade price used for PnL and funding, which tends toward the index via funding.</p>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Funding</div>
                <p>Periodic cash flow between longs and shorts that encourages mark and index to converge.</p>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Maintenance Margin</div>
                <p>The minimum collateral required to keep a position open; falling below it can trigger liquidation.</p>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Leverage</div>
                <p>Position size relative to collateral (e.g., 5×). Increases both PnL and risk.</p>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
