"use client";

import { useState, useEffect, useRef, type PointerEvent } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Wifi,
  Cpu,
  Layers,
  Sparkles,
  Play,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Radio,
  Send,
  Zap,
  Volume2,
  X,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Minimize2,
} from "lucide-react";

export interface GestureDefinition {
  id: string;
  name: string;
  code: string;
  icon: string;
  color: string;
  message: string;
  description: string;
  values: {
    index: { current: number; base: number; change: number };
    middle: { current: number; base: number; change: number };
    ring: { current: number; base: number; change: number };
    pinky: { current: number; base: number; change: number };
  };
}

export const GESTURES: GestureDefinition[] = [
  {
    id: "g0_rest",
    name: "Rest",
    code: "G0",
    icon: "✋",
    color: "#38bdf8",
    message: "Status: Standby / Relaxed Hand",
    description: "All 4 flex sensors flat with minimal mechanical resistance change.",
    values: {
      index: { current: 1362, base: 1365, change: 3 },
      middle: { current: 1060, base: 1063, change: 3 },
      ring: { current: 1008, base: 1011, change: 3 },
      pinky: { current: 1062, base: 1064, change: 2 },
    },
  },
  {
    id: "g3_help",
    name: "Need Help (SOS)",
    code: "G3",
    icon: "🚨",
    color: "#ef4444",
    message: "SOS Alert: Immediate Assistance Required!",
    description: "Pronounced bend on ring finger (37 delta) with partial index/middle stabilization.",
    values: {
      index: { current: 1349, base: 1365, change: 15 },
      middle: { current: 1048, base: 1063, change: 15 },
      ring: { current: 973, base: 1011, change: 37 },
      pinky: { current: 1063, base: 1064, change: 1 },
    },
  },
  {
    id: "g1_food",
    name: "Need Food",
    code: "G1",
    icon: "🍽️",
    color: "#f59e0b",
    message: "Patient Request: Meal / Food Assistance",
    description: "Index and middle fingers curled inward to signal feeding requirement.",
    values: {
      index: { current: 1315, base: 1365, change: 50 },
      middle: { current: 1018, base: 1063, change: 45 },
      ring: { current: 1001, base: 1011, change: 10 },
      pinky: { current: 1058, base: 1064, change: 6 },
    },
  },
  {
    id: "g2_water",
    name: "Need Water",
    code: "G2",
    icon: "💧",
    color: "#06b6d4",
    message: "Hydration Alert: Need Water Immediately",
    description: "Ring and pinky flexed tightly, signaling beverage / hydration requirement.",
    values: {
      index: { current: 1358, base: 1365, change: 7 },
      middle: { current: 1055, base: 1063, change: 8 },
      ring: { current: 962, base: 1011, change: 49 },
      pinky: { current: 1019, base: 1064, change: 45 },
    },
  },
  {
    id: "g4_thanks",
    name: "Thank You",
    code: "G4",
    icon: "🙏",
    color: "#10b981",
    message: "Gratitude: Thank You Very Much",
    description: "Balanced moderate tension across all 4 channels indicating gesture of gratitude.",
    values: {
      index: { current: 1332, base: 1365, change: 33 },
      middle: { current: 1031, base: 1063, change: 32 },
      ring: { current: 976, base: 1011, change: 35 },
      pinky: { current: 1030, base: 1064, change: 34 },
    },
  },
];

function CountUp({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 80, damping: 20 });
  const formattedCount = useTransform(spring, (latest) =>
    `${prefix}${Math.round(latest).toLocaleString()}${suffix}`
  );

  useEffect(() => {
    if (inView) count.set(value);
  }, [count, inView, value]);

  return <motion.span ref={ref}>{formattedCount}</motion.span>;
}

