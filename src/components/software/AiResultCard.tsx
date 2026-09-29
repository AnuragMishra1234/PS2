import React from 'react';
import type { ProductItem } from '../../types';
import { Cpu, Clock, CornerDownRight, CheckCircle2 } from 'lucide-react';

interface AiResultCardProps {
  product: ProductItem;
  isProcessing?: boolean;
}

export const AiResultCard: React.FC<AiResultCardProps> = ({ product }) => {
  const isFlagged = product.status === 'FLAGGED';

  return (
    <div className={`w-full bg-industrial-950 border rounded-3xl p-5 shadow-2xl relative flex flex-col justify-between transition-all duration-300 ${
      isFlagged 
        ? 'border-rose-500/80 shadow-rose-500/10' 
        : 'border-industrial-800'
    }`}>
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between border-b border-industrial-800/80 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
              AI INFERENCE ENGINE // 1D-CNN
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>LATENCY: {product.processingTimeMs.toFixed(1)} ms</span>
          </div>
        </div>

        {/* Product Identity */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
              CURRENT SCAN TARGET
            </span>
            <h4 className="font-mono text-xl font-bold text-white tracking-wider">
              {product.serialNumber}
            </h4>
            <p className="text-xs text-slate-300 font-medium mt-0.5 truncate max-w-[200px]">
              {product.name}
            </p>
          </div>

          <span className="px-2.5 py-1 rounded-lg bg-industrial-900 border border-industrial-800 text-xs font-mono text-slate-300 uppercase">
            {product.category}
          </span>
        </div>

        {/* Big Animated Risk Score Display */}
        <div className={`p-4 rounded-2xl border text-center transition-all ${
          isFlagged 
            ? 'bg-rose-950/40 border-rose-500/60 ring-2 ring-rose-500/20' 
            : 'bg-industrial-900/60 border-industrial-800'
        }`}>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            ESTIMATED CONTAMINATION RISK
          </span>

          <div className="flex items-center justify-center gap-1 my-1">
            <span className={`text-5xl sm:text-6xl font-mono font-extrabold tracking-tight ${
              isFlagged ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              {String(product.riskScore).padStart(2, '0')}%
            </span>
          </div>

          {/* Progress bar meter */}
          <div className="w-full bg-industrial-950 h-2 rounded-full overflow-hidden mt-3 p-0.5 border border-industrial-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFlagged ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-emerald-400'
              }`}
              style={{ width: `${product.riskScore}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mt-1">
            <span>0% (CLEAN)</span>
            <span className="text-amber-400 font-semibold">THRESHOLD: 75%</span>
            <span>100% (HAZARD)</span>
          </div>
        </div>
      </div>

      {/* Decision & Action Block */}
      <div className="space-y-3 mt-4">
        {/* Status & Decision Grid */}
        <div className="grid grid-cols-2 gap-2.5 font-mono text-center">
          {/* Status Box */}
          <div className={`p-2.5 rounded-xl border flex flex-col items-center justify-center ${
            isFlagged 
              ? 'bg-rose-500/20 border-rose-500 text-rose-300' 
              : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
          }`}>
            <span className="text-[9px] text-slate-400 uppercase tracking-widest block">
              STATUS
            </span>
            <div className="flex items-center gap-1.5 mt-0.5 font-bold text-sm">
              <span className={`w-2 h-2 rounded-full ${isFlagged ? 'bg-rose-500 animate-ping' : 'bg-emerald-400'}`} />
              <span>{product.status}</span>
            </div>
          </div>

          {/* Decision Box */}
          <div className={`p-2.5 rounded-xl border flex flex-col items-center justify-center ${
            isFlagged 
              ? 'bg-rose-500 text-slate-950 border-rose-400 font-extrabold shadow-lg shadow-rose-500/20' 
              : 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-lg shadow-emerald-500/20'
          }`}>
            <span className="text-[9px] text-slate-900 uppercase tracking-widest block font-bold">
              DECISION
            </span>
            <div className="flex items-center gap-1.5 mt-0.5 text-sm tracking-wider">
              {isFlagged ? (
                <>
                  <CornerDownRight className="w-4 h-4 stroke-[3]" />
                  <span>REJECT</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                  <span>PASS</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Anomaly Description & Scientific Note */}
        <div className="p-3 rounded-xl bg-industrial-900/80 border border-industrial-800 text-[11px] text-slate-300 leading-relaxed">
          <p className="font-mono text-[10px] text-cyan-400 uppercase font-semibold mb-0.5">
            SPECTRAL ANOMALY DIAGNOSIS:
          </p>
          <p>{product.anomalyDescription}</p>
        </div>
      </div>
    </div>
  );
};
