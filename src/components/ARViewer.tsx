"use client";

import { useRef, useState, useEffect, useCallback } from "react";

// Real dimensions in cm
const climModels = [
  { id: "essentiel", name: "Essentiel", realWidth: 77, realHeight: 29, color: "#e5e7eb", accent: "#88a78b" },
  { id: "confort", name: "Confort+", realWidth: 80, realHeight: 30, color: "#e8efe9", accent: "#88a78b" },
  { id: "premium", name: "Premium", realWidth: 89, realHeight: 32, color: "#ffffff", accent: "#88a78b" },
];

const A4_WIDTH_CM = 29.7;
const DEFAULT_PX_PER_CM = 4; // Fallback if no calibration

type Mode = "calibrate" | "place" | "captured";

interface ARViewerProps {
  onCapture: (imageData: string) => void;
  onSkip: () => void;
  fullscreen?: boolean;
}

export default function ARViewer({ onCapture, onSkip }: ARViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState("confort");
  const [captured, setCaptured] = useState<string | null>(null);

  // Calibration
  const [mode, setMode] = useState<Mode>("calibrate");
  const [calibPoints, setCalibPoints] = useState<{ x: number; y: number }[]>([]);
  const [pxPerCm, setPxPerCm] = useState<number | null>(null);

  // Position of the clim overlay
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const model = climModels.find((m) => m.id === selectedModel)!;
  const ratio = pxPerCm || DEFAULT_PX_PER_CM;
  const climPxWidth = model.realWidth * ratio;
  const climPxHeight = model.realHeight * ratio;

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
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
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((t) => t.stop());
      videoRef.current.srcObject = null;
      setStreaming(false);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  // Center clim when entering place mode
  useEffect(() => {
    if (mode === "place" && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPos({ x: rect.width / 2 - climPxWidth / 2, y: rect.height * 0.25 });
    }
  }, [mode, climPxWidth]);

  // Calibration: user taps two points (left & right edge of A4)
  const handleCalibTap = (e: React.MouseEvent | React.TouchEvent) => {
    if (mode !== "calibrate" || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const newPoints = [...calibPoints, { x, y }];
    setCalibPoints(newPoints);

    if (newPoints.length === 2) {
      const dx = newPoints[1].x - newPoints[0].x;
      const dy = newPoints[1].y - newPoints[0].y;
      const distPx = Math.sqrt(dx * dx + dy * dy);
      const calculated = distPx / A4_WIDTH_CM;
      setPxPerCm(calculated);
      setMode("place");
    }
  };

  // Skip calibration
  const skipCalibration = () => {
    setPxPerCm(DEFAULT_PX_PER_CM);
    setMode("place");
  };

  // Recalibrate
  const recalibrate = () => {
    setCalibPoints([]);
    setPxPerCm(null);
    setMode("calibrate");
    setCaptured(null);
  };

  // Touch drag
  const handleTouchStart = (e: React.TouchEvent) => {
    if (mode === "calibrate") { handleCalibTap(e); return; }
    if (mode !== "place") return;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      dragOffset.current = { x: touch.clientX - pos.x, y: touch.clientY - pos.y };
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (mode !== "place" || !isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    setPos({ x: touch.clientX - dragOffset.current.x, y: touch.clientY - dragOffset.current.y });
  };

  const handleTouchEnd = () => { setIsDragging(false); };

  // Mouse drag (desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (mode === "calibrate") { handleCalibTap(e); return; }
    if (mode !== "place") return;
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mode !== "place" || !isDragging) return;
    setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Capture screenshot
  const capture = () => {
    if (!videoRef.current || !canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const rect = container.getBoundingClientRect();
    const scaleX = video.videoWidth / rect.width;
    const scaleY = video.videoHeight / rect.height;

    const climW = climPxWidth * scaleX;
    const climH = climPxHeight * scaleY;
    const climX = pos.x * scaleX;
    const climY = pos.y * scaleY;

    // Unit body
    ctx.fillStyle = model.color;
    ctx.strokeStyle = "#d1d5db";
    ctx.lineWidth = 2 * scaleX;
    const r = 8 * scaleX;
    ctx.beginPath();
    ctx.moveTo(climX + r, climY);
    ctx.lineTo(climX + climW - r, climY);
    ctx.quadraticCurveTo(climX + climW, climY, climX + climW, climY + r);
    ctx.lineTo(climX + climW, climY + climH - r);
    ctx.quadraticCurveTo(climX + climW, climY + climH, climX + climW - r, climY + climH);
    ctx.lineTo(climX + r, climY + climH);
    ctx.quadraticCurveTo(climX, climY + climH, climX, climY + climH - r);
    ctx.lineTo(climX, climY + r);
    ctx.quadraticCurveTo(climX, climY, climX + r, climY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = model.accent;
    ctx.fillRect(climX, climY, climW, climH * 0.18);

    ctx.strokeStyle = "#f3f4f6";
    ctx.lineWidth = 1.5 * scaleX;
    ctx.beginPath();
    ctx.moveTo(climX + climW * 0.1, climY + climH * 0.75);
    ctx.lineTo(climX + climW * 0.9, climY + climH * 0.75);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(climX + climW * 0.1, climY + climH * 0.82);
    ctx.lineTo(climX + climW * 0.9, climY + climH * 0.82);
    ctx.stroke();

    ctx.fillStyle = model.accent;
    ctx.beginPath();
    ctx.arc(climX + climW * 0.88, climY + climH * 0.4, 3 * scaleX, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = `bold ${11 * scaleX}px system-ui`;
    const label = `${model.name} — ${model.realWidth}×${model.realHeight} cm`;
    ctx.fillText(label, climX + 8 * scaleX, climY + climH + 18 * scaleY);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    setCaptured(dataUrl);
    setMode("captured");
  };

  const retake = () => { setCaptured(null); setMode("place"); };
  const confirm = () => { if (captured) onCapture(captured); };

  // File upload fallback
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setCaptured(reader.result);
    };
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
        <p className="text-sm text-gray-500 mb-6">Importez une photo de votre pièce à la place</p>
        <div className="flex flex-col gap-3 items-center">
          <label className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl cursor-pointer hover:bg-primary-hover transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Importer une photo
            <input type="file" accept="image/*" capture="environment" onChange={handleFileUpload} className="hidden" />
          </label>
          <button onClick={onSkip} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            Passer cette étape
          </button>
        </div>
        {captured && (
          <div className="mt-6">
            <img src={captured} alt="Photo importée" className="rounded-2xl max-h-64 mx-auto border border-gray-200" />
            <div className="mt-4 flex gap-3 justify-center">
              <button onClick={() => setCaptured(null)} className="px-5 py-2.5 text-sm font-medium text-gray-500 hover:text-dark transition-colors">Changer</button>
              <button onClick={() => onCapture(captured)} className="px-5 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-hover transition-colors">Utiliser cette photo</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Camera viewport */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] sm:aspect-video bg-black rounded-2xl overflow-hidden select-none touch-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Video feed */}
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" playsInline muted autoPlay />
        <canvas ref={canvasRef} className="hidden" />

        {/* Captured preview */}
        {captured && (
          <img src={captured} alt="Capture" className="absolute inset-0 w-full h-full object-cover z-10" />
        )}

        {/* CALIBRATION MODE */}
        {mode === "calibrate" && streaming && (
          <>
            {/* Calibration overlay */}
            <div className="absolute inset-0 z-20">
              {/* Crosshair / guide */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[70%] h-[50%] border-2 border-dashed border-white/30 rounded-xl" />
              </div>

              {/* Placed points */}
              {calibPoints.map((p, i) => (
                <div
                  key={i}
                  className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full bg-primary border-2 border-white shadow-lg z-30"
                  style={{ left: p.x, top: p.y }}
                >
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-white font-bold bg-black/60 px-1.5 py-0.5 rounded">
                    {i === 0 ? "Gauche" : "Droite"}
                  </span>
                </div>
              ))}

              {/* Line between points */}
              {calibPoints.length === 2 && (
                <svg className="absolute inset-0 w-full h-full z-25 pointer-events-none">
                  <line
                    x1={calibPoints[0].x} y1={calibPoints[0].y}
                    x2={calibPoints[1].x} y2={calibPoints[1].y}
                    stroke="#88a78b" strokeWidth="2" strokeDasharray="6 4"
                  />
                </svg>
              )}
            </div>

            {/* Instructions */}
            <div className="absolute top-3 left-3 right-3 z-30">
              <div className="bg-black/70 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    {calibPoints.length === 0 ? "1" : "2"}
                  </div>
                  <span>
                    {calibPoints.length === 0
                      ? "Posez une feuille A4 sur le mur, puis tapez le bord GAUCHE"
                      : "Maintenant, tapez le bord DROIT de la feuille A4"}
                  </span>
                </div>
                <div className="text-white/40 text-[10px] mt-1">
                  Cela permet de calibrer les dimensions réelles de la clim
                </div>
              </div>
            </div>

            {/* A4 reference illustration */}
            <div className="absolute bottom-3 left-3 right-3 z-30 flex justify-center">
              <div className="bg-black/70 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-3">
                <svg width="36" height="50" viewBox="0 0 36 50" fill="none">
                  <rect x="1" y="1" width="34" height="48" rx="2" stroke="white" strokeWidth="1.5" strokeDasharray="3 2" fill="white" fillOpacity="0.1" />
                  <text x="18" y="28" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">A4</text>
                </svg>
                <div className="text-white/70 text-[11px] leading-tight">
                  <div className="font-semibold text-white">Feuille A4 = 29.7 cm</div>
                  <div>Placez-la à plat sur le mur</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* PLACE MODE: clim overlay */}
        {mode === "place" && streaming && (
          <>
            <div
              className="absolute z-20 pointer-events-none"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                width: `${climPxWidth}px`,
                height: `${climPxHeight}px`,
              }}
            >
              {/* Shadow */}
              <div className="absolute -bottom-2 left-[10%] right-[10%] h-4 bg-black/10 rounded-full blur-md" />
              {/* Unit body */}
              <svg width="100%" height="100%" viewBox="0 0 220 60" preserveAspectRatio="none">
                <rect x="0" y="0" width="220" height="60" rx="6" fill={model.color} stroke="#d1d5db" strokeWidth="1.5" />
                <rect x="0" y="0" width="220" height="12" rx="6" fill={model.accent} />
                <rect x="0" y="8" width="220" height="4" fill={model.accent} />
                <circle cx="200" cy="28" r="2.5" fill={model.accent} opacity="0.8" />
                <line x1="16" y1="44" x2="204" y2="44" stroke="#f3f4f6" strokeWidth="1.5" />
                <line x1="16" y1="48" x2="204" y2="48" stroke="#f3f4f6" strokeWidth="1.5" />
                <path d="M10 55 Q110 62 210 55" stroke="#e5e7eb" strokeWidth="1" fill="none" />
              </svg>
              {/* Dimensions label */}
              <div className="absolute -bottom-7 left-0 right-0 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md">
                  {model.name}
                </span>
                <span className="text-[10px] text-white/70 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md">
                  {model.realWidth}×{model.realHeight} cm
                </span>
              </div>
            </div>

            {/* Instructions */}
            <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between">
              <div className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg">
                Déplacez la clim avec le doigt
              </div>
              {pxPerCm && (
                <div className="bg-primary/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Calibré
                </div>
              )}
            </div>
          </>
        )}

        {/* Loading */}
        {!streaming && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-white/60">Activation de la caméra...</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls below viewport */}
      {mode === "calibrate" && streaming && (
        <button onClick={skipCalibration} className="w-full py-2.5 text-sm text-gray-400 hover:text-gray-600 transition-colors">
          Passer le calibrage (proportions approximatives)
        </button>
      )}

      {mode === "place" && (
        <>
          {/* Model selector */}
          <div className="flex gap-2">
            {climModels.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedModel(m.id)}
                className={`flex-1 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border-2 ${
                  selectedModel === m.id
                    ? "border-primary bg-primary-light text-primary"
                    : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                }`}
              >
                <div>{m.name}</div>
                <div className="text-[10px] font-normal text-gray-400">{m.realWidth}×{m.realHeight} cm</div>
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button onClick={recalibrate} className="py-3 px-4 text-sm font-medium text-gray-500 hover:text-dark transition-colors">
              Recalibrer
            </button>
            <button onClick={onSkip} className="py-3 text-sm font-medium text-gray-400 hover:text-dark transition-colors">
              Passer
            </button>
            <button
              onClick={capture}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/25 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Prendre la photo
            </button>
          </div>
        </>
      )}

      {mode === "captured" && (
        <div className="flex gap-3">
          <button onClick={retake} className="flex-1 py-3 text-sm font-medium text-gray-500 hover:text-dark transition-colors">
            Reprendre
          </button>
          <button
            onClick={confirm}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/25 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Valider et continuer
          </button>
        </div>
      )}
    </div>
  );
}
