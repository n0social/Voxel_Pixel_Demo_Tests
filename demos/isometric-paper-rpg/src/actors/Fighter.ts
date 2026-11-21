import * as THREE from "three";

export type FighterSide = "warrior" | "orc";

export interface Fighter {
  side: FighterSide;
  mesh: THREE.Mesh;
  home: THREE.Vector3;
  hp: number;
  maxHp: number;
}

export function createSphereFighter(
  side: FighterSide,
  position: THREE.Vector3,
): Fighter {
  const radius = 0.35;
  const color = side === "warrior" ? 0x4a7fd4 : 0x4d8c45;
  const emissive = side === "warrior" ? 0x1a3050 : 0x1a3020;

  const geo = new THREE.SphereGeometry(radius, 16, 12);
  const mat = new THREE.MeshLambertMaterial({
    color,
    emissive,
    emissiveIntensity: 0.15,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(position);
  mesh.position.y = radius;
  mesh.castShadow = true;

  if (side === "warrior") {
    const sword = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.5, 0.04),
      new THREE.MeshLambertMaterial({ color: 0xc0c8d8 }),
    );
    sword.position.set(0.35, 0.1, 0);
    sword.rotation.z = -0.4;
    mesh.add(sword);
  } else {
    const club = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.1, 0.45, 6),
      new THREE.MeshLambertMaterial({ color: 0x5c3d24 }),
    );
    club.position.set(-0.3, 0.05, 0);
    club.rotation.z = 0.5;
    mesh.add(club);
  }

  const home = position.clone();
  home.y = radius;

  return {
    side,
    mesh,
    home,
    hp: 3,
    maxHp: 3,
  };
}