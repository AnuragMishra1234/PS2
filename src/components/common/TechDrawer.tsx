import React from 'react';
import { X, Cpu, Radio, Sparkles, Sliders, CornerDownRight, ShieldAlert } from 'lucide-react';

interface TechDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechDrawer: React.FC<TechDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const stack = [
    {
      category: 'SENSING',
      title: 'UV-A + Spectral / HSI Sensor',
      detail: 'Pulsed 365nm UV-A LED excitation array + ams OSRAM AS7341 11-channel spectral sensor (415–910 nm) + Raspberry Pi NoIR CMOS.',
      icon: Radio,
      badge: 'Optical Subsystem',
      color: 'text-purple-400',
      border: 'border-purple-500/20',
      bg: 'bg-purple-500/5',
    },
    {
      category: 'EDGE COMPUTE',
      title: 'Raspberry Pi / Embedded GPU',
      detail: 'Zero-copy local pipeline executing dark/white balance calibration, spectral feature extraction, and real-time I/O in < 18ms.',
      icon: Cpu,
      badge: 'Local Compute',
      color: 'text-cyan-400',
      border: 'border-cyan-500/20',
      bg: 'bg-cyan-500/5',
    },
    {
      category: 'AI / ALGORITHMS',
      title: 'Python + OpenCV + 1D-CNN',
      detail: 'Tier-1 Normalized Differential Biofilm Index (NDBFI) screening + Tier-2 Quantized 1D-CNN on ONNX Runtime for multi-band anomaly detection.',
      icon: Sparkles,
      badge: 'Inference Engine',
      color: 'text-emerald-400',
      border: 'border-emerald-500/20',
      bg: 'bg-emerald-500/5',
    },
    {
      category: 'CONTROL & LINE-SYNC',
      title: 'ESP32 / Hardware GPIO',
      detail: 'Rotary encoder interrupt tracking (1024 PPR) with deterministic delay buffer; synchronizes camera exposure and actuation to conveyor velocity.',
      icon: Sliders,
      badge: 'Microsecond Timing',
      color: 'text-amber-400',
      border: 'border-amber-500/20',
      bg: 'bg-amber-500/5',
    },
    {
      category: 'ACTUATION',
      title: 'Servo / Reject Mechanism',
      detail: 'High-torque metal-gear diverter paddle (< 100ms sweep) and simulated pneumatic air blast nozzle isolating flagged hazard products into a quarantine bin.',
      icon: CornerDownRight,
      badge: 'Physical Isolation',
      color: 'text-rose-400',
      border: 'border-rose-500/20',
      bg: 'bg-rose-500/5',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-industrial-900 border border-industrial-700 rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-industrial-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-mono text-base font-bold text-white tracking-wide">
                SYSTEM TECHNOLOGY ARCHITECTURE
              </h2>
              <p className="text-xs text-slate-400">
                MoFPI Problem Statement 26233 | Engineering Specifications
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-industrial-800 hover:bg-industrial-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stack Items */}
        <div className="space-y-3 mt-4 max-h-[60vh] overflow-y-auto pr-1">
          {stack.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border ${item.border} ${item.bg} flex items-start gap-3.5 transition-all`}
              >
                <div className={`p-2 rounded-xl bg-industrial-950/80 border border-industrial-800 ${item.color} mt-0.5`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-[10px] tracking-wider font-semibold uppercase text-slate-400">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-industrial-950/90 text-slate-300 border border-industrial-800">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scientific Positioning Note */}
        <div className="mt-4 p-3 rounded-2xl bg-industrial-950 border border-industrial-800 flex items-start gap-2.5 text-xs text-slate-400">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong className="text-slate-200">Scientific Positioning:</strong> This system performs rapid inline optical screening for bacterial biofilms, fecal traces, and organic contamination anomalies. Definitive pathogen species identification requires post-isolation confirmatory laboratory cultures.
          </p>
        </div>

        {/* Close Button */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-industrial-800 hover:bg-industrial-700 text-slate-200 text-xs font-mono font-medium transition-colors"
          >
            Close Specifications
          </button>
        </div>
      </div>
    </div>
  );
};
