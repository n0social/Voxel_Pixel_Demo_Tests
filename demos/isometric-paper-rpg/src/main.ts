import * as THREE from "three";
import { createRenderer, bindResize } from "./scene/createRenderer";
import { createIsometricCamera } from "./scene/createIsometricCamera";
import { createDirtGrid } from "./world/DirtGrid";
import { spawnFighters } from "./actors/spawnFighters";
import { CombatController } from "./combat/combat";

const container = document.getElementById("app");
if (!container) throw new Error("#app missing");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87b8de);

const camera = createIsometricCamera();
const renderer = createRenderer(container);
bindResize(container, camera, renderer);

const ambient = new THREE.AmbientLight(0xffffff, 0.55);
scene.add(ambient);

const sun = new THREE.DirectionalLight(0xfff4e0, 0.9);
sun.position.set(6, 10, 4);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.left = -6;
sun.shadow.camera.right = 6;
sun.shadow.camera.top = 6;
sun.shadow.camera.bottom = -6;
scene.add(sun);

scene.add(createDirtGrid());
const { warrior, orc } = spawnFighters(scene);
const combat = new CombatController(warrior, orc);

const onAttack = () => combat.tryAttack();
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    onAttack();
  }
});
renderer.domElement.addEventListener("click", onAttack);

const clock = new THREE.Clock();
function loop() {
  const dt = clock.getDelta();
  combat.update(dt);
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}
loop();