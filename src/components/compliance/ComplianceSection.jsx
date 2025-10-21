import React from 'react';
import { AlertTriangle, Shield, FileText, Eye, Scale, Info } from 'lucide-react';
import { Card } from '../ui/primitives';

const ComplianceSection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-black via-red-500/5 to-black">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-6 px-5 py-2.5 bg-red-500/10 border border-red-500/30 rounded-full">
            <span className="text-red-500 text-sm font-bold tracking-wide">LEGAL & COMPLIANCE</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Important Disclosures
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Please read these important legal notices and disclaimers carefully before using Inflation Market.
          </p>
        </div>

        {/* Risk Warning */}
        <Card className="mb-8 bg-gradient-to-br from-red-500/20 to-red-500/5 border-2 border-red-500/40">
          <div className="flex items-start gap-4 p-6">
            <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">High-Risk Financial Instrument Warning</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Perpetual swaps and leveraged derivatives carry substantial risk of loss. Trading these instruments may result
                in the total loss of your deposited collateral. The risk increases with higher leverage ratios (up to 20x).
                You should only participate if you fully understand these risks and can afford to lose your entire investment.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Leverage amplifies both gains and losses—positions can be liquidated if margin falls below maintenance requirements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Funding rate payments occur continuously and can erode your position value over time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Oracle failures, network congestion, or smart contract bugs may result in unexpected liquidations or loss of funds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Macroeconomic data (CPI, GDP, housing prices) can be volatile and unpredictable.</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Compliance Cards */}
        <div className="space-y-6 mb-12">
          {/* Regulatory Status */}
          <Card className="bg-white/5 border-white/10 hover:border-yellow-500/30 transition-all">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-white">Regulatory Status</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Inflation Market is a decentralized protocol deployed on public blockchain networks. The protocol
                operates as non-custodial software—users retain full control of their assets at all times.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                <strong className="text-yellow-500">Current Status:</strong> The protocol is in <strong>testnet phase</strong>.
                No real funds are at risk. Testnet tokens have no monetary value. Production deployment will follow completion
                of security audits, hybrid oracle network validation, and Phase 1 milestones.
              </p>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-red-500">Geographic Restrictions:</strong> This protocol may not be available to
                residents of certain jurisdictions, including but not limited to the United States, sanctioned countries,
                or regions where decentralized derivatives are prohibited. Users are solely responsible for ensuring compliance
                with local laws and regulations before interacting with the protocol.
              </p>
            </div>
          </Card>

          {/* No Investment Advice */}
          <Card className="bg-white/5 border-white/10 hover:border-yellow-500/30 transition-all">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-white">Not Investment or Financial Advice</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                All content provided on this website, documentation, and related materials is for <strong>informational and
                educational purposes only</strong>. Nothing presented here constitutes:
              </p>
              <ul className="space-y-2 text-gray-300 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Investment, financial, legal, or tax advice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>An offer or solicitation to buy or sell securities, derivatives, or other financial instruments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>A recommendation or endorsement of any trading strategy or position</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>A guarantee of returns, performance, or specific outcomes</span>
                </li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                You should consult with qualified financial, legal, and tax professionals before making any investment decisions.
                The protocol developers, contributors, and associated entities bear no responsibility for your trading decisions
                or outcomes.
              </p>
            </div>
          </Card>

          {/* Smart Contract Risks */}
          <Card className="bg-white/5 border-white/10 hover:border-yellow-500/30 transition-all">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-white">Smart Contract & Protocol Risks</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Inflation Market is an experimental protocol built on smart contracts deployed to public blockchains. Despite
                best efforts in development and testing, the protocol carries inherent risks:
              </p>
              <ul className="space-y-2 text-gray-300 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span><strong>Unaudited Code:</strong> Contracts are currently unaudited. Formal security audits are planned before mainnet deployment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span><strong>Bugs & Exploits:</strong> Smart contract vulnerabilities could lead to loss of funds, locked assets, or unintended behavior.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span><strong>Oracle Dependency:</strong> Accurate pricing relies on the hybrid oracle network. Oracle failures, delays, or manipulation could impact positions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span><strong>Network Risks:</strong> Blockchain congestion, high gas fees, or network forks may affect transaction execution and liquidations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span><strong>Irreversibility:</strong> Blockchain transactions are irreversible. Mistakes cannot be undone.</span>
                </li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                By using this protocol, you acknowledge and accept these risks. The protocol is provided "as-is" without warranties
                of any kind.
              </p>
            </div>
          </Card>

          {/* Privacy & Data */}
          <Card className="bg-white/5 border-white/10 hover:border-yellow-500/30 transition-all">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-white">Privacy & Data Collection</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Inflation Market is a decentralized protocol. Interactions occur directly between your wallet and smart contracts
                on public blockchains. Key privacy considerations:
              </p>
              <ul className="space-y-2 text-gray-300 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span><strong>On-Chain Transparency:</strong> All transactions, positions, and wallet addresses are publicly visible on the blockchain.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span><strong>No KYC/AML:</strong> The protocol does not collect personal information, but users remain subject to local laws.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span><strong>Website Analytics:</strong> This website may use standard analytics tools (e.g., Google Analytics) to track usage patterns. No personal data is sold or shared with third parties.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span><strong>IP Addresses:</strong> Your IP address may be logged by web hosting providers and RPC nodes you connect to.</span>
                </li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                For full privacy details, see our Privacy Policy (coming soon).
              </p>
            </div>
          </Card>

          {/* Terms of Use */}
          <Card className="bg-white/5 border-white/10 hover:border-yellow-500/30 transition-all">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-white">Terms of Use</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                By accessing this website or interacting with the Inflation Market protocol, you agree to the following terms:
              </p>
              <ul className="space-y-2 text-gray-300 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">1.</span>
                  <span>You are of legal age and have the legal capacity to enter into binding agreements in your jurisdiction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">2.</span>
                  <span>You are not a resident of, or located in, a jurisdiction where use of this protocol is prohibited or restricted.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">3.</span>
                  <span>You will comply with all applicable laws, including tax reporting and anti-money laundering regulations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">4.</span>
                  <span>You understand the risks outlined above and use the protocol at your own risk.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">5.</span>
                  <span>You will not use the protocol for illegal activities, market manipulation, or in violation of sanctions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">6.</span>
                  <span>The protocol developers and contributors are not liable for any losses, damages, or legal claims arising from your use.</span>
                </li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                Full Terms of Service will be published before mainnet launch. Continued use of the testnet constitutes acceptance
                of these preliminary terms.
              </p>
            </div>
          </Card>

          {/* No Warranty */}
          <Card className="bg-white/5 border-white/10 hover:border-yellow-500/30 transition-all">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-white">No Warranty or Liability</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                THE INFLATION MARKET PROTOCOL AND THIS WEBSITE ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES
                OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="space-y-2 text-gray-300 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Warranties of merchantability, fitness for a particular purpose, or non-infringement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Accuracy, reliability, or completeness of data, oracle feeds, or market information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Uninterrupted, secure, or error-free operation of the protocol or website</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Protection against loss of funds, hacks, exploits, or technical failures</span>
                </li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE PROTOCOL DEVELOPERS, CONTRIBUTORS, AND AFFILIATES SHALL NOT BE
                LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR
                REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, OR GOODWILL ARISING OUT OF YOUR
                ACCESS TO OR USE OF THE PROTOCOL.
              </p>
            </div>
          </Card>
        </div>

        {/* CTA Card */}
        <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-2 border-yellow-500/40 text-center p-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Info className="h-6 w-6 text-yellow-500" />
            <p className="text-xl font-bold text-white">Questions About Compliance?</p>
          </div>
          <p className="text-base text-gray-300 mb-6 max-w-2xl mx-auto">
            For legal inquiries, compliance questions, or security disclosures, please reach out via Discord or GitHub.
            Full legal documentation will be published before mainnet launch.
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
              href="https://github.com/inflationmarket"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/20 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </Card>

        {/* Last Updated */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Last Updated: October 2025 • Testnet Version
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;
