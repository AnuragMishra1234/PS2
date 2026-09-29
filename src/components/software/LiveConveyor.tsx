import React from 'react';
import type { ProductItem } from '../../types';
import { Radio, Zap, CornerDownRight, CheckCircle2 } from 'lucide-react';

interface LiveConveyorProps {
  products: ProductItem[];
  currentIndex: number;
  isScanning: boolean;
  isFlagged: boolean;
  isRejecting: boolean;
}

export const LiveConveyor: React.FC<LiveConveyorProps> = ({
  products,
  currentIndex,
  isScanning,
  isFlagged,
  isRejecting,
}) => {
  const currentProduct = products[currentIndex] || products[0];

  return (
    <div className="w-full bg-industrial-950 border border-industrial-800 rounded-3xl p-5 shadow-2xl relative flex flex-col justify-between overflow-hidden">
      {/* Conveyor Panel Header */}
      <div className="flex items-center justify-between border-b border-industrial-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isScanning ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
            SIMULATED INLINE CONVEYOR FEED
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
          <span>LINE VELOCITY:</span>
          <span className="text-cyan-400 font-semibold">0.25 m/s</span>
        </div>
      </div>

      {/* Visual Industrial Inspection Station */}
      <div className="relative my-2 py-4">
        {/* Overhead Sensor Aperture (Gantry) */}
        <div className="relative mx-auto w-40 flex flex-col items-center z-20">
          <div className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-industrial-900 border border-industrial-700 shadow-md">
            <Zap className={`w-3.5 h-3.5 ${isScanning ? 'text-uv-400 animate-pulse' : 'text-slate-500'}`} />
            <span className="font-mono text-[10px] font-bold text-white">SCANNING RIG</span>
            <Radio className={`w-3.5 h-3.5 ${isScanning ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
          </div>

          {/* Optical Scanning Cone Beam */}
          <div className="relative w-36 h-20 overflow-hidden pointer-events-none">
            <div 
              className={`w-full h-full bg-gradient-to-b ${
                isFlagged 
                  ? 'from-rose-500/40 via-rose-500/20 to-transparent' 
                  : 'from-cyan-500/40 via-uv-500/20 to-transparent'
              } transition-all duration-300`}
              style={{
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
              }}
            />
            {/* Moving laser scan line */}
            {isScanning && (
              <div className="absolute inset-x-0 h-0.5 bg-cyan-300 shadow-[0_0_8px_#06b6d4] animate-scan" />
            )}
          </div>
        </div>

        {/* The Conveyor Track */}
        <div className="relative w-full h-24 rounded-2xl bg-industrial-900 border-2 border-industrial-700 flex items-center px-6 overflow-hidden shadow-inner">
          {/* Animated Conveyor Belt tread pattern */}
          <div className={`absolute inset-0 conveyor-pattern opacity-40 ${isScanning ? 'animate-conveyor' : ''}`} />

          {/* Rollers */}
          <div className="absolute left-1.5 w-3 h-14 rounded-full border border-slate-600 bg-industrial-800" />
          <div className="absolute right-1.5 w-3 h-14 rounded-full border border-slate-600 bg-industrial-800" />

          {/* Direction Indicator */}
          <div className="absolute top-2 inset-x-8 flex items-center justify-between text-[9px] font-mono text-slate-500 select-none">
            <span>IN-FEED ────►</span>
            <span className="text-cyan-400 font-bold">▲ SCANNING ZONE ▲</span>
            <span>────► SORTING</span>
          </div>

          {/* Active Product Under Scanner */}
          <div className="relative z-10 mx-auto flex items-center justify-center">
            <div
              className={`px-4 py-2.5 rounded-2xl border flex items-center gap-3 transition-all duration-300 shadow-xl ${
                isFlagged
                  ? 'bg-rose-950/80 border-rose-500 text-rose-200 ring-4 ring-rose-500/30'
                  : 'bg-industrial-850 border-cyan-500/50 text-cyan-200'
              }`}
            >
              {/* Product icon/badge */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                currentProduct.category === 'poultry' 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {currentProduct.category === 'poultry' ? '🍗' : '🥬'}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white">
                    {currentProduct.serialNumber}
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                    isFlagged ? 'bg-rose-500 text-white' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {isFlagged ? 'FLAGGED' : 'CLEAR'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium truncate max-w-[140px]">
                  {currentProduct.name}
                </p>
              </div>
            </div>
          </div>

          {/* Downstream Rejection Servo Flipper */}
          <div className="absolute right-12 top-0 bottom-0 flex flex-col items-center justify-center z-20">
            {/* Servo arm flipper */}
            <div 
              className={`w-1.5 h-16 rounded-full transition-transform duration-300 origin-top shadow-lg ${
                isRejecting || isFlagged 
                  ? 'bg-rose-500 rotate-45 ring-2 ring-rose-400' 
                  : 'bg-slate-600 rotate-0'
              }`}
            />
            <span className="text-[8px] font-mono text-slate-400 mt-1">
              SERVO
            </span>
          </div>
        </div>

        {/* Downstream Destination Paths */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {/* Clean Pass Channel */}
          <div className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs transition-colors ${
            !isFlagged 
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' 
              : 'bg-industrial-950 border-industrial-800/80 text-slate-500'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="font-mono font-bold block text-[11px]">PASS LINE</span>
              <span className="text-[10px] text-slate-400">Packaging Stream</span>
            </div>
          </div>

          {/* Quarantine Reject Bin */}
          <div className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs transition-colors ${
            isFlagged 
              ? 'bg-rose-500/15 border-rose-500 text-rose-300 ring-2 ring-rose-500/30' 
              : 'bg-industrial-950 border-industrial-800/80 text-slate-500'
          }`}>
            <CornerDownRight className="w-4 h-4 text-rose-400" />
            <div>
              <span className="font-mono font-bold block text-[11px]">QUARANTINE BIN</span>
              <span className="text-[10px] text-slate-400">Hazard Isolation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Up Next in In-Feed Queue */}
      <div className="border-t border-industrial-800/80 pt-3 mt-1">
        <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5">
          UPCOMING INLINE QUEUE:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
          {products.slice(currentIndex + 1, currentIndex + 4).map((p) => (
            <div
              key={p.id}
              className="px-2.5 py-1 rounded-lg bg-industrial-900 border border-industrial-800 text-slate-400 flex items-center gap-1.5 shrink-0"
            >
              <span>{p.category === 'poultry' ? '🍗' : '🥬'}</span>
              <span>{p.serialNumber}</span>
              <span className="text-[10px] text-slate-500">({p.riskScore}%)</span>
            </div>
          ))}
          {currentIndex >= products.length - 1 && (
            <span className="text-slate-500 text-[11px] italic">Batch cycle complete</span>
          )}
        </div>
      </div>
    </div>
  );
};
