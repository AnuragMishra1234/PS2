import type { HardwareNodeInfo } from '../types';

export const HARDWARE_NODES: Record<string, HardwareNodeInfo> = {
  'food-product': {
    id: 'food-product',
    title: 'FOOD PRODUCT',
    code: 'IN-FEED',
    shortDesc: 'Moving organic food surfaces (fresh poultry cuts, raw leafy greens) entering the inspection tunnel.',
    fullDesc: 'Targets continuous high-throughput food items without destruction or chemical swabbing. Surface morphology, moisture, and biological layers are scanned at conveyor speeds.',
    spec: 'Raw Poultry / Fresh-cut Greens (0.15 - 0.5 m/s)',
    role: 'Physical Sample',
    stage: 1,
    highlightColor: '#38bdf8', // sky-400
  },
  'conveyor': {
    id: 'conveyor',
    title: 'CONVEYOR SYSTEM',
    code: 'BELT-SYNC',
    shortDesc: 'Continuous motorized industrial transport integrated with optical encoder line synchronization.',
    fullDesc: 'Maintains uniform product transit speed. Rotary quadrature encoder pulses synchronize the camera line-scan exposure, ensuring zero spatial distortion even during belt speed fluctuations.',
    spec: '12V DC Planetary Gear Motor + 1024 PPR Optical Encoder',
    role: 'Material Handling & Line-Sync',
    stage: 2,
    highlightColor: '#06b6d4', // cyan-500
  },
  'uva-illumination': {
    id: 'uva-illumination',
    title: 'UV-A ILLUMINATION',
    code: 'OPT-365',
    shortDesc: 'Excites substances on the food surface so the sensor can capture useful optical changes.',
    fullDesc: 'Narrow-band 365 nm high-intensity LED array induces Stokes-shifted autofluorescence in endogenous microbial fluorophores (NADH, flavins, protoporphyrin IX) without photochemically degrading food lipids.',
    spec: '365 nm ± 5 nm UV-A High-Power Array | Pulsed Strobe',
    role: 'Fluorophore Excitation Light Source',
    stage: 3,
    highlightColor: '#a855f7', // purple-500
  },
  'spectral-sensor': {
    id: 'spectral-sensor',
    title: 'SPECTRAL SENSOR',
    code: 'SEN-HSI',
    shortDesc: 'Captures wavelength-dependent information from the illuminated food surface.',
    fullDesc: 'Compact multi-channel spectral sensor array (ams OSRAM AS7341) coupled with high-speed NoIR spatial imaging. Measures 11 discrete optical bands spanning 415 nm to 910 nm with 16-bit precision.',
    spec: '11 Spectral Bands (415–910 nm) + High-Speed NoIR CMOS',
    role: 'Hyperspectral / Optical Acquisition',
    stage: 4,
    highlightColor: '#3b82f6', // blue-500
  },
  'spectral-data': {
    id: 'spectral-data',
    title: 'SPECTRAL DATA BUS',
    code: 'BUS-DMA',
    shortDesc: 'High-speed serialized digital transmission of spectral hypercube vectors to edge processor.',
    fullDesc: 'Transfers dark-calibrated 16-bit channel readings over high-speed I2C Fast-Mode Plus (1 MHz) and CSI-2 MIPI camera lanes with sub-millisecond bus latency.',
    spec: 'I2C Fast Mode+ (1 MHz) / MIPI CSI-2 Bus',
    role: 'Real-Time Data Transmission',
    stage: 5,
    highlightColor: '#6366f1', // indigo-500
  },
  'raspberry-pi': {
    id: 'raspberry-pi',
    title: 'EDGE PROCESSOR',
    code: 'CPU-EDGE',
    shortDesc: 'Processes sensor data locally and runs the AI model in real time.',
    fullDesc: 'Industrial embedded platform (Raspberry Pi 5 / NVIDIA Jetson) hosting zero-copy memory pipelines, hardware interrupt handling for encoder tracking, and deterministic GPIO timing.',
    spec: 'Broadcom BCM2712 Quad Cortex-A76 @ 2.4GHz / Jetson Orin',
    role: 'Local Real-Time Compute Unit',
    stage: 6,
    highlightColor: '#10b981', // emerald-500
  },
  'ai-analysis': {
    id: 'ai-analysis',
    title: 'AI ENGINE',
    code: 'INF-ONNX',
    shortDesc: 'Analyzes spectral features and estimates contamination risk.',
    fullDesc: 'Dual-stage inferencing: Tier-1 evaluates Normalized Differential Biofilm Indices (NDBFI) in <1ms; Tier-2 executes a quantized 1D-CNN on ONNX Runtime to verify multi-wavelength spatial-spectral patterns.',
    spec: 'Quantized INT8 1D-CNN + NDBFI Vector Engine (<16ms)',
    role: 'Spectral Pattern Classification',
    stage: 7,
    highlightColor: '#f59e0b', // amber-500
  },
  'contamination-risk': {
    id: 'contamination-risk',
    title: 'CONTAMINATION RISK',
    code: 'METRIC',
    shortDesc: 'Continuous probabilistic risk scoring comparing against validated baseline thresholds.',
    fullDesc: 'Scores organic anomaly intensity from 0% (pristine food matrix) to 100% (critical biofilm or fecal residue hazard). Accounts for surface moisture and matrix variances.',
    spec: '0–100% Anomaly Hazard Score (Threshold: 75%)',
    role: 'Risk Assessment Metric',
    stage: 8,
    highlightColor: '#fb923c', // orange-400
  },
  'decision': {
    id: 'decision',
    title: 'DECISION GATE',
    code: 'LOGIC-PASS/FLAG',
    shortDesc: 'Instantaneous pass/flag determination triggering downstream actuator queues.',
    fullDesc: 'Deterministic threshold comparator. If Risk Score < 75%, item passes unimpeded. If Risk Score >= 75%, schedules a hardware pulse in the encoder ring buffer for targeted physical isolation.',
    spec: 'Hard Real-Time Interrupt Logic (Deterministic Latency < 1ms)',
    role: 'Binary Control Arbiter',
    stage: 9,
    highlightColor: '#ec4899', // pink-500
  },
  'rejection': {
    id: 'rejection',
    title: 'REJECTION',
    code: 'ACT-SERVO',
    shortDesc: 'Diverts a flagged product from the normal production path.',
    fullDesc: 'High-speed metal-gear servo flipper (or pneumatic solenoid nozzle) actuates at the exact encoder distance, physically sweeping the contaminated sample into a sealed quarantine container.',
    spec: 'High-Torque Metal Gear Servo (<100ms sweep) / 6-Bar Air Blast',
    role: 'Physical Isolation Actuator',
    stage: 10,
    highlightColor: '#ef4444', // red-500
  },
};
