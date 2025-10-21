import React from 'react';
import PropTypes from 'prop-types';
import { X, BarChart3, Clock, LineChart, Activity } from 'lucide-react';
import { Card, Button } from '../ui/primitives';

const formatCurrency = (value, decimals = 2) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value ?? 0);

const formatPercent = (value, decimals = 2) =>
  `${value >= 0 ? '+' : ''}${(value ?? 0).toFixed(decimals)}%`;

const PositionDetailModal = ({ isOpen, onClose, position, marketData, fundingHistory, transactions }) => {
  if (!isOpen || !position) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-gradient-to-br from-black via-black to-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-gray-400">Position details</p>
            <h2 className="text-2xl font-semibold text-white">
              {position.marketLabel ?? 'Inflation Market'} · #{position.id.slice(0, 8)}…
            </h2>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-5 w-5" /> Close
          </Button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-6 space-y-6">
          {/* Key metrics */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                <BarChart3 className="h-4 w-4 text-yellow-500" />
                Position Metrics
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Position direction</span>
                  <span className={position.direction === 'long' ? 'text-green-400' : 'text-red-400'}>
                    {position.direction.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Position size</span>
                  <span>${formatCurrency(position.size)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Collateral locked</span>
                  <span>${formatCurrency(position.collateral)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Leverage</span>
                  <span>{position.leverage.toFixed(1)}x</span>
                </div>
                <div className="flex justify-between">
                  <span>Opened</span>
                  <span>{position.openedAt}</span>
                </div>
                <div className="flex justify-between">
                  <span>Entry funding index</span>
                  <span>{position.entryFundingIndex ?? '—'}</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                <LineChart className="h-4 w-4 text-yellow-500" />
                Performance
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Entry price</span>
                  <span>${formatCurrency(position.entryPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Current price</span>
                  <span>${formatCurrency(position.currentPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Unrealized P&L</span>
                  <span className={position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}>
                    ${formatCurrency(position.pnl)} ({formatPercent(position.pnlPct)})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Price P&L</span>
                  <span>{formatCurrency(position.pricePnl)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Funding P&L</span>
                  <span>{formatCurrency(position.fundingPnl)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total fees paid</span>
                  <span>${formatCurrency(position.feesPaid)}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Risk section */}
          <Card>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
              <Shield className="h-4 w-4 text-yellow-500" />
              Risk Overview
            </h3>
            <div className="grid gap-4 md:grid-cols-2 text-sm text-gray-300">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Liquidation price</span>
                  <span>${formatCurrency(position.liquidationPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance to liquidation</span>
                  <span>{formatPercent(position.distanceToLiquidation * 100)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Health ratio</span>
                  <span>{formatPercent(position.healthRatio * 100)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Maintenance margin</span>
                  <span>${formatCurrency(position.maintenanceMargin)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Funding rate</span>
                  <span>{formatPercent(position.fundingRate * 100, 3)} / 8h</span>
                </div>
                <div className="flex justify-between">
                  <span>Insurance coverage</span>
                  <span>${formatCurrency(position.insuranceCoverage)}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Market data overview */}
          {marketData && (
            <Card>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                <Activity className="h-4 w-4 text-yellow-500" />
                Market Data
              </h3>
              <div className="grid gap-4 md:grid-cols-2 text-sm text-gray-300">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Index price (oracle)</span>
                    <span>${formatCurrency(marketData.indexPrice)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Mark price (vAMM)</span>
                    <span>${formatCurrency(marketData.markPrice)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>24h change</span>
                    <span className={marketData.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {formatPercent(marketData.change24h)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Funding APR</span>
                    <span>{formatPercent(marketData.fundingApr)}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Funding history */}
          {fundingHistory && fundingHistory.length > 0 && (
            <Card>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                <Clock className="h-4 w-4 text-yellow-500" />
                Funding History
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                {fundingHistory.map((event) => (
                  <div
                    key={event.timestamp}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3"
                  >
                    <span>{event.timestamp}</span>
                    <span className={event.amount >= 0 ? 'text-green-400' : 'text-red-400'}>
                      ${formatCurrency(event.amount)} ({formatPercent(event.rate * 100, 3)} / 8h)
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Transactions */}
          {transactions && transactions.length > 0 && (
            <Card>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                <Clock className="h-4 w-4 text-yellow-500" />
                Transaction History
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                {transactions.map((tx) => (
                  <div
                    key={tx.hash}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3"
                  >
                    <div>
                      <p className="font-medium text-white">{tx.type}</p>
                      <p className="text-xs text-gray-500">{tx.timestamp}</p>
                    </div>
                    <a
                      href={tx.explorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-yellow-400 hover:underline"
                    >
                      View on explorer →
                    </a>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

PositionDetailModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  position: PropTypes.object,
  marketData: PropTypes.object,
  fundingHistory: PropTypes.arrayOf(PropTypes.object),
  transactions: PropTypes.arrayOf(PropTypes.object),
};

PositionDetailModal.defaultProps = {
  isOpen: false,
  onClose: () => {},
  position: null,
  marketData: null,
  fundingHistory: [],
  transactions: [],
};

export default PositionDetailModal;
