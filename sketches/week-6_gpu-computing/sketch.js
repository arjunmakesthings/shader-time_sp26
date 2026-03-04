//untitled; arjun; month, 2026.

/*
ask: 

*/

/*
thought: 

*/

let main_shader;
let compute_shader;

let compute_buffer;

let m_coords = [-1000, -1000]; //set to offscreen.

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
  background(255);

  //compute shader:
  compute_buffer.shader(compute_shader);
  compute_shader.setUniform("u_prev", compute_buffer);
  compute_shader.setUniform("u_mouse", m_coords);
  compute_shader.setUniform("u_res", [width, height]);
  compute_buffer.rect(0, 0, width, height);

  //main shader.
  shader(main_shader);

  //uniforms for the main buffer:
  main_shader.setUniform("u_map", compute_buffer);
  main_shader.setUniform("u_res", [width, height]);
  rect(0, 0, width, height);

  // if (frameCount %30==0){
  //   m_coords = [random(200,width-200), random(200, height-200)]; 
  // }

    let t = frameCount / 300.0; // normalized time
    let x = lerp(200, width - 200, t % 1.0);
    let y = lerp(200, height - 200, t % 1.0);
    m_coords = [x, y];
}
