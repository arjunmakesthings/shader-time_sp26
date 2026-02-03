/* eslint-disable no-undef, no-unused-vars */

/*
Create a dynamic shader effect on a live webcam image.

Use p5.js and WebGL.
Your effect can be coded in the vertex or fragment unit of your shader (or both).
Your effect should be animated, either using a value that changes every frame (like the elapsed time), or using user input, or both.
*/

let shader; 

let cam; 

function preload(){
  shader = loadShader ("vertex.vert", "frag.frag"); 
}

function setup(){
  cam = createCapture (VIDEO, {flipped: true}, make_canvas); 
  cam.hide(); 
}

function make_canvas() {
  createCanvas(cam.width, cam.height, WEBGL);
}

function draw(){
  image (cam, 0, 0); 
}


