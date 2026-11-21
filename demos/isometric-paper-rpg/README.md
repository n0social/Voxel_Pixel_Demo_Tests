# Isometric Paper RPG (demo)

Small RPG slice: **4×4 pixel dirt board**, isometric Three.js camera, **warrior** (blue sphere) vs **orc** (green sphere) on opposite corners. Sphere placeholders stand in for future Paper Mario–style sprites.

## Layout

```text
W . . .     W = warrior (0,0)
. . . .     O = orc (3,3)
. . . .
. . . O
```

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