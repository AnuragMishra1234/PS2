import React, { useState, useEffect } from 'react';
import { HARDWARE_NODES } from '../../data/hardwareNodes';
import type { HardwareNodeInfo } from '../../types';
import { HardwareNodeCard } from './HardwareNodeCard';
import { 
  Play, 
  RotateCcw, 
  Zap, 
  Radio, 
  Cpu, 
  Sparkles, 
  CornerDownRight, 
  CheckCircle2, 
  Gauge,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

interface HardwareFlowProps {
  onRunSoftwareDemo: () => void;
}

export const HardwareFlow: React.FC<HardwareFlowProps> = ({ onRunSoftwareDemo }) => {
  const [selectedNode, setSelectedNode] = useState<HardwareNodeInfo>(HARDWARE_NODES['uva-illumination']);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [simulateFlagged, setSimulateFlagged] = useState<boolean>(true); // default shows rejection

  const stepDescriptions = [
    'System Idle: Ready to scan product',
    'Stage 1: Food product enters motorized conveyor line',
    'Stage 2: Encoder tracks belt travel with line synchronization',
    'Stage 3: 365 nm UV-A pulsed strobe illuminates food surface',
    'Stage 4: 11-channel spectral sensor captures optical emissions',
    'Stage 5: Calibrated spectral data streams to Raspberry Pi edge bus',
    'Stage 6: AI Engine executes quantized 1D-CNN & NDBFI inference',
    'Stage 7: Contamination risk score generated in 16.8 ms',
    simulateFlagged 
      ? 'Stage 8: Risk > 75% -> FLAGGED: Hardware rejection interrupt queued'
      : 'Stage 8: Risk < 75% -> CLEAR: Product verified safe',
    simulateFlagged
      ? 'Stage 9: High-speed servo flipper isolates contaminated product into reject bin'
      : 'Stage 9: Product passes cleanly into downstream packaging',
  ];

  // Animation controller
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      if (currentStep < 9) {
        timer = setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
        }, 750); // ~6.75 seconds total
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep]);

  const handlePlayFlow = () => {
    setCurrentStep(1);
    setIsPlaying(true);
  };

  const handleResetFlow = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Title & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-industrial-900 border border-industrial-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-uv-400" />
            <span className="font-mono text-xs font-bold text-uv-400 uppercase tracking-wider">
              HARDWARE SUBSYSTEM ARCHITECTURE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-sans">
            Interactive Hardware Flow Visualizer
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Click any component to inspect its specifications, or play the animated end-to-end hardware pipeline.
          </p>
        </div>

        {/* Animation Control Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-industrial-950 border border-industrial-800 text-xs font-mono">
            <button
              onClick={() => setSimulateFlagged(true)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                simulateFlagged
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Simulate: FLAGGED (Reject)
            </button>
            <button
              onClick={() => setSimulateFlagged(false)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                !simulateFlagged
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Simulate: CLEAR (Pass)
            </button>
          </div>

          <button
            onClick={handlePlayFlow}
            disabled={isPlaying}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono text-xs font-bold shadow-md shadow-cyan-500/20 disabled:opacity-50 transition-all"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>{isPlaying ? 'PLAYING...' : 'PLAY HARDWARE FLOW'}</span>
          </button>

          <button
            onClick={handleResetFlow}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-industrial-800 hover:bg-industrial-700 text-slate-300 font-mono text-xs font-medium border border-industrial-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET FLOW</span>
          </button>
        </div>
      </div>

      {/* Animation Status Banner */}
      <div className="p-3.5 rounded-2xl bg-industrial-950 border border-industrial-800 flex items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`} />
          <span className="text-slate-400">STATUS:</span>
          <span className="text-white font-semibold">
            {stepDescriptions[currentStep]}
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <span>PROGRESS:</span>
          <span className="text-cyan-400 font-bold">
            {Math.round((currentStep / 9) * 100)}%
          </span>
        </div>
      </div>

      {/* Main Visualizer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 2D Industrial Flow Diagram (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-industrial-950 border border-industrial-800 relative overflow-hidden shadow-2xl">
          {/* Subtle industrial grid background */}
          <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />

          {/* PHYSICAL CONVEYOR & SENSING RIG VISUAL */}
          <div className="relative z-10 space-y-8">
            {/* Upper Rig: UV-A Illumination & Spectral Sensor */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-2">
                OVERHEAD SENSOR HOUSING (OPTICAL GANTRY)
              </span>

              <div className="flex items-center justify-center gap-6 p-4 rounded-2xl bg-industrial-900/90 border border-industrial-700/80 shadow-lg">
                {/* UV-A Node */}
                <button
                  onClick={() => setSelectedNode(HARDWARE_NODES['uva-illumination'])}
                  className={`flex flex-col items-center p-3 rounded-xl border transition-all text-center group ${
                    selectedNode?.id === 'uva-illumination'
                      ? 'bg-uv-500/20 border-uv-500 ring-2 ring-uv-500/30'
                      : 'bg-industrial-950 border-industrial-800 hover:border-uv-500/50'
                  } ${currentStep === 3 ? 'animate-pulse ring-4 ring-uv-500/50 bg-uv-500/30' : ''}`}
                >
                  <div className="p-2 rounded-lg bg-uv-500/20 text-uv-400 mb-1 group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-white">UV-A LIGHT</span>
                  <span className="text-[10px] font-mono text-uv-400">~365 nm</span>
                </button>

                {/* Spectral Sensor Node */}
                <button
                  onClick={() => setSelectedNode(HARDWARE_NODES['spectral-sensor'])}
                  className={`flex flex-col items-center p-3 rounded-xl border transition-all text-center group ${
                    selectedNode?.id === 'spectral-sensor'
                      ? 'bg-cyan-500/20 border-cyan-500 ring-2 ring-cyan-500/30'
                      : 'bg-industrial-950 border-industrial-800 hover:border-cyan-500/50'
                  } ${currentStep === 4 ? 'animate-pulse ring-4 ring-cyan-500/50 bg-cyan-500/30' : ''}`}
                >
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 mb-1 group-hover:scale-110 transition-transform">
                    <Radio className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-white">SPECTRAL SENSOR</span>
                  <span className="text-[10px] font-mono text-cyan-400">AS7341 / HSI</span>
                </button>
              </div>

              {/* Optical Cone Radiation Rays */}
              <div className="relative w-64 h-14 flex items-center justify-center pointer-events-none">
                {/* UV cone */}
                <div 
                  className={`absolute w-36 h-12 bg-gradient-to-b from-uv-500/30 to-transparent clip-cone transition-opacity duration-300 ${
                    currentStep === 3 || currentStep === 4 ? 'opacity-100' : 'opacity-25'
                  }`}
                  style={{
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
                  }}
                />
                {/* Sensor reading cone */}
                <div 
                  className={`absolute w-28 h-12 bg-gradient-to-b from-cyan-500/40 to-transparent transition-opacity duration-300 ${
                    currentStep === 4 ? 'opacity-100' : 'opacity-20'
                  }`}
                  style={{
                    clipPath: 'polygon(35% 0%, 65% 0%, 95% 100%, 5% 100%)',
                  }}
                />
                <span className="font-mono text-[9px] text-slate-500 tracking-wider mt-4">
                  {currentStep === 3 ? '⚡ UV-A EXCITATION PULSE' : currentStep === 4 ? '🔍 CAPTURING EMISSION' : 'OPTICAL FIELD OF VIEW'}
                </span>
              </div>
            </div>

            {/* Middle: Conveyor Belt & Moving Product */}
            <div className="relative pt-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1.5 px-2">
                <span>IN-FEED (RAW PRODUCT)</span>
                <span>SCANNING ZONE</span>
                <span>SORTING & ACTUATION ZONE</span>
              </div>

              {/* Conveyor Belt track */}
              <div className="relative w-full h-16 rounded-2xl bg-industrial-900 border-2 border-industrial-700 flex items-center px-4 overflow-hidden shadow-inner">
                {/* Animated conveyor tread pattern */}
                <div className={`absolute inset-0 conveyor-pattern opacity-40 ${isPlaying ? 'animate-conveyor' : ''}`} />

                {/* Rollers at ends */}
                <div className="absolute left-2 w-4 h-10 rounded-full border border-slate-600 bg-industrial-800" />
                <div className="absolute right-2 w-4 h-10 rounded-full border border-slate-600 bg-industrial-800" />

                {/* Animated Food Product on Belt */}
                <div 
                  onClick={() => setSelectedNode(HARDWARE_NODES['food-product'])}
                  style={{
                    left: currentStep === 0 ? '5%' :
                          currentStep === 1 ? '15%' :
                          currentStep <= 4 ? '45%' :
                          currentStep <= 7 ? '65%' :
                          currentStep === 8 ? '78%' :
                          simulateFlagged ? '78%' : '90%',
                    top: simulateFlagged && currentStep === 9 ? '80%' : '50%',
                    transform: 'translateY(-50%)',
                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  className={`absolute z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl border cursor-pointer select-none shadow-lg ${
                    simulateFlagged && currentStep >= 7
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300 ring-2 ring-rose-500/40'
                      : 'bg-industrial-850 border-cyan-500/40 text-cyan-300'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="font-mono text-xs font-bold">
                    {simulateFlagged && currentStep >= 7 ? 'HAZARD ITEM' : 'POULTRY / GREENS'}
                  </span>
                </div>
              </div>

              {/* Belt Conveyor Clickable Node */}
              <div className="mt-2 flex items-center justify-between">
                <button
                  onClick={() => setSelectedNode(HARDWARE_NODES['conveyor'])}
                  className="font-mono text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-cyan-400" />
                  <span>CONVEYOR + ROTARY ENCODER</span>
                </button>

                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                  <span>BELT VELOCITY:</span>
                  <span className="text-slate-300 font-semibold">0.25 m/s (SYNCED)</span>
                </div>
              </div>
            </div>

            {/* Lower Electronics & AI Block */}
            <div className="pt-4 border-t border-industrial-800/80">
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-3 text-center">
                EDGE INFERENCE & ACTUATION PIPELINE
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Spectral Data Bus */}
                <button
                  onClick={() => setSelectedNode(HARDWARE_NODES['spectral-data'])}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedNode?.id === 'spectral-data'
                      ? 'bg-indigo-500/20 border-indigo-500'
                      : 'bg-industrial-900 border-industrial-800 hover:border-indigo-500/40'
                  } ${currentStep === 5 ? 'ring-2 ring-indigo-500 animate-pulse' : ''}`}
                >
                  <span className="font-mono text-[10px] text-indigo-400 block mb-1">BUS // I2C</span>
                  <span className="font-mono text-xs font-bold text-white block">SPECTRAL DATA</span>
                  <span className="text-[10px] text-slate-400 mt-1 block">16-bit Vector</span>
                </button>

                {/* Raspberry Pi Node */}
                <button
                  onClick={() => setSelectedNode(HARDWARE_NODES['raspberry-pi'])}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedNode?.id === 'raspberry-pi'
                      ? 'bg-emerald-500/20 border-emerald-500'
                      : 'bg-industrial-900 border-industrial-800 hover:border-emerald-500/40'
                  } ${currentStep === 5 || currentStep === 6 ? 'ring-2 ring-emerald-500 animate-pulse' : ''}`}
                >
                  <Cpu className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span className="font-mono text-xs font-bold text-white block">RASPBERRY PI</span>
                  <span className="text-[10px] text-slate-400 mt-1 block">Edge Compute</span>
                </button>

                {/* AI Engine Node */}
                <button
                  onClick={() => setSelectedNode(HARDWARE_NODES['ai-analysis'])}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedNode?.id === 'ai-analysis'
                      ? 'bg-amber-500/20 border-amber-500'
                      : 'bg-industrial-900 border-industrial-800 hover:border-amber-500/40'
                  } ${currentStep === 6 ? 'ring-2 ring-amber-500 animate-pulse' : ''}`}
                >
                  <Sparkles className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="font-mono text-xs font-bold text-white block">AI ENGINE</span>
                  <span className="text-[10px] text-slate-400 mt-1 block">1D-CNN + NDBFI</span>
                </button>

                {/* Risk Score Node */}
                <button
                  onClick={() => setSelectedNode(HARDWARE_NODES['contamination-risk'])}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedNode?.id === 'contamination-risk'
                      ? 'bg-orange-500/20 border-orange-500'
                      : 'bg-industrial-900 border-industrial-800 hover:border-orange-500/40'
                  } ${currentStep === 7 ? 'ring-2 ring-orange-500 animate-pulse' : ''}`}
                >
                  <Gauge className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                  <span className="font-mono text-xs font-bold text-white block">RISK SCORE</span>
                  <span className={`text-[10px] font-mono font-bold mt-1 block ${simulateFlagged && currentStep >= 7 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {currentStep >= 7 ? (simulateFlagged ? '89% (HAZARD)' : '08% (CLEAR)') : '---'}
                  </span>
                </button>
              </div>

              {/* Decision Fork: Pass vs Reject */}
              <div className="mt-4 p-4 rounded-2xl bg-industrial-900/60 border border-industrial-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs font-bold text-white">
                    DECISION GATE:
                  </span>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* PASS Path */}
                  <div className={`flex-1 sm:flex-initial flex items-center gap-2 p-2.5 rounded-xl border transition-all ${
                    currentStep >= 8 && !simulateFlagged
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold ring-2 ring-emerald-500/30'
                      : 'bg-industrial-950 border-industrial-800 text-slate-500'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono text-xs">PASS PATH (Normal Line)</span>
                  </div>

                  {/* REJECT Path with Servo */}
                  <button
                    onClick={() => setSelectedNode(HARDWARE_NODES['rejection'])}
                    className={`flex-1 sm:flex-initial flex items-center gap-2 p-2.5 rounded-xl border transition-all ${
                      currentStep >= 8 && simulateFlagged
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold ring-2 ring-rose-500/30'
                        : 'bg-industrial-950 border-industrial-800 text-slate-500 hover:border-rose-500/40'
                    }`}
                  >
                    <CornerDownRight className="w-4 h-4 text-rose-400" />
                    <span className="font-mono text-xs">SERVO REJECT (Quarantine)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Selected Component Detail Card & Quick Run CTA (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <HardwareNodeCard 
            node={selectedNode} 
            onClose={() => setSelectedNode(HARDWARE_NODES['uva-illumination'])} 
          />

          {/* Quick Jump to Software Demo */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-industrial-900 to-industrial-950 border border-industrial-800 shadow-xl space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              NEXT EVALUATION STEP
            </span>
            <h3 className="text-base font-bold text-white">
              Ready to see the detection software in action?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Observe real-time dynamic spectral graphs, sub-20ms edge AI scoring, and live animated product rejection.
            </p>
            <button
              onClick={onRunSoftwareDemo}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold shadow-md shadow-cyan-500/20 transition-all"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>LAUNCH LIVE SOFTWARE DEMO</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
