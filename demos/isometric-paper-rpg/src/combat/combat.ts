import * as THREE from "three";
import type { Fighter } from "../actors/Fighter";

export type CombatState =
  | { kind: "idle" }
  | { kind: "attacking"; attacker: Fighter; target: Fighter; t: number }
  | { kind: "ended"; winner: Fighter["side"] };

const ATTACK_DURATION = 0.35;
const LUNGE = 0.55;

export class CombatController {
  state: CombatState = { kind: "idle" };
  private turn: Fighter["side"] = "warrior";

  constructor(
    private warrior: Fighter,
    private orc: Fighter,
  ) {}

  tryAttack(): void {
    if (this.state.kind !== "idle") return;
    if (this.warrior.hp <= 0 || this.orc.hp <= 0) return;

    const attacker = this.turn === "warrior" ? this.warrior : this.orc;
    const target = this.turn === "warrior" ? this.orc : this.warrior;
    this.state = { kind: "attacking", attacker, target, t: 0 };
  }

  update(dt: number): void {
    if (this.state.kind !== "attacking") return;

    const { attacker, target } = this.state;
    this.state.t += dt;
    const t = this.state.t;
    const phase = Math.min(t / ATTACK_DURATION, 1);

    const dir = new THREE.Vector3()
      .subVectors(target.home, attacker.home)
      .normalize();
    const lunge = Math.sin(phase * Math.PI) * LUNGE;
    attacker.mesh.position.copy(attacker.home).addScaledVector(dir, lunge);

    if (t >= ATTACK_DURATION) {
      attacker.mesh.position.copy(attacker.home);
      target.hp -= 1;
      flashHurt(target.mesh);

      if (target.hp <= 0) {
        this.state = { kind: "ended", winner: attacker.side };
      } else {
        this.state = { kind: "idle" };
        this.turn = this.turn === "warrior" ? "orc" : "warrior";
      }
    }
  }
}

function flashHurt(mesh: THREE.Mesh): void {
  const mat = mesh.material;
  if (!(mat instanceof THREE.MeshLambertMaterial)) return;
  const original = mat.emissive.getHex();
  mat.emissive.setHex(0x662222);
  mat.emissiveIntensity = 0.6;
  setTimeout(() => {
    mat.emissive.setHex(original);
    mat.emissiveIntensity = 0.15;
  }, 120);
}