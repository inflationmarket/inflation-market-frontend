import React, { useState } from 'react';
import { Card } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';

export default function WhitepaperPage() {
  const [activeSection, setActiveSection] = useState('abstract');
  const sections = [
    { id: 'abstract', title: '1. Abstract' },
    { id: 'vision', title: '2. Vision & Motivation' },
    { id: 'principles', title: '3. Design Principles' },
    { id: 'market', title: '4. Market Design' },
    { id: 'funding', title: '5. Funding & Pricing' },
    { id: 'collateral', title: '6. Collateral & Liquidation' },
    { id: 'amm', title: '7. AMM & Liquidity' },
    { id: 'governance', title: '8. Governance' },
    { id: 'regulatory', title: '9. Regulatory Positioning' },
    { id: 'markets', title: '10. Example Markets' },
    { id: 'economic', title: '11. Economic Rationale' },
    { id: 'roadmap', title: '12. Implementation' },
    { id: 'conclusion', title: '13. Conclusion' }
  ];

  const renderBody = (id) => {
    const P = ({ children }) => <p className="text-gray-300 mb-4">{children}</p>;
    switch (id) {
      case 'abstract':
        return <P>Inflation Market is a perpetuals protocol that enables hedging and speculation on real-world macroeconomic indices such as CPI, housing, and GDP. It combines an on-chain AMM for mark pricing with an index oracle pipeline.</P>;
      case 'vision':
        return <P>Our vision is to make macro risk management accessible to everyone with transparent, programmable markets.</P>;
      case 'principles':
        return <P>Key principles: transparency, risk-resilience, credible decentralization, and progressive decentralization of governance.</P>;
      case 'market':
        return <P>Markets list perpetual contracts on macro indices; positions are collateralized with USDC and margined with clear liquidation rules.</P>;
      case 'funding':
        return <P>Funding aligns mark and index prices. Rate is computed based on inventory and index deviation over a time window.</P>;
      case 'collateral':
        return <P>Collateralization uses a vault with risk parameters for leverage limits, maintenance margin, and liquidation penalties.</P>;
      case 'amm':
        return <P>AMM provides quotes with price impact for trade size; parameters are tuned for stability across market conditions.</P>;
      case 'governance':
        return <P>Governance will evolve from multisig to community-driven proposals for parameters and listings, subject to legal constraints.</P>;
      case 'regulatory':
        return <P>We follow a careful compliance posture, limiting jurisdictions and access during test phases and adapting for mainnet readiness.</P>;
      case 'markets':
        return <P>Initial markets: CPI (Inflation), Housing (Case‑Shiller), and GDP growth. Additional indexes will be added with demand.</P>;
      case 'economic':
        return <P>We outline funding economics, expected yields, and risk premiums driven by hedging demand and speculator capital.</P>;
      case 'roadmap':
        return <P>Implementation proceeds via public testnets, audits, guarded mainnet, and integrations with wallets and analytics.</P>;
      case 'conclusion':
        return <P>We aim to provide the missing macro hedging layer for on‑chain finance.</P>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Desktop/large screens: sidebar + single section */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8">
          <aside className="lg:col-span-1">
            <Card>
              <div className="space-y-2">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={`block w-full text-left px-3 py-2 rounded ${activeSection===s.id? 'bg-yellow-500/20 text-white':'text-gray-300 hover:bg-yellow-500/10'}`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </Card>
          </aside>
          <section className="lg:col-span-3">
            <Card>
              <h1 className="text-4xl font-bold text-white mb-6">Whitepaper</h1>
              {renderBody(activeSection)}
              {/* CTA removed per request */}
            </Card>
          </section>
        </div>

        {/* Mobile/tablet: show all sections sequentially so content is never hidden */}
        <div className="lg:hidden space-y-6">
          <Card>
            <h1 className="text-4xl font-bold text-white mb-6">Whitepaper</h1>
            <div className="text-sm text-gray-400 mb-4">Full contents below</div>
          </Card>
          {sections.map((s) => (
            <Card key={s.id} id={s.id}>
              <div className="text-2xl font-bold text-white mb-4">{s.title.replace(/^[0-9]+\.\s*/, '')}</div>
              {renderBody(s.id)}
            </Card>
          ))}
          {/* CTA removed per request */}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
