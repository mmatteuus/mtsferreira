import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  onSave: (dataUrl: string) => void;
  onCancel?: () => void;
  height?: number;
};

export default function SignaturePad({ onSave, onCancel, height = 180 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const rect = containerRef.current!.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#111827"; // foreground-ish
  }, [height]);

  const getPos = (e: PointerEvent | React.PointerEvent): { x: number; y: number } => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left), y: (e.clientY - rect.top) };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    drawing.current = true;
    last.current = getPos(e);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const pos = getPos(e);
    if (last.current) {
      ctx.beginPath();
      ctx.moveTo(last.current.x, last.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
    last.current = pos;
    setDirty(true);
  };
  const onPointerUp = () => {
    drawing.current = false;
    last.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDirty(false);
  };

  const save = () => {
    const data = canvasRef.current!.toDataURL("image/png");
    onSave(data);
  };

  return (
    <div className="space-y-2">
      <div ref={containerRef} className="w-full border rounded-md overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        />
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={save} disabled={!dirty}>Salvar assinatura</Button>
        <Button size="sm" variant="secondary" onClick={clear}>Limpar</Button>
        {onCancel && <Button size="sm" variant="outline" onClick={onCancel}>Cancelar</Button>}
      </div>
    </div>
  );
}

