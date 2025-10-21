import React from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { Button, Card } from '../ui/primitives';
import { formatDistanceToNow } from 'date-fns';

const severityStyles = {
  warning: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-200',
  danger: 'border-red-500/40 bg-red-500/10 text-red-200',
  critical: 'border-red-600/60 bg-red-600/20 text-red-100',
};

const LiquidationAlert = ({ alert, onAddMargin, onClosePosition, onDismiss }) => {
  if (!alert) return null;

  const { positionId, healthRatio, liquidationPrice, currentPrice, updatedAt, severity } = alert;
  const colorClasses = severityStyles[severity] ?? severityStyles.warning;

  return (
    <Card className={`flex flex-col gap-3 border ${colorClasses}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-1 items-center gap-3">
          <ShieldAlert className="h-6 w-6" />
          <div>
            <p className="text-sm uppercase tracking-wide">Liquidation Risk</p>
            <h3 className="text-lg font-semibold text-white">
              Position #{positionId.slice(0, 8)} is at risk
            </h3>
          </div>
        </div>
        <span className="text-xs text-gray-300">
          Updated {formatDistanceToNow(updatedAt, { addSuffix: true })}
        </span>
      </div>

      <div className="grid gap-3 text-sm text-gray-200 md:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-black/30 p-3">
          <p className="text-xs text-gray-400">Health ratio</p>
          <p className={`${healthRatio < 0.05 ? 'text-red-300' : 'text-yellow-200'} text-lg font-semibold`}>
            {(healthRatio * 100).toFixed(2)}%
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/30 p-3">
          <p className="text-xs text-gray-400">Liquidation price</p>
          <p className="text-lg font-semibold text-white">${liquidationPrice.toFixed(2)}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/30 p-3">
          <p className="text-xs text-gray-400">Current price</p>
          <p className="text-lg font-semibold text-white">${currentPrice.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="primary" onClick={() => onAddMargin(positionId)}>
          <ArrowUpRight className="h-4 w-4" /> Add Margin
        </Button>
        <Button variant="danger" onClick={() => onClosePosition(positionId)}>
          <AlertTriangle className="h-4 w-4" /> Close Position
        </Button>
        <Button variant="ghost" onClick={() => onDismiss(positionId)}>
          Dismiss
        </Button>
      </div>
    </Card>
  );
};

LiquidationAlert.propTypes = {
  alert: PropTypes.shape({
    positionId: PropTypes.string.isRequired,
    healthRatio: PropTypes.number.isRequired,
    liquidationPrice: PropTypes.number.isRequired,
    currentPrice: PropTypes.number.isRequired,
    updatedAt: PropTypes.instanceOf(Date).isRequired,
    severity: PropTypes.oneOf(['warning', 'danger', 'critical']).isRequired,
  }),
  onAddMargin: PropTypes.func,
  onClosePosition: PropTypes.func,
  onDismiss: PropTypes.func,
};

LiquidationAlert.defaultProps = {
  alert: null,
  onAddMargin: () => {},
  onClosePosition: () => {},
  onDismiss: () => {},
};

export default LiquidationAlert;
