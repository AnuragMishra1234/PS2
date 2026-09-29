import type { ProductItem, SpectralPoint } from '../types';

// Standard 11 AS7341 wavelength bands in nm
export const WAVELENGTH_BANDS = [415, 445, 480, 515, 555, 590, 630, 680, 750, 850, 910];

// Helper to construct spectral points
const createSpectra = (intensities: number[], cleanRef: number[]): SpectralPoint[] => {
  return WAVELENGTH_BANDS.map((wl, i) => ({
    wavelength: wl,
    intensity: intensities[i],
    referenceClean: cleanRef[i],
  }));
};

// Baseline clean poultry curve
const CLEAN_POULTRY_REF = [28, 35, 42, 48, 52, 55, 58, 62, 68, 74, 69];

// Baseline clean greens curve
const CLEAN_GREENS_REF = [15, 18, 26, 45, 78, 52, 22, 18, 72, 85, 80];

export const SAMPLE_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-001',
    serialNumber: 'PRD-001',
    name: 'Fresh Poultry Fillet (Grade A)',
    category: 'poultry',
    riskScore: 6,
    status: 'CLEAR',
    decision: 'PASS',
    contaminationType: 'none',
    anomalyDescription: 'Normal poultry muscle reflectance. Low endogenous fluorescence; pristine hydration ratio.',
    spectralProfile: createSpectra(
      [27, 34, 41, 47, 51, 54, 57, 61, 67, 73, 68],
      CLEAN_POULTRY_REF
    ),
    processingTimeMs: 16.4,
  },
  {
    id: 'prod-002',
    serialNumber: 'PRD-002',
    name: 'Fresh Baby Spinach Leaves',
    category: 'greens',
    riskScore: 12,
    status: 'CLEAR',
    decision: 'PASS',
    contaminationType: 'none',
    anomalyDescription: 'Typical chlorophyll absorbance valley at 680nm with healthy green reflectance at 555nm.',
    spectralProfile: createSpectra(
      [16, 19, 27, 46, 79, 53, 23, 19, 73, 86, 81],
      CLEAN_GREENS_REF
    ),
    processingTimeMs: 17.8,
  },
  {
    id: 'prod-003',
    serialNumber: 'PRD-003',
    name: 'Poultry Cut - Biofilm Formation',
    category: 'poultry',
    riskScore: 89,
    status: 'FLAGGED',
    decision: 'REJECT',
    contaminationType: 'biofilm_flavin',
    anomalyDescription: 'Strong microbial flavin autofluorescence anomaly centered at 515–555 nm; significant EPS water binding depression at 910 nm.',
    spectralProfile: createSpectra(
      [34, 46, 68, 88, 92, 68, 59, 63, 62, 70, 48],
      CLEAN_POULTRY_REF
    ),
    processingTimeMs: 18.2,
  },
  {
    id: 'prod-004',
    serialNumber: 'PRD-004',
    name: 'Fresh Cut Romaine Lettuce',
    category: 'greens',
    riskScore: 17,
    status: 'CLEAR',
    decision: 'PASS',
    contaminationType: 'none',
    anomalyDescription: 'Clean leaf cuticle reflectance. Intact cellular turgor and standard spectral balance.',
    spectralProfile: createSpectra(
      [14, 18, 25, 44, 76, 50, 21, 17, 70, 83, 78],
      CLEAN_GREENS_REF
    ),
    processingTimeMs: 15.9,
  },
  {
    id: 'prod-005',
    serialNumber: 'PRD-005',
    name: 'Diced Chicken Breast Fillet',
    category: 'poultry',
    riskScore: 8,
    status: 'CLEAR',
    decision: 'PASS',
    contaminationType: 'none',
    anomalyDescription: 'Normal surface lipids and myoglobin signature. No significant UV-excited fluorescence detected.',
    spectralProfile: createSpectra(
      [29, 36, 43, 49, 53, 56, 59, 63, 69, 75, 70],
      CLEAN_POULTRY_REF
    ),
    processingTimeMs: 17.1,
  },
  {
    id: 'prod-006',
    serialNumber: 'PRD-006',
    name: 'Poultry Carcass - Fecal Trace Residue',
    category: 'poultry',
    riskScore: 94,
    status: 'FLAGGED',
    decision: 'REJECT',
    contaminationType: 'fecal_chlorophyll',
    anomalyDescription: 'Severe enteric contamination signature: sharp pheophorbide/chlorophyll emission spike at 680 nm (F680/F445 ratio = 2.45). High pathogen hazard.',
    spectralProfile: createSpectra(
      [32, 38, 44, 49, 54, 62, 78, 96, 75, 71, 64],
      CLEAN_POULTRY_REF
    ),
    processingTimeMs: 18.9,
  },
  {
    id: 'prod-007',
    serialNumber: 'PRD-007',
    name: 'Tender Fresh Spinach Bunch',
    category: 'greens',
    riskScore: 11,
    status: 'CLEAR',
    decision: 'PASS',
    contaminationType: 'none',
    anomalyDescription: 'Consistent healthy vegetation index. Clean washing verification confirmed.',
    spectralProfile: createSpectra(
      [15, 19, 28, 47, 80, 54, 24, 20, 74, 87, 82],
      CLEAN_GREENS_REF
    ),
    processingTimeMs: 16.5,
  },
  {
    id: 'prod-008',
    serialNumber: 'PRD-008',
    name: 'Chicken Fillet - Spoilage / Decay',
    category: 'poultry',
    riskScore: 82,
    status: 'FLAGGED',
    decision: 'REJECT',
    contaminationType: 'spoilage_hydration',
    anomalyDescription: 'Tissue breakdown and cellular fluid exudate. Broad scattering elevation across visible range with deep hydration shift.',
    spectralProfile: createSpectra(
      [42, 51, 62, 71, 78, 80, 82, 84, 65, 59, 44],
      CLEAN_POULTRY_REF
    ),
    processingTimeMs: 17.7,
  },
  {
    id: 'prod-009',
    serialNumber: 'PRD-009',
    name: 'Organic Baby Spinach Leaf',
    category: 'greens',
    riskScore: 5,
    status: 'CLEAR',
    decision: 'PASS',
    contaminationType: 'none',
    anomalyDescription: 'Ideal photosynthetic pigment ratio. Surface completely free of organic residue.',
    spectralProfile: createSpectra(
      [13, 17, 24, 43, 77, 51, 20, 16, 71, 84, 79],
      CLEAN_GREENS_REF
    ),
    processingTimeMs: 16.2,
  },
  {
    id: 'prod-010',
    serialNumber: 'PRD-010',
    name: 'Farm-Fresh Poultry Breast',
    category: 'poultry',
    riskScore: 14,
    status: 'CLEAR',
    decision: 'PASS',
    contaminationType: 'none',
    anomalyDescription: 'All spectral bands within 1-sigma baseline tolerance. Passed screening inspection.',
    spectralProfile: createSpectra(
      [28, 35, 42, 48, 52, 55, 58, 62, 68, 74, 69],
      CLEAN_POULTRY_REF
    ),
    processingTimeMs: 17.0,
  },
];
