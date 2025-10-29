import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';
import { FileText, Lightbulb, ShieldCheck, Layers, Sigma, Shield, Activity, Gavel, Scale, BarChart3, TrendingUp, Flag, Home, CheckCircle2, Clock, Circle, BookOpen } from 'lucide-react';

export default function WhitepaperPage() {
  const P = ({ children }) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>;
  const H = ({ children }) => <h3 className="text-xl font-bold text-white mb-3">{children}</h3>;
  const L = ({ items }) => (
    <ul className="list-disc pl-5 text-gray-300 space-y-1 mb-4">
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );

  const HIcon = ({ icon, children }) => (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-7 h-7 rounded-md bg-yellow-500/15 text-yellow-500 flex items-center justify-center">
        {icon}
      </div>
      <div className="text-2xl font-bold text-white">{children}</div>
    </div>
  );

  const Tile = ({ icon, title, children }) => (
    <div className="rounded-xl border border-yellow-500/20 bg-white/5 p-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-lg bg-yellow-500/15 text-yellow-500 flex items-center justify-center">
          {icon}
        </div>
        <div className="text-lg font-bold text-white">{title}</div>
      </div>
      <div className="text-sm text-gray-300">{children}</div>
    </div>
  );

  const InfoCard = ({ title, children }) => (
    <div className="rounded-lg border border-blue-400/20 bg-blue-400/10 p-4">
      <div className="text-sm font-bold text-blue-300 mb-1">{title}</div>
      <div className="text-sm text-blue-100/90">{children}</div>
    </div>
  );

  const WarningCard = ({ title, children }) => (
    <div className="rounded-lg border border-red-400/20 bg-red-400/10 p-4">
      <div className="text-sm font-bold text-red-300 mb-1">{title}</div>
      <div className="text-sm text-red-100/90">{children}</div>
    </div>
  );

  const ExampleCard = ({ title, items }) => (
    <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
      <div className="text-sm font-bold text-yellow-300 mb-1">{title}</div>
      <ul className="text-sm text-yellow-50/90 space-y-1 list-disc pl-4">
        {items.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>
    </div>
  );

  const Divider = () => <div className="h-px bg-gradient-to-r from-yellow-500/40 to-transparent my-6" />;

  const FormulaCard = ({ title, formula, lines = [] }) => (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <div className="text-sm font-bold text-white mb-2">{title}</div>
      <div className="rounded-md bg-black/40 border border-white/10 px-3 py-2 font-mono text-sm text-yellow-200 overflow-x-auto">
        {formula}
      </div>
      {lines.length > 0 && (
        <ul className="mt-2 text-xs text-gray-300 space-y-1 list-disc pl-5">
          {lines.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      )}
    </div>
  );

  const PhaseTile = ({ icon, label, bullets = [], tint = 'gray' }) => {
    const tints = {
      green: 'border-green-400/30 bg-green-400/10 text-green-200',
      yellow: 'border-yellow-400/30 bg-yellow-400/10 text-yellow-200',
      gray: 'border-white/10 bg-white/5 text-gray-200',
    };
    return (
      <div className={`rounded-xl border p-4 ${tints[tint] || tints.gray}`}>
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <div className="font-bold">{label}</div>
        </div>
        <ul className="text-sm list-disc pl-5 space-y-1">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    );
  };

  // small inline diagrams
  const AMMFlowDiagram = () => (
    <svg viewBox="0 0 560 120" className="w-full h-28" aria-label="AMM flow diagram">
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 Z" fill="#f5d742" />
        </marker>
      </defs>
      <rect x="8" y="20" width="120" height="60" rx="8" fill="rgba(245,215,66,0.08)" stroke="rgba(245,215,66,0.4)" />
      <text x="68" y="55" textAnchor="middle" fill="#e5e7eb" fontSize="12">Index Price</text>
      <line x1="130" y1="50" x2="210" y2="50" stroke="#f5d742" strokeWidth="2" markerEnd="url(#arrow)" />
      <rect x="210" y="20" width="120" height="60" rx="8" fill="rgba(66,82,245,0.08)" stroke="rgba(66,82,245,0.4)" />
      <text x="270" y="45" textAnchor="middle" fill="#e5e7eb" fontSize="12">AMM</text>
      <text x="270" y="62" textAnchor="middle" fill="#94a3b8" fontSize="11">Mark Price</text>
      <line x1="330" y1="50" x2="410" y2="50" stroke="#f5d742" strokeWidth="2" markerEnd="url(#arrow)" />
      <rect x="410" y="20" width="140" height="60" rx="8" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.35)" />
      <text x="480" y="42" textAnchor="middle" fill="#e5e7eb" fontSize="12">Funding</text>
      <text x="480" y="62" textAnchor="middle" fill="#94a3b8" fontSize="11">Long ⇄ Short</text>
    </svg>
  );

  const FundingCurveDiagram = () => (
    <svg viewBox="0 0 560 140" className="w-full h-32" aria-label="Funding curve diagram">
      <line x1="40" y1="100" x2="520" y2="100" stroke="#475569" strokeWidth="1" />
      <line x1="100" y1="20" x2="100" y2="120" stroke="#475569" strokeWidth="1" />
      <text x="48" y="115" fill="#94a3b8" fontSize="11">Index</text>
      <text x="510" y="115" fill="#94a3b8" fontSize="11">Mark</text>
      <text x="74" y="32" fill="#94a3b8" fontSize="11">Funding</text>
      <path d="M100,100 C 200,40 360,40 520,100" fill="none" stroke="#f5d742" strokeWidth="2" />
      <text x="310" y="50" fill="#e5e7eb" fontSize="11" textAnchor="middle">Funding → 0 when Mark ≈ Index</text>
    </svg>
  );

  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />
      
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-6">
        {/* Visual hero */}
        <Card id="top" className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-30 bg-gradient-to-br from-yellow-500/20 via-yellow-500/5 to-transparent" />
          <h1 className="text-5xl font-extrabold text-white mb-4">Whitepaper</h1>
          <P className="text-gray-300">A non‑custodial protocol for macro risk hedging.</P>
          <Divider />
          {/* Value snapshot */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Tile icon={<Shield className="w-5 h-5" />} title="Protect Savings">
              Hedge buying‑power against CPI moves. Simple, perpetual exposure.
            </Tile>
            <Tile icon={<TrendingUp className="w-5 h-5" />} title="Express Macro Views">
              Long/short CPI, Housing, or GDP with transparent funding.
            </Tile>
            <Tile icon={<ShieldCheck className="w-5 h-5" />} title="Non‑Custodial & Transparent">
              On‑chain collateral, verifiable oracle data, auditable parameters.
            </Tile>
          </div>
        </Card>

        {/* Full document */}
        <section className="space-y-6">
          {/* Abstract */}
          <Card id="abstract" className="anchor-offset">
            <HIcon icon={<FileText className="w-4 h-4" />}>1. Abstract</HIcon>
            <P>This whitepaper presents Inflation Market, a decentralized, non‑custodial protocol designed to enable open participation in markets for macroeconomic risks such as inflation, GDP growth, and national housing prices. Inspired by Robert J. Shiller, the protocol allows individuals, institutions, and DAOs to hedge or gain exposure to real‑world economic indicators through perpetual futures that never expire.</P>
            <P>Unlike traditional derivatives platforms, Inflation Market operates as a transparent, autonomous protocol governed by smart contracts. A hybrid MPC + Chainlink oracle network delivers tamper‑resistant CPI and treasury data, while permissionless smart contracts handle settlement without centralized custody.</P>
          </Card>

          {/* Compact Glossary */}
          <Card id="glossary" className="anchor-offset">
            <HIcon icon={<BookOpen className="w-4 h-4" />}>Glossary (Compact)</HIcon>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-semibold text-white">CPI (Consumer Price Index)</div>
                <div className="text-sm text-gray-300">Measures average change in consumer prices. Demo uses CPI‑U (monthly, NSA).</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Index Price</div>
                <div className="text-sm text-gray-300">Oracle‑delivered value of the underlying economic index.</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Mark Price</div>
                <div className="text-sm text-gray-300">AMM‑derived price used for PnL and funding; converges toward index via funding.</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Funding</div>
                <div className="text-sm text-gray-300">Cash flow between longs and shorts to align mark with index (bounded). Typical: f ≈ λ · (P<sub>mark</sub> − P<sub>index</sub>)/P<sub>index</sub>.</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Maintenance Margin</div>
                <div className="text-sm text-gray-300">Minimum collateral ratio to keep a position open; falling below triggers liquidation.</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Leverage</div>
                <div className="text-sm text-gray-300">Position size ÷ collateral (e.g., $5,000 ÷ $1,000 = 5×). Amplifies both PnL and risk.</div>
              </div>
            </div>
          </Card>

          {/* Vision */}
          <Card id="vision" className="anchor-offset">
            <HIcon icon={<Lightbulb className="w-4 h-4" />}>2. Vision & Motivation</HIcon>
            <P>Robert Shiller’s core insight is that society’s largest risks are macroeconomic—yet these are precisely the risks individuals cannot insure against. Inflation Market aims to fulfill that vision by:</P>
            <L items={[ 'Democratizing access to macro risk‑hedging tools', 'Allowing decentralized, transparent price discovery on key economic variables', 'Creating liquid, rolling markets for hedging systemic risks' ]} />
            <P>In contrast to prediction markets or short‑term derivatives, Inflation Market perpetuals are continuous exposure instruments with fair funding mechanisms that reflect real‑world economic data rather than speculative asset prices.</P>
          </Card>

          {/* Principles */}
          <Card id="principles" className="anchor-offset">
            <HIcon icon={<ShieldCheck className="w-4 h-4" />}>3. Design Principles</HIcon>
            <div className="grid md:grid-cols-2 gap-6">
              <Tile icon={<ShieldCheck className="w-5 h-5" />} title="Non‑Custodial" desc="All positions, collateral, and settlements occur on‑chain under user control." more="Self‑custody reduces counterparty risk and aligns with open participation." />
              <Tile icon={<Activity className="w-5 h-5" />} title="Transparency" desc="Funding, oracle updates, and indexes are auditable." more="Key metrics and sources are disclosed and versioned for accountability." />
              <Tile icon={<Layers className="w-5 h-5" />} title="Open Participation" desc="Enter or exit markets without intermediary permission." more="Markets aim to be permissionless, with regional compliance where required." />
              <Tile icon={<Shield className="w-5 h-5" />} title="Oracle Integrity" desc="Decentralized relayers with verifiable provenance." more="Sources include BLS, Federal Reserve, and tamper‑resistant attestations." />
              <Tile icon={<Sigma className="w-5 h-5" />} title="Perpetual Liquidity" desc="Contracts have no expiry; funding equilibrates prices." more="Continuous markets support longer horizons aligned with macro indices." />
            </div>
          </Card>

          {/* Market Design */}
          <Card id="market" className="anchor-offset">
            <HIcon icon={<Layers className="w-4 h-4" />}>4. Market Design Overview</HIcon>
            <P>Each perpetual corresponds to a specific economic index such as the Consumer Price Index (CPI), GDP growth rate, or national housing index.</P>
            <H>Core Architecture</H>
            <L items={[ 'Smart Contracts: manage collateral, funding, liquidation, settlement', 'Oracle Layer: aggregates macroeconomic data from multiple sources', 'Liquidity Layer: AMM or hybrid orderbook for pricing and matching positions', 'Governance Layer: token‑based or DAO‑driven risk parameter updates' ]} />
          <H>Index Oracles</H>
          <L items={[ 'Official data sources (BLS, Federal Reserve, S&P CoreLogic)', 'Decentralized relayers providing signed attestations', 'Time‑weighted median aggregation to resist manipulation' ]} />
          <AMMFlowDiagram />
          <InfoCard title="How data flows">
            Index price → AMM mark price → Funding between longs/shorts → Position PnL.
          </InfoCard>
        </Card>

          {/* Funding */}
          <Card id="funding" className="anchor-offset">
            <HIcon icon={<Sigma className="w-4 h-4" />}>5. Funding & Pricing Model</HIcon>
            <H>Continuous Funding</H>
            <L items={[ 'Funding flows continuously between longs and shorts to maintain price stability', 'The rate is bounded per epoch to prevent excessive volatility' ]} />
            <H>Log‑Level Contracts</H>
            <P>To ensure long‑term scale invariance, the contract trades on the log of index level, aligning with real‑world inflation or growth rates.</P>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <ExampleCard title="Funding example (illustrative)" items={[
              'Index = 100, Mark = 101 → Long pays Short funding',
              'Index = 100, Mark = 99  → Short pays Long funding',
              'As mark ≈ index, funding → 0',
            ]} />
            <InfoCard title="Takeaway">Funding re‑anchors price to the index; it is not a fee from/to protocol.</InfoCard>
          </div>
          <FundingCurveDiagram />
        </Card>

          {/* Collateral */}
          <Card id="collateral" className="anchor-offset">
            <HIcon icon={<Shield className="w-4 h-4" />}>6. Collateral & Liquidation</HIcon>
            <H>Collateral</H><P>Stablecoins or tokenized treasuries accepted as margin.</P>
            <H>Leverage</H><P>Conservative (1–20x) given market volatility.</P>
            <H>Liquidation</H><P>Triggered when margin ratio falls below maintenance level.</P>
            <H>Insurance Fund</H><P>Protocol‑owned buffer covers oracle lags or black‑swan events.</P>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <ExampleCard title="Position math (illustrative)" items={[
                '$1,000 USDC collateral, 5× leverage → $5,000 position',
                'Maintenance margin 6.25% → liquidation near −18–20% move',
                'Numbers vary by parameters and market conditions',
              ]} />
              <WarningCard title="Risk reminder">Leverage amplifies both gains and losses; monitor margin and funding.</WarningCard>
            </div>
          </Card>

          {/* AMM */}
          <Card id="amm" className="anchor-offset">
            <HIcon icon={<Activity className="w-4 h-4" />}>7. AMM & Liquidity Model</HIcon>
            <P>Two potential market‑making designs:</P>
            <H>1) Virtual AMM (vAMM)</H><P>Similar to Perpetual Protocol; synthetic reserves and funding anchor to oracle fair values.</P>
            <H>2) Cost‑Function AMM</H><P>Logarithmic or quadratic curve provides continuous liquidity, earning funding and trading fees.</P>
            <H className="mt-4">Price Impact</H>
            <InfoCard title="Intuition">Larger trades move the mark price more; the slope depends on AMM parameters and current inventory. Funding incentivizes mean‑reversion toward the index.</InfoCard>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <FormulaCard
                title="Linearized impact (illustrative)"
                formula="P_mark(q) ≈ P_index · (1 + k · q)"
                lines={[
                  'q: signed trade size (positive = buy/long, negative = sell/short)',
                  'k: local impact coefficient set by AMM/inventory',
                ]}
              />
              <FormulaCard
                title="Constant‑product intuition"
                formula="(x + Δx) · (y − Δy) = k  →  price ≈ y/x,  Δprice ≈ (Δy/y) − (Δx/x)"
                lines={[
                  'As trade size grows relative to reserves, marginal price moves more',
                ]}
              />
            </div>
            <InfoCard title="Funding rate (typical form)">
              f ≈ λ · (P_mark − P_index) / P_index, bounded per epoch.
            </InfoCard>
          </Card>

          {/* Governance */}
          <Card id="governance" className="anchor-offset">
            <HIcon icon={<Gavel className="w-4 h-4" />}>8. Governance</HIcon>
            <H>Protocol DAO</H><P>Governs parameters such as funding coefficient, leverage limits, and index onboarding.</P>
            <H>Oracle Governance</H><P>Decentralized committee verifies data sources and manages oracle relayers.</P>
            <H>Transparent Auditing</H><P>All index definitions, updates, and oracle attestations are on‑chain and IPFS‑archived.</P>
            <InfoCard title="Parameters (examples)">Funding coefficient c, max leverage, maintenance margin, listing criteria.</InfoCard>
          </Card>

          {/* Regulatory */}
          <Card id="regulatory" className="anchor-offset">
            <HIcon icon={<Scale className="w-4 h-4" />}>9. Regulatory Positioning</HIcon>
            <P>To remain compliant while enabling open participation:</P>
            <L items={[ 'The protocol operates as software infrastructure, not a broker or investment manager', 'No custody: users retain control of their assets at all times', 'Open access: smart contracts are publicly deployed with regional compliance', 'Transparency: funding rates, index sources, and oracle attestations are open and auditable' ]} />
          </Card>

          {/* Markets */}
          <Card id="markets" className="anchor-offset">
            <HIcon icon={<BarChart3 className="w-4 h-4" />}>10. Example Markets</HIcon>
            <div className="grid md:grid-cols-3 gap-6">
              <Tile icon={<BarChart3 className="w-5 h-5" />} title="Inflation — CPI Index" underlying="U.S. CPI‑U (monthly, NSA)" usecase="Savers hedge inflation exposure; investors speculate on inflation surprises." />
              <Tile icon={<Home className="w-5 h-5" />} title="Housing — Home Price Index" underlying="S&P CoreLogic National Case–Shiller HPI" usecase="Homeowners and lenders hedge regional housing market fluctuations." />
              <Tile icon={<TrendingUp className="w-5 h-5" />} title="GDP Growth — Economic Growth" underlying="Real GDP Growth Rate (quarterly)" usecase="Firms and DAOs hedge against recessionary risks." />
            </div>
          </Card>

          {/* Economics */}
          <Card id="economic" className="anchor-offset">
            <HIcon icon={<TrendingUp className="w-4 h-4" />}>11. Economic Rationale</HIcon>
            <P>Inflation Market serves as a macro‑financial primitive, enabling:</P>
            <L items={[ 'Inflation risk hedging for stablecoin holders', 'Macro diversification for institutional portfolios', 'Continuous expectation formation for policymakers' ]} />
            <H>Key Risks</H>
            <L items={[ 'Oracle reliability and data revision risk', 'Low liquidity in early stages', 'Potential regulatory reinterpretation' ]} />
            <InfoCard title="Intuition">When hedging demand is strong, funding can be non‑zero until liquidity deepens.</InfoCard>
          </Card>

          {/* Roadmap */}
          <Card id="roadmap" className="anchor-offset">
            <HIcon>12. Implementation Roadmap</HIcon>
            <P>Milestones and tangible deliverables toward a guarded mainnet launch. Status colors: green = complete, yellow = in progress, gray = planned.</P>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <PhaseTile
                tint="green"
                icon={<CheckCircle2 className="w-4 h-4" />}
                label="Phase 0 — Manual Oracle (Complete)"
                bullets={[
                  'Core contracts deployed with manual CPI input for dev testing',
                  'Basic position lifecycle validated (open/close, margin add/remove)',
                ]}
              />
              <PhaseTile
                tint="yellow"
                icon={<Clock className="w-4 h-4" />}
                label="Phase 1 — Hybrid Oracle (In Progress)"
                bullets={[
                  'MPC aggregation layer scaffolding',
                  'Chainlink delivery interface + failsafes',
                  'Data provenance + versioning plan',
                ]}
              />
              <PhaseTile
                icon={<Circle className="w-4 h-4" />}
                label="Phase 2 — Public Testnet"
                bullets={[
                  'Full protocol on Sepolia (vaults, AMM, funding)',
                  'Telemetry + risk dashboards for parameters',
                  'Docs + SDK for integrators',
                ]}
              />
              <PhaseTile
                icon={<Circle className="w-4 h-4" />}
                label="Phase 3 — Security"
                bullets={[
                  'Formal audit scope + rounds',
                  'Bug bounty + monitoring',
                ]}
              />
              <PhaseTile
                icon={<Circle className="w-4 h-4" />}
                label="Phase 4 — Guarded Mainnet"
                bullets={[
                  'CPI market with caps + insurance fund',
                  'Progressive parameter loosening',
                ]}
              />
              <PhaseTile
                icon={<Circle className="w-4 h-4" />}
                label="Phase 5 — Expansion"
                bullets={[
                  'Add Housing (FHFA HPI) and GDP markets',
                  'Partnerships and integrations',
                ]}
              />
            </div>
          </Card>

          {/* Conclusion */}
          <Card id="conclusion" className="anchor-offset">
            <HIcon icon={<Flag className="w-4 h-4" />}>13. Conclusion</HIcon>
            <P>Inflation Market operationalizes Robert Shiller’s vision of a world where individuals and institutions can manage society’s largest, most pervasive economic risks. By leveraging blockchain technology and decentralized governance, the protocol creates a transparent, permissionless system for sharing macro risk—without centralized intermediaries or custodial control.</P>
            <P>This innovation bridges economic theory and decentralized finance, turning Shiller’s dream of social risk management into a practical, global, on‑chain reality.</P>
          </Card>
        </section>
        {/* Back to top (shows after scrolling) */}
        {showTop && (
          <a href="#top" className="fixed bottom-6 right-6 rounded-full bg-yellow-500 text-black w-10 h-10 flex items-center justify-center shadow-lg hover:bg-yellow-400" aria-label="Back to top">↑</a>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

