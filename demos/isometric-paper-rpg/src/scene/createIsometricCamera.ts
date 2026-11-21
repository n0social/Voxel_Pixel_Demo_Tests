import * as THREE from "three";
import { gridCenter } from "../world/tileCoords";

const ISO_DISTANCE = 12;

export function createIsometricCamera(): THREE.OrthographicCamera {
  const aspect = window.innerWidth / window.innerHeight;
  const viewSize = 5;
  const camera = new THREE.OrthographicCamera(
    (-viewSize * aspect) / 2,
    (viewSize * aspect) / 2,
    viewSize / 2,
    -viewSize / 2,
    0.1,
    100,
  );

  const target = gridCenter();
  const yaw = Math.PI / 4;
  const pitch = Math.atan(1 / Math.sqrt(2));
  const offset = new THREE.Vector3(
    Math.cos(yaw) * Math.cos(pitch),
    Math.sin(pitch),
    Math.sin(yaw) * Math.cos(pitch),
  ).multiplyScalar(ISO_DISTANCE);

  camera.position.copy(target).add(offset);
  camera.lookAt(target);

  return camera;
}