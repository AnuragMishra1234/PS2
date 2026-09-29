import { useState } from 'react';
import type { ViewMode } from './types';
import { Header } from './components/common/Header';
import { HomeScreen } from './components/home/HomeScreen';
import { HardwareFlow } from './components/hardware/HardwareFlow';
import { SoftwareDemo } from './components/software/SoftwareDemo';
import { TechDrawer } from './components/common/TechDrawer';
import { ShieldCheck } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [isTechOpen, setIsTechOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-industrial-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Industrial Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenTech={() => setIsTechOpen(true)}
      />

      {/* Main Screen Body */}
      <main className="flex-1 flex flex-col justify-center">
        {currentView === 'home' && (
          <HomeScreen
            onNavigate={(view) => setCurrentView(view)}
            onOpenTech={() => setIsTechOpen(true)}
          />
        )}

        {currentView === 'hardware' && (
          <HardwareFlow
            onRunSoftwareDemo={() => setCurrentView('software')}
          />
        )}

        {currentView === 'software' && (
          <SoftwareDemo
            onBackToHardware={() => setCurrentView('hardware')}
          />
        )}
      </main>

      {/* Bottom Footer & Regulatory Positioning Note */}
      <footer className="w-full border-t border-industrial-800/80 bg-industrial-950/80 px-4 lg:px-8 py-5 text-xs text-slate-500 font-mono mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">
              MICROGUARD // Ministry of Food Processing Industries (MoFPI) #26233
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsTechOpen(true)}
              className="text-slate-400 hover:text-cyan-400 underline underline-offset-4 transition-colors"
            >
              Technology Stack
            </button>
            <span className="text-slate-700">•</span>
            <span>Prototype Screening Mode</span>
            <span className="text-slate-700">•</span>
            <span className="text-emerald-400">Deterministic Edge AI</span>
          </div>
        </div>
      </footer>

      {/* Technology Specifications Drawer / Modal */}
      <TechDrawer
        isOpen={isTechOpen}
        onClose={() => setIsTechOpen(false)}
      />
    </div>
  );
}

export default App;
