import React from 'react';
import PropTypes from 'prop-types';
import {
  ArrowDown,
  ArrowUp,
  Banknote,
  Copy,
  DollarSign,
  Droplet,
  LineChart,
  Shield,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { Card, Button } from '../ui/primitives';

const formatCurrency = (value, decimals = 2) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value ?? 0);

const formatPercent = (value, decimals = 2) =>
  `${value >= 0 ? '+' : ''}${(value ?? 0).toFixed(decimals)}%`;

const badgeStyles = {
  long: 'bg-green-500/10 border-green-500/50 text-green-400',
  short: 'bg-red-500/10 border-red-500/50 text-red-400',
};

const healthToColor = (ratio) => {
  if (ratio >= 0.2) return 'text-green-400';
  if (ratio >= 0.1) return 'text-yellow-400';
  return 'text-red-400';
};

const PositionCard = ({
  position,
  marketLabel,
  onAddMargin,
  onRemoveMargin,
  onClose,
  onViewDetails,
}) => {
  if (!position) return null;

  const {
    id,
    direction,
    openedAt,
    size,
    collateral,
    leverage,
    entryPrice,
    currentPrice,
    priceChangePct,
    fundingAccrued,
    fundingRate,
    pnl,
    pnlPct,
    pricePnl,
    fundingPnl,
    liquidationPrice,
    maintenanceMargin,
    healthRatio,
  } = position;

  const isLong = direction === 'long';

  return (
    <Card className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold ${badgeStyles[isLong ? 'long' : 'short']}`}
          >
            {isLong ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {isLong ? 'Long' : 'Short'}
          </span>
          <div>
            <p className="text-lg font-semibold text-white">{marketLabel ?? 'Inflation Market'}</p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Position #{id.slice(0, 6)}…</span>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(id)}
                className="text-xs text-gray-500 hover:text-yellow-400"
              >
                <Copy className="h-3 w-3" />
              </button>
              <span>Opened {openedAt}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" onClick={onViewDetails}>
          <LineChart className="h-4 w-4" /> View details
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Position Size</span>
            <span>Collateral</span>
          </div>
          <div className="flex items-center justify-between text-2xl font-bold text-white">
            <span>${formatCurrency(size)}</span>
            <span>${formatCurrency(collateral)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <Droplet className="h-4 w-4 text-yellow-500" />
              {Number(leverage).toFixed(1)}x leverage
            </span>
            <span className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-yellow-500" />
              Entry ${formatCurrency(entryPrice)}
            </span>
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Current Price</span>
            <span>Unrealized P&L</span>
          </div>
          <div className="flex items-center justify-between text-2xl font-bold">
            <span className="text-white">
              ${formatCurrency(currentPrice)}
              <span className={`${priceChangePct >= 0 ? 'text-green-400' : 'text-red-400'} ml-2 text-base`}>
                {formatPercent(priceChangePct)}
              </span>
            </span>
            <span className={`${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${formatCurrency(pnl)} <span className="text-sm">({formatPercent(pnlPct)})</span>
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Price P&L ${formatCurrency(pricePnl)}</span>
            <span>Funding P&L ${formatCurrency(fundingPnl)}</span>
          </div>
        </div>
      </div>

      {/* Risk metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Liquidation Price</span>
            <span>Maintenance Margin</span>
          </div>
          <div className="flex items-center justify-between text-lg font-semibold text-white">
            <span>${formatCurrency(liquidationPrice)}</span>
            <span>${formatCurrency(maintenanceMargin)}</span>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Health Ratio</span>
              <span className={healthToColor(healthRatio)}>{formatPercent(healthRatio * 100)}</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full ${healthRatio >= 0.2 ? 'bg-green-400' : healthRatio >= 0.1 ? 'bg-yellow-400' : 'bg-red-400'}`}
                style={{ width: `${Math.min(healthRatio * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Accrued Funding</span>
            <span>Current Funding Rate</span>
          </div>
          <div className="flex items-center justify-between text-lg font-semibold text-white">
            <span className={`${fundingAccrued >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${formatCurrency(fundingAccrued)}
            </span>
            <span>{formatPercent(fundingRate * 100, 3)} / 8h</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Shield className="h-4 w-4 text-yellow-500" />
            Estimated daily cost: ${formatCurrency(fundingRate * size, 2)}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button variant="ghost" onClick={onAddMargin}>
          <ArrowUp className="h-4 w-4" /> Add Margin
        </Button>
        <Button variant="ghost" onClick={onRemoveMargin}>
          <ArrowDown className="h-4 w-4" /> Remove Margin
        </Button>
        <Button variant="danger" onClick={onClose}>
          <Banknote className="h-4 w-4" /> Close Position
        </Button>
      </div>
    </Card>
  );
};

PositionCard.propTypes = {
  position: PropTypes.shape({
    id: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(['long', 'short']).isRequired,
    openedAt: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    collateral: PropTypes.number.isRequired,
    leverage: PropTypes.number.isRequired,
    entryPrice: PropTypes.number.isRequired,
    currentPrice: PropTypes.number.isRequired,
    priceChangePct: PropTypes.number.isRequired,
    fundingAccrued: PropTypes.number.isRequired,
    fundingRate: PropTypes.number.isRequired,
    pnl: PropTypes.number.isRequired,
    pnlPct: PropTypes.number.isRequired,
    pricePnl: PropTypes.number,
    fundingPnl: PropTypes.number,
    liquidationPrice: PropTypes.number.isRequired,
    maintenanceMargin: PropTypes.number.isRequired,
    healthRatio: PropTypes.number.isRequired,
  }).isRequired,
  marketLabel: PropTypes.string,
  onAddMargin: PropTypes.func,
  onRemoveMargin: PropTypes.func,
  onClose: PropTypes.func,
  onViewDetails: PropTypes.func,
};

PositionCard.defaultProps = {
  marketLabel: 'Inflation Market',
  onAddMargin: () => {},
  onRemoveMargin: () => {},
  onClose: () => {},
  onViewDetails: () => {},
};

export default PositionCard;
