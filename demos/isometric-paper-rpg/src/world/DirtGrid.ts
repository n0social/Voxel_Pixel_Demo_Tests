import * as THREE from "three";
import { GRID_SIZE } from "./tileCoords";
import { makePixelTexture, paintDirtTile } from "../textures/pixelTexture";

export function createDirtGrid(): THREE.Group {
  const group = new THREE.Group();
  const dirtTex = makePixelTexture(16, 16, paintDirtTile);

  for (let z = 0; z < GRID_SIZE; z++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const geo = new THREE.PlaneGeometry(1, 1);
      const mat = new THREE.MeshLambertMaterial({ map: dirtTex });
      const tile = new THREE.Mesh(geo, mat);
      tile.rotation.x = -Math.PI / 2;
      tile.position.set(x + 0.5, 0, z + 0.5);
      tile.receiveShadow = true;
      group.add(tile);
    }
  }

  const border = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(GRID_SIZE, 0.02, GRID_SIZE)),
    new THREE.LineBasicMaterial({ color: 0x2a1f12 }),
  );
  border.position.set(GRID_SIZE / 2, 0.01, GRID_SIZE / 2);
  group.add(border);

  return group;
}