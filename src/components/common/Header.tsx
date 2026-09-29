import React from 'react';
import type { ViewMode } from '../../types';
import { ShieldCheck, Cpu, Activity, Layers, Play } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenTech: () => void;
  isScanning?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenTech,
  isScanning = false,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-industrial-800 bg-industrial-950/90 backdrop-blur-md px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand identity */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-uv-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
            <div className="w-full h-full bg-industrial-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-bold tracking-wider text-white">
                MICRO<span className="text-cyan-400">GUARD</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-industrial-800/80 text-cyan-300 border border-cyan-500/20">
                PS 26233
              </span>
            </div>
            <p className="text-xs text-slate-400 tracking-tight">
              Inline Microbial Contamination Detection
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 p-1 rounded-xl bg-industrial-900 border border-industrial-800">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentView === 'home'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-industrial-800/50'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onNavigate('hardware')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentView === 'hardware'
                ? 'bg-uv-500/15 text-uv-400 border border-uv-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-industrial-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Hardware Flow
          </button>
          <button
            onClick={() => onNavigate('software')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentView === 'software'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-industrial-800/50'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            Software Demo
            {isScanning && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            )}
          </button>
        </nav>

        {/* Live System Status Badges */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-industrial-900/80 border border-industrial-800 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-emerald-400 font-semibold tracking-wide text-[11px]">
              SYSTEM ONLINE
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-industrial-900/50 border border-industrial-800/80 text-[11px] text-slate-400 font-mono">
            <Activity className="w-3 h-3 text-cyan-400" />
            <span>Prototype Mode</span>
          </div>

          <button
            onClick={onOpenTech}
            title="View Technology Architecture"
            className="p-1.5 rounded-lg bg-industrial-900 hover:bg-industrial-800 text-slate-400 hover:text-cyan-300 border border-industrial-800 transition-colors"
          >
            <Cpu className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
