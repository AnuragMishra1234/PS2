import React from 'react';
import type { SpectralPoint } from '../../types';

interface SpectralChartProps {
  data: SpectralPoint[];
  productName: string;
  isFlagged: boolean;
  contaminationType: string;
}

export const SpectralChart: React.FC<SpectralChartProps> = ({
  data,
  productName,
  isFlagged,
  contaminationType,
}) => {
  // Chart dimensions in SVG viewBox
  const width = 640;
  const height = 280;
  const padding = { top: 30, right: 30, bottom: 40, left: 45 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // X range: 400nm to 930nm
  const minX = 400;
  const maxX = 930;

  // Y range: 0 to 100%
  const minY = 0;
  const maxY = 100;

  const getX = (wl: number) => padding.left + ((wl - minX) / (maxX - minX)) * plotWidth;
  const getY = (val: number) => padding.top + plotHeight - ((val - minY) / (maxY - minY)) * plotHeight;

  // Construct SVG path for active curve
  const activePathD = data.reduce((acc, pt, i) => {
    const x = getX(pt.wavelength);
    const y = getY(pt.intensity);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Construct SVG path for clean baseline reference
  const referencePathD = data.reduce((acc, pt, i) => {
    const x = getX(pt.wavelength);
    const y = getY(pt.referenceClean || pt.intensity);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Fill area under active curve
  const areaPathD = data.length > 0
    ? `${activePathD} L ${getX(data[data.length - 1].wavelength)} ${getY(0)} L ${getX(data[0].wavelength)} ${getY(0)} Z`
    : '';

  return (
    <div className="w-full bg-industrial-950 border border-industrial-800 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 border-b border-industrial-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isFlagged ? 'bg-rose-500 animate-ping' : 'bg-cyan-400 animate-pulse'}`} />
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
              LIVE SPECTRAL ANALYSIS // AS7341 11-CH
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 truncate max-w-sm mt-0.5">
            Active Target: <span className="text-white font-medium">{productName}</span>
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 font-mono text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-slate-500 inline-block border-b border-dashed border-slate-400" />
            <span className="text-slate-400">Baseline Clean Ref</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-3 h-1 rounded-full ${isFlagged ? 'bg-rose-500' : 'bg-cyan-400'}`} />
            <span className={isFlagged ? 'text-rose-400 font-bold' : 'text-cyan-300 font-semibold'}>
              {isFlagged ? 'Contaminated Scan' : 'Real-Time Scan'}
            </span>
          </div>
        </div>
      </div>

      {/* SVG Spectral Graph */}
      <div className="w-full aspect-[2.3/1] min-h-[220px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            {/* Gradient fill under clean curve */}
            <linearGradient id="cleanGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>

            {/* Gradient fill under flagged curve */}
            <linearGradient id="flaggedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines (horizontal) */}
          {[20, 40, 60, 80, 100].map((val) => (
            <g key={val}>
              <line
                x1={padding.left}
                y1={getY(val)}
                x2={width - padding.right}
                y2={getY(val)}
                stroke="#172234"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <text
                x={padding.left - 8}
                y={getY(val) + 3}
                fill="#64748b"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                textAnchor="end"
              >
                {val}%
              </text>
            </g>
          ))}

          {/* Grid lines (vertical wavelength bands) */}
          {[415, 515, 555, 680, 850, 910].map((wl) => (
            <g key={wl}>
              <line
                x1={getX(wl)}
                y1={padding.top}
                x2={getX(wl)}
                y2={padding.top + plotHeight}
                stroke="#172234"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <text
                x={getX(wl)}
                y={padding.top + plotHeight + 16}
                fill="#94a3b8"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                textAnchor="middle"
              >
                {wl}nm
              </text>
            </g>
          ))}

          {/* Diagnostic Peak Callouts */}
          {isFlagged && contaminationType === 'biofilm_flavin' && (
            <g transform={`translate(${getX(555)}, ${getY(92) - 10})`}>
              <rect x="-45" y="-18" width="90" height="18" rx="4" fill="#a855f7" fillOpacity="0.9" />
              <text x="0" y="-6" fill="#ffffff" fontSize="8" fontFamily="ui-monospace" fontWeight="bold" textAnchor="middle">
                FLAVIN PEAK (555nm)
              </text>
              <line x1="0" y1="0" x2="0" y2="8" stroke="#a855f7" strokeWidth="1.5" />
            </g>
          )}

          {isFlagged && contaminationType === 'fecal_chlorophyll' && (
            <g transform={`translate(${getX(680)}, ${getY(96) - 10})`}>
              <rect x="-50" y="-18" width="100" height="18" rx="4" fill="#ef4444" fillOpacity="0.9" />
              <text x="0" y="-6" fill="#ffffff" fontSize="8" fontFamily="ui-monospace" fontWeight="bold" textAnchor="middle">
                FECAL EMISSION (680nm)
              </text>
              <line x1="0" y1="0" x2="0" y2="8" stroke="#ef4444" strokeWidth="1.5" />
            </g>
          )}

          {/* Baseline Clean Curve */}
          <path
            d={referencePathD}
            fill="none"
            stroke="#475569"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Area under active curve */}
          <path
            d={areaPathD}
            fill={isFlagged ? 'url(#flaggedGrad)' : 'url(#cleanGrad)'}
            className="transition-all duration-500"
          />

          {/* Active Spectral Curve */}
          <path
            d={activePathD}
            fill="none"
            stroke={isFlagged ? '#ef4444' : '#06b6d4'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />

          {/* Data Points */}
          {data.map((pt, i) => (
            <circle
              key={i}
              cx={getX(pt.wavelength)}
              cy={getY(pt.intensity)}
              r={isFlagged ? '4' : '3.5'}
              fill={isFlagged ? '#ef4444' : '#06b6d4'}
              stroke="#070a0f"
              strokeWidth="1.5"
              className="transition-all duration-500 hover:r-5 cursor-pointer"
            >
              <title>{`${pt.wavelength} nm: ${pt.intensity}% intensity`}</title>
            </circle>
          ))}
        </svg>
      </div>

      {/* Axis Labels */}
      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-industrial-900">
        <span>X-AXIS: WAVELENGTH (400 - 930 nm)</span>
        <span>Y-AXIS: SIGNAL INTENSITY (0 - 100%)</span>
      </div>
    </div>
  );
};
