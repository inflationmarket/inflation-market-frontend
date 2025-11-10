import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, Info, CheckCircle } from 'lucide-react';
import { Card } from '../ui/primitives';

export const HOME_FAQS = [
  {
    question: 'What is Inflation Market?',
    answer: `Inflation Market is a decentralized protocol that lets you hedge or speculate on real economic indicators like US CPI, housing prices, and GDP growth. Using perpetual swaps (positions that never expire), you can protect your savings from inflation or profit when inflation falls—all without banks, brokers, or giving up custody of your funds.`,
    comparison: [
      'Unlike crypto perpetuals (GMX, dYdX) that track volatile coin prices, these markets track stable economic data from official sources like the Bureau of Labor Statistics.',
      'Traditional inflation hedges (TIPS, I Bonds) require banks and have strict limits; Inflation Market is permissionless and non-custodial.',
    ],
  },
  {
    question: 'Who is Inflation Market built for?',
    answer: `Individual traders, DAOs, and corporate treasuries who need to hedge inflation risk or express macro views. Anyone seeking diversified exposure to real economic data without relying on centralized instruments can benefit—from savers protecting purchasing power to speculators betting on deflationary periods.`,
    comparison: [
      'Traditional inflation swaps are institutional-only; this platform is permissionless and open to anyone with a Web3 wallet.',
      'Unlike crypto perpetuals that track volatile coin prices, these markets track stable economic indicators.',
    ],
  },
  {
    question: 'Is the platform live right now?',
    answer: `We are in public testnet. The current UI showcases prototype flows; production deployment follows once the hybrid oracle network is live, audits are complete, and we graduate the main contracts from testnet.`,
    comparison: [
      'We’re phased: manual multi-sig (Phase 0) → 3-node hybrid network (Phase 1) → multi-region expansion (Phase 2) → open staking (Phase 3).',
      'Competitors might already be mainnet, but usually with single-source oracles or crypto-only markets—we’re aligning launch with data integrity milestones.',
    ],
  },
  {
    question: 'What markets will be supported first?',
    answer: `Phase 1 includes US CPI (headline), US housing (Case-Shiller index), and US real GDP growth. Future phases add EU, UK, and Japan metrics as data pipelines expand.`,
    comparison: [
      'This scope is broader than single-region or crypto-only derivatives; it’s specifically tuned for inflation and macro data.',
    ],
  },
  {
    question: 'How are prices sourced and kept trustworthy?',
    answer: `Multiple independent nodes fetch CPI data from official government sources (like the Bureau of Labor Statistics), verify it against market data, and submit it on-chain. The smart contract only accepts updates when multiple nodes agree, preventing manipulation. Every price update is publicly visible on the blockchain for full transparency.`,
    comparison: [
      'Single-source oracles create a single point of failure; our multi-node system requires consensus from multiple independent operators.',
      'If official data is delayed, the protocol automatically uses verified market proxies (like inflation swap rates) as fallbacks.',
    ],
  },
  {
    question: 'How do the perpetual markets work?',
    answer: `Perpetual markets let you open long or short positions that never expire. You can use up to 20x leverage. To keep market prices aligned with real CPI data, "funding payments" flow between longs and shorts every period—when the market price drifts too high, longs pay shorts (and vice versa). This mechanism ensures prices stay anchored to economic reality, not speculation.`,
    comparison: [
      'Similar to crypto perpetuals (like on dYdX), but tracking stable economic indicators (CPI, housing, GDP) instead of volatile crypto prices.',
      'Traditional futures contracts expire monthly or quarterly; perpetuals never expire, giving you unlimited flexibility.',
    ],
  },
  {
    question: 'How are liquidations handled?',
    answer: `Your position has a "health ratio" that tracks your collateral versus your margin requirements. If market moves cause this ratio to drop too low (below the maintenance threshold), anyone can trigger a liquidation to close your position automatically. The liquidator earns a small reward, and an insurance fund covers any remaining losses to protect the system.`,
    comparison: [
      'Unlike centralized exchanges where liquidations happen in black boxes, all liquidations here are transparent and executed by smart contracts anyone can audit.',
      'The health ratio approach is battle-tested across DeFi lending protocols like Aave and Compound.',
    ],
  },
  {
    question: 'What fees should I expect?',
    answer: `Trading fee (default 0.10% per open/close), funding payments exchanged between longs and shorts, protocol-defined liquidation fees, and gas costs. Slippage protection ensures trades revert if the price moves beyond your configured tolerance.`,
    comparison: [
      'Fees are competitive with DeFi perpetual platforms while offering macro exposure not available on crypto-first venues.',
    ],
  },
  {
    question: 'What makes the hybrid oracle different from existing feeds?',
    answer: `Our hybrid oracle requires multiple independent nodes to stake tokens, fetch data from official sources, and reach consensus before any price update is accepted. If a node submits bad data, they lose their stake (get "slashed") and are suspended. This creates strong incentives for honesty while distributing trust across multiple operators instead of relying on a single source.`,
    comparison: [
      'Single Chainlink aggregators or centralized APIs create a single point of failure; our multi-node consensus distributes trust.',
      'We combine official government data (BLS, Federal Reserve) with market proxies (inflation swap rates) and require multiple nodes to agree, reducing manipulation risk.',
    ],
  },
  {
    question: 'When will the token/governance be available?',
    answer: `Token design is underway. The token will govern oracle node onboarding, staking parameters, fee allocation, and insurance fund policies. Expect more details in Phase 2 as infrastructure solidifies.`,
    comparison: [
      'We’re committing to progressive decentralization rather than launching a token before the core mechanics are battle-tested.',
    ],
  },
  {
    question: 'How can I run a node or contribute?',
    answer: `Node operator guidelines (hardware, staking, API credentials) will release in Phase 1. Developers can contribute via GitHub pull requests, docs, or community discussions. If you’re interested in running a node or helping with data pipelines, join the Discord for early access.`,
    comparison: [
      'Unlike closed-source or oracle networks requiring partnerships, we intend to be fully open to qualified operators.',
    ],
  },
  {
    question: 'Where can I track progress and see data?',
    answer: `The hybrid oracle roadmap lives in docs/oracle/hybrid-oracle-plan.md. Dashboards for oracle updates, market metrics, and position analytics will launch before mainnet. You can also follow announcements and dev updates via Twitter, Discord, and GitHub.`,
    comparison: [
      'Transparency is a core feature—we plan to surface real-time oracle reports and market data, unlike black-box financial products.',
    ],
  },
];

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
    isOpen
      ? 'border-yellow-500/40 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 shadow-lg shadow-yellow-500/10'
      : 'border-white/10 bg-white/5 hover:border-yellow-500/20 hover:bg-white/10'
  }`}>
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between px-6 py-5 text-left text-white focus:outline-none group"
    >
      <span className={`text-lg font-bold transition-colors ${
        isOpen ? 'text-yellow-500' : 'text-white group-hover:text-yellow-500'
      }`}>
        {faq.question}
      </span>
      <div className={`flex-shrink-0 ml-4 p-1.5 rounded-full transition-all ${
        isOpen ? 'bg-yellow-500/20 rotate-180' : 'bg-white/10 group-hover:bg-yellow-500/10'
      }`}>
        <ChevronDown className={`h-5 w-5 transition-colors ${
          isOpen ? 'text-yellow-500' : 'text-gray-400 group-hover:text-yellow-500'
        }`} />
      </div>
    </button>
    {isOpen && (
      <div className="space-y-5 border-t border-yellow-500/20 px-6 py-6 animate-fadeIn">
        <p className="text-base text-gray-300 leading-relaxed">
          {faq.answer}
        </p>
        {faq.comparison && faq.comparison.length > 0 && (
          <div className="rounded-xl border border-yellow-500/30 bg-black/30 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-4 w-4 text-yellow-500" />
              <p className="text-sm font-bold text-yellow-500">
                How This Compares
              </p>
            </div>
            <ul className="space-y-2.5">
              {faq.comparison.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )}
  </div>
);

FAQItem.propTypes = {
  faq: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    comparison: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-black via-yellow-500/5 to-black">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-6 px-5 py-2.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
            <span className="text-yellow-500 text-sm font-bold tracking-wide">FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Everything You Need to Know
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Transparent answers about what we're building, how the hybrid oracle works,
            and how Inflation Market compares to existing solutions.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 mb-16">
          {HOME_FAQS.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* CTA Card */}
        <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-2 border-yellow-500/40 text-center p-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Info className="h-6 w-6 text-yellow-500" />
            <p className="text-xl font-bold text-white">Still Have Questions?</p>
          </div>
          <p className="text-base text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our Discord, follow us on Twitter, or open a GitHub issue. We share weekly progress updates
            as we move through the hybrid oracle roadmap and trading milestones.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://discord.gg/inflationmarket"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors"
            >
              Join Discord
            </a>
            <a
              href="https://twitter.com/inflationmarket"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/20 transition-colors"
            >
              Follow on Twitter
            </a>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FAQSection;
