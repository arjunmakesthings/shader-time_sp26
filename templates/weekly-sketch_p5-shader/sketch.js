//untitled; arjun; month, 2026.

/*
ask: 

*/

/*
thought: 

*/

const margin = 50;

let my_shader;

function preload() {
  my_shader = loadShader("vert.vert", "frag.frag");
}

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800, WEBGL); //square to handle calculations better.

  noStroke();
}

function draw() {
  background(0);

  shader(my_shader); //set the shader.

  /* pass uniforms into the shader: */

  my_shader.setUniform("u_res", [width, height]); //we use this to translate the drawing onto the center later.

  beginShape();

  //a rectangle, but this could be any mesh.
  vertex(margin, margin);
  vertex(width - margin, margin);
  vertex(width - margin, height - margin);
  vertex(margin, height - margin);

  endShape();
}
