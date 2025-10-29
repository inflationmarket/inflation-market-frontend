import React from 'react';
import { Card } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';

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

  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />
      
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-6">
        {/* Visual hero */}
        <Card>
          <h1 className="text-5xl font-extrabold text-white mb-4">Whitepaper</h1>
          <P>Inflation Market — A Non‑Custodial Protocol for Macro Risk Hedging.</P>
          <div className="h-px bg-gradient-to-r from-yellow-500/50 to-transparent my-4" />
          <P className="text-gray-400">Read the complete document below. No navigation sidebar — a single, continuous document for clarity.</P>
        </Card>

        {/* Full document */}
        <section className="space-y-6">
          {/* Abstract */}
          <Card id="abstract">
            <div className="text-2xl font-bold text-white mb-2">1. Abstract</div>
            <P>This whitepaper presents Inflation Market, a decentralized, non‑custodial protocol designed to enable open participation in markets for macroeconomic risks such as inflation, GDP growth, and national housing prices. Inspired by Robert J. Shiller, the protocol allows individuals, institutions, and DAOs to hedge or gain exposure to real‑world economic indicators through perpetual futures that never expire.</P>
            <P>Unlike traditional derivatives platforms, Inflation Market operates as a transparent, autonomous protocol governed by smart contracts. A hybrid MPC + Chainlink oracle network delivers tamper‑resistant CPI and treasury data, while permissionless smart contracts handle settlement without centralized custody.</P>
          </Card>

          {/* Vision */}
          <Card id="vision">
            <div className="text-2xl font-bold text-white mb-2">2. Vision & Motivation</div>
            <P>Robert Shiller’s core insight is that society’s largest risks are macroeconomic—yet these are precisely the risks individuals cannot insure against. Inflation Market aims to fulfill that vision by:</P>
            <L items={[ 'Democratizing access to macro risk‑hedging tools', 'Allowing decentralized, transparent price discovery on key economic variables', 'Creating liquid, rolling markets for hedging systemic risks' ]} />
            <P>In contrast to prediction markets or short‑term derivatives, Inflation Market perpetuals are continuous exposure instruments with fair funding mechanisms that reflect real‑world economic data rather than speculative asset prices.</P>
          </Card>

          {/* Principles */}
          <Card id="principles">
            <div className="text-2xl font-bold text-white mb-4">3. Design Principles</div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card><H>Non‑Custodial</H><P>All positions, collateral, and settlements occur on‑chain under user control.</P></Card>
              <Card><H>Transparency</H><P>All funding, oracle updates, and index sources are verifiable and auditable.</P></Card>
              <Card><H>Open Participation</H><P>Any user or DAO can enter or exit markets without intermediary permission.</P></Card>
              <Card><H>Oracle Integrity</H><P>Macroeconomic data is sourced from decentralized oracle networks with verifiable provenance.</P></Card>
              <Card><H>Perpetual Liquidity</H><P>Contracts have no expiry; funding rates ensure long‑term equilibrium.</P></Card>
            </div>
          </Card>

          {/* Market Design */}
          <Card id="market">
            <div className="text-2xl font-bold text-white mb-2">4. Market Design Overview</div>
            <P>Each perpetual corresponds to a specific economic index such as the Consumer Price Index (CPI), GDP growth rate, or national housing index.</P>
            <H>Core Architecture</H>
            <L items={[ 'Smart Contracts: manage collateral, funding, liquidation, settlement', 'Oracle Layer: aggregates macroeconomic data from multiple sources', 'Liquidity Layer: AMM or hybrid orderbook for pricing and matching positions', 'Governance Layer: token‑based or DAO‑driven risk parameter updates' ]} />
            <H>Index Oracles</H>
            <L items={[ 'Official data sources (BLS, Federal Reserve, S&P CoreLogic)', 'Decentralized relayers providing signed attestations', 'Time‑weighted median aggregation to resist manipulation' ]} />
          </Card>

          {/* Funding */}
          <Card id="funding">
            <div className="text-2xl font-bold text-white mb-2">5. Funding & Pricing Model</div>
            <H>Continuous Funding</H>
            <L items={[ 'Funding flows continuously between longs and shorts to maintain price stability', 'The rate is bounded per epoch to prevent excessive volatility' ]} />
            <H>Log‑Level Contracts</H>
            <P>To ensure long‑term scale invariance, the contract trades on the log of index level, aligning with real‑world inflation or growth rates.</P>
          </Card>

          {/* Collateral */}
          <Card id="collateral">
            <div className="text-2xl font-bold text-white mb-2">6. Collateral & Liquidation</div>
            <H>Collateral</H><P>Stablecoins or tokenized treasuries accepted as margin.</P>
            <H>Leverage</H><P>Conservative (1–20x) given market volatility.</P>
            <H>Liquidation</H><P>Triggered when margin ratio falls below maintenance level.</P>
            <H>Insurance Fund</H><P>Protocol‑owned buffer covers oracle lags or black‑swan events.</P>
          </Card>

          {/* AMM */}
          <Card id="amm">
            <div className="text-2xl font-bold text-white mb-2">7. AMM & Liquidity Model</div>
            <P>Two potential market‑making designs:</P>
            <H>1) Virtual AMM (vAMM)</H><P>Similar to Perpetual Protocol; synthetic reserves and funding anchor to oracle fair values.</P>
            <H>2) Cost‑Function AMM</H><P>Logarithmic or quadratic curve provides continuous liquidity, earning funding and trading fees.</P>
          </Card>

          {/* Governance */}
          <Card id="governance">
            <div className="text-2xl font-bold text-white mb-2">8. Governance</div>
            <H>Protocol DAO</H><P>Governs parameters such as funding coefficient, leverage limits, and index onboarding.</P>
            <H>Oracle Governance</H><P>Decentralized committee verifies data sources and manages oracle relayers.</P>
            <H>Transparent Auditing</H><P>All index definitions, updates, and oracle attestations are on‑chain and IPFS‑archived.</P>
          </Card>

          {/* Regulatory */}
          <Card id="regulatory">
            <div className="text-2xl font-bold text-white mb-2">9. Regulatory Positioning</div>
            <P>To remain compliant while enabling open participation:</P>
            <L items={[ 'The protocol operates as software infrastructure, not a broker or investment manager', 'No custody: users retain control of their assets at all times', 'Open access: smart contracts are publicly deployed with regional compliance', 'Transparency: funding rates, index sources, and oracle attestations are open and auditable' ]} />
          </Card>

          {/* Markets */}
          <Card id="markets">
            <div className="text-2xl font-bold text-white mb-2">10. Example Markets</div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card><H>Inflation — CPI Index</H><P><span className="text-gray-400">Underlying:</span> U.S. CPI‑U (monthly, NSA)</P><P><span className="text-gray-400">Use Case:</span> Savers hedge inflation exposure; investors speculate on surprises.</P></Card>
              <Card><H>Housing — Home Price Index</H><P><span className="text-gray-400">Underlying:</span> S&P CoreLogic National Case–Shiller HPI</P><P><span className="text-gray-400">Use Case:</span> Hedge regional housing market fluctuations.</P></Card>
              <Card><H>GDP Growth — Economic Growth</H><P><span className="text-gray-400">Underlying:</span> Real GDP Growth Rate (quarterly)</P><P><span className="text-gray-400">Use Case:</span> Hedge against recessionary risks.</P></Card>
            </div>
          </Card>

          {/* Economics */}
          <Card id="economic">
            <div className="text-2xl font-bold text-white mb-2">11. Economic Rationale</div>
            <P>Inflation Market serves as a macro‑financial primitive, enabling:</P>
            <L items={[ 'Inflation risk hedging for stablecoin holders', 'Macro diversification for institutional portfolios', 'Continuous expectation formation for policymakers' ]} />
            <H>Key Risks</H>
            <L items={[ 'Oracle reliability and data revision risk', 'Low liquidity in early stages', 'Potential regulatory reinterpretation' ]} />
          </Card>

          {/* Roadmap */}
          <Card id="roadmap">
            <div className="text-2xl font-bold text-white mb-2">12. Implementation Roadmap</div>
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
          <Card id="conclusion">
            <div className="text-2xl font-bold text-white mb-2">13. Conclusion</div>
            <P>Inflation Market operationalizes Robert Shiller’s vision of a world where individuals and institutions can manage society’s largest, most pervasive economic risks. By leveraging blockchain technology and decentralized governance, the protocol creates a transparent, permissionless system for sharing macro risk—without centralized intermediaries or custodial control.</P>
            <P>This innovation bridges economic theory and decentralized finance, turning Shiller’s dream of social risk management into a practical, global, on‑chain reality.</P>
          </Card>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
