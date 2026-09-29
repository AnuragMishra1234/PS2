import React from 'react';
import { Radio, Zap, Cpu, Sparkles, MoveRight, CornerDownRight } from 'lucide-react';

interface SystemStatusProps {
  conveyorRunning?: boolean;
  uvActive?: boolean;
  compact?: boolean;
}

export const SystemStatus: React.FC<SystemStatusProps> = ({
  conveyorRunning = true,
  uvActive = true,
  compact = false,
}) => {
  const subsystems = [
    { label: 'Spectral Sensor', status: 'ONLINE', icon: Radio, active: true },
    { label: 'UV-A Light', status: uvActive ? 'ACTIVE' : 'STANDBY', icon: Zap, active: uvActive, customColor: 'text-purple-400' },
    { label: 'Edge Processor', status: 'ONLINE', icon: Cpu, active: true },
    { label: 'AI Model', status: 'READY', icon: Sparkles, active: true },
    { label: 'Conveyor', status: conveyorRunning ? 'RUNNING' : 'IDLE', icon: MoveRight, active: conveyorRunning },
    { label: 'Reject Mechanism', status: 'READY', icon: CornerDownRight, active: true },
  ];

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-3 py-2 px-3 bg-industrial-900/60 rounded-xl border border-industrial-800 text-xs">
        <span className="font-mono text-slate-400 uppercase tracking-wider text-[10px]">
          STATUS:
        </span>
        {subsystems.map((sub, idx) => (
          <div key={idx} className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className={`w-1.5 h-1.5 rounded-full ${sub.active ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <span className="text-slate-300">{sub.label}:</span>
            <span className={sub.active ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
              {sub.status}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full bg-industrial-900/70 border border-industrial-800 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3 border-b border-industrial-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <h3 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider">
            System Telemetry & Subsystems
          </h3>
        </div>
        <span className="font-mono text-[10px] text-slate-500">
          HEARTBEAT: 20ms POLLING
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {subsystems.map((sub, idx) => {
          const Icon = sub.icon;
          return (
            <div
              key={idx}
              className="flex flex-col p-2.5 rounded-xl bg-industrial-950/60 border border-industrial-800/80 hover:border-industrial-700 transition-colors"
            >
              <div className="flex items-center justify-between text-slate-400 mb-1.5">
                <Icon className={`w-3.5 h-3.5 ${sub.customColor || 'text-cyan-400'}`} />
                <span className={`w-1.5 h-1.5 rounded-full ${sub.active ? 'bg-emerald-400' : 'bg-slate-500'}`} />
              </div>
              <span className="text-[11px] text-slate-400 font-medium truncate">
                {sub.label}
              </span>
              <span className="font-mono text-xs font-bold text-emerald-400 tracking-tight mt-0.5">
                {sub.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
