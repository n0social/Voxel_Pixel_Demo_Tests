import * as THREE from "three";
import { CORNER_ORC, CORNER_WARRIOR, cellToWorld } from "../world/tileCoords";
import { createSphereFighter, type Fighter } from "./Fighter";

export function spawnFighters(scene: THREE.Scene): {
  warrior: Fighter;
  orc: Fighter;
} {
  const warrior = createSphereFighter(
    "warrior",
    cellToWorld(CORNER_WARRIOR.x, CORNER_WARRIOR.z),
  );
  const orc = createSphereFighter(
    "orc",
    cellToWorld(CORNER_ORC.x, CORNER_ORC.z),
  );

  faceEachOther(warrior.mesh, orc.mesh);

  scene.add(warrior.mesh);
  scene.add(orc.mesh);

  return { warrior, orc };
}

function faceEachOther(a: THREE.Object3D, b: THREE.Object3D): void {
  const dir = new THREE.Vector3().subVectors(b.position, a.position);
  a.rotation.y = Math.atan2(dir.x, dir.z);
  b.rotation.y = a.rotation.y;
  b.rotateY(Math.PI);
}