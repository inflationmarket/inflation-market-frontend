import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, Info, CheckCircle } from 'lucide-react';
import { Card } from '../ui/primitives';

export const HOME_FAQS = [
  {
    question: 'What is Inflation Market?',
    answer: `Inflation Market is a decentralized protocol that lets anyone hedge or speculate on macroeconomic indicators like CPI, housing prices, and GDP growth. Inspired by Nobel Laureate Robert Shiller's macro-risk exchange concept, the protocol provides perpetual swaps, margin management, and a hybrid oracle network so exposure to real-world economics can be handled on-chain—permissionlessly, transparently, and without centralized custody.`,
    comparison: [
      'Unlike crypto-focused perpetuals (GMX, dYdX), these markets track economic data.',
      'Traditional inflation hedges require banks or ETFs; Inflation Market is permissionless and non-custodial.',
    ],
  },
  {
    question: 'Who is Inflation Market built for?',
    answer: `Governments, corporate treasuries, DAOs, and individual traders who need to hedge inflation risk, express macro views, or create new structured products. Anyone who wants diversified macro exposure without relying on centralized instruments can benefit.`,
    comparison: [
      'Traditional inflation swaps are institutional-only; this platform is open to anyone with a Web3 wallet.',
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
    answer: `Inflation Market routes data through a hybrid MPC oracle network. Multiple independent operators fetch CPI updates from official sources (BLS, Eurostat, ONS), cross-check with market proxies (inflation swaps, breakevens), sign the payload, and submit it on-chain through Chainlink or direct callers. The on-chain contract enforces multi-sig consensus (median + deviation checks) before updating the index, and every update is viewable via events.`,
    comparison: [
      'Chainlink-only feeds use a single aggregator; we combine multiple operators, official APIs, and fallback proxies.',
      'If a primary source is stale, the protocol automatically falls back to secondary feeds before manual intervention.',
    ],
  },
  {
    question: 'How do the perpetual markets work?',
    answer: `Each market is a perpetual swap with up to 20x leverage. Funding payments flow between longs and shorts to keep the swap price aligned with the oracle index. The PositionManager contract manages open/close, margin adjustments, and automatic liquidations when the health ratio breaches the maintenance margin.`,
    comparison: [
      'Similar to DeFi perpetuals, but the underlying index is CPI/housing/GDP instead of crypto spot prices.',
      'Traditional futures expire monthly; perpetuals never expire and require funding mechanics.',
    ],
  },
  {
    question: 'How are liquidations handled?',
    answer: `Each position tracks a health ratio (collateral versus required margin). When it drops below the maintenance threshold, the Liquidator contract closes the position. Liquidators receive a reward, and an insurance fund absorbs any residual shortfall.`,
    comparison: [
      'This eliminates reliance on centralized brokers; the mechanics are on-chain and auditable.',
      'The health ratio approach mirrors proven DeFi lending/liquidation patterns.',
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
    answer: `Multiple nodes must stake tokens, sign data, and agree before an update is accepted. Each node’s reputation and stake determine its influence. If a node posts a bad value, it’s slashed and suspended. The entire process leaves an on-chain and off-chain audit trail (report origins, timestamps, signatures).`,
    comparison: [
      'Sole reliance on a single Chainlink aggregator or centralized API creates a single point of failure—our hybrid network distributes trust.',
      'By combining official data with market proxies and requiring node consensus, we reduce both oracle manipulation and stale data risk.',
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
