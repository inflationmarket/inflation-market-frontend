import React from 'react';
import { Card, Button } from '../components/ui/primitives';

export default function KYCStatusPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white">KYC Status</h1>
        <Card>
          <div className="text-sm text-gray-300">No KYC is required for the non-custodial testnet. This page is a placeholder in case future features (e.g., fiat onramps or region-specific requirements) necessitate an optional identity check.</div>
          <div className="mt-4"><Button variant="ghost" disabled>Identity verification not required</Button></div>
        </Card>
      </div>
    </main>
  );
}
