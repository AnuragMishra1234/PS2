export type ViewMode = 'home' | 'hardware' | 'software';

export interface SpectralPoint {
  wavelength: number; // in nm (e.g. 415 to 910 nm)
  intensity: number;  // 0 to 100 relative %
  referenceClean?: number;
}

export type ContaminationType = 
  | 'none' 
  | 'biofilm_flavin'       // Peak at 525 nm
  | 'fecal_chlorophyll'    // Peak at 675 nm
  | 'spoilage_hydration'   // Dip at 940 nm, scattering
  | 'early_microcolony';   // Subtle shift at 460/525 nm

export interface ProductItem {
  id: string;
  serialNumber: string;
  name: string;
  category: 'poultry' | 'greens' | 'produce';
  riskScore: number;       // 0 to 100
  status: 'CLEAR' | 'FLAGGED';
  decision: 'PASS' | 'REJECT';
  contaminationType: ContaminationType;
  anomalyDescription: string;
  spectralProfile: SpectralPoint[];
  processingTimeMs: number;
}

export interface HardwareNodeInfo {
  id: string;
  title: string;
  code: string;
  shortDesc: string;
  fullDesc: string;
  spec: string;
  role: string;
  stage: number;
  highlightColor: string;
}

export interface SystemTelemetry {
  sensorOnline: boolean;
  uvActive: boolean;
  edgeProcessorOnline: boolean;
  aiModelReady: boolean;
  conveyorRunning: boolean;
  rejectMechanismReady: boolean;
  productsScanned: number;
  passedCount: number;
  flaggedCount: number;
  avgLatencyMs: number;
}
