//untitled; arjun; month, 2026.

/*
ask: 

*/

/*
thought: 

*/

let main_shader;
let compute_shader;
let compute_shader_2;

let compute_buffer;

let buffer_2;

let m_coords = [-1000, -1000]; //set to offscreen.

let tog = false;

function preload() {
  main_shader = loadShader("vert.vert", "frag.frag");
  compute_shader = loadShader("vert.vert", "compute.frag");
  compute_shader_2 = loadShader("vert.vert", "compute.frag");
}

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800, WEBGL); //square to handle calculations better.
  pixelDensity(1);
  noStroke();

  compute_buffer = createGraphics(width, height, WEBGL); //a canvas that you never draw, but use to compute.

  buffer_2 = createGraphics(width, height, WEBGL); //second buffer to ping-pong to.
}

let init_x = 50;
let init_y = 50;

let target_x = 800 - 50;
let target_y = 800 - 50;

let buffers = [];

function draw() {
  // background(255);

  if (tog) {
    buffer_2.shader(compute_shader_2);
    compute_shader_2.setUniform("u_prev", compute_buffer);
    compute_shader_2.setUniform("u_mouse", m_coords);
    compute_shader_2.setUniform("u_res", [width, height]);
    buffer_2.rect(0, 0, width, height);
  } else {
    compute_buffer.shader(compute_shader);
    compute_shader.setUniform("u_prev", buffer_2);
    compute_shader.setUniform("u_mouse", m_coords);
    compute_shader.setUniform("u_res", [width, height]);
    compute_buffer.rect(0, 0, width, height);
  }

  let current = tog ? buffer_2 : compute_buffer;

  shader(main_shader);
  main_shader.setUniform("u_map", current);
  main_shader.setUniform("u_res", [width, height]);
  rect(0, 0, width, height);

  tog = !tog;

  //make it repeat over time.

  // if (frameCount % 300 === 0) {
  //   init_x = target_x;
  //   init_y = target_y;

  //   target_x = random(50, width - 50);
  //   target_y = random(50, height - 50);
  // }

  // let t = (frameCount % 300) / 300.0;
  // let x = lerp(init_x, target_x, t);
  // let y = lerp(init_y, target_y, t);

  // m_coords = [x, y];
}

function mousePressed() {
  m_coords = [mouseX, mouseY];
}
