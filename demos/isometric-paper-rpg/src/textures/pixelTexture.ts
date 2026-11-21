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
  ctx.imageSmoothingEnabled = false;
  paint(ctx);
  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/** Macro pixel size on the ground canvas (sharp squares, not pointillism). */
const GROUND_PIXEL = 2;

const DIRT_COLORS = ["#6b4f2a", "#4a3520", "#8a6840"] as const;

export function paintDirtField(ctx: CanvasRenderingContext2D): void {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  for (let y = 0; y < h; y += GROUND_PIXEL) {
    for (let x = 0; x < w; x += GROUND_PIXEL) {
      const i = Math.floor(Math.random() * DIRT_COLORS.length);
      ctx.fillStyle = DIRT_COLORS[i]!;
      ctx.fillRect(x, y, GROUND_PIXEL, GROUND_PIXEL);
    }
  }
}

type Pixel = { x: number; y: number; c: string };

function stampPixels(
  ctx: CanvasRenderingContext2D,
  pixels: Pixel[],
  block: number,
): void {
  for (const { x, y, c } of pixels) {
    ctx.fillStyle = c;
    ctx.fillRect(x * block, y * block, block, block);
  }
}

export function makeWarriorSpriteTexture(): THREE.CanvasTexture {
  return makePixelTexture(16, 20, (ctx) => {
    const b = 1;
    ctx.fillStyle = "#00000000";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const pixels: Pixel[] = [
      { x: 6, y: 2, c: "#e8c4a0" },
      { x: 7, y: 2, c: "#e8c4a0" },
      { x: 8, y: 2, c: "#e8c4a0" },
      { x: 6, y: 3, c: "#3a3a48" },
      { x: 9, y: 3, c: "#3a3a48" },
      { x: 7, y: 3, c: "#e8c4a0" },
      { x: 8, y: 3, c: "#e8c4a0" },
      { x: 5, y: 5, c: "#4a7fd4" },
      { x: 6, y: 5, c: "#4a7fd4" },
      { x: 7, y: 5, c: "#5a9cff" },
      { x: 8, y: 5, c: "#4a7fd4" },
      { x: 9, y: 5, c: "#4a7fd4" },
      { x: 5, y: 6, c: "#3a6ab8" },
      { x: 9, y: 6, c: "#3a6ab8" },
      { x: 6, y: 7, c: "#3a6ab8" },
      { x: 8, y: 7, c: "#3a6ab8" },
      { x: 7, y: 8, c: "#2a5088" },
      { x: 5, y: 9, c: "#2a5088" },
      { x: 9, y: 9, c: "#2a5088" },
      { x: 10, y: 6, c: "#c0c8d8" },
      { x: 11, y: 5, c: "#c0c8d8" },
      { x: 11, y: 6, c: "#a0a8b8" },
      { x: 11, y: 7, c: "#a0a8b8" },
    ];
    stampPixels(ctx, pixels, b);
  });
}

export function makeOrcSpriteTexture(): THREE.CanvasTexture {
  return makePixelTexture(16, 20, (ctx) => {
    const b = 1;
    const pixels: Pixel[] = [
      { x: 6, y: 2, c: "#6a9a55" },
      { x: 7, y: 2, c: "#6a9a55" },
      { x: 8, y: 2, c: "#6a9a55" },
      { x: 5, y: 3, c: "#ffe0a0" },
      { x: 9, y: 3, c: "#ffe0a0" },
      { x: 7, y: 3, c: "#4d8c45" },
      { x: 8, y: 3, c: "#4d8c45" },
      { x: 4, y: 5, c: "#3d6c35" },
      { x: 5, y: 5, c: "#4d8c45" },
      { x: 6, y: 5, c: "#5aa850" },
      { x: 7, y: 5, c: "#4d8c45" },
      { x: 8, y: 5, c: "#4d8c45" },
      { x: 9, y: 5, c: "#3d6c35" },
      { x: 4, y: 6, c: "#2d4c28" },
      { x: 9, y: 6, c: "#2d4c28" },
      { x: 5, y: 9, c: "#2d4c28" },
      { x: 8, y: 9, c: "#2d4c28" },
      { x: 3, y: 6, c: "#5c3d24" },
      { x: 3, y: 7, c: "#5c3d24" },
      { x: 3, y: 8, c: "#4a3020" },
    ];
    stampPixels(ctx, pixels, b);
  });
}