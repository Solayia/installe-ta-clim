"use client";

import { useRef, useState, useCallback, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface RoomElement {
  id: string;
  type: "door" | "window" | "clim";
  wall: "top" | "right" | "bottom" | "left";
  /** Position along the wall as a fraction 0..1 */
  pos: number;
}

interface RoomPlannerProps {
  onCapture: (imageData: string) => void;
  onSkip: () => void;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CLIM_MODELS = [
  { id: "essentiel", name: "Essentiel", widthCm: 77, heightCm: 29 },
  { id: "confort", name: "Confort+", widthCm: 80, heightCm: 30 },
  { id: "premium", name: "Premium", widthCm: 89, heightCm: 32 },
];

const WALL_LABELS: Record<string, string> = {
  top: "Mur du haut",
  right: "Mur de droite",
  bottom: "Mur du bas",
  left: "Mur de gauche",
};

const OUTSIDE_OPTIONS = [
  { value: "exterieur", label: "Extérieur (jardin, rue, cour)" },
  { value: "balcon", label: "Balcon / Terrasse" },
  { value: "couloir", label: "Couloir / Hall" },
  { value: "piece", label: "Autre pièce" },
  { value: "voisin", label: "Mur mitoyen (voisin)" },
  { value: "combles", label: "Combles / Grenier" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function RoomPlanner({ onCapture, onSkip }: RoomPlannerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Room dimensions in meters */
  const [width, setWidth] = useState(4);
  const [length, setLength] = useState(5);

  /* Elements placed in the room */
  const [elements, setElements] = useState<RoomElement[]>([
    { id: "clim-1", type: "clim", wall: "top", pos: 0.5 },
  ]);

  /* Currently adding */
  const [addingType, setAddingType] = useState<"door" | "window" | null>(null);

  /* Selected clim model */
  const [selectedModel, setSelectedModel] = useState("confort");

  /* What's on the other side of the clim wall (for outdoor unit) */
  const [outsideWall, setOutsideWall] = useState("exterieur");

  /* Distance to electrical panel */
  const [distanceTableau, setDistanceTableau] = useState(5);

  /* Step: "edit" or "preview" */
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  /* ---------------------------------------------------------------- */
  /*  Drawing logic                                                    */
  /* ---------------------------------------------------------------- */

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    ctx.scale(dpr, dpr);

    /* Margins and room rectangle */
    const margin = 48;
    const maxRoomW = cssW - margin * 2;
    const maxRoomH = cssH - margin * 2;
    const scale = Math.min(maxRoomW / width, maxRoomH / length);
    const roomW = width * scale;
    const roomH = length * scale;
    const ox = (cssW - roomW) / 2;
    const oy = (cssH - roomH) / 2;

    /* Background */
    ctx.fillStyle = "#F5F9FE";
    ctx.fillRect(0, 0, cssW, cssH);

    /* Grid */
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= width; x++) {
      const px = ox + x * scale;
      ctx.beginPath(); ctx.moveTo(px, oy); ctx.lineTo(px, oy + roomH); ctx.stroke();
    }
    for (let y = 0; y <= length; y++) {
      const py = oy + y * scale;
      ctx.beginPath(); ctx.moveTo(ox, py); ctx.lineTo(ox + roomW, py); ctx.stroke();
    }

    /* Room fill */
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(ox, oy, roomW, roomH);

    /* Room walls */
    ctx.strokeStyle = "#1B5DA8";
    ctx.lineWidth = 3;
    ctx.strokeRect(ox, oy, roomW, roomH);

    /* Dimension labels */
    ctx.fillStyle = "#64748B";
    ctx.font = "bold 12px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(`${width.toFixed(1)} m`, ox + roomW / 2, oy - 12);
    ctx.save();
    ctx.translate(ox - 16, oy + roomH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${length.toFixed(1)} m`, 0, 0);
    ctx.restore();

    /* Draw elements */
    const model = CLIM_MODELS.find((m) => m.id === selectedModel)!;

    for (const el of elements) {
      const wallPos = el.pos;
      let x = 0, y = 0, elW = 0, elH = 0;

      /* Calculate position based on wall */
      if (el.wall === "top" || el.wall === "bottom") {
        elW = el.type === "clim" ? (model.widthCm / 100) * scale : (el.type === "door" ? 0.9 * scale : 1.2 * scale);
        elH = el.type === "clim" ? 14 : 8;
        x = ox + wallPos * roomW - elW / 2;
        y = el.wall === "top" ? oy - elH / 2 : oy + roomH - elH / 2;
      } else {
        elW = el.type === "clim" ? 14 : 8;
        elH = el.type === "clim" ? (model.widthCm / 100) * scale : (el.type === "door" ? 0.9 * scale : 1.2 * scale);
        x = el.wall === "left" ? ox - elW / 2 : ox + roomW - elW / 2;
        y = oy + wallPos * roomH - elH / 2;
      }

      if (el.type === "door") {
        /* Door: gap in wall + arc */
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(x, y, elW, elH);
        ctx.strokeStyle = "#94A3B8";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (el.wall === "top" || el.wall === "bottom") {
          const arcY = el.wall === "top" ? oy : oy + roomH;
          const dir = el.wall === "top" ? 1 : -1;
          ctx.arc(x, arcY, elW, 0, dir * Math.PI / 2, dir < 0);
        } else {
          const arcX = el.wall === "left" ? ox : ox + roomW;
          const dir = el.wall === "left" ? 1 : -1;
          ctx.arc(arcX, y, elH, -Math.PI / 2, dir < 0 ? Math.PI : 0, dir < 0);
        }
        ctx.stroke();

        /* Label */
        ctx.fillStyle = "#94A3B8";
        ctx.font = "10px system-ui";
        ctx.textAlign = "center";
        const lx = x + (el.wall === "top" || el.wall === "bottom" ? elW / 2 : elW / 2);
        const ly = el.wall === "top" ? y - 6 : el.wall === "bottom" ? y + elH + 14 : y + elH + 14;
        ctx.fillText("Porte", lx, ly);
      } else if (el.type === "window") {
        /* Window: double line */
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(x, y, elW, elH);
        ctx.strokeStyle = "#6BB8E0";
        ctx.lineWidth = 2;
        if (el.wall === "top" || el.wall === "bottom") {
          const midY = y + elH / 2;
          ctx.beginPath(); ctx.moveTo(x, midY - 2); ctx.lineTo(x + elW, midY - 2); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(x, midY + 2); ctx.lineTo(x + elW, midY + 2); ctx.stroke();
        } else {
          const midX = x + elW / 2;
          ctx.beginPath(); ctx.moveTo(midX - 2, y); ctx.lineTo(midX - 2, y + elH); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(midX + 2, y); ctx.lineTo(midX + 2, y + elH); ctx.stroke();
        }

        ctx.fillStyle = "#6BB8E0";
        ctx.font = "10px system-ui";
        ctx.textAlign = "center";
        const lx2 = x + (el.wall === "top" || el.wall === "bottom" ? elW / 2 : elW / 2);
        const ly2 = el.wall === "top" ? y - 6 : el.wall === "bottom" ? y + elH + 14 : y + elH + 14;
        ctx.fillText("Fenêtre", lx2, ly2);
      } else if (el.type === "clim") {
        /* Clim unit */
        const r = 4;
        ctx.fillStyle = "#E8F1FA";
        ctx.strokeStyle = "#1B5DA8";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + elW - r, y);
        ctx.quadraticCurveTo(x + elW, y, x + elW, y + r);
        ctx.lineTo(x + elW, y + elH - r);
        ctx.quadraticCurveTo(x + elW, y + elH, x + elW - r, y + elH);
        ctx.lineTo(x + r, y + elH);
        ctx.quadraticCurveTo(x, y + elH, x, y + elH - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        /* Accent bar */
        ctx.fillStyle = "#1B5DA8";
        if (el.wall === "top" || el.wall === "bottom") {
          ctx.fillRect(x, y, elW, 4);
        } else {
          ctx.fillRect(x, y, 4, elH);
        }

        /* LED dot */
        ctx.fillStyle = "#6BB8E0";
        ctx.beginPath();
        ctx.arc(x + elW - 8, y + 8, 2, 0, Math.PI * 2);
        ctx.fill();

        /* Label */
        ctx.fillStyle = "#1B5DA8";
        ctx.font = "bold 10px system-ui";
        ctx.textAlign = "center";
        const climLabel = model.name;
        if (el.wall === "top" || el.wall === "bottom") {
          const labelY = el.wall === "top" ? y + elH + 16 : y - 8;
          ctx.fillText(climLabel, x + elW / 2, labelY);
          ctx.font = "9px system-ui";
          ctx.fillStyle = "#94A3B8";
          ctx.fillText(`${model.widthCm}×${model.heightCm} cm`, x + elW / 2, labelY + 13);
        } else {
          const labelX = el.wall === "left" ? x + elW + 14 : x - 14;
          ctx.fillText(climLabel, labelX, y + elH / 2);
        }
      }
    }

    /* Outside wall indicator — show what's behind the clim wall */
    const climEl = elements.find((el) => el.type === "clim");
    if (climEl) {
      const outsideLabel = OUTSIDE_OPTIONS.find((o) => o.value === outsideWall)?.label || outsideWall;
      let arrowX = 0, arrowY = 0, textX = 0, textY = 0;
      const arrowLen = 20;

      ctx.strokeStyle = "#6BB8E0";
      ctx.fillStyle = "#6BB8E0";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.font = "10px system-ui";
      ctx.textAlign = "center";

      if (climEl.wall === "top") {
        arrowX = ox + climEl.pos * roomW; arrowY = oy - 8;
        ctx.beginPath(); ctx.moveTo(arrowX, arrowY); ctx.lineTo(arrowX, arrowY - arrowLen); ctx.stroke();
        textX = arrowX; textY = arrowY - arrowLen - 8;
      } else if (climEl.wall === "bottom") {
        arrowX = ox + climEl.pos * roomW; arrowY = oy + roomH + 8;
        ctx.beginPath(); ctx.moveTo(arrowX, arrowY); ctx.lineTo(arrowX, arrowY + arrowLen); ctx.stroke();
        textX = arrowX; textY = arrowY + arrowLen + 14;
      } else if (climEl.wall === "left") {
        arrowX = ox - 8; arrowY = oy + climEl.pos * roomH;
        ctx.beginPath(); ctx.moveTo(arrowX, arrowY); ctx.lineTo(arrowX - arrowLen, arrowY); ctx.stroke();
        textX = arrowX - arrowLen - 4; textY = arrowY - 8;
      } else {
        arrowX = ox + roomW + 8; arrowY = oy + climEl.pos * roomH;
        ctx.beginPath(); ctx.moveTo(arrowX, arrowY); ctx.lineTo(arrowX + arrowLen, arrowY); ctx.stroke();
        textX = arrowX + arrowLen + 4; textY = arrowY - 8;
      }
      ctx.setLineDash([]);

      /* Outside label with background */
      ctx.font = "bold 9px system-ui";
      const metrics = ctx.measureText(outsideLabel);
      const padX = 6, padY = 4;
      const bgW = metrics.width + padX * 2;
      const bgH = 16;
      ctx.fillStyle = "#EAF5FB";
      ctx.strokeStyle = "#6BB8E0";
      ctx.lineWidth = 1;
      const bgX = textX - bgW / 2;
      const bgY = textY - bgH + 2;
      ctx.beginPath();
      ctx.roundRect(bgX, bgY, bgW, bgH, 4);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#1B5DA8";
      ctx.textAlign = "center";
      ctx.fillText(outsideLabel, textX, textY - padY + 2);
    }

    /* Electrical panel distance indicator (bottom-right corner) */
    const panelIcon = "⚡";
    const panelText = `Tableau élec. : ${distanceTableau} m`;
    ctx.font = "bold 10px system-ui";
    const panelMetrics = ctx.measureText(panelText);
    const panelW = panelMetrics.width + 30;
    const panelH = 22;
    const panelX = cssW - panelW - 12;
    const panelY = cssH - panelH - 8;
    ctx.fillStyle = "#FEF9C3";
    ctx.strokeStyle = "#D97706";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(panelX, panelY, panelW, panelH, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#92400E";
    ctx.font = "10px system-ui";
    ctx.textAlign = "left";
    ctx.fillText(`${panelIcon} ${panelText}`, panelX + 6, panelY + 15);

  }, [width, length, elements, selectedModel, outsideWall, distanceTableau]);

  useEffect(() => {
    draw();
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  /* ---------------------------------------------------------------- */
  /*  Handlers                                                         */
  /* ---------------------------------------------------------------- */

  const addElement = (wall: "top" | "right" | "bottom" | "left") => {
    if (!addingType) return;
    const id = `${addingType}-${Date.now()}`;
    setElements((prev) => [...prev, { id, type: addingType, wall, pos: 0.3 + Math.random() * 0.4 }]);
    setAddingType(null);
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  const moveClim = (wall: "top" | "right" | "bottom" | "left") => {
    setElements((prev) =>
      prev.map((el) => (el.type === "clim" ? { ...el, wall, pos: 0.5 } : el))
    );
  };

  const capture = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    onCapture(dataUrl);
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="space-y-4">
      {/* Canvas */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ height: 320 }}
        />
      </div>

      {mode === "edit" && (
        <>
          {/* Room dimensions */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Largeur (m)</label>
              <div className="flex items-center gap-2">
                <button onClick={() => setWidth(Math.max(2, width - 0.5))} className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors">−</button>
                <span className="flex-1 text-center text-sm font-bold text-dark">{width.toFixed(1)} m</span>
                <button onClick={() => setWidth(Math.min(12, width + 0.5))} className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors">+</button>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Longueur (m)</label>
              <div className="flex items-center gap-2">
                <button onClick={() => setLength(Math.max(2, length - 0.5))} className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors">−</button>
                <span className="flex-1 text-center text-sm font-bold text-dark">{length.toFixed(1)} m</span>
                <button onClick={() => setLength(Math.min(12, length + 0.5))} className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors">+</button>
              </div>
            </div>
          </div>

          {/* Clim model selector */}
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Modèle de clim</label>
            <div className="flex gap-1.5">
              {CLIM_MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m.id)}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-all border ${
                    selectedModel === m.id
                      ? "border-primary bg-primary-light text-primary"
                      : "border-gray-200 bg-white text-gray-500"
                  }`}
                >
                  <div>{m.name}</div>
                  <div className="text-[10px] font-normal opacity-60">{m.widthCm}×{m.heightCm} cm</div>
                </button>
              ))}
            </div>
          </div>

          {/* Place clim on wall */}
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Placer la clim sur</label>
            <div className="grid grid-cols-4 gap-1.5">
              {(["top", "right", "bottom", "left"] as const).map((wall) => {
                const isActive = elements.find((el) => el.type === "clim")?.wall === wall;
                return (
                  <button
                    key={wall}
                    onClick={() => moveClim(wall)}
                    className={`py-2 rounded-lg text-xs font-semibold transition-all border ${
                      isActive
                        ? "border-primary bg-primary text-white"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {WALL_LABELS[wall]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* What's on the other side of the clim wall */}
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
              De l&apos;autre côté de ce mur, il y a...
              <span className="text-gray-400 font-normal ml-1">(pour l&apos;unité extérieure)</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {OUTSIDE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setOutsideWall(opt.value)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all border text-left ${
                    outsideWall === opt.value
                      ? "border-secondary bg-secondary-light text-primary"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {outsideWall === "voisin" && (
              <div className="mt-2 flex items-start gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span className="text-xs text-amber-700">Mur mitoyen : l&apos;unité extérieure devra être placée ailleurs. Notre installateur étudiera les alternatives.</span>
              </div>
            )}
          </div>

          {/* Distance to electrical panel */}
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
              Distance au tableau électrique
              <span className="text-gray-400 font-normal ml-1">(pour le raccordement)</span>
            </label>
            <div className="flex items-center gap-3">
              <button onClick={() => setDistanceTableau(Math.max(1, distanceTableau - 1))} className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors">−</button>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={distanceTableau}
                  onChange={(e) => setDistanceTableau(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
              <button onClick={() => setDistanceTableau(Math.min(30, distanceTableau + 1))} className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors">+</button>
              <span className="text-sm font-bold text-dark min-w-[50px] text-center">{distanceTableau} m</span>
            </div>
            {distanceTableau > 15 && (
              <div className="mt-2 flex items-start gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span className="text-xs text-amber-700">Distance importante : un câblage supplémentaire peut être nécessaire. Notre installateur vérifiera la faisabilité.</span>
              </div>
            )}
          </div>

          {/* Add doors / windows */}
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Ajouter des éléments</label>
            {addingType ? (
              <div className="space-y-2">
                <div className="text-xs text-primary font-medium text-center py-1">
                  Cliquez sur le mur pour placer {addingType === "door" ? "la porte" : "la fenêtre"} :
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {(["top", "right", "bottom", "left"] as const).map((wall) => (
                    <button
                      key={wall}
                      onClick={() => addElement(wall)}
                      className="py-2 rounded-lg text-xs font-semibold border border-dashed border-primary text-primary bg-primary-light hover:bg-primary hover:text-white transition-all"
                    >
                      {WALL_LABELS[wall]}
                    </button>
                  ))}
                </div>
                <button onClick={() => setAddingType(null)} className="w-full py-1.5 text-xs text-gray-400 hover:text-gray-600">
                  Annuler
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setAddingType("door")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2z"/><path d="M14 12h.01"/>
                  </svg>
                  + Porte
                </button>
                <button
                  onClick={() => setAddingType("window")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="2" y1="12" x2="22" y2="12"/>
                  </svg>
                  + Fenêtre
                </button>
              </div>
            )}
          </div>

          {/* List of placed elements (doors/windows only) */}
          {elements.filter((el) => el.type !== "clim").length > 0 && (
            <div className="space-y-1">
              {elements
                .filter((el) => el.type !== "clim")
                .map((el) => (
                  <div key={el.id} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg text-xs">
                    <span className="text-gray-600 font-medium">
                      {el.type === "door" ? "🚪 Porte" : "🪟 Fenêtre"} — {WALL_LABELS[el.wall]}
                    </span>
                    <button onClick={() => removeElement(el.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button onClick={onSkip} className="py-2.5 px-4 text-xs font-medium text-gray-400 hover:text-dark transition-colors">
              Passer
            </button>
            <button
              onClick={() => { setMode("preview"); setTimeout(capture, 100); }}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/25 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Valider mon plan
            </button>
          </div>
        </>
      )}

      {mode === "preview" && (
        <div className="flex gap-2">
          <button
            onClick={() => setMode("edit")}
            className="flex-1 py-2.5 text-xs font-medium text-gray-500 hover:text-dark transition-colors"
          >
            Modifier
          </button>
          <button
            onClick={capture}
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
