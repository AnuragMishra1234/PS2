import React from 'react';
import type { ProductItem } from '../../types';
import { AlertTriangle, ArrowDown, X } from 'lucide-react';

interface RejectionAlertProps {
  product: ProductItem | null;
  onDismiss: () => void;
}

export const RejectionAlert: React.FC<RejectionAlertProps> = ({ product, onDismiss }) => {
  if (!product || product.status !== 'FLAGGED') return null;

  return (
    <div className="w-full bg-gradient-to-r from-rose-950 via-industrial-950 to-rose-950 border-2 border-rose-500 rounded-3xl p-5 shadow-2xl shadow-rose-500/20 animate-in fade-in slide-in-from-top-3 duration-300 relative overflow-hidden">
      {/* Background hazard stripes */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #ef4444 0, #ef4444 10px, transparent 10px, transparent 20px)'
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Hazard Banner & Details */}
        <div className="flex items-center gap-4 text-left">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border-2 border-rose-500 text-rose-400 flex items-center justify-center shrink-0 animate-bounce">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-500 text-slate-950 uppercase">
                INTERCEPTION ACTIVE
              </span>
              <span className="font-mono text-xs text-rose-300">
                PROTOTYPE SCREENING RESULT
              </span>
            </div>
            <h3 className="text-xl font-mono font-extrabold text-white tracking-wide mt-1">
              ⚠ CONTAMINATION RISK DETECTED
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Target: <strong className="text-white">{product.serialNumber}</strong> — {product.name}
            </p>
          </div>
        </div>

        {/* Center: The Exact Flow Sequence requested in Section 7 */}
        <div className="flex flex-col sm:flex-row items-center gap-3 font-mono text-xs text-center">
          <div className="p-2.5 rounded-xl bg-industrial-900/90 border border-rose-500/40">
            <span className="text-slate-400 block text-[10px]">RISK SCORE</span>
            <span className="text-rose-400 font-bold text-lg">{product.riskScore}%</span>
            <span className="text-slate-500 block text-[9px]">AI Decision: FLAG</span>
          </div>

          <div className="flex flex-col items-center justify-center text-rose-400">
            <ArrowDown className="w-4 h-4 animate-pulse sm:-rotate-90" />
            <span className="text-[9px] uppercase font-bold tracking-tighter">SIG SENT</span>
          </div>

          <div className="p-2.5 rounded-xl bg-industrial-900/90 border border-rose-500/40">
            <span className="text-slate-400 block text-[10px]">ACTUATOR</span>
            <span className="text-white font-bold text-sm">SERVO PULSE</span>
            <span className="text-cyan-400 block text-[9px]">GPIO Pin 18 High</span>
          </div>

          <div className="flex flex-col items-center justify-center text-rose-400">
            <ArrowDown className="w-4 h-4 animate-pulse sm:-rotate-90" />
            <span className="text-[9px] uppercase font-bold tracking-tighter">ISOLATE</span>
          </div>

          <div className="p-2.5 rounded-xl bg-rose-500 text-slate-950 font-bold shadow-lg shadow-rose-500/30">
            <span className="text-slate-900 block text-[10px] font-extrabold">STATUS</span>
            <span className="text-sm uppercase tracking-wide">PRODUCT ISOLATED</span>
            <span className="text-slate-900 block text-[9px]">Quarantined</span>
          </div>
        </div>

        {/* Right: Dismiss button */}
        <button
          onClick={onDismiss}
          className="p-2 rounded-xl bg-industrial-900 hover:bg-industrial-800 text-slate-400 hover:text-white border border-industrial-700 transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
