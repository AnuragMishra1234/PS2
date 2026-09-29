import React from 'react';
import { Info } from 'lucide-react';

interface LiveSummaryProps {
  scannedCount: number;
  passedCount: number;
  flaggedCount: number;
  avgLatencyMs: number;
}

export const LiveSummary: React.FC<LiveSummaryProps> = ({
  scannedCount,
  passedCount,
  flaggedCount,
  avgLatencyMs,
}) => {
  return (
    <div className="w-full bg-industrial-900/80 border border-industrial-800 rounded-3xl p-5 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
              LIVE SUMMARY & BATCH TELEMETRY
            </h4>
          </div>
          <p className="text-[11px] text-slate-400">
            Real-time counting of inline optical inspections and downstream sorting decisions.
          </p>
        </div>

        {/* 4 Metric Counter Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          {/* Products Scanned */}
          <div className="p-3 rounded-2xl bg-industrial-950/80 border border-industrial-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-0.5">
              SCANNED
            </span>
            <span className="text-xl sm:text-2xl font-bold text-white">
              {scannedCount}
            </span>
            <span className="text-[9px] text-slate-500 block">100% Inspected</span>
          </div>

          {/* Passed */}
          <div className="p-3 rounded-2xl bg-industrial-950/80 border border-emerald-500/20 text-center">
            <span className="text-[10px] text-emerald-400 uppercase tracking-widest block mb-0.5">
              PASSED
            </span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-400">
              {passedCount}
            </span>
            <span className="text-[9px] text-emerald-500/80 block">Normal Stream</span>
          </div>

          {/* Flagged */}
          <div className="p-3 rounded-2xl bg-industrial-950/80 border border-rose-500/20 text-center">
            <span className="text-[10px] text-rose-400 uppercase tracking-widest block mb-0.5">
              FLAGGED
            </span>
            <span className="text-xl sm:text-2xl font-bold text-rose-400">
              {flaggedCount}
            </span>
            <span className="text-[9px] text-rose-500/80 block">Quarantined</span>
          </div>

          {/* Avg Latency */}
          <div className="p-3 rounded-2xl bg-industrial-950/80 border border-cyan-500/20 text-center">
            <span className="text-[10px] text-cyan-400 uppercase tracking-widest block mb-0.5">
              AVG LATENCY
            </span>
            <span className="text-xl sm:text-2xl font-bold text-cyan-300">
              {avgLatencyMs.toFixed(1)} <span className="text-xs font-normal">ms</span>
            </span>
            <span className="text-[9px] text-cyan-500/80 block">Sub-20ms Target</span>
          </div>
        </div>
      </div>

      {/* Prototype / Demo disclaimer as required by prompt */}
      <div className="mt-4 pt-3 border-t border-industrial-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Note: Values shown are prototype demonstration metrics for hackathon evaluation.</span>
        </div>
        <span className="hidden sm:inline text-slate-500">
          MoFPI Hardware Category // Real-Time Simulation
        </span>
      </div>
    </div>
  );
};
