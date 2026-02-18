/* eslint-disable no-undef, no-unused-vars */

// three-js template by elie.

import * as THREE from "https://unpkg.com/three@0.154.0/build/three.module.js";

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

const vert_shader = await loadShader("./vert.vert");
const frag_shader = await loadShader("./frag.frag");

//--
const aspect = window.innerWidth / window.innerHeight;

//load geometry, material, mesh + add to scene.

const seg = 1000; 

const box_geo = new THREE.BoxGeometry(1, 1, 1, seg,seg,seg); //segments are set to 1,1,1.
//syntax: new BoxGeometry( width : number, height : number, depth : number, widthSegments : number, heightSegments : number, depthSegments : number )

const box_mat = new THREE.RawShaderMaterial({
  vertexShader: vert_shader,
  fragmentShader: frag_shader,

  //uniforms:
  uniforms: {
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_time: { value: 0.0 }, // initialize with 0.
  },
});
const box_mesh = new THREE.Mesh(box_geo, box_mat);
scene.add(box_mesh);

const clock = new THREE.Clock(); // tracks elapsed time

//animation loop:
const tick = () => {
  box_mat.uniforms.u_time.value = clock.getElapsedTime();
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
