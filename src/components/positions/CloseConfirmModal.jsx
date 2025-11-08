import React from 'react';
import { Button, Card } from '../ui/primitives';
import { X } from 'lucide-react';

export default function CloseConfirmModal({ isOpen, onClose, onConfirm, position }) {
  if (!isOpen || !position) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Close position</p>
            <h2 className="text-lg font-semibold text-white">{position.isLong ? 'Long' : 'Short'} — {position.market}</h2>
          </div>
          <Button variant="ghost" onClick={onClose}><X className="h-4 w-4" /> Close</Button>
        </div>
        <div className="px-6 py-5 space-y-3">
          <Card>
            <div className="text-sm text-gray-300">Are you sure you want to close this position?</div>
          </Card>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button variant="danger" onClick={onConfirm}>Confirm Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