export default function SmartGloveInteractive({ onClose }: { onClose?: () => void }) {
  const [activeGestureIndex, setActiveGestureIndex] = useState(1); // default G3 (Need Help)
  const [isAutoCycle, setIsAutoCycle] = useState(true);
  const [manualBends, setManualBends] = useState({ index: 15, middle: 15, ring: 37, pinky: 1 });
  const [activeTab, setActiveTab] = useState<"simulator" | "hardware" | "architecture">("simulator");
  const [packetCounter, setPacketCounter] = useState(1482);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Oscilloscope canvas reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveDataRef = useRef<number[][]>([[], [], [], []]);
  const manualBendsRef = useRef(manualBends);

  const currentGesture = GESTURES[activeGestureIndex];
  const sensorReadings = {
    index: {
      ...currentGesture.values.index,
      change: manualBends.index,
      current: Math.max(0, currentGesture.values.index.base - manualBends.index),
    },
    middle: {
      ...currentGesture.values.middle,
      change: manualBends.middle,
      current: Math.max(0, currentGesture.values.middle.base - manualBends.middle),
    },
    ring: {
      ...currentGesture.values.ring,
      change: manualBends.ring,
      current: Math.max(0, currentGesture.values.ring.base - manualBends.ring),
    },
    pinky: {
      ...currentGesture.values.pinky,
      change: manualBends.pinky,
      current: Math.max(0, currentGesture.values.pinky.base - manualBends.pinky),
    },
  };

  useEffect(() => {
    manualBendsRef.current = manualBends;
  }, [manualBends]);

  // Auto-cycle through the 5 gestures
  useEffect(() => {
    if (!isAutoCycle) return;
    const interval = setInterval(() => {
      setActiveGestureIndex((prev) => (prev + 1) % GESTURES.length);
      setPacketCounter((prev) => prev + 1);
    }, 3600);
    return () => clearInterval(interval);
  }, [isAutoCycle]);

  // Sync manual bend values with active gesture when in auto cycle
  useEffect(() => {
    if (isAutoCycle) {
      setManualBends({
        index: currentGesture.values.index.change,
        middle: currentGesture.values.middle.change,
        ring: currentGesture.values.ring.change,
        pinky: currentGesture.values.pinky.change,
      });
    }
  }, [currentGesture, isAutoCycle]);

  // 60FPS Canvas Waveform Stream
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize 4 channels
    const channels = 4;
    const maxPoints = 80;
    if (waveDataRef.current[0].length === 0) {
      for (let c = 0; c < channels; c++) {
        waveDataRef.current[c] = new Array(maxPoints).fill(20);
      }
    }

    const colors = ["#22d3ee", "#a855f7", "#f59e0b", "#10b981"]; // index, middle, ring, pinky

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw faint grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Target amplitudes based on current bends
      const currentBends = manualBendsRef.current;
      const targets = [
        currentBends.index,
        currentBends.middle,
        currentBends.ring,
        currentBends.pinky,
      ];

      for (let c = 0; c < channels; c++) {
        const arr = waveDataRef.current[c];
        const noise = (Math.random() - 0.5) * 1.8;
        const currentTarget = targets[c] * 0.9 + noise;
        arr.push(currentTarget);
        if (arr.length > maxPoints) arr.shift();

        // Draw waveform line
        ctx.beginPath();
        ctx.strokeStyle = colors[c];
        ctx.lineWidth = 2;
        ctx.shadowBlur = 6;
        ctx.shadowColor = colors[c];

        for (let i = 0; i < arr.length; i++) {
          const x = (i / (maxPoints - 1)) * canvas.width;
          const y = canvas.height - 10 - (arr[i] / 65) * (canvas.height - 20);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Interactive slider change
  const handleSliderChange = (finger: "index" | "middle" | "ring" | "pinky", val: number) => {
    setIsAutoCycle(false);
    const updated = { ...manualBends, [finger]: val };
    setManualBends(updated);
    setPacketCounter((prev) => prev + 1);

    // Simple heuristic to detect closest gesture
    if (updated.pinky > 30 && updated.ring > 30) {
      setActiveGestureIndex(3); // G2 Water
    } else if (updated.ring > 30 && updated.index < 25) {
      setActiveGestureIndex(1); // G3 Help
    } else if (updated.index > 35 && updated.middle > 30) {
      setActiveGestureIndex(2); // G1 Food
    } else if (updated.index > 25 && updated.middle > 25 && updated.ring > 25 && updated.pinky > 25) {
      setActiveGestureIndex(4); // G4 Thank You
    } else {
      setActiveGestureIndex(0); // G0 Rest
    }
  };

  const handleGlovePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 320;
    const y = ((event.clientY - bounds.top) / bounds.height) * 420;
    const fingerRanges = [
      { finger: "index" as const, left: 100, right: 126, tip: 45, base: 150 },
      { finger: "middle" as const, left: 140, right: 168, tip: 25, base: 150 },
      { finger: "ring" as const, left: 180, right: 206, tip: 40, base: 150 },
      { finger: "pinky" as const, left: 220, right: 244, tip: 78, base: 165 },
    ];
    const selectedFinger = fingerRanges.find(
      ({ left, right, base }) => x >= left && x <= right && y <= base
    );

    if (!selectedFinger || y < selectedFinger.tip) return;

    const bend = Math.round(
      ((y - selectedFinger.tip) / (selectedFinger.base - selectedFinger.tip)) * 60
    );
    if (manualBends[selectedFinger.finger] !== bend) {
      handleSliderChange(selectedFinger.finger, bend);
    }
  };

  return (
    <div className="w-full rounded-3xl bg-slate-950/90 border border-cyan-500/30 backdrop-blur-2xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col">
      {/* Studio Header Bar */}
      <div className="px-6 py-4 border-b border-white/[0.08] bg-slate-900/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Edge AI Smart Glove Studio
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                IIT Roorkee NIL
              </span>
            </div>
            <p className="text-xs text-slate-400">
              ESP32 + 4 Flex Sensors &bull; On-Device TinyML Inference &bull; 192.168.4.1 Telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Simulation Mode Toggle */}
          <button
            onClick={() => setIsAutoCycle(!isAutoCycle)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              isAutoCycle
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-glow-cyan"
                : "bg-slate-800 text-slate-400 border-white/10 hover:text-white"
            }`}
          >
            {isAutoCycle ? <Play className="w-3.5 h-3.5 animate-pulse" /> : <Sliders className="w-3.5 h-3.5" />}
            <span>{isAutoCycle ? "Auto-Cycling Gestures" : "Manual Interactive Mode"}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              title="Close Studio"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Studio Viewport */}
      <div className="p-6 sm:p-8 space-y-8">
        
        {/* Top Split: Interactive Stylized Glove (Left) & Real Software Dashboard (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stylized Glove Visualization & Interactive Finger Controls (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md relative overflow-hidden">
            <div className="w-full flex items-center justify-between mb-4 text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Smart Glove Mechanical Rig</span>
              </span>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
                4 Flex Channels
              </span>
            </div>

            {/* Stylized Glove SVG with Dynamic Finger Bending */}
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 my-2 group">
              <svg
                viewBox="0 0 320 420"
                onPointerMove={handleGlovePointerMove}
                aria-label="Interactive smart glove. Move your cursor vertically over a finger to bend it."
                className="w-full h-full cursor-crosshair drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              >
                <defs>
                  {/* Flex Sensor Strip Gradients */}
                  <linearGradient id="sensorGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#38bdf8" stop-opacity="1" />
                    <stop offset="50%" stop-color="#f59e0b" stop-opacity="0.9" />
                    <stop offset="100%" stop-color="#ef4444" stop-opacity="1" />
                  </linearGradient>
                  <linearGradient id="gloveFabric" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#1e2433" />
                    <stop offset="100%" stop-color="#0b0f19" />
                  </linearGradient>
                  <filter id="wireGlow">
                    <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#38bdf8" />
                  </filter>
                </defs>

                {/* Hand/Glove Base Contour */}
                {/* Palm Base */}
                <path
                  d="M 60 210 C 60 160, 80 150, 110 150 C 130 150, 190 150, 220 150 C 255 160, 260 200, 260 260 C 260 320, 240 370, 200 380 L 110 380 C 80 370, 60 310, 60 210 Z"
                  fill="url(#gloveFabric)"
                  stroke="#334155"
                  strokeWidth="2.5"
                />

                {/* Wrist Strap */}
                <rect x="90" y="370" width="130" height="36" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="155" y="392" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">IITR NIL &bull; ESP32</text>

                {/* Thumb (Left extended) */}
                <path
                  d="M 70 210 C 35 180, 25 140, 45 125 C 65 110, 85 145, 95 170 Z"
                  fill="url(#gloveFabric)"
                  stroke="#334155"
                  strokeWidth="2"
                />

                {/* 4 Fingers with dynamic SVG bending based on manualBends */}
                {/* 1. Index Finger */}
                <g style={{ transformOrigin: "115px 150px", transform: `rotate(${(manualBends.index / 60) * 18}deg)` }}>
                  <path
                    d="M 100 150 L 100 65 C 100 45, 126 45, 126 65 L 126 150 Z"
                    fill="url(#gloveFabric)"
                    stroke="#334155"
                    strokeWidth="2"
                  />
                  {/* Flex Sensor 1 on Index */}
                  <rect x="108" y="60" width="10" height="85" rx="3" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.2" />
                  <line x1="113" y1="65" x2="113" y2="140" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                  {/* White adhesive tape accents like real photo */}
                  <rect x="103" y="75" width="20" height="7" rx="1" fill="#e2e8f0" opacity="0.8" />
                  <rect x="103" y="115" width="20" height="7" rx="1" fill="#e2e8f0" opacity="0.8" />
                </g>

                {/* 2. Middle Finger */}
                <g style={{ transformOrigin: "155px 150px", transform: `rotate(${(manualBends.middle / 60) * 20}deg)` }}>
                  <path
                    d="M 140 150 L 140 45 C 140 25, 168 25, 168 45 L 168 150 Z"
                    fill="url(#gloveFabric)"
                    stroke="#334155"
                    strokeWidth="2"
                  />
                  {/* Flex Sensor 2 on Middle */}
                  <rect x="149" y="42" width="10" height="98" rx="3" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.2" />
                  <line x1="154" y1="48" x2="154" y2="135" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                  <rect x="144" y="60" width="20" height="7" rx="1" fill="#e2e8f0" opacity="0.8" />
                  <rect x="144" y="105" width="20" height="7" rx="1" fill="#e2e8f0" opacity="0.8" />
                </g>

                {/* 3. Ring Finger */}
                <g style={{ transformOrigin: "195px 150px", transform: `rotate(${(manualBends.ring / 60) * 22}deg)` }}>
                  <path
                    d="M 180 150 L 180 60 C 180 40, 206 40, 206 60 L 206 150 Z"
                    fill="url(#gloveFabric)"
                    stroke="#334155"
                    strokeWidth="2"
                  />
                  {/* Flex Sensor 3 on Ring */}
                  <rect x="188" y="55" width="10" height="90" rx="3" fill="#1e293b" stroke={manualBends.ring > 25 ? "#ef4444" : "#f59e0b"} strokeWidth="1.5" />
                  <line x1="193" y1="60" x2="193" y2="140" stroke={manualBends.ring > 25 ? "#ef4444" : "#f59e0b"} strokeWidth="2" strokeDasharray="3 3" />
                  <rect x="183" y="70" width="20" height="7" rx="1" fill="#e2e8f0" opacity="0.8" />
                  <rect x="183" y="115" width="20" height="7" rx="1" fill="#e2e8f0" opacity="0.8" />
                </g>

                {/* 4. Pinky Finger */}
                <g style={{ transformOrigin: "235px 165px", transform: `rotate(${(manualBends.pinky / 60) * 24}deg)` }}>
                  <path
                    d="M 220 165 L 220 95 C 220 78, 244 78, 244 95 L 244 165 Z"
                    fill="url(#gloveFabric)"
                    stroke="#334155"
                    strokeWidth="2"
                  />
                  {/* Flex Sensor 4 on Pinky */}
                  <rect x="227" y="90" width="10" height="72" rx="3" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.2" />
                  <line x1="232" y1="95" x2="232" y2="155" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                  <rect x="223" y="105" width="18" height="6" rx="1" fill="#e2e8f0" opacity="0.8" />
                  <rect x="223" y="138" width="18" height="6" rx="1" fill="#e2e8f0" opacity="0.8" />
                </g>

                {/* Wiring lines leading from sensors down into ESP32 board */}
                <path d="M 113 150 Q 115 220 135 240" fill="none" stroke="#eab308" strokeWidth="2" filter="url(#wireGlow)" />
                <path d="M 154 150 Q 150 210 145 240" fill="none" stroke="#ef4444" strokeWidth="2" filter="url(#wireGlow)" />
                <path d="M 193 150 Q 175 210 160 240" fill="none" stroke="#3b82f6" strokeWidth="2" filter="url(#wireGlow)" />
                <path d="M 232 165 Q 200 220 175 240" fill="none" stroke="#10b981" strokeWidth="2" filter="url(#wireGlow)" />

                {/* ESP32 Microcontroller Board Mounted on Hand Back */}
                <rect x="110" y="240" width="88" height="115" rx="6" fill="#090d16" stroke="#22d3ee" strokeWidth="1.8" />
                <rect x="122" y="255" width="64" height="42" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                <text x="154" y="278" fill="#e2e8f0" fontSize="7.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">ESP-WROOM-32</text>
                <text x="154" y="288" fill="#38bdf8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">TinyML INT8 Engine</text>
                
                {/* Pin headers & LEDs */}
                <circle cx="118" cy="248" r="2.5" fill="#ef4444" className="animate-ping" />
                <circle cx="118" cy="248" r="2" fill="#ef4444" />
                <circle cx="188" cy="248" r="2" fill="#22c55e" />
                
                {/* USB Cable Plug */}
                <rect x="142" y="352" width="24" height="18" rx="2" fill="#334155" />
                <line x1="154" y1="370" x2="154" y2="400" stroke="#0284c7" strokeWidth="4" />
              </svg>
              <p className="mt-2 text-center text-[11px] text-slate-400">
                Move your cursor up or down over a finger to control its bend.
              </p>
            </div>

            {/* Interactive Finger Sliders for Manual Mode */}
            <div className="w-full mt-4 space-y-2.5 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                <span>Finger Flex Controls (0–60° Bend)</span>
                <button
                  onClick={() => {
                    setIsAutoCycle(true);
                  }}
                  className="text-cyan-400 hover:underline flex items-center gap-1 font-mono normal-case"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Resume Auto-Loop</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Index */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-cyan-300">☝️ Index</span>
                    <span className="font-mono text-slate-300">{manualBends.index}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={manualBends.index}
                    onChange={(e) => handleSliderChange("index", parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Middle */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-300">🖐️ Middle</span>
                    <span className="font-mono text-slate-300">{manualBends.middle}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={manualBends.middle}
                    onChange={(e) => handleSliderChange("middle", parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
                  />
                </div>

                {/* Ring */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-300">💍 Ring</span>
                    <span className="font-mono text-slate-300">{manualBends.ring}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={manualBends.ring}
                    onChange={(e) => handleSliderChange("ring", parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>

                {/* Pinky */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-emerald-300">🤙 Pinky</span>
                    <span className="font-mono text-slate-300">{manualBends.pinky}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={manualBends.pinky}
                    onChange={(e) => handleSliderChange("pinky", parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Software Dashboard Panel (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Dashboard Wrapper (Replicating exact 192.168.4.1 UI from user's screenshot) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl shadow-2xl space-y-6">
              
              {/* Top Navigation in Dashboard */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white tracking-wide">Smart Glove Dashboard</span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    http://192.168.4.1
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>WiFi: Connected</span>
                  </span>
                </div>
              </div>

              {/* Big Detected Gesture Banner */}
              <div
                className="p-6 rounded-2xl border text-center space-y-2 relative overflow-hidden transition-all duration-500"
                style={{
                  backgroundColor: `${currentGesture.color}15`,
                  borderColor: `${currentGesture.color}40`,
                }}
              >
                <div className="text-[11px] font-mono uppercase tracking-widest text-slate-300">
                  Current Detected Gesture
                </div>

                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl sm:text-4xl">{currentGesture.icon}</span>
                  <span
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                    style={{ color: currentGesture.color }}
                  >
                    {currentGesture.name}
                  </span>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-slate-950/80 text-white border border-white/20">
                    {currentGesture.code}
                  </span>
                </div>

                {/* Wireless Message Payload */}
                <div className="pt-2 flex items-center justify-center gap-2 text-xs font-medium text-slate-200">
                  <Send className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono bg-slate-950/70 px-3 py-1 rounded-lg border border-white/10 text-cyan-300">
                    {currentGesture.message}
                  </span>
                </div>
              </div>

              {/* 4 Finger Sensor Progress Bars */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Finger Sensors (ADC Differential Delta)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Index Bar */}
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-white/[0.06] space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-300">☝️ Index</span>
                      <span className="font-mono text-cyan-300 font-bold">
                        {sensorReadings.index.change} Δ
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                        style={{ width: `${Math.min(100, (sensorReadings.index.change / 60) * 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Now: {sensorReadings.index.current}</span>
                      <span>Base: {sensorReadings.index.base}</span>
                    </div>
                  </div>

                  {/* Middle Bar */}
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-white/[0.06] space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-300">🖐️ Middle</span>
                      <span className="font-mono text-purple-300 font-bold">
                        {sensorReadings.middle.change} Δ
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-purple-400 transition-all duration-300"
                        style={{ width: `${Math.min(100, (sensorReadings.middle.change / 60) * 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Now: {sensorReadings.middle.current}</span>
                      <span>Base: {sensorReadings.middle.base}</span>
                    </div>
                  </div>

                  {/* Ring Bar */}
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-white/[0.06] space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-300">💍 Ring</span>
                      <span className="font-mono text-amber-300 font-bold">
                        {sensorReadings.ring.change} Δ
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-400 transition-all duration-300"
                        style={{ width: `${Math.min(100, (sensorReadings.ring.change / 60) * 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Now: {sensorReadings.ring.current}</span>
                      <span>Base: {sensorReadings.ring.base}</span>
                    </div>
                  </div>

                  {/* Pinky Bar */}
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-white/[0.06] space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-300">🤙 Pinky</span>
                      <span className="font-mono text-emerald-300 font-bold">
                        {sensorReadings.pinky.change} Δ
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-400 transition-all duration-300"
                        style={{ width: `${Math.min(100, (sensorReadings.pinky.change / 60) * 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Now: {sensorReadings.pinky.current}</span>
                      <span>Base: {sensorReadings.pinky.base}</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* 60FPS Live Telemetry Waveform Oscilloscope */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                    <span>Real-Time Sensor Oscilloscope (60 FPS Stream)</span>
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    <span className="text-cyan-400">● Ch1</span>
                    <span className="text-purple-400">● Ch2</span>
                    <span className="text-amber-400">● Ch3</span>
                    <span className="text-emerald-400">● Ch4</span>
                  </div>
                </div>

                <div className="w-full h-28 rounded-xl bg-slate-950 border border-white/[0.08] overflow-hidden p-1">
                  <canvas
                    ref={canvasRef}
                    width={480}
                    height={110}
                    className="w-full h-full block"
                  />
                </div>
              </div>

              {/* Live Transmission Packet Log */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>PKT #{packetCounter} TX UDP &bull; WiFi RSSI: -52 dBm</span>
                </div>
                <span className="text-cyan-300">Latency: 18.2 ms (On-Device)</span>
              </div>

            </div>

            {/* Quick 5 Gestures Selector Bar */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
              {GESTURES.map((g, idx) => {
                const isSelected = activeGestureIndex === idx;
                return (
                  <button
                    key={g.id}
                    onClick={() => {
                      setIsAutoCycle(false);
                      setActiveGestureIndex(idx);
                      setManualBends({
                        index: g.values.index.change,
                        middle: g.values.middle.change,
                        ring: g.values.ring.change,
                        pinky: g.values.pinky.change,
                      });
                      setPacketCounter((prev) => prev + 1);
                    }}
                    className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                      isSelected
                        ? "bg-slate-800 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)] font-bold"
                        : "bg-slate-900/50 border-white/[0.06] text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <span>{g.icon}</span>
                    <span>{g.name}</span>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

        {/* Pipeline Architecture Diagram with Moving Data Packets */}
        <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Real-Time Edge AI Data Pipeline (Moving Packets)</span>
            </span>
            <span className="text-[11px] font-mono text-cyan-400">Zero Cloud Latency</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative">
            
            {/* Step 1: Flex Sensors */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-cyan-500/30 text-center space-y-1 relative group">
              <div className="text-[10px] font-mono text-cyan-400">STAGE 01</div>
              <div className="text-sm font-bold text-white">4 Flex Sensors</div>
              <div className="text-[11px] text-slate-400">Analog Resistance (ADC)</div>
              {/* Connector pulse */}
              <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 z-10 animate-pulse" />
            </div>

            {/* Step 2: ESP32 ADC */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-indigo-500/30 text-center space-y-1 relative">
              <div className="text-[10px] font-mono text-indigo-400">STAGE 02</div>
              <div className="text-sm font-bold text-white">ESP32 Filtering</div>
              <div className="text-[11px] text-slate-400">Moving Avg (SNR 21)</div>
              <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 z-10 animate-pulse" />
            </div>

            {/* Step 3: TinyML Model */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-purple-500/30 text-center space-y-1 relative">
              <div className="text-[10px] font-mono text-purple-400">STAGE 03</div>
              <div className="text-sm font-bold text-white">TinyML Neural Net</div>
              <div className="text-[11px] text-slate-400">TFLite Micro (INT8)</div>
              <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-emerald-500 z-10 animate-pulse" />
            </div>

            {/* Step 4: WiFi Socket */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-emerald-500/30 text-center space-y-1 relative">
              <div className="text-[10px] font-mono text-emerald-400">STAGE 04</div>
              <div className="text-sm font-bold text-white">WiFi Local AP</div>
              <div className="text-[11px] text-slate-400">192.168.4.1 WebSocket</div>
              <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 z-10 animate-pulse" />
            </div>

            {/* Step 5: Real-Time Message */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-amber-500/30 text-center space-y-1 col-span-2 sm:col-span-1">
              <div className="text-[10px] font-mono text-amber-400">STAGE 05</div>
              <div className="text-sm font-bold text-white">Live Alert / TTS</div>
              <div className="text-[11px] text-slate-400">Speech &amp; Web Output</div>
            </div>

          </div>
        </div>

        {/* Count-Up Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-cyan-500/30 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300 font-mono">
              <CountUp value={94} suffix="%" />
            </div>
            <div className="text-xs font-semibold text-white">Inference Accuracy</div>
            <div className="text-[11px] text-slate-400">On-Device TFLite INT8</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-purple-500/30 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 font-mono">
              <CountUp value={1586} />
            </div>
            <div className="text-xs font-semibold text-white">Labeled Samples</div>
            <div className="text-[11px] text-slate-400">5 Balanced Gesture Classes</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-emerald-500/30 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-mono">
              <CountUp value={5} />
            </div>
            <div className="text-xs font-semibold text-white">Gesture Classes</div>
            <div className="text-[11px] text-slate-400">Curated with Zero Noise</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-amber-500/30 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300 font-mono">
              <CountUp value={21} prefix="~" suffix=" SNR" />
            </div>
            <div className="text-xs font-semibold text-white">Signal-to-Noise Ratio</div>
            <div className="text-[11px] text-slate-400">&lt;20ms On-Device Latency</div>
          </div>

        </div>

        {/* Real Smart Glove Photo & Hardware Gallery */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Physical Prototype &amp; Hardware Deployment</span>
              </h3>
              <p className="text-xs text-slate-400">
                Photographed at Nano-Intelligence Laboratory, Indian Institute of Technology Roorkee (IITR).
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40">
              Verified Physical Rig
            </span>
          </div>

          {/* 3 Real Photos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Photo 1: Physical Glove on Hand */}
            <div className="space-y-2 group">
              <div className="relative h-60 w-full rounded-xl overflow-hidden border border-white/10 bg-slate-950 shadow-lg">
                <Image
                  src="/images/smart-glove-real.jpg"
                  alt="Real Smart Glove Hardware on Hand"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-sm text-[10px] font-mono text-cyan-300 border border-white/10">
                  Worn Prototype &bull; ESP32
                </div>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">
                Glove worn on hand with 4 flex sensors &amp; ESP32 running in front of the local dashboard.
              </p>
            </div>

            {/* Photo 2: Mobile Web Dashboard UI */}
            <div className="space-y-2 group">
              <div className="relative h-60 w-full rounded-xl overflow-hidden border border-white/10 bg-slate-950 shadow-lg">
                <Image
                  src="/images/smart-glove-dashboard.png"
                  alt="Live Mobile Dashboard UI at 192.168.4.1"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-sm text-[10px] font-mono text-emerald-300 border border-white/10">
                  Mobile UI &bull; 192.168.4.1
                </div>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">
                Live screenshot of mobile client receiving `SOS Need Help (G3)` gesture broadcast.
              </p>
            </div>

            {/* Photo 3: Circuitry & TinyML Training Script */}
            <div className="space-y-2 group">
              <div className="relative h-60 w-full rounded-xl overflow-hidden border border-white/10 bg-slate-950 shadow-lg">
                <Image
                  src="/images/smart-glove-hardware.jpg"
                  alt="Sensor Assembly & VS Code Codebase"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-sm text-[10px] font-mono text-purple-300 border border-white/10">
                  VS Code &bull; TinyML Model
                </div>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">
                Detailed view of flex sensor adhesive mounting &amp; TFLite Micro quantization training script.
              </p>
            </div>

          </div>

          {/* Video Placeholder / Demo Player Banner */}
          <div className="rounded-xl border border-cyan-500/20 bg-slate-950/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Play className="w-5 h-5 ml-0.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Smart Glove Live Demo Video</h4>
                <p className="text-xs text-slate-400">Full demonstration of gesture changes and real-time WiFi audio playback.</p>
              </div>
            </div>
            <a
              href="https://github.com/prashantgupta/Smart-Glove-TinyML-ESP32"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-teal-900 bg-[#e2eeea] border border-teal-200 hover:bg-[#d8e8e2] whitespace-nowrap transition-colors"
            >
              <span>View Source &amp; Video Repo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
