//untitled; arjun; month, 2026.

/*
ask: 

*/

/*
thought: 

*/

const margin = 50;

let main_shader; 
let compute_shader; 

let compute_buffer; 

function preload() {
  main_shader = loadShader("vert.vert", "frag.frag");
  compute_shader = loadShader("vert.vert", "compute.frag");
}

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800, WEBGL); //square to handle calculations better.
  pixelDensity(1); 
  noStroke();

  compute_buffer = createGraphics(width, height, WEBGL); //a canvas that you never draw, but use to compute.
}

function draw() {
  background(0);

  //compute shader:
  compute_buffer.shader(compute_shader);
  compute_buffer.rect(0, 0, width, height);

  //main shader.
  shader(main_shader);

  //uniforms for the main buffer:
  main_shader.setUniform("u_map", compute_buffer); // Pass buffer as sampler2D
  main_shader.setUniform("u_res", [width, height]);

  rect(0, 0, width, height);
}
