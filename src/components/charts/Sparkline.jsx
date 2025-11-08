import React from 'react';

export default function Sparkline({ data = [], width = 140, height = 36, stroke = '#fbbf24', showIndicators = true }) {
  // If no data, show a flat placeholder line
  if (!data || data.length < 2) {
    const midY = height / 2;
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="opacity-20">
        <line x1="0" y1={midY} x2={width} y2={midY} stroke="#666" strokeWidth="1" strokeDasharray="2,2" />
        <text x={width / 2} y={midY - 5} fill="#666" fontSize="9" textAnchor="middle" className="font-mono">
          No data
        </text>
      </svg>
    );
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);

  // Generate line points
  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * height;
    return { x, y, value: v };
  });

  const linePoints = points.map(p => `${p.x},${p.y}`).join(' ');

  // Create gradient fill area points (close the path to bottom)
  const fillPoints = `0,${height} ` + linePoints + ` ${width},${height}`;

  // Find min/max points for indicators
  const minPoint = points.find(p => p.value === min);
  const maxPoint = points.find(p => p.value === max);
  const lastPoint = points[points.length - 1];

  // Determine if trend is up or down
  const firstValue = data[0];
  const lastValue = data[data.length - 1];
  const isUp = lastValue >= firstValue;
  const trendColor = isUp ? '#10b981' : '#ef4444';
  const trendStroke = isUp ? stroke : '#ef4444';

  // Generate unique ID for gradient
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      {/* Gradient definition */}
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={trendStroke} stopOpacity="0.3" />
          <stop offset="100%" stopColor={trendStroke} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Filled area under the line */}
      <polygon
        fill={`url(#${gradientId})`}
        points={fillPoints}
        opacity="0.4"
      />

      {/* Main line */}
      <polyline
        fill="none"
        stroke={trendStroke}
        strokeWidth="2"
        points={linePoints}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {showIndicators && (
        <>
          {/* Current price indicator (last point) */}
          <circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r="3"
            fill={trendColor}
            stroke="white"
            strokeWidth="1.5"
          />

          {/* Max indicator */}
          {maxPoint && data.length > 5 && (
            <g>
              <circle
                cx={maxPoint.x}
                cy={maxPoint.y}
                r="2"
                fill="#fbbf24"
                opacity="0.6"
              />
              <text
                x={maxPoint.x}
                y={maxPoint.y - 6}
                fill="#fbbf24"
                fontSize="8"
                textAnchor="middle"
                className="font-mono"
                opacity="0.8"
              >
                H
              </text>
            </g>
          )}

          {/* Min indicator */}
          {minPoint && data.length > 5 && (
            <g>
              <circle
                cx={minPoint.x}
                cy={minPoint.y}
                r="2"
                fill="#fbbf24"
                opacity="0.6"
              />
              <text
                x={minPoint.x}
                y={minPoint.y + 12}
                fill="#fbbf24"
                fontSize="8"
                textAnchor="middle"
                className="font-mono"
                opacity="0.8"
              >
                L
              </text>
            </g>
          )}
        </>
      )}
    </svg>
  );
}

