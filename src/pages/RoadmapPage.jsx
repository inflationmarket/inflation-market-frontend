import React from 'react';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';
import { Clock, Rocket, ShieldCheck, Wrench, Sigma, ServerCog, Layers, FileText, BarChart3 } from 'lucide-react';

const Chip = ({ color = 'yellow', children }) => (
  <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs border ${
    color === 'green' ? 'bg-green-400/10 border-green-400/30 text-green-200' :
    color === 'yellow' ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-200' :
    'bg-white/5 border-white/10 text-gray-300'
  }`}>{children}</span>
);

const Bullet = ({ icon, title, text }) => (
  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
    <div className="flex items-center gap-2 mb-1 text-yellow-500">{icon}<span className="text-white font-semibold">{title}</span></div>
    <p className="text-sm text-gray-300">{text}</p>
  </div>
);

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <header className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-500 font-bold tracking-wide mb-4">
            <Clock className="w-4 h-4"/> Roadmap
          </div>
          <h1 className="text-5xl font-bold text-white mb-3">From Testnet to Guarded Mainnet</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">A practical plan with clear milestones, owners, and success criteria.</p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <Chip color="green"><span className="w-2 h-2 rounded-full bg-green-400"/> Complete</Chip>
            <Chip color="yellow"><span className="w-2 h-2 rounded-full bg-yellow-400"/> In Progress</Chip>
            <Chip color="gray"><span className="w-2 h-2 rounded-full bg-gray-300"/> Planned</Chip>
          </div>
        </header>

        {/* Phase 1 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/40 flex items-center justify-center text-yellow-500 font-bold">1</div>
            <h2 className="text-3xl font-bold text-white">Phase 1 — Testnet Maturation</h2>
            <Chip color="yellow">In Progress</Chip>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Bullet icon={<Sigma className="w-4 h-4"/>} title="Hybrid Oracle MVP" text="MPC aggregation scaffolding + Chainlink delivery adapter; median + deviation checks on-chain."/>
            <Bullet icon={<Layers className="w-4 h-4"/>} title="Trading v2 (Testnet)" text="Refined AMM params, funding bounds, liquidation thresholds; telemetry dashboards."/>
            <Bullet icon={<FileText className="w-4 h-4"/>} title="Docs + SDK" text="Getting started, risk notes, TypeScript SDK for external integrators."/>
          </div>
        </section>

        {/* Phase 2 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/40 flex items-center justify-center text-yellow-500 font-bold">2</div>
            <h2 className="text-3xl font-bold text-white">Phase 2 — Security & Guardrails</h2>
            <Chip color="gray">Planned</Chip>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Bullet icon={<ShieldCheck className="w-4 h-4"/>} title="Audits + Bounty" text="Formal audit round(s) and a public bug bounty; incident runbooks and circuit breakers."/>
            <Bullet icon={<ServerCog className="w-4 h-4"/>} title="Infra Hardening" text="Monitoring, alerting, gas/MEV reviews, fallback routes for oracle submissions."/>
            <Bullet icon={<BarChart3 className="w-4 h-4"/>} title="Risk Parameters" text="Initial caps, fee/funding coefficients, insurance fund seeding, and progressive loosening plan."/>
          </div>
        </section>

        {/* Phase 3 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/40 flex items-center justify-center text-yellow-500 font-bold">3</div>
            <h2 className="text-3xl font-bold text-white">Phase 3 — Guarded Mainnet</h2>
            <Chip color="gray">Planned</Chip>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Bullet icon={<Rocket className="w-4 h-4"/>} title="Mainnet Launch" text="CPI market with position and liquidity caps; canary cohort and progressive scaling."/>
            <Bullet icon={<Wrench className="w-4 h-4"/>} title="Operations" text="Runbooks for liquidations/oracle delays; incident response and comms protocol."/>
            <Bullet icon={<Layers className="w-4 h-4"/>} title="Integrations" text="Wallets, analytics, and partner dashboards; CSV/SDK exports for accounting."/>
          </div>
        </section>

        {/* Phase 4 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/40 flex items-center justify-center text-yellow-500 font-bold">4</div>
            <h2 className="text-3xl font-bold text-white">Phase 4 — Expansion</h2>
            <Chip color="gray">Planned</Chip>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Bullet icon={<Sigma className="w-4 h-4"/>} title="New Markets" text="Housing (Case‑Shiller / FHFA) and GDP growth; EU/UK datasets as pipelines mature."/>
            <Bullet icon={<FileText className="w-4 h-4"/>} title="Governance & Disclosures" text="Transparent index definitions, oracle attestations, and parameter change logs."/>
            <Bullet icon={<ShieldCheck className="w-4 h-4"/>} title="Insurance Fund" text="Target buffer sizing and funding sources aligned to risk appetite."/>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
