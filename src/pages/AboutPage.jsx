import React from 'react';
import { Card } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';
import { Lightbulb, ShieldCheck, Sigma, Layers, Users, BookOpen, Gavel, Network, Server, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />
      
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        <header className="text-center space-y-3">
          <h1 className="text-5xl font-bold text-white">About Inflation Market</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">We are building a non‑custodial protocol for hedging real‑world macro risks—starting with inflation—through perpetual markets anchored to transparent data.</p>
        </header>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-2 border-yellow-500/40">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 text-yellow-500 flex items-center justify-center"><Lightbulb className="w-5 h-5"/></div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Mission</h2>
              <p className="text-gray-300">Democratize access to institutional‑grade macro hedging tools so individuals, DAOs, and institutions can protect purchasing power, express macro views, and build new products—without relying on custodians.</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center"><BookOpen className="w-5 h-5"/></div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Inspiration</h2>
              <p className="text-gray-300">Our approach is inspired by academic work on “macro markets,” notably by economist Robert J. Shiller, which argues that society benefits when people can trade and insure against broad economic risks like inflation, housing, and GDP growth. Inflation Market adapts that vision to a transparent, permissionless, on‑chain protocol.</p>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-white mb-4">What We’re Building</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 mb-2 text-yellow-500"><ShieldCheck className="w-4 h-4"/><span className="text-white font-semibold">Non‑custodial</span></div>
              <p className="text-sm text-gray-300">Collateral and settlement are handled by smart contracts; users keep control of their assets.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 mb-2 text-yellow-500"><Sigma className="w-4 h-4"/><span className="text-white font-semibold">Hybrid Oracle</span></div>
              <p className="text-sm text-gray-300">An MPC aggregation layer with Chainlink delivery publishes index values on‑chain with verifiable provenance.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 mb-2 text-yellow-500"><Layers className="w-4 h-4"/><span className="text-white font-semibold">Perpetual Markets</span></div>
              <p className="text-sm text-gray-300">AMM‑priced perpetuals with funding to align mark and index; no expiries, open entry/exit.</p>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-white mb-4">How We Operate</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 mb-2 text-yellow-500"><Users className="w-4 h-4"/><span className="text-white font-semibold">Open Participation</span></div>
              <p className="text-sm text-gray-300">Designed for public access with region‑aware controls where appropriate; documentation and SDKs guide integrations.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 mb-2 text-yellow-500"><Gavel className="w-4 h-4"/><span className="text-white font-semibold">Security & Reviews</span></div>
              <p className="text-sm text-gray-300">Multiple audit rounds and an incentive‑aligned bug bounty before mainnet. Risk telemetry and circuit‑breakers on launch.</p>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-white mb-4">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-300">
            <div className="flex items-center gap-3"><Server className="w-4 h-4 text-yellow-500"/><span>Smart contracts: Solidity ^0.8.20</span></div>
            <div className="flex items-center gap-3"><Zap className="w-4 h-4 text-yellow-500"/><span>Frontend: React + Tailwind</span></div>
            <div className="flex items-center gap-3"><Network className="w-4 h-4 text-yellow-500"/><span>Chain: Arbitrum (L2) for low fees</span></div>
            <div className="flex items-center gap-3"><Sigma className="w-4 h-4 text-yellow-500"/><span>Oracles: MPC aggregation + Chainlink</span></div>
            <div className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-yellow-500"/><span>Security: Audits + bug bounty planned</span></div>
          </div>
        </Card>
      </main>

      <SiteFooter />
    </div>
  );
}
