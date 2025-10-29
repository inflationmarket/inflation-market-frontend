import React from 'react';
import { ArrowRight, Zap, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Card } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';
import { MARKETS } from '../config/constants';

export default function LandingPage({ onNavigate }) {

  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-500 mb-6">
              <Zap className="w-4 h-4" />
              Live testnet demo
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Trade Inflation. Protect Your Wealth.
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              The first decentralized perpetual futures market for real-world economic data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/app"><Button className="text-lg">Open Prototype <ArrowRight className="w-5 h-5" /></Button></Link>
              <Link to="/whitepaper"><Button variant="ghost" className="text-lg">Read Whitepaper</Button></Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {MARKETS.map((m) => (
              <Card key={m.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold text-lg">{m.name}</div>
                    <div className="text-gray-400 text-sm">{m.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-xl">${m.price.toFixed(2)}</div>
                    <div className={`text-sm font-bold ${m.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {`${m.change24h >= 0 ? '+' : ''}${m.change24h.toFixed(2)}%`}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Inflation Market */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-yellow-500/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Inflation Market?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The macro risks you face every day—inflation, housing, GDP volatility—are now tradeable and hedgeable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Hedge Inflation Risk',
                description: 'Protect savings from rising prices with CPI-linked perpetuals and transparent data.'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Earn Funding Yields',
                description: 'Provide liquidity or short inflation to earn funding when rates favor your view.'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Speculate on Economics',
                description: 'Express macro views across CPI, housing, and GDP with built-in risk tools.'
              }
            ].map((feature, i) => (
              <Card key={i} className="text-center hover:border-yellow-500/40 transition-all">
                <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 mx-auto mb-4">
                  {feature.icon}
                </div>
                <div className="text-xl font-bold text-white mb-2">{feature.title}</div>
                <div className="text-sm text-gray-400">{feature.description}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-2 border-yellow-500/40 text-center p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Open Prototype?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of traders already hedging their inflation risk and earning yields on Inflation Market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/app"><Button className="text-lg">Open Prototype <ArrowRight className="w-5 h-5" /></Button></Link>
              <Link to="/whitepaper"><Button variant="ghost" className="text-lg">Read Whitepaper</Button></Link>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-10">
            <h3 className="text-2xl font-bold text-white mb-2">Have questions?</h3>
            <p className="text-gray-300 mb-6">Visit our Frequently Asked Questions for quick, clear answers.</p>
            <Link to="/faq">
              <Button>Go to FAQ</Button>
            </Link>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
