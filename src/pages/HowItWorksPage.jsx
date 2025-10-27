import React, { useState } from 'react';
import { Card } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">How Inflation Market Works</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A complete guide to protecting your savings and trading macroeconomic risk
          </p>
        </div>

        <section className="mb-16">
          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-2 border-yellow-500/40">
            <h2 className="text-3xl font-bold text-white mb-6">What Is Inflation Market?</h2>
            <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
              <p>
                Inflation Market is a <strong className="text-white">perpetual futures protocol</strong> that lets you hedge against—or speculate on—real-world economic data. Unlike traditional crypto-only perpetuals, our markets reference
                <strong className="text-white"> macro indexes</strong> like CPI, housing, and GDP.
              </p>
              <p>
                Traders can open leveraged long/short positions using USDC as collateral. Pricing and funding reference a transparent on-chain AMM and an index oracle.
              </p>
            </div>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Five Steps</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              'Connect Wallet',
              'Fund with USDC',
              'Choose Market',
              'Open Position',
              'Manage & Close',
            ].map((t, i) => (
              <button key={i} onClick={() => setActiveStep(i)} className={`p-4 rounded-lg border ${activeStep===i? 'border-yellow-500 bg-yellow-500/10 text-white':'border-yellow-500/20 text-gray-300 hover:border-yellow-500/40'}`}>
                <div className="text-sm font-bold">Step {i+1}</div>
                <div className="text-lg">{t}</div>
              </button>
            ))}
          </div>
          <Card className="mt-6">
            <div className="text-white font-bold mb-2">{['Connect Wallet','Fund with USDC','Choose Market','Open Position','Manage & Close'][activeStep]}</div>
            <div className="text-gray-300">
              {[
                'Connect MetaMask and verify you are on the supported testnet.',
                'Get testnet USDC and deposit to the vault so it can be used as collateral.',
                'Pick CPI, Housing, or GDP market and set your parameters.',
                'Confirm approvals and transactions; the position opens once confirmed.',
                'Add/remove margin, track funding and PnL, and close when ready.',
              ][activeStep]}
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Funding and Pricing</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <div className="text-xl font-bold text-white mb-2">Index Oracle</div>
              <div className="text-gray-300">Index price is computed from aggregated off-chain sources and delivered on-chain via a hybrid MPC + Chainlink pipeline.</div>
            </Card>
            <Card>
              <div className="text-xl font-bold text-white mb-2">Mark Price & AMM</div>
              <div className="text-gray-300">Mark price is determined by an AMM that accounts for inventory and trade size; funding moves positions toward index fair value.</div>
            </Card>
          </div>
        </section>

        <div className="text-sm text-gray-400 mt-10">Note: Testnet demo; components under active development.</div>
      </main>
      
      <SiteFooter />
    </div>
  );
}
