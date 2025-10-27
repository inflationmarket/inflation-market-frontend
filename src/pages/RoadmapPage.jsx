import React from 'react';
import { Card } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Our Roadmap</h1>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
            Building the foundational risk management layer for the new financial system
          </p>
        </div>

        <Card className="mb-16 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-2 border-yellow-500/40">
          <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            We will achieve this through a focused, three-phase roadmap that systematically expands our product from a niche tool for innovators into an essential piece of global financial infrastructure.
          </p>
        </Card>

        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/40 flex items-center justify-center text-yellow-500 font-bold">1</div>
            <h2 className="text-3xl font-bold text-white">Phase 1 — Testnet Maturation</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card><div className="text-white font-bold mb-2">Public Testnet v2</div><div className="text-gray-300">Upgraded vaults, position manager, and AMM with improved risk parameters and monitoring.</div></Card>
            <Card><div className="text-white font-bold mb-2">Developer Tooling</div><div className="text-gray-300">SDKs, docs, and a reference integration path for partners.</div></Card>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/40 flex items-center justify-center text-yellow-500 font-bold">2</div>
            <h2 className="text-3xl font-bold text-white">Phase 2 — Guarded Mainnet</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card><div className="text-white font-bold mb-2">Mainnet Launch</div><div className="text-gray-300">Guarded rollout with caps and progressive parameter tuning.</div></Card>
            <Card><div className="text-white font-bold mb-2">Risk/Compliance</div><div className="text-gray-300">Liquidity incentives, formal audits, and hardened infra.</div></Card>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/40 flex items-center justify-center text-yellow-500 font-bold">3</div>
            <h2 className="text-3xl font-bold text-white">Phase 3 — Expansion</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card><div className="text-white font-bold mb-2">New Macro Markets</div><div className="text-gray-300">Expanded index coverage and bespoke hedging products.</div></Card>
            <Card><div className="text-white font-bold mb-2">Integrations</div><div className="text-gray-300">Wallets, analytics platforms, and institutional tooling.</div></Card>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
