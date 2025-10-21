import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { X, ArrowUp, ArrowDown, AlertTriangle } from 'lucide-react';
import { Button, Input, Card } from '../ui/primitives';

const formatCurrency = (value, decimals = 2) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value ?? 0);

const MarginManagementModal = ({
  isOpen,
  onClose,
  position,
  maxAddAmount,
  maxRemoveAmount,
  onAddMargin,
  onRemoveMargin,
}) => {
  const [activeTab, setActiveTab] = useState('add');
  const [amount, setAmount] = useState('');

  const parsedAmount = useMemo(() => Number(amount) || 0, [amount]);

  if (!isOpen || !position) return null;

  const handleConfirm = () => {
    if (parsedAmount <= 0) return;
    if (activeTab === 'add') {
      onAddMargin(parsedAmount);
    } else {
      onRemoveMargin(parsedAmount);
    }
    setAmount('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-black shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Margin management</p>
            <h2 className="text-xl font-semibold text-white">
              Position #{position.id.slice(0, 8)} – {position.direction === 'long' ? 'Long' : 'Short'}
            </h2>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" /> Close
          </Button>
        </div>

        <div className="space-y-6 px-6 py-5">
          {/* Tabs */}
          <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab('add');
                setAmount('');
              }}
              className={`flex w-1/2 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-all ${
                activeTab === 'add'
                  ? 'bg-yellow-500 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ArrowUp className="h-4 w-4" /> Add Margin
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('remove');
                setAmount('');
              }}
              className={`flex w-1/2 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-all ${
                activeTab === 'remove'
                  ? 'bg-yellow-500 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ArrowDown className="h-4 w-4" /> Remove Margin
            </button>
          </div>

          {/* Summary cards */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <p className="text-xs uppercase tracking-wide text-gray-500">Current Position</p>
              <div className="mt-3 space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Collateral</span>
                  <span>${formatCurrency(position.collateral)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Leverage</span>
                  <span>{position.leverage.toFixed(1)}x</span>
                </div>
                <div className="flex justify-between">
                  <span>Liquidation price</span>
                  <span>${formatCurrency(position.liquidationPrice)}</span>
                </div>
              </div>
            </Card>

            <Card>
              <p className="text-xs uppercase tracking-wide text-gray-500">Projected Metrics</p>
              <div className="mt-3 space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>New leverage</span>
                  <span>
                    {activeTab === 'add'
                      ? (position.projectedAdd?.leverage ?? position.leverage).toFixed(1)
                      : (position.projectedRemove?.leverage ?? position.leverage).toFixed(1)}
                    x
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>New liquidation</span>
                  <span>
                    $
                    {formatCurrency(
                      activeTab === 'add'
                        ? position.projectedAdd?.liquidationPrice ?? position.liquidationPrice
                        : position.projectedRemove?.liquidationPrice ?? position.liquidationPrice,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Health ratio</span>
                  <span>
                    {formatPercent(
                      (activeTab === 'add'
                        ? position.projectedAdd?.healthRatio ?? position.healthRatio
                        : position.projectedRemove?.healthRatio ?? position.healthRatio) * 100,
                    )}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Input */}
          <Input
            label={`Amount to ${activeTab === 'add' ? 'add' : 'withdraw'} (USDC)`}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            helperText={`Maximum ${
              activeTab === 'add' ? formatCurrency(maxAddAmount) : formatCurrency(maxRemoveAmount)
            } USDC`}
          />

          {activeTab === 'remove' && parsedAmount > maxRemoveAmount && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              <AlertTriangle className="h-4 w-4" />
              Removing this much collateral would push the position close to liquidation. Reduce the withdrawal amount.
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant={activeTab === 'add' ? 'primary' : 'danger'}
              onClick={handleConfirm}
              disabled={
                parsedAmount <= 0 ||
                (activeTab === 'add' && parsedAmount > maxAddAmount) ||
                (activeTab === 'remove' && parsedAmount > maxRemoveAmount)
              }
            >
              {activeTab === 'add' ? (
                <>
                  <ArrowUp className="h-4 w-4" /> Confirm Add
                </>
              ) : (
                <>
                  <ArrowDown className="h-4 w-4" /> Confirm Remove
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

MarginManagementModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  position: PropTypes.object,
  maxAddAmount: PropTypes.number,
  maxRemoveAmount: PropTypes.number,
  onAddMargin: PropTypes.func,
  onRemoveMargin: PropTypes.func,
};

MarginManagementModal.defaultProps = {
  isOpen: false,
  onClose: () => {},
  position: null,
  maxAddAmount: 0,
  maxRemoveAmount: 0,
  onAddMargin: () => {},
  onRemoveMargin: () => {},
};

export default MarginManagementModal;
