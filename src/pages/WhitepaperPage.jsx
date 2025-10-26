import React from 'react';
import { Card, Button } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-8">Whitepaper</h1>
        <Card>
          <p className="text-gray-300 mb-4">
            Our technical whitepaper will cover market design, risk parameters, oracle architecture, and security model.
          </p>
          <p className="text-gray-300 mb-4">
            We will publish drafts for community review prior to testnet upgrades and audits.
          </p>
          <Button as="a" href="https://github.com/" target="_blank" rel="noopener noreferrer">
            Follow Development on GitHub
          </Button>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
