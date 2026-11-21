import * as THREE from "three";

export function makePixelTexture(
  width: number,
  height: number,
  paint: (ctx: CanvasRenderingContext2D) => void,
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d context unavailable");
  paint(ctx);
  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/** One canvas = one continuous pixel field (1×1 px cells). */
export function paintDirtField(ctx: CanvasRenderingContext2D): void {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const base = "#6b4f2a";
  const dark = "#4a3520";
  const light = "#8a6840";
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const n = ((x * 7 + y * 13 + (x >> 2) * (y >> 2)) % 7) / 7;
      ctx.fillStyle = n > 0.72 ? light : n < 0.28 ? dark : base;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}