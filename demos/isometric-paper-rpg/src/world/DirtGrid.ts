import * as THREE from "three";
import { GRID_SIZE } from "./tileCoords";
import {
  makePixelTexture,
  paintDirtField,
  repaintDirtTexture,
} from "../textures/pixelTexture";

const PIXELS_PER_UNIT = 32;

export type DirtGridHandle = {
  group: THREE.Group;
  reroll: () => void;
};

export function createDirtGrid(): DirtGridHandle {
  const group = new THREE.Group();
  const px = GRID_SIZE * PIXELS_PER_UNIT;
  const dirtTex = makePixelTexture(px, px, paintDirtField);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(GRID_SIZE, GRID_SIZE),
    new THREE.MeshBasicMaterial({ map: dirtTex }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(GRID_SIZE / 2, 0, GRID_SIZE / 2);
  group.add(ground);

  const border = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(GRID_SIZE, 0.02, GRID_SIZE)),
    new THREE.LineBasicMaterial({ color: 0x2a1f12 }),
  );
  border.position.set(GRID_SIZE / 2, 0.01, GRID_SIZE / 2);
  group.add(border);

  return {
    group,
    reroll: () => repaintDirtTexture(dirtTex),
  };
}