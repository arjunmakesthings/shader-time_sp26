/* eslint-disable no-undef, no-unused-vars */

//solar system. i don't really want to build this, so i will do just enough to understand how three-js works.

import * as THREE from "https://unpkg.com/three@0.154.0/build/three.module.js";

// Create renderer.
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create scene.
const scene = new THREE.Scene();
scene.background = new THREE.Color(0);

// Create camera.
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight);
camera.position.z = 3;
scene.add(camera);

//--

//helpers:
//from mozilla-mdn.
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

//variables:
const num = getRandomInt(8, 20);

//constants for all:
const everything = new THREE.Group();
scene.add(everything);

//sun:
const sun_geo = new THREE.SphereGeometry(0.5); //render sphere with radius r; default details.
const sun_col = 0xffcc00;
const sun_material = new THREE.MeshBasicMaterial({ color: sun_col });
const sun = new THREE.Mesh(sun_geo, sun_material);
everything.add(sun);

//planets:
const planets = [];

let orbit_radius = 0.9; //more than sun's mass for the first planet.

for (let i = 0; i < num; i++) {
  const mass = Math.random() * 0.15 + 0.05;
  const geo = new THREE.SphereGeometry(mass, 16, 16);
  const mat = new THREE.MeshBasicMaterial({
    color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
  });

  const planet = new THREE.Mesh(geo, mat);

  const angle = Math.random() * Math.PI * 2;

  const position = new THREE.Vector3(Math.cos(angle) * orbit_radius, Math.sin(angle) * orbit_radius, 0); //around an orbit circle, which increases at the end of this loop.

  planet.position.set(position);
  const tilt = Math.random() * Math.PI * 2;
  planets.push({
    mesh: planet,
    orbit_radius: orbit_radius,
    angle: Math.random() * Math.PI * 2,
    speed: Math.random()*0.002,
    tilt: tilt,
  });

  //everything is in one group.
  everything.add(planet);

  orbit_radius += mass + 0.2;
}

// Animation loop.
const tick = () => {
  renderer.render(scene, camera);

  //rotate the sun around itself.
  sun.rotation.y += 0.001;

  for (let p of planets) {
    p.angle += p.speed; //increment angle by speed. 

    //move across orbit.
    p.mesh.position.x = Math.cos(p.angle) * p.orbit_radius;
    p.mesh.position.y = Math.sin(p.angle) * p.orbit_radius * Math.cos(p.tilt);
    p.mesh.position.z = Math.sin(p.angle) * p.orbit_radius * Math.sin(p.tilt);

    //spin planet upon itself.
    p.mesh.rotation.y += p.speed;
  }

  //rotate everything too: 
  // everything.rotation.x += 0.01;
  // everything.rotation.y += 0.01;
  // everything.rotation.z += 0.01;

  camera.lookAt(0, 0, 0); // always look at the sun

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
