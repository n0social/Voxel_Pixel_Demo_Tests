import * as THREE from "three";
import {
  makeOrcSpriteTexture,
  makeWarriorSpriteTexture,
} from "../textures/pixelTexture";

export type FighterSide = "warrior" | "orc";

export interface Fighter {
  side: FighterSide;
  mesh: THREE.Mesh;
  home: THREE.Vector3;
  hp: number;
  maxHp: number;
}

const SPRITE_W = 0.55;
const SPRITE_H = (20 / 16) * SPRITE_W;

export function createSphereFighter(
  side: FighterSide,
  position: THREE.Vector3,
): Fighter {
  const tex =
    side === "warrior" ? makeWarriorSpriteTexture() : makeOrcSpriteTexture();
  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    alphaTest: 0.1,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(SPRITE_W, SPRITE_H), mat);
  mesh.position.copy(position);
  mesh.position.y = SPRITE_H / 2;

  const home = position.clone();
  home.y = SPRITE_H / 2;

  return {
    side,
    mesh,
    home,
    hp: 3,
    maxHp: 3,
  };
}