"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const climModels = [
  { id: "essentiel", name: "Essentiel", realWidth: 77, realHeight: 29, color: "#e5e7eb", accent: "#1B5DA8" },
  { id: "confort", name: "Confort+", realWidth: 80, realHeight: 30, color: "#E8F1FA", accent: "#1B5DA8" },
  { id: "premium", name: "Premium", realWidth: 89, realHeight: 32, color: "#ffffff", accent: "#1B5DA8" },
];

const wallHeights = [
  { value: 240, label: "2,40 m" },
  { value: 250, label: "2,50 m" },
  { value: 260, label: "2,60 m" },
  { value: 270, label: "2,70 m" },
  { value: 300, label: "3,00 m" },
];

type Mode = "measure" | "place" | "captured";

interface ARViewerProps {
  onCapture: (imageData: string) => void;
  onSkip: () => void;
  fullscreen?: boolean;
}

export default function ARViewer({ onCapture, onSkip, fullscreen }: ARViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState("confort");
  const [captured, setCaptured] = useState<string | null>(null);

  // Wall measurement
  const [mode, setMode] = useState<Mode>("measure");
  const [wallPoints, setWallPoints] = useState<{ x: number; y: number }[]>([]);
  const [wallHeightCm, setWallHeightCm] = useState(250);
  const [pxPerCm, setPxPerCm] = useState<number | null>(null);

  // Clim position
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const model = climModels.find((m) => m.id === selectedModel)!;
  const ratio = pxPerCm || 3;
  const climPxW = model.realWidth * ratio;
  const climPxH = model.realHeight * ratio;

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: fullscreen ? 720 : 1280 },
          height: { ideal: fullscreen ? 1280 : 720 },
        },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStreaming(true);
      }
    } catch {
      setError("camera");
    }
  }, [fullscreen]);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
      setStreaming(false);
    }
  }, []);

  useEffect(() => { startCamera(); return () => stopCamera(); }, [startCamera, stopCamera]);

  // When entering place mode, center the clim near the top of the wall
  useEffect(() => {
    if (mode === "place" && containerRef.current && pxPerCm) {
      const rect = containerRef.current.getBoundingClientRect();
      const topPoint = wallPoints[0]?.y || rect.height * 0.15;
      setPos({ x: rect.width / 2 - climPxW / 2, y: topPoint + 20 });
    }
  }, [mode, pxPerCm, climPxW, wallPoints]);

  // Handle tap for wall measurement
  const handleMeasureTap = (clientX: number, clientY: number) => {
    if (mode !== "measure" || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const pts = [...wallPoints, { x, y }];
    setWallPoints(pts);

    if (pts.length === 2) {
      const distPx = Math.abs(pts[1].y - pts[0].y);
      setPxPerCm(distPx / wallHeightCm);
      setMode("place");
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (captured) return;
    const touch = e.touches[0];
    if (mode === "measure") {
      handleMeasureTap(touch.clientX, touch.clientY);
      return;
    }
    if (mode === "place") {
      dragOffset.current = { x: touch.clientX - pos.x, y: touch.clientY - pos.y };
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (mode !== "place" || !isDragging || captured) return;
    e.preventDefault();
    const touch = e.touches[0];
    setPos({ x: touch.clientX - dragOffset.current.x, y: touch.clientY - dragOffset.current.y });
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (captured) return;
    if (mode === "measure") { handleMeasureTap(e.clientX, e.clientY); return; }
    if (mode === "place") {
      dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
      setIsDragging(true);
    }
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (mode !== "place" || !isDragging || captured) return;
    setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
  };
  const handleMouseUp = () => setIsDragging(false);

  // Capture
  const capture = () => {
    if (!videoRef.current || !canvasRef.current || !containerRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = containerRef.current.getBoundingClientRect();
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const sx = video.videoWidth / rect.width;
    const sy = video.videoHeight / rect.height;
    const cw = climPxW * sx, ch = climPxH * sy, cx = pos.x * sx, cy = pos.y * sy;

    ctx.fillStyle = model.color;
    ctx.strokeStyle = "#d1d5db";
    ctx.lineWidth = 2 * sx;
    const r = 8 * sx;
    ctx.beginPath();
    ctx.moveTo(cx + r, cy); ctx.lineTo(cx + cw - r, cy);
    ctx.quadraticCurveTo(cx + cw, cy, cx + cw, cy + r);
    ctx.lineTo(cx + cw, cy + ch - r);
    ctx.quadraticCurveTo(cx + cw, cy + ch, cx + cw - r, cy + ch);
    ctx.lineTo(cx + r, cy + ch);
    ctx.quadraticCurveTo(cx, cy + ch, cx, cy + ch - r);
    ctx.lineTo(cx, cy + r);
    ctx.quadraticCurveTo(cx, cy, cx + r, cy);
    ctx.closePath(); ctx.fill(); ctx.stroke();

    ctx.fillStyle = model.accent;
    ctx.fillRect(cx, cy, cw, ch * 0.18);
    ctx.strokeStyle = "#f3f4f6"; ctx.lineWidth = 1.5 * sx;
    ctx.beginPath(); ctx.moveTo(cx + cw * 0.1, cy + ch * 0.75); ctx.lineTo(cx + cw * 0.9, cy + ch * 0.75); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + cw * 0.1, cy + ch * 0.82); ctx.lineTo(cx + cw * 0.9, cy + ch * 0.82); ctx.stroke();
    ctx.fillStyle = model.accent;
    ctx.beginPath(); ctx.arc(cx + cw * 0.88, cy + ch * 0.4, 3 * sx, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = `bold ${12 * sx}px system-ui`;
    ctx.fillText(`${model.name} — ${model.realWidth}×${model.realHeight} cm`, cx + 8 * sx, cy + ch + 20 * sy);

    setCaptured(canvas.toDataURL("image/jpeg", 0.85));
    setMode("captured");
  };

  const retake = () => { setCaptured(null); setMode("place"); };
  const resetAll = () => { setCaptured(null); setWallPoints([]); setPxPerCm(null); setMode("measure"); };

  // File upload fallback
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { if (typeof reader.result === "string") setCaptured(reader.result); };
    reader.readAsDataURL(file);
  };

  if (error === "camera") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9E9B93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>
          </svg>
        </div>
        <h3 className="text-base font-bold text-dark mb-2">Caméra non disponible</h3>
        <p className="text-sm text-gray-500 mb-6">Importez une photo de votre pièce</p>
        <label className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl cursor-pointer hover:bg-primary-hover transition-colors">
          Importer une photo
          <input type="file" accept="image/*" capture="environment" onChange={handleFileUpload} className="hidden" />
        </label>
        <div className="mt-3"><button onClick={onSkip} className="text-sm text-gray-400 hover:text-gray-600">Passer cette étape</button></div>
        {captured && (
          <div className="mt-6">
            <img src={captured} alt="Photo" className="rounded-2xl max-h-64 mx-auto border border-gray-200" />
            <div className="mt-4 flex gap-3 justify-center">
              <button onClick={() => setCaptured(null)} className="px-5 py-2.5 text-sm font-medium text-gray-500">Changer</button>
              <button onClick={() => onCapture(captured)} className="px-5 py-2.5 bg-primary text-white font-bold text-sm rounded-xl">Utiliser</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${fullscreen ? "flex flex-col flex-1 gap-2" : "space-y-3"}`}>
      {/* Viewport */}
      <div
        ref={containerRef}
        className={`relative w-full bg-black overflow-hidden select-none touch-none ${fullscreen ? "flex-1 rounded-xl" : "aspect-[3/4] sm:aspect-video rounded-2xl"}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" playsInline muted autoPlay />
        <canvas ref={canvasRef} className="hidden" />

        {captured && <img src={captured} alt="Capture" className="absolute inset-0 w-full h-full object-cover z-10" />}

        {/* MEASURE MODE */}
        {mode === "measure" && streaming && (
          <>
            {/* Guide lines */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {/* Horizontal guides */}
              <div className="absolute top-[15%] left-0 right-0 border-t border-dashed border-white/20" />
              <div className="absolute bottom-[10%] left-0 right-0 border-t border-dashed border-white/20" />

              {/* Placed points */}
              {wallPoints.map((p, i) => (
                <div key={i} className="absolute z-30" style={{ left: p.x - 24, top: p.y - 2 }}>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1 bg-primary rounded-full" />
                    <span className="text-[10px] font-bold text-white bg-primary px-2 py-0.5 rounded">
                      {i === 0 ? "Plafond" : "Sol"}
                    </span>
                    <div className="w-12 h-1 bg-primary rounded-full" />
                  </div>
                </div>
              ))}

              {/* Vertical line between points */}
              {wallPoints.length === 1 && (
                <div
                  className="absolute left-1/2 w-0.5 bg-primary/50 -translate-x-1/2"
                  style={{ top: wallPoints[0].y, height: "40%" }}
                />
              )}
            </div>

            {/* Instructions */}
            <div className="absolute top-3 left-3 right-3 z-30">
              <div className="bg-black/70 backdrop-blur-sm text-white text-sm font-medium px-4 py-3 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {wallPoints.length + 1}
                  </div>
                  <div>
                    <div className="font-semibold">
                      {wallPoints.length === 0
                        ? "Tapez le haut du mur (plafond)"
                        : "Tapez le bas du mur (sol)"}
                    </div>
                    <div className="text-white/50 text-xs mt-0.5">
                      Pour calculer les proportions réelles
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* PLACE MODE */}
        {mode === "place" && streaming && (
          <>
            {/* Clim overlay */}
            <div
              className="absolute z-20 pointer-events-none"
              style={{ left: `${pos.x}px`, top: `${pos.y}px`, width: `${climPxW}px`, height: `${climPxH}px` }}
            >
              <div className="absolute -bottom-2 left-[10%] right-[10%] h-4 bg-black/10 rounded-full blur-md" />
              <svg width="100%" height="100%" viewBox="0 0 220 60" preserveAspectRatio="none">
                <rect x="0" y="0" width="220" height="60" rx="6" fill={model.color} stroke="#d1d5db" strokeWidth="1.5" />
                <rect x="0" y="0" width="220" height="12" rx="6" fill={model.accent} />
                <rect x="0" y="8" width="220" height="4" fill={model.accent} />
                <circle cx="200" cy="28" r="2.5" fill={model.accent} opacity="0.8" />
                <line x1="16" y1="44" x2="204" y2="44" stroke="#f3f4f6" strokeWidth="1.5" />
                <line x1="16" y1="48" x2="204" y2="48" stroke="#f3f4f6" strokeWidth="1.5" />
                <path d="M10 55 Q110 62 210 55" stroke="#e5e7eb" strokeWidth="1" fill="none" />
              </svg>
              <div className="absolute -bottom-6 left-0 right-0 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md">{model.name}</span>
                <span className="text-[10px] text-white/70 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md">{model.realWidth}×{model.realHeight} cm</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between">
              <div className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg">
                Déplacez la clim sur le mur
              </div>
              <div className="bg-primary/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Mur {wallHeightCm / 100} m
              </div>
            </div>
          </>
        )}

        {/* Loading */}
        {!streaming && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* CONTROLS */}

      {/* Measure mode: wall height selector */}
      {mode === "measure" && streaming && (
        <div className="space-y-2">
          <div className="text-xs font-semibold text-gray-500 text-center">Hauteur de votre mur :</div>
          <div className="flex gap-1.5 justify-center">
            {wallHeights.map((h) => (
              <button
                key={h.value}
                onClick={() => setWallHeightCm(h.value)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${
                  wallHeightCm === h.value
                    ? "border-primary bg-primary-light text-primary"
                    : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>
          <button onClick={onSkip} className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors">
            Passer cette étape
          </button>
        </div>
      )}

      {/* Place mode */}
      {mode === "place" && (
        <>
          <div className="flex gap-1.5">
            {climModels.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedModel(m.id)}
                className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-all border ${
                  selectedModel === m.id ? "border-primary bg-primary-light text-primary" : "border-gray-200 bg-white text-gray-500"
                }`}
              >
                <div>{m.name}</div>
                <div className="text-[10px] font-normal opacity-60">{m.realWidth}×{m.realHeight} cm</div>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={resetAll} className="py-2.5 px-3 text-xs font-medium text-gray-400 hover:text-dark transition-colors">
              Remesurer
            </button>
            <button onClick={onSkip} className="py-2.5 px-3 text-xs font-medium text-gray-400 hover:text-dark transition-colors">
              Passer
            </button>
            <button
              onClick={capture}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white font-bold text-xs rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/25 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" />
              </svg>
              Prendre la photo
            </button>
          </div>
        </>
      )}

      {/* Captured mode */}
      {mode === "captured" && (
        <div className="flex gap-2">
          <button onClick={retake} className="flex-1 py-2.5 text-xs font-medium text-gray-500 hover:text-dark transition-colors">
            Reprendre
          </button>
          <button
            onClick={() => captured && onCapture(captured)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white font-bold text-xs rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/25 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Valider et continuer
          </button>
        </div>
      )}
    </div>
  );
}
