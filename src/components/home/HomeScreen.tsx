import React from 'react';
import type { ViewMode } from '../../types';
import { Layers, Play, ShieldAlert, Cpu, Radio, CheckCircle2, ArrowRight } from 'lucide-react';
import { SystemStatus } from '../common/SystemStatus';

interface HomeScreenProps {
  onNavigate: (view: ViewMode) => void;
  onOpenTech: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onOpenTech }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 py-8 md:py-12 space-y-12">
      {/* MoFPI Problem Statement Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-industrial-900/60 border border-industrial-800 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-lg bg-cyan-500/15 text-cyan-300 font-mono font-semibold border border-cyan-500/30">
            PROBLEM STATEMENT ID #26233
          </span>
          <span className="text-slate-400 font-medium">
            Ministry of Food Processing Industries (MoFPI)
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
          <span className="hidden sm:inline">Theme: FoodTech & Rural Development</span>
          <span className="px-2 py-0.5 rounded bg-industrial-800 text-slate-300">
            Category: Hardware
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto pt-4 pb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Real-Time Non-Destructive Quality Inspection</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-sans">
          Detect. Analyze. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-uv-400">Isolate.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
          An inline optical sensing system that scans moving food surfaces for contamination-risk signatures and uses edge AI to trigger rapid isolation.
        </p>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onNavigate('hardware')}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-industrial-900 hover:bg-industrial-850 text-white font-mono text-sm font-semibold border border-uv-500/40 hover:border-uv-500 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/25 transition-all group"
          >
            <Layers className="w-5 h-5 text-uv-400 group-hover:scale-110 transition-transform" />
            <span>VIEW HARDWARE</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-uv-400 group-hover:translate-x-1 transition-all" />
          </button>

          <button
            onClick={() => onNavigate('software')}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono text-sm font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all group"
          >
            <Play className="w-5 h-5 fill-slate-950 text-slate-950 group-hover:scale-110 transition-transform" />
            <span>RUN SOFTWARE DEMO</span>
            <ArrowRight className="w-4 h-4 text-slate-800 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>

      {/* 3-Step Functional Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div 
          onClick={() => onNavigate('hardware')}
          className="p-5 rounded-2xl bg-industrial-900/50 border border-industrial-800/80 hover:border-uv-500/40 transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-uv-500/10 border border-uv-500/20 text-uv-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Radio className="w-5 h-5" />
          </div>
          <span className="font-mono text-[10px] text-uv-400 font-bold uppercase tracking-wider">
            STEP 01 // ILLUMINATE & SENSE
          </span>
          <h3 className="text-base font-semibold text-white mt-1 mb-2">
            UV-A & Spectral Acquisition
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            365 nm UV-A stroboscopic excitation induces endogenous fluorophore emission while an 11-channel sensor captures spectral reflectance curves across 415–910 nm.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('software')}
          className="p-5 rounded-2xl bg-industrial-900/50 border border-industrial-800/80 hover:border-cyan-500/40 transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
            STEP 02 // LOCAL EDGE INFERENCE
          </span>
          <h3 className="text-base font-semibold text-white mt-1 mb-2">
            Sub-20ms AI Risk Analysis
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Raspberry Pi 5 executes dark-balance calibration, calculates the Normalized Differential Biofilm Index, and runs a quantized 1D-CNN directly at the sensor head.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('hardware')}
          className="p-5 rounded-2xl bg-industrial-900/50 border border-industrial-800/80 hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
            STEP 03 // AUTOMATED ISOLATION
          </span>
          <h3 className="text-base font-semibold text-white mt-1 mb-2">
            Targeted Servo Rejection
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Line-synchronized encoder triggers a high-speed servo diverter flipper to eject flagged products into a quarantine bin without stopping conveyor flow.
          </p>
        </div>
      </div>

      {/* System Telemetry Bar */}
      <SystemStatus conveyorRunning={true} uvActive={true} />

      {/* Scientific Credibility & Positioning Banner */}
      <div className="p-4 rounded-2xl bg-industrial-950 border border-industrial-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
          <p className="text-slate-400">
            <strong className="text-slate-200">Scientific Positioning:</strong> Demonstrates inline screening for bacterial biofilms, fecal traces, and organic contamination anomalies. Replaces blind sampling with 100% continuous hazard interception.
          </p>
        </div>
        <button
          onClick={onOpenTech}
          className="shrink-0 font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
        >
          View System Specs →
        </button>
      </div>
    </div>
  );
};
