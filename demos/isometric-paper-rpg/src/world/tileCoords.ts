import * as THREE from "three";

export const GRID_SIZE = 4;

export const CORNER_WARRIOR = { x: 3, z: 3 } as const;
export const CORNER_ORC = { x: 0, z: 0 } as const;

/** Cell center in world XZ (Y is up). */
export function cellToWorld(x: number, z: number): THREE.Vector3 {
  return new THREE.Vector3(x + 0.5, 0, z + 0.5);
}

export function gridCenter(): THREE.Vector3 {
  const half = GRID_SIZE / 2;
  return new THREE.Vector3(half, 0, half);
}