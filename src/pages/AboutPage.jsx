import React from 'react';
import { Card } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';
import { Lightbulb, ShieldCheck, Sigma, Layers, Users, BookOpen, Gavel, Network, Server, Zap, Globe, TrendingUp, Lock, Award, Target, Zap as AlwaysOn, Globe2, DollarSign, Box } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />
      
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        <header className="text-center space-y-3">
          <h1 className="text-5xl font-bold text-white">About Inflation Market</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">Bringing Nobel Prize-winning economic theory to life through a decentralized protocol that makes institutional-grade macro risk hedging accessible to everyone.</p>
        </header>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-2 border-purple-500/40">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-500 flex items-center justify-center"><Target className="w-5 h-5"/></div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Our North Star</h2>
              <p className="text-xl text-purple-200 font-semibold mb-4">Make Economic Security a Public Utility</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <AlwaysOn className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0"/>
                  <div>
                    <p className="text-white font-semibold">Always On</p>
                    <p className="text-sm text-gray-400">Reliable and decentralized</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0"/>
                  <div>
                    <p className="text-white font-semibold">Accessible to All</p>
                    <p className="text-sm text-gray-400">Permissionless and open</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0"/>
                  <div>
                    <p className="text-white font-semibold">Fairly Priced</p>
                    <p className="text-sm text-gray-400">Transparent, with low, protocol-based fees</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Box className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0"/>
                  <div>
                    <p className="text-white font-semibold">Essential</p>
                    <p className="text-sm text-gray-400">A foundational layer that other things can be built upon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

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
              <h2 className="text-2xl font-bold text-white mb-2">The Shiller Vision</h2>
              <p className="text-gray-300 mb-4">Our protocol is built on the foundational work of Nobel laureate Robert J. Shiller, whose "Macro Markets" concept revolutionized thinking about economic risk management. Shiller identified three critical principles for democratizing access to macro hedging:</p>
              <div className="space-y-3 mt-4">
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0"/>
                  <div>
                    <p className="text-white font-semibold">Universal Access</p>
                    <p className="text-sm text-gray-400">Tools to hedge society's biggest risks should not be exclusive to large institutions—they should be accessible to everyone.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0"/>
                  <div>
                    <p className="text-white font-semibold">Long-Term Instruments</p>
                    <p className="text-sm text-gray-400">Hedging tools should support continuous, long-duration protection measured in months, years, or decades—not just short-term speculation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0"/>
                  <div>
                    <p className="text-white font-semibold">Real Economic Anchors</p>
                    <p className="text-sm text-gray-400">Value must derive from real-world economic data—Treasury yields, inflation rates, GDP—not self-referential speculative prices.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-2 border-blue-500/30">
          <h2 className="text-2xl font-bold text-white mb-4">How We Embody Shiller's Principles</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-blue-400"/>
                <h3 className="text-lg font-semibold text-white">Radically Democratized Access</h3>
              </div>
              <p className="text-gray-300 ml-7">Built on Arbitrum Layer 2, our protocol is permissionless and open to anyone worldwide. Whether you're protecting $100 in savings or managing a $10M treasury, there are no gatekeepers, no broker intermediaries, and no minimum capital requirements. You maintain full self-custody of your assets at all times.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-400"/>
                <h3 className="text-lg font-semibold text-white">Perpetual Protection</h3>
              </div>
              <p className="text-gray-300 ml-7">Our perpetual swap architecture enables true long-term hedging with no expiration dates. Hold positions for days, months, or years. The simplified "Protection Level" interface encourages "set and forget" savings protection rather than frenetic trading, while our roadmap includes fixed-term instruments (2-5 year horizons) for even more sophisticated planning.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-blue-400"/>
                <h3 className="text-lg font-semibold text-white">Real Economy Foundation</h3>
              </div>
              <p className="text-gray-300 ml-7">Every market's "North Star" is a calculated index anchored to fundamental economic data: US Treasury yields and the Consumer Price Index for our Real Yield market. Our funding mechanism incorporates real-world data drift, not just trader sentiment. Future expansion to housing, GDP, and other macro indices will deepen this connection to the real economy.</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-2 border-green-500/30">
          <h2 className="text-2xl font-bold text-white mb-4">Our Unique Value Proposition</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-green-400"/>
                <h3 className="text-lg font-semibold text-white">For Savers & Individuals</h3>
              </div>
              <p className="text-gray-300 ml-7">The world's first truly accessible, continuous, self-custodial tool to protect savings from inflation. Think of it as a "real yield" savings account that preserves and grows purchasing power—not just chasing speculative returns. Protect what matters most without institutional barriers.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-5 h-5 text-green-400"/>
                <h3 className="text-lg font-semibold text-white">For Traders & Institutions</h3>
              </div>
              <p className="text-gray-300 ml-7">A capital-efficient venue to speculate on or hedge against the most important forces in the global economy. Access a new on-chain asset class enabling sophisticated strategies currently impossible in DeFi—from macro trend following to portfolio risk management.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Network className="w-5 h-5 text-green-400"/>
                <h3 className="text-lg font-semibold text-white">For the DeFi Ecosystem</h3>
              </div>
              <p className="text-gray-300 ml-7">A foundational "money lego" primitive for pricing and transferring macro risk. Our infrastructure enables other protocols to build more sophisticated financial products on top, making the entire ecosystem more resilient, mature, and connected to real-world economic forces.</p>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-white mb-4">Technical Architecture</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 mb-2 text-yellow-500"><Lock className="w-4 h-4"/><span className="text-white font-semibold">Non‑custodial</span></div>
              <p className="text-sm text-gray-300">Smart contracts handle all collateral and settlement. You maintain complete control of your assets with no intermediaries.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 mb-2 text-yellow-500"><Sigma className="w-4 h-4"/><span className="text-white font-semibold">Hybrid Oracle</span></div>
              <p className="text-sm text-gray-300">MPC aggregation layer with Chainlink delivery publishes verifiable real-world economic data on-chain.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 mb-2 text-yellow-500"><Layers className="w-4 h-4"/><span className="text-white font-semibold">Perpetual Markets</span></div>
              <p className="text-sm text-gray-300">AMM-priced perpetuals with fair funding mechanisms that align mark price with index; no expiries, continuous access.</p>
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
