import React from 'react';
import { Card } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';
import { FileText, Lightbulb, ShieldCheck, Layers, Sigma, Shield, Activity, Gavel, Scale, BarChart3, TrendingUp, Flag, Home } from 'lucide-react';

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
            <InfoCard title="Price impact">Larger trades move the mark price more; funding incentivizes mean‑reversion to index.</InfoCard>
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
            <div className="space-y-6">
              <Card><H>Phase 0: Manual Oracle — <span className="text-green-400">Complete</span></H><P>Smart contracts with manual CPI data entry for testing.</P></Card>
              <Card><H>Phase 1: Hybrid Oracle Development — <span className="text-yellow-400">In Progress</span></H><P>MPC aggregation layer + Chainlink delivery integration.</P></Card>
              <Card><H>Phase 2: Testnet Deployment — <span className="text-gray-300">Planned</span></H><P>Full protocol testing on Sepolia with hybrid oracles.</P></Card>
              <Card><H>Phase 3: Security Audits — <span className="text-gray-300">Planned</span></H><P>Smart contract audits and bug bounty program.</P></Card>
              <Card><H>Phase 4: Mainnet Launch — <span className="text-gray-300">Planned</span></H><P>CPI perpetuals live on mainnet with insurance fund.</P></Card>
              <Card><H>Phase 5: Market Expansion — <span className="text-gray-300">Future</span></H><P>Add Housing (FHFA HPI) and GDP markets.</P></Card>
            </div>
          </Card>

          {/* Conclusion */}
          <Card id="conclusion" className="anchor-offset">
            <HIcon icon={<Flag className="w-4 h-4" />}>13. Conclusion</HIcon>
            <P>Inflation Market operationalizes Robert Shiller’s vision of a world where individuals and institutions can manage society’s largest, most pervasive economic risks. By leveraging blockchain technology and decentralized governance, the protocol creates a transparent, permissionless system for sharing macro risk—without centralized intermediaries or custodial control.</P>
            <P>This innovation bridges economic theory and decentralized finance, turning Shiller’s dream of social risk management into a practical, global, on‑chain reality.</P>
          </Card>
        </section>
        {/* Back to top */}
        <a href="#top" className="fixed bottom-6 right-6 rounded-full bg-yellow-500 text-black w-10 h-10 flex items-center justify-center shadow-lg hover:bg-yellow-400" aria-label="Back to top">↑</a>
      </main>

      <SiteFooter />
    </div>
  );
}

