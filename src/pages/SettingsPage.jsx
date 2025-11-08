import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../components/ui/primitives';

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-semibold">Identity Verification</div>
              <div className="text-sm text-gray-400">Not required for the non-custodial testnet. May be added later for regional compliance or fiat onramps.</div>
            </div>
            <Link to="/settings/kyc-status"><Button variant="ghost">Learn more</Button></Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
