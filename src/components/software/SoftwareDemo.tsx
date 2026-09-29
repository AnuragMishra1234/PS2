import React, { useState, useEffect } from 'react';
import { SAMPLE_PRODUCTS } from '../../data/sampleProducts';
import type { ProductItem } from '../../types';
import { LiveConveyor } from './LiveConveyor';
import { SpectralChart } from './SpectralChart';
import { AiResultCard } from './AiResultCard';
import { RejectionAlert } from './RejectionAlert';
import { LiveSummary } from './LiveSummary';
import { SystemStatus } from '../common/SystemStatus';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward, 
  Layers
} from 'lucide-react';

interface SoftwareDemoProps {
  onBackToHardware: () => void;
}

export const SoftwareDemo: React.FC<SoftwareDemoProps> = ({ onBackToHardware }) => {
  const [products] = useState<ProductItem[]>(SAMPLE_PRODUCTS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isRejecting, setIsRejecting] = useState<boolean>(false);
  const [alertProduct, setAlertProduct] = useState<ProductItem | null>(null);

  // Stats
  const [scannedCount, setScannedCount] = useState<number>(10);
  const [passedCount, setPassedCount] = useState<number>(8);
  const [flaggedCount, setFlaggedCount] = useState<number>(2);

  const currentProduct = products[currentIndex] || products[0];
  const isFlagged = currentProduct.status === 'FLAGGED';

  // Automated scanning simulation loop
  useEffect(() => {
    let scanTimer: ReturnType<typeof setTimeout>;
    let servoTimer: ReturnType<typeof setTimeout>;

    if (isScanning) {
      scanTimer = setTimeout(() => {
        setIsProcessing(true);

        const nextIndex = (currentIndex + 1) % products.length;
        const nextProd = products[nextIndex];

        setCurrentIndex(nextIndex);
        setScannedCount((prev) => prev + 1);

        if (nextProd.status === 'FLAGGED') {
          setFlaggedCount((prev) => prev + 1);
          setAlertProduct(nextProd);
          setIsRejecting(true);

          servoTimer = setTimeout(() => {
            setIsRejecting(false);
          }, 1400);
        } else {
          setPassedCount((prev) => prev + 1);
          setAlertProduct(null);
        }

        setIsProcessing(false);
      }, 2600);
    }

    return () => {
      clearTimeout(scanTimer);
      clearTimeout(servoTimer);
    };
  }, [isScanning, currentIndex, products]);

  // Manual injector
  const handleSelectProduct = (index: number) => {
    setCurrentIndex(index);
    const prod = products[index];
    setScannedCount((prev) => prev + 1);

    if (prod.status === 'FLAGGED') {
      setFlaggedCount((prev) => prev + 1);
      setAlertProduct(prod);
      setIsRejecting(true);
      setTimeout(() => setIsRejecting(false), 1400);
    } else {
      setPassedCount((prev) => prev + 1);
      setAlertProduct(null);
    }
  };

  const handleReset = () => {
    setIsScanning(false);
    setCurrentIndex(0);
    setAlertProduct(null);
    setScannedCount(0);
    setPassedCount(0);
    setFlaggedCount(0);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Top Controls & Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-industrial-900 border border-industrial-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
              SOFTWARE & DETECTION ENGINE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-sans">
            Live Inline Spectral Detection Simulation
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Simulates continuous food products traversing the optical aperture with real-time spectral graphing and edge AI risk scoring.
          </p>
        </div>

        {/* Primary Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsScanning(!isScanning)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono text-xs font-bold shadow-lg transition-all ${
              isScanning
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-emerald-500/25'
            }`}
          >
            {isScanning ? (
              <>
                <Pause className="w-4 h-4 fill-slate-950" />
                <span>PAUSE SCAN</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-slate-950" />
                <span>START SCAN</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              const nextIndex = (currentIndex + 1) % products.length;
              handleSelectProduct(nextIndex);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-industrial-800 hover:bg-industrial-700 text-slate-300 font-mono text-xs font-medium border border-industrial-700 transition-colors"
            title="Step to next product manually"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>STEP NEXT</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-industrial-800 hover:bg-industrial-700 text-slate-400 hover:text-white font-mono text-xs border border-industrial-700 transition-colors"
            title="Reset counters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET</span>
          </button>

          <button
            onClick={onBackToHardware}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-industrial-950 hover:bg-industrial-850 text-uv-400 font-mono text-xs border border-uv-500/30 transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>HARDWARE FLOW</span>
          </button>
        </div>
      </div>

      {/* Target Inoculation Presets / Quick Injectors */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-industrial-950 border border-industrial-800 text-xs font-mono">
        <span className="text-slate-400 uppercase tracking-wider text-[11px]">
          QUICK INJECT SAMPLE:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleSelectProduct(0)} // Clean poultry
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              currentIndex === 0 
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold' 
                : 'bg-industrial-900 border-industrial-800 text-slate-400 hover:text-white'
            }`}
          >
            🍗 Clean Poultry (06%)
          </button>
          <button
            onClick={() => handleSelectProduct(1)} // Clean spinach
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              currentIndex === 1 
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold' 
                : 'bg-industrial-900 border-industrial-800 text-slate-400 hover:text-white'
            }`}
          >
            🥬 Clean Greens (12%)
          </button>
          <button
            onClick={() => handleSelectProduct(2)} // Biofilm Flavin
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              currentIndex === 2 
                ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold ring-2 ring-rose-500/30' 
                : 'bg-industrial-900 border-rose-500/40 text-rose-400 hover:bg-rose-500/10'
            }`}
          >
            ⚠ Biofilm Contamination (89%)
          </button>
          <button
            onClick={() => handleSelectProduct(5)} // Fecal Chlorophyll
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              currentIndex === 5 
                ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold ring-2 ring-rose-500/30' 
                : 'bg-industrial-900 border-rose-500/40 text-rose-400 hover:bg-rose-500/10'
            }`}
          >
            ⚠ Fecal Trace Anomaly (94%)
          </button>
        </div>
      </div>

      {/* Flagged Rejection Alert (Section 7) */}
      {alertProduct && (
        <RejectionAlert 
          product={alertProduct} 
          onDismiss={() => setAlertProduct(null)} 
        />
      )}

      {/* 3-Panel Industrial Layout (Left, Center, Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Panel: Simulated Live Conveyor (4 cols) */}
        <div className="lg:col-span-4 flex">
          <LiveConveyor
            products={products}
            currentIndex={currentIndex}
            isScanning={isScanning}
            isFlagged={isFlagged}
            isRejecting={isRejecting}
          />
        </div>

        {/* Center Panel: Live Spectral Analysis (5 cols) */}
        <div className="lg:col-span-5 flex">
          <SpectralChart
            data={currentProduct.spectralProfile}
            productName={currentProduct.name}
            isFlagged={isFlagged}
            contaminationType={currentProduct.contaminationType}
          />
        </div>

        {/* Right Panel: AI Result Card (3 cols) */}
        <div className="lg:col-span-3 flex">
          <AiResultCard
            product={currentProduct}
            isProcessing={isProcessing}
          />
        </div>
      </div>

      {/* Bottom Summary Bar (Section 6) */}
      <LiveSummary
        scannedCount={scannedCount}
        passedCount={passedCount}
        flaggedCount={flaggedCount}
        avgLatencyMs={currentProduct.processingTimeMs}
      />

      {/* System Telemetry */}
      <SystemStatus conveyorRunning={isScanning} uvActive={true} />
    </div>
  );
};
