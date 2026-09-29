import React from 'react';
import type { HardwareNodeInfo } from '../../types';
import { X } from 'lucide-react';

interface HardwareNodeCardProps {
  node: HardwareNodeInfo | null;
  onClose: () => void;
}

export const HardwareNodeCard: React.FC<HardwareNodeCardProps> = ({ node, onClose }) => {
  if (!node) return null;

  return (
    <div className="w-full bg-industrial-900 border border-cyan-500/30 rounded-2xl p-4 shadow-xl shadow-cyan-500/5 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="flex items-start justify-between gap-3 border-b border-industrial-800 pb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span 
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: node.highlightColor }}
            />
            <span className="font-mono text-xs font-bold text-slate-400 tracking-wider">
              STAGE {node.stage} // {node.code}
            </span>
          </div>
          <h3 className="font-mono text-base font-bold text-white tracking-wide">
            {node.title}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg bg-industrial-800 hover:bg-industrial-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 space-y-2.5 text-xs">
        {/* Short explanation requested by user */}
        <div className="p-2.5 rounded-xl bg-industrial-950/80 border border-industrial-800">
          <p className="text-cyan-300 font-medium leading-relaxed">
            "{node.shortDesc}"
          </p>
        </div>

        {/* Technical Specification */}
        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
          <div className="p-2 rounded-lg bg-industrial-950/50 border border-industrial-800/80">
            <span className="text-slate-500 block uppercase">Role</span>
            <span className="text-slate-200 font-semibold">{node.role}</span>
          </div>
          <div className="p-2 rounded-lg bg-industrial-950/50 border border-industrial-800/80">
            <span className="text-slate-500 block uppercase">Tech Spec</span>
            <span className="text-slate-200 font-semibold truncate block" title={node.spec}>
              {node.spec}
            </span>
          </div>
        </div>

        <p className="text-slate-400 leading-relaxed text-[11px]">
          {node.fullDesc}
        </p>
      </div>
    </div>
  );
};
