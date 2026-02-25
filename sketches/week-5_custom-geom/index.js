/* eslint-disable no-undef, no-unused-vars */

// three-js template by elie.

import * as THREE from "https://unpkg.com/three@0.154.0/build/three.module.js";
//this could just be three.js file.

import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.18.1/dist/lil-gui.esm.min.js";

// Create renderer.
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create scene.
const scene = new THREE.Scene();
scene.background = new THREE.Color(255, 255, 255); //rendered as rgb.

// Create camera.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.z = 3;
scene.add(camera);

// load shaders, but as text files. the browser automatically converts them to javascript modules.
async function loadShader(url) {
  const res = await fetch(url);
  return await res.text();
}

//--
const aspect = window.innerWidth / window.innerHeight;

//load geometry, material, mesh + add to scene.
// Generate positions.
const positions = [];
positions.push(-2.0, -2.0, 0.0); // bottom-left
positions.push(2.0, -2.0, 0.0); // bottom-right
positions.push(-2.0, 2.0, 0.0); // top-left
positions.push(2.0, 2.0, 0.0); // top-right

// Generate UVs.
const uvs = [];
uvs.push(0.0, 1.0); // bottom-left
uvs.push(1.0, 1.0); // bottom-right
uvs.push(0.0, 0.0); // top-left
uvs.push(1.0, 0.0); // top-right

// Generate indices.
const indices = [];
indices.push(0, 1, 2);
indices.push(1, 3, 2);

// Create geometry.
const planeGeo = new THREE.BufferGeometry();
planeGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
planeGeo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
planeGeo.setIndex(indices);

console.log(uvs); 

// Create material.
const frag_shader = await loadShader("./frag.frag");

const vert_shader = await loadShader("./vert.vert");
const planeMat = new THREE.RawShaderMaterial({
  vertexShader: vert_shader,
  fragmentShader: frag_shader,
  uniforms: {
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_time: { value: 0.0 },
  },
});

// Create and add mesh to scene.
const planeMesh = new THREE.Mesh(planeGeo, planeMat);
scene.add(planeMesh);

const clock = new THREE.Clock(); // tracks elapsed time

//animation loop:
const tick = () => {
  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};
tick();

//for resizing:
window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);

  // // Update geometry on resize
  // const newAspect = w / h;
  // rectGeo.dispose();
  // boxMesh.geometry = new THREE.PlaneGeometry(2 * newAspect, 2);

  // boxMat.uniforms.u_resolution.value.set(w, h);
});
