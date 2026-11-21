# Isometric Paper RPG (demo)

Small RPG slice: **4×4 pixel dirt board**, isometric Three.js camera, **warrior** vs **orc** as flat **pixel sprites** (no spheres or circular shadows on the ground).

## Layout

```text
O . . .     O = orc (0,0)
. . . .     W = warrior (3,3)
. . . .
. . . W
```

Ground is a **single plane** with a **128×128** pixel dirt texture (not 16 separate tiles).

## Run

```bash
cd demos/isometric-paper-rpg
npm install
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`).

## Controls

- **Space** or **click** — advance combat (alternating attacks along the diagonal)
- First fighter to 0 HP ends the round (refresh to reset)

## Stack

- Vite + TypeScript + Three.js
- Orthographic isometric camera
- Procedural 16×16 dirt tile texture (nearest-neighbor)