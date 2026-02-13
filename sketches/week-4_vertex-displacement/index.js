/* eslint-disable no-undef, no-unused-vars */

// three-js template by elie.

import * as THREE from "https://unpkg.com/three@0.154.0/build/three.module.js";

// Create renderer.
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create scene.
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x292f33);

// Create camera.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.z = 3;
scene.add(camera);

async function loadShader(url) {
  const res = await fetch(url);
  return await res.text();
}

const vert_shader = await loadShader("./vert.vert");
const frag_shader = await loadShader("./frag.frag");

//--
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const boxMat = new THREE.RawShaderMaterial({
  vertexShader: vert_shader,
  fragmentShader: frag_shader
});
const boxMesh = new THREE.Mesh(boxGeo, boxMat);
scene.add(boxMesh);

// Animation loop.
const tick = () => {
  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};
tick();

// Window resize listener.
window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
