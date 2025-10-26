import React from 'react';
import { Card } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';

export default function HowItWorksPage() {
  const steps = [
    { title: 'Connect Wallet', desc: 'Use MetaMask to connect and choose the supported testnet.' },
    { title: 'Fund with USDC', desc: 'Bridge or faucet testnet USDC and deposit to the protocol vault.' },
    { title: 'Open a Position', desc: 'Select market, set collateral and leverage, then confirm the transaction.' },
    { title: 'Funding & PnL', desc: 'Positions accrue funding; PnL depends on index and mark prices.' },
    { title: 'Close or Adjust', desc: 'Add/remove margin or close your position at any time.' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-8">How It Works</h1>
        <div className="space-y-4">
          {steps.map((s, i) => (
            <Card key={i} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-500 font-bold">
                {i + 1}
              </div>
              <div>
                <div className="text-xl font-bold">{s.title}</div>
                <div className="text-gray-300">{s.desc}</div>
              </div>
            </Card>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-6">
          Note: This is a testnet demo. Smart contracts and data adapters are under active development.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
