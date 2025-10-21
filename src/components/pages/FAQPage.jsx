import React, { useState } from 'react';
import { ChevronDown, Info, CheckCircle, Shield, Zap, AlertTriangle, BookOpen, Menu, Users, DollarSign } from 'lucide-react';
import { Card, PyramidLogo } from '../ui/primitives';

const FAQPage = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqCategories = [
    {
      category: 'Getting Started',
      icon: <BookOpen className="w-5 h-5" />,
      questions: [
        {
          question: 'What is Inflation Market and why does it exist?',
          answer: `Inflation Market is a decentralized protocol enabling anyone to hedge or speculate on macroeconomic indicators—specifically inflation (CPI), housing prices (Case-Shiller index), and GDP growth. Traditional finance offers limited access to these instruments, typically through banks, institutional swaps, or ETFs with high fees and custodial risk.

Our protocol draws inspiration from Nobel Laureate Robert Shiller's vision of macro markets: democratizing access to economic risk management tools. By building on blockchain technology, we eliminate intermediaries, reduce costs, and provide permissionless access to sophisticated hedging instruments.`,
          details: [
            'Non-custodial: Your collateral stays in your wallet until you trade',
            'Transparent: All oracle updates, funding rates, and settlements are on-chain',
            'Permissionless: No KYC, no geographic restrictions, no minimum account sizes',
            'Composable: Positions can integrate with DeFi protocols for advanced strategies'
          ]
        },
        {
          question: 'How is this different from traditional inflation hedges?',
          answer: `Traditional inflation hedges (TIPS, I-Bonds, commodities, real estate) require significant capital, have limited liquidity, or expose you to additional risks beyond inflation. Crypto-native alternatives don't exist—GMX and dYdX focus on crypto assets, not macro indices.`,
          comparison: [
            'TIPS (Treasury Inflation-Protected Securities): Require holding to maturity, low yields, limited upside',
            'I-Bonds: Capped at $10k/year, 1-year lock-up period, no leverage',
            'Commodities: Exposure to supply/demand shocks beyond inflation',
            'Real Estate: Illiquid, high capital requirements, management overhead',
            'Inflation Market: Perpetual contracts, up to 20x leverage, instant liquidity, pure CPI exposure'
          ]
        },
        {
          question: 'Who should use Inflation Market?',
          answer: `Inflation Market serves multiple user profiles across DeFi and traditional finance:`,
          details: [
            'Individual Savers: Protect stablecoin holdings from inflation erosion',
            'DAOs & Treasuries: Hedge operating budgets denominated in USDC/DAI',
            'Speculators: Express macro views on inflation, housing, GDP trends',
            'Structured Product Creators: Build yield strategies combining inflation hedges',
            'Corporate Treasuries: Off-chain entities seeking transparent, verifiable macro exposure',
            'Institutional Investors: Access inflation derivatives without traditional intermediaries'
          ]
        },
        {
          question: 'Is the platform live? Can I trade now?',
          answer: `We are currently in public testnet. The UI you see demonstrates the complete trading flow—connecting wallet, opening positions, managing margin, viewing P&L—but transactions do not execute on mainnet yet.

**Current Status (Phase 1):**
- Smart contracts deployed on testnet with manual oracle (Phase 0 complete)
- Hybrid MPC oracle network under development
- UI prototype functional for testing flows
- Security audits scheduled for Q2 2025

**Mainnet Launch Timeline:**
- Phase 1 (Q1 2025): Complete hybrid oracle development
- Phase 2 (Q2 2025): Security audits and bug bounties
- Phase 3 (Q3 2025): Mainnet launch with CPI perpetual
- Phase 4 (Q4 2025): Add Housing and GDP markets`,
          details: [
            'You can explore the prototype UI to understand mechanics',
            'Join Discord for testnet access once hybrid oracles are live',
            'Follow Twitter for weekly development updates',
            'Review docs/oracle/hybrid-oracle-plan.md for technical details'
          ]
        }
      ]
    },
    {
      category: 'How It Works',
      icon: <Zap className="w-5 h-5" />,
      questions: [
        {
          question: 'What are perpetual futures and how do they work?',
          answer: `Perpetual futures (or perpetual swaps) are derivative contracts that track an underlying index price but never expire. Unlike traditional futures with monthly/quarterly expiry dates, perpetuals use a funding rate mechanism to keep the contract price aligned with the index.

**Key Mechanics:**
- You choose a direction (long or short) and leverage (1x-20x)
- Your position tracks the index price (e.g., CPI published by BLS)
- Funding payments flow between longs and shorts every 8 hours
- You can hold positions indefinitely or close anytime
- Liquidation occurs if your margin ratio falls below maintenance threshold (5%)`,
          details: [
            'Long Position: Profit if CPI increases, lose if CPI decreases',
            'Short Position: Profit if CPI decreases, lose if CPI increases',
            'Leverage amplifies both gains and losses',
            'Funding Rate: Periodic payment to keep mark price near index price',
            'No Expiry: Hold as long as you maintain margin requirements'
          ]
        },
        {
          question: 'How does the funding rate work?',
          answer: `The funding rate is the core mechanism keeping perpetual futures prices aligned with the underlying index. It's a periodic payment exchanged between long and short positions.

**Formula:**
Funding Rate = (Mark Price - Index Price) / Index Price × Funding Coefficient

**How it works:**
- If Mark Price > Index Price: Longs are overweight → Longs pay shorts
- If Mark Price < Index Price: Shorts are overweight → Shorts pay longs
- Payments occur every 8 hours (configurable)
- Rate is capped at ±0.05% per interval (default)

**Example:**
- Index Price: $100.00 (CPI oracle)
- Mark Price: $100.50 (trading price)
- Funding Rate: +0.50% per 8h
- If you're long $10,000: You pay $50 every 8 hours
- If you're short $10,000: You receive $50 every 8 hours`,
          details: [
            'Funding payments are continuous, not just at settlement',
            'The system is self-balancing—high funding attracts opposite trades',
            'You can earn yield by providing liquidity on the less-popular side',
            'Funding rate history is published on-chain for transparency'
          ]
        },
        {
          question: 'How do I open a position?',
          answer: `Opening a position requires four simple steps:

**Step 1: Connect Wallet**
- Use MetaMask, WalletConnect, or any Web3 wallet
- Ensure you're on the correct network (Sepolia testnet or Ethereum mainnet)
- No KYC or account creation required

**Step 2: Deposit Collateral**
- Deposit USDC (or other supported stablecoins) as margin
- Minimum: 10 USDC (configurable per market)
- Your collateral determines maximum leverage

**Step 3: Configure Position**
- Choose market (CPI, Housing, GDP)
- Select direction (Long or Short)
- Set leverage (1x to 20x)
- Enter position size
- Set slippage tolerance (default 0.5%)

**Step 4: Execute Trade**
- Review order summary (entry price, fees, liquidation price)
- Approve USDC spending (one-time)
- Confirm transaction
- Position opens instantly once confirmed on-chain`,
          details: [
            'Trading Fee: 0.1% of position size',
            'Gas Costs: Ethereum network fees (varies by congestion)',
            'Slippage Protection: Transaction reverts if price moves beyond tolerance',
            'Position ID: Unique identifier for tracking and management'
          ]
        },
        {
          question: 'What happens if I get liquidated?',
          answer: `Liquidation occurs when your position's health ratio falls below the maintenance margin threshold (5% by default). This protects the protocol from bad debt.

**Health Ratio Calculation:**
Health Ratio = (Collateral + Unrealized P&L) / Position Value

**Liquidation Process:**
1. Health ratio drops below 5%
2. Liquidator bot detects unhealthy position
3. Position is forcibly closed at market price
4. Liquidation fee (5% of collateral) paid to liquidator
5. Remaining collateral (if any) returned to trader
6. Insurance fund covers shortfall if position is underwater

**Example:**
- Position: Long $10,000 CPI at 5x leverage
- Collateral: $2,000
- Liquidation Price: $98.10 (entry at $103)
- If CPI drops to $98.10, position is liquidated
- You lose ~$2,000 collateral
- Liquidator receives ~$100 reward`,
          details: [
            'Monitor your health ratio in real-time on position card',
            'Add margin to reduce liquidation risk',
            'Use lower leverage for less aggressive positions',
            'Set stop-losses manually if you want tighter control',
            'Liquidation price is displayed when opening position'
          ]
        },
        {
          question: 'Can I add or remove margin after opening a position?',
          answer: `Yes! Margin management is a key feature for avoiding liquidation and optimizing capital efficiency.

**Add Margin:**
- Increases your collateral
- Reduces leverage ratio
- Moves liquidation price further away (safer)
- Can be done anytime
- Requires additional USDC approval

**Remove Margin:**
- Decreases your collateral
- Increases leverage ratio
- Moves liquidation price closer (riskier)
- Only allowed if position remains healthy (>5% maintenance margin)
- Unlocks capital for other uses

**Use Cases:**
- Add margin during volatile periods to prevent liquidation
- Remove excess margin to deploy capital elsewhere
- Rebalance portfolio leverage across multiple positions`,
          details: [
            'Margin adjustments are instant (one transaction)',
            'No fees for margin management',
            'You cannot remove margin if it would cause immediate liquidation',
            'Liquidation price recalculates automatically after adjustments'
          ]
        }
      ]
    },
    {
      category: 'Hybrid Oracle & Data',
      icon: <Shield className="w-5 h-5" />,
      questions: [
        {
          question: 'What is the hybrid oracle network and why is it needed?',
          answer: `The hybrid oracle network is our multi-layer data aggregation system combining official government sources, market proxies, and decentralized node operators to deliver tamper-resistant, verifiable macroeconomic data on-chain.

**Why Hybrid?**
Traditional oracles (single Chainlink feed) create a single point of failure. Macro data requires:
- Official sources: BLS (CPI), Case-Shiller (housing), BEA (GDP)
- Market proxies: Inflation swaps, breakeven rates, treasury yields
- Multiple validators: Independent nodes cross-checking data
- Fallback mechanisms: Alternative sources if primary is stale

**Architecture:**
1. **Data Layer:** Nodes fetch from BLS APIs, Eurostat, market data providers
2. **Aggregation Layer:** MPC nodes compute median, detect outliers
3. **Consensus Layer:** Multi-signature agreement before on-chain submission
4. **Delivery Layer:** Chainlink DON or direct submission to smart contracts
5. **Verification Layer:** On-chain deviation checks, staleness detection`,
          details: [
            'No single node can manipulate data',
            'Staking requirements + slashing for bad behavior',
            'Automatic fallback if official sources are delayed',
            'All submissions logged with timestamps and signatures',
            'Community can verify data provenance off-chain'
          ]
        },
        {
          question: 'How is CPI data sourced and updated?',
          answer: `CPI (Consumer Price Index) data is published monthly by the Bureau of Labor Statistics (BLS) in the US. Our oracle network processes this data through multiple channels:

**Primary Source:**
- BLS API (https://api.bls.gov/publicAPI/v2/)
- Release date: ~15th of each month
- Lag: Reports previous month's data
- Format: Year-over-year and month-over-month changes

**Secondary Sources (for validation):**
- Cleveland Fed Inflation Nowcasting
- Market-implied inflation (TIPS breakevens)
- Inflation swap rates
- Historical CPI datasets for consistency checks

**Update Process:**
1. BLS publishes CPI at 8:30 AM EST on release day
2. Oracle nodes fetch within 15 minutes
3. Nodes cross-reference with market proxies
4. Median value computed from 5+ nodes
5. On-chain submission if deviation < 0.5%
6. Smart contract updates index price
7. Event emitted with data source, timestamp, signatures`,
          details: [
            'Update frequency: Monthly (aligned with BLS schedule)',
            'Validation time: ~30 minutes from BLS release',
            'Historical data available: January 2000 to present',
            'International expansion: EU HICP, UK RPI in Phase 2'
          ]
        },
        {
          question: 'What prevents oracle manipulation or bad data?',
          answer: `Multiple defense layers protect against oracle manipulation:

**1. Economic Security (Staking)**
- Each node stakes tokens (minimum 10,000 tokens)
- Slashing penalty: Up to 100% for provably false data
- Reputation score: Affects future earnings and inclusion

**2. Technical Security (Multi-Signature)**
- Requires 3-of-5 node agreement for updates
- Median calculation filters outliers
- Deviation thresholds: >0.5% triggers investigation
- Staleness detection: Updates older than 2 hours rejected

**3. Source Diversity**
- Official APIs (BLS, Eurostat, ONS)
- Market proxies (inflation swaps, TIPS)
- Third-party data vendors (Bloomberg, Refinitiv)
- Fallback if primary source is compromised

**4. Transparency & Auditability**
- Every update includes data source hash
- Off-chain reports published to IPFS
- Community can verify against official sources
- Historical audit trail immutable on-chain

**5. Emergency Safeguards**
- Admin multisig can pause markets if anomaly detected
- Insurance fund covers losses from oracle failures
- Timelock for parameter changes (48 hours minimum)`,
          comparison: [
            'Single Chainlink feed: One provider controls data',
            'Hybrid network: 5+ independent nodes must agree',
            'Centralized APIs: No transparency or verification',
            'Our approach: Full audit trail with IPFS proofs'
          ]
        },
        {
          question: 'How do I verify the data is accurate?',
          answer: `We provide multiple ways to verify oracle data accuracy:

**On-Chain Verification:**
- Every oracle update emits an event with: timestamp, price, data source hash, node signatures
- View transaction history on Etherscan/block explorer
- Compare on-chain index price with BLS official data

**Off-Chain Verification:**
- Download oracle reports from IPFS (hash included in on-chain event)
- Reports contain: raw BLS data, fetch timestamp, node signatures, methodology
- Cross-reference with official BLS website (https://www.bls.gov/cpi/)

**Dashboard (Coming Soon):**
- Real-time oracle update history
- Chart comparing index price vs. official CPI
- Node operator performance metrics
- Deviation alerts if data diverges

**Community Tools:**
- Open-source verification scripts on GitHub
- Community-run monitoring bots
- Discord alerts for unusual oracle behavior`,
          details: [
            'All oracle code is open-source and audited',
            'Node operators publish proof-of-fetch with timestamps',
            'Emergency pause mechanism if data is disputed',
            'Historical accuracy rate tracked and published'
          ]
        }
      ]
    },
    {
      category: 'Fees & Economics',
      icon: <DollarSign className="w-5 h-5" />,
      questions: [
        {
          question: 'What fees do I pay?',
          answer: `Inflation Market has transparent, competitive fees:

**Trading Fees:**
- Opening a position: 0.1% of position size
- Closing a position: 0.1% of position size
- Example: Open $10,000 position = $10 fee

**Funding Payments:**
- Exchanged between longs and shorts
- Rate varies based on mark vs. index price
- Typical range: -0.05% to +0.05% per 8 hours
- You receive funding if on favorable side

**Liquidation Fees:**
- 5% of collateral if liquidated
- Paid to liquidator as incentive
- Remaining collateral returned (if position not underwater)

**Gas Costs:**
- Ethereum network fees (varies by congestion)
- Typical cost: $5-50 depending on network activity
- Consider using L2 (Arbitrum/Optimism) for lower fees (future)

**No Hidden Fees:**
- No deposit/withdrawal fees
- No account maintenance fees
- No inactivity fees
- No KYC/verification costs`,
          details: [
            'Trading fees go to protocol treasury (future governance)',
            'Funding payments are peer-to-peer (zero-sum)',
            'Insurance fund receives portion of liquidation fees',
            'Fee structure subject to governance changes post-launch'
          ]
        },
        {
          question: 'How is the funding rate calculated and who pays it?',
          answer: `The funding rate balances supply and demand for long vs. short positions.

**Calculation:**
Funding Rate = ((Mark Price - Index Price) / Index Price) × Funding Coefficient × (Time Interval / 24h)

**Parameters:**
- Funding Coefficient: 1.0 (default, adjustable by governance)
- Time Interval: 8 hours (3 payments per day)
- Max Rate: ±0.05% per interval (safety cap)

**Who Pays:**
- If Mark > Index: Market is bullish → Longs pay shorts
- If Mark < Index: Market is bearish → Shorts pay longs
- Payment amount: (Position Size × Funding Rate)

**Example Scenarios:**

**Scenario 1: Mark Price Above Index**
- Index Price: $100.00
- Mark Price: $100.50
- Funding Rate: +0.50% per 8h
- Long $10,000 position: You pay $50
- Short $10,000 position: You receive $50

**Scenario 2: Mark Price Below Index**
- Index Price: $100.00
- Mark Price: $99.50
- Funding Rate: -0.50% per 8h
- Long $10,000 position: You receive $50
- Short $10,000 position: You pay $50`,
          details: [
            'Funding rate updates every block (continuous calculation)',
            'Payments settled every 8 hours (00:00, 08:00, 16:00 UTC)',
            'Historical funding rates published for transparency',
            'Arbitrageurs keep funding rates competitive'
          ]
        }
      ]
    },
    {
      category: 'Risks & Safety',
      icon: <AlertTriangle className="w-5 h-5" />,
      questions: [
        {
          question: 'What are the risks of using Inflation Market?',
          answer: `Like all DeFi protocols, Inflation Market carries risks. We believe in full transparency:

**Smart Contract Risk:**
- Bugs or vulnerabilities in protocol code
- Mitigation: Multiple audits, bug bounties, gradual rollout
- Insurance fund for compensation in case of exploits

**Oracle Risk:**
- Data manipulation or staleness
- Mitigation: Hybrid multi-source oracle, node staking/slashing
- Emergency pause if data anomaly detected

**Liquidation Risk:**
- Volatile market conditions causing rapid liquidation
- Mitigation: Real-time health monitoring, margin alerts
- Use lower leverage to reduce risk

**Market Risk:**
- Macroeconomic events moving against your position
- Mitigation: Position sizing, stop-losses, hedging strategies
- Understand correlation with other holdings

**Funding Rate Risk:**
- Prolonged adverse funding can erode profits
- Mitigation: Monitor funding trends, close if rates unfavorable
- Consider total cost of holding vs. expected returns

**Regulatory Risk:**
- Unclear regulatory treatment of macro derivatives
- Mitigation: Decentralized, non-custodial design
- Consult legal/tax advisor for your jurisdiction

**Counterparty Risk:**
- Minimal—protocol is non-custodial
- Insurance fund protects against bad debt
- No reliance on centralized intermediary solvency`,
          details: [
            'Start with small positions to learn mechanics',
            'Never use leverage you cannot afford to lose',
            'Monitor positions regularly or use automation',
            'Diversify across multiple strategies and protocols',
            'Read full risk disclosures in documentation'
          ]
        },
        {
          question: 'How is the protocol secured? Have you been audited?',
          answer: `Security is our top priority. We employ industry best practices:

**Development Practices:**
- Solidity 0.8.20+ (built-in overflow protection)
- OpenZeppelin contracts for standard components
- ReentrancyGuard on all state-changing functions
- AccessControl roles for privileged operations
- Pausable mechanism for emergency situations

**Testing:**
- 95%+ unit test coverage
- Integration tests for complex scenarios
- Fuzz testing for edge cases
- Mainnet forking for realistic simulations

**Audits (Planned):**
- Q2 2025: Primary audit by top-tier firm (TBD)
- Q3 2025: Secondary audit for redundancy
- Ongoing bug bounty program (launch with mainnet)

**Security Features:**
- Timelock on admin functions (48 hours minimum)
- Multisig for critical operations (3-of-5)
- Insurance fund for user protection
- Circuit breakers for anomalous activity
- Rate limits on deposits/withdrawals

**Transparency:**
- All code open-source on GitHub
- Verified contracts on Etherscan
- Regular security updates published
- Incident response plan documented`,
          details: [
            'Testnet phase allows community testing before mainnet',
            'Gradual rollout: CPI first, then Housing/GDP',
            'Bug bounty rewards up to $100k for critical findings',
            'Post-mortem reports published for any incidents'
          ]
        }
      ]
    },
    {
      category: 'Governance & Future',
      icon: <Users className="w-5 h-5" />,
      questions: [
        {
          question: 'Will there be a governance token?',
          answer: `Yes, we plan to launch a governance token in Phase 2 (post-mainnet). Token design is underway with focus on utility and value accrual.

**Planned Use Cases:**
- **Governance:** Vote on risk parameters, fee structures, market additions
- **Oracle Staking:** Run oracle nodes by staking tokens
- **Fee Sharing:** Earn portion of protocol revenue
- **Insurance Fund:** Stake tokens to backstop liquidations, earn yield
- **Liquidity Incentives:** Rewards for providing liquidity

**Distribution (Tentative):**
- Community Airdrop: 20% (early users, testnet participants)
- Treasury: 30% (protocol development, grants)
- Team & Advisors: 20% (4-year vest)
- Liquidity Mining: 20% (incentivize adoption)
- Investors: 10% (if fundraising occurs)

**Timeline:**
- Token design: Q1 2025
- Community feedback: Q2 2025
- Launch: Q3-Q4 2025 (post-mainnet stabilization)

We're committed to **progressive decentralization**—launching the protocol first, proving product-market fit, then decentralizing governance gradually.`,
          details: [
            'No token sale or ICO planned',
            'Fair launch principles prioritized',
            'Governance will start with limited scope, expand over time',
            'Snapshot voting before on-chain governance'
          ]
        },
        {
          question: 'What markets will be added in the future?',
          answer: `We have an ambitious roadmap for market expansion:

**Phase 1 (Q3 2025): US Macro**
- US CPI (Consumer Price Index)
- US Housing (Case-Shiller 20-City Index)
- US Real GDP Growth (quarterly)

**Phase 2 (Q4 2025): International Expansion**
- EU HICP (Harmonized Index of Consumer Prices)
- UK RPI (Retail Price Index)
- Japan CPI
- Canada CPI

**Phase 3 (2026): Sector-Specific Indices**
- Core CPI (excluding food/energy)
- PCE (Personal Consumption Expenditures—Fed's preferred measure)
- Wage Growth Index
- Rent/Shelter CPI component

**Phase 4 (2026+): Advanced Products**
- CPI Calendar Spreads (trade monthly differences)
- Real Yield (Treasury Yield - CPI)
- Economic Nowcasting Indices
- Custom index baskets

**Community Requests:**
We'll prioritize markets based on community demand, oracle feasibility, and liquidity expectations.`,
          details: [
            'Each market requires robust oracle infrastructure',
            'Data availability and reliability are prerequisites',
            'Governance will vote on new market additions',
            'Suggest markets in Discord #feature-requests'
          ]
        },
        {
          question: 'How can I contribute or get involved?',
          answer: `We welcome contributions from developers, researchers, traders, and community members!

**For Developers:**
- GitHub: Submit PRs for bug fixes, features, documentation
- Auditing: Review smart contracts, suggest improvements
- Tooling: Build dashboards, analytics, trading bots

**For Node Operators:**
- Phase 1 (Q1 2025): Node operator guidelines released
- Requirements: Reliable infrastructure, API credentials, staking tokens
- Apply: Fill out node operator form in Discord

**For Researchers:**
- Oracle design: Improve data aggregation methods
- Risk modeling: Analyze liquidation cascades, funding dynamics
- Market design: Propose new indices or product structures

**For Community:**
- Discord: Join discussions, provide feedback
- Twitter: Share insights, help with awareness
- Testnet: Test protocol, report bugs
- Content: Write guides, create educational materials

**For Investors/Partners:**
- Contact team via Discord DM or email (TBD)
- Interested in strategic partnerships, integrations, data provision

**Incentives (Future):**
- Bug bounties for security findings
- Grants for valuable contributions
- Governance tokens for active participants
- Revenue sharing for node operators`,
          details: [
            'Join Discord: https://discord.gg/inflationmarket',
            'Follow Twitter: https://twitter.com/inflationmarket',
            'GitHub: https://github.com/inflationmarket',
            'Documentation: docs/ in main repository'
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-yellow-500/20 bg-black/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
              <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center">
                <PyramidLogo className="w-6 h-6 text-black" />
              </div>
              <h1 className="text-xl font-bold text-white">Inflation Market</h1>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => onNavigate('how-it-works')} className="text-gray-300 hover:text-yellow-500">How It Works</button>
              <button onClick={() => onNavigate('whitepaper')} className="text-gray-300 hover:text-yellow-500">Whitepaper</button>
              <button onClick={() => onNavigate('roadmap')} className="text-gray-300 hover:text-yellow-500">Roadmap</button>
              <button onClick={() => onNavigate('about')} className="text-gray-300 hover:text-yellow-500">About</button>
              <button onClick={() => onNavigate('app')} className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-bold">Open Prototype</button>
            </div>

            <button className="md:hidden text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-yellow-500/10 to-black">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-5 py-2.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
            <span className="text-yellow-500 text-sm font-bold tracking-wide">COMPLETE FAQ GUIDE</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Everything you need to know about Inflation Market—from basic concepts to advanced oracle mechanics.
            Transparent answers about our hybrid infrastructure, security practices, and roadmap.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-16">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-500">
                  {category.icon}
                </div>
                <h2 className="text-3xl font-bold text-white">{category.category}</h2>
              </div>

              {/* Questions */}
              <div className="space-y-3">
                {category.questions.map((faq, qIndex) => {
                  const globalIndex = catIndex * 100 + qIndex;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <FAQItem
                      key={qIndex}
                      faq={faq}
                      isOpen={isOpen}
                      onToggle={() => setOpenIndex(isOpen ? null : globalIndex)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-2 border-yellow-500/40 text-center p-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Info className="h-8 w-8 text-yellow-500" />
              <h2 className="text-3xl font-bold text-white">Still Have Questions?</h2>
            </div>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community on Discord for real-time support, follow development updates on Twitter,
              or dive into the technical documentation on GitHub.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://discord.gg/inflationmarket"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors text-lg"
              >
                Join Discord
              </a>
              <a
                href="https://twitter.com/inflationmarket"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/20 transition-colors text-lg"
              >
                Follow on Twitter
              </a>
              <button
                onClick={() => onNavigate('app')}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/20 transition-colors text-lg"
              >
                Try Prototype
              </button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
};

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
      <div className="space-y-6 border-t border-yellow-500/20 px-6 py-6">
        <p className="text-base text-gray-300 leading-relaxed whitespace-pre-line">
          {faq.answer}
        </p>

        {faq.details && faq.details.length > 0 && (
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <p className="text-sm font-bold text-blue-400">Key Points</p>
            </div>
            <ul className="space-y-2.5">
              {faq.details.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-blue-500 flex-shrink-0 mt-0.5">•</span>
                  <span className="text-sm text-gray-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {faq.comparison && faq.comparison.length > 0 && (
          <div className="rounded-xl border border-yellow-500/30 bg-black/30 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-4 w-4 text-yellow-500" />
              <p className="text-sm font-bold text-yellow-500">How This Compares</p>
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

const SharedFooter = ({ onNavigate }) => (
  <footer className="border-t border-yellow-500/20 bg-black py-12 px-4">
    <div className="max-w-6xl mx-auto text-center text-sm text-gray-400">
      <p>© 2025 Inflation Market. All rights reserved.</p>
      <p className="mt-2 text-xs text-yellow-500">⚠️ Testnet Preview</p>
    </div>
  </footer>
);

export default FAQPage;
