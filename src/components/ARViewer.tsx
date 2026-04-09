"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const climModels = [
  { id: "essentiel", name: "Essentiel", width: 160, height: 52, realLabel: "77×29 cm", color: "#e5e7eb", accent: "#88a78b" },
  { id: "confort", name: "Confort+", width: 190, height: 56, realLabel: "80×30 cm", color: "#e8efe9", accent: "#88a78b" },
  { id: "premium", name: "Premium", width: 220, height: 60, realLabel: "89×32 cm", color: "#ffffff", accent: "#88a78b" },
];

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
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [initialized, setInitialized] = useState(false);

  const model = climModels.find((m) => m.id === selectedModel)!;

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

  useEffect(() => {
    if (streaming && containerRef.current && !initialized) {
      const rect = containerRef.current.getBoundingClientRect();
      setPos({ x: rect.width / 2 - model.width / 2, y: rect.height * 0.25 });
      setInitialized(true);
    }
  }, [streaming, initialized, model.width]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (captured) return;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      dragOffset.current = { x: touch.clientX - pos.x, y: touch.clientY - pos.y };
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (captured || !isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    setPos({ x: touch.clientX - dragOffset.current.x, y: touch.clientY - dragOffset.current.y });
  };

  const handleTouchEnd = () => { setIsDragging(false); };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (captured) return;
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (captured || !isDragging) return;
    setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
  };

  const handleMouseUp = () => setIsDragging(false);

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

    const climW = model.width * scaleX;
    const climH = model.height * scaleY;
    const climX = pos.x * scaleX;
    const climY = pos.y * scaleY;

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
    ctx.beginPath(); ctx.moveTo(climX + climW * 0.1, climY + climH * 0.75); ctx.lineTo(climX + climW * 0.9, climY + climH * 0.75); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(climX + climW * 0.1, climY + climH * 0.82); ctx.lineTo(climX + climW * 0.9, climY + climH * 0.82); ctx.stroke();
    ctx.fillStyle = model.accent;
    ctx.beginPath(); ctx.arc(climX + climW * 0.88, climY + climH * 0.4, 3 * scaleX, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = `bold ${11 * scaleX}px system-ui`;
    ctx.fillText(`${model.name} — ${model.realLabel}`, climX + 8 * scaleX, climY + climH + 18 * scaleY);

    setCaptured(canvas.toDataURL("image/jpeg", 0.85));
  };

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
        <p className="text-sm text-gray-500 mb-6">Importez une photo de votre pièce à la place</p>
        <label className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl cursor-pointer hover:bg-primary-hover transition-colors">
          Importer une photo
          <input type="file" accept="image/*" capture="environment" onChange={handleFileUpload} className="hidden" />
        </label>
        <div className="mt-3">
          <button onClick={onSkip} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Passer cette étape</button>
        </div>
        {captured && (
          <div className="mt-6">
            <img src={captured} alt="Photo" className="rounded-2xl max-h-64 mx-auto border border-gray-200" />
            <div className="mt-4 flex gap-3 justify-center">
              <button onClick={() => setCaptured(null)} className="px-5 py-2.5 text-sm font-medium text-gray-500">Changer</button>
              <button onClick={() => onCapture(captured)} className="px-5 py-2.5 bg-primary text-white font-bold text-sm rounded-xl">Utiliser cette photo</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" playsInline muted autoPlay />
        <canvas ref={canvasRef} className="hidden" />

        {captured && <img src={captured} alt="Capture" className="absolute inset-0 w-full h-full object-cover z-10" />}

        {streaming && !captured && (
          <>
            <div
              className="absolute z-20 pointer-events-none"
              style={{ left: `${pos.x}px`, top: `${pos.y}px`, width: `${model.width}px`, height: `${model.height}px` }}
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
              <div className="absolute -bottom-7 left-0 right-0 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md">{model.name}</span>
                <span className="text-[10px] text-white/70 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md">{model.realLabel}</span>
              </div>
            </div>
            <div className="absolute top-3 left-3 z-30">
              <div className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg">
                Déplacez la clim avec le doigt
              </div>
            </div>
          </>
        )}

        {!streaming && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>

      {!captured && (
        <div className="flex gap-2">
          {climModels.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedModel(m.id)}
              className={`flex-1 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border-2 ${
                selectedModel === m.id ? "border-primary bg-primary-light text-primary" : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
              }`}
            >
              <div>{m.name}</div>
              <div className="text-[10px] font-normal text-gray-400">{m.realLabel}</div>
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-3">
        {!captured ? (
          <>
            <button onClick={onSkip} className="flex-1 py-3 text-sm font-medium text-gray-500 hover:text-dark transition-colors">Passer</button>
            <button
              onClick={capture}
              disabled={!streaming}
              className={`flex-1 flex items-center justify-center gap-2 py-3 font-bold text-sm rounded-xl transition-all ${streaming ? "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/25" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" />
              </svg>
              Prendre la photo
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setCaptured(null)} className="flex-1 py-3 text-sm font-medium text-gray-500 hover:text-dark transition-colors">Reprendre</button>
            <button
              onClick={() => captured && onCapture(captured)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/25 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Valider et continuer
            </button>
          </>
        )}
      </div>
    </div>
  );
}
