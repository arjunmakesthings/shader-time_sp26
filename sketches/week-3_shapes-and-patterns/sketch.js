//untitled; arjun; month, 2026.

/*
ask: 

*/

/*
thought: 
we're going to draw symmetrical rectangles.
*/

const margin = 50;

let my_shader;

let num = 2;

let posis = [];

let t = 0;

function preload() {
  my_shader = loadShader("vert.vert", "frag.frag");
}

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800, WEBGL); //square to handle calculations better.

  //calculate positions:
  calc_posis();

  noStroke();

  blendMode(BURN);
}

function calc_posis() {
  for (let i = 0; i < num; i++) {
    //decide whether you have a horizontal twin or a vertical twin.

    let p = random();

    let x = Math.floor(random(margin, width - margin));
    let y = Math.floor(random(margin, height - margin));

    if (p < 0.5) {
      posis.push(x, y, - x, y);
    } else {
      posis.push(x, y, x, - y);
    }
  }
}

function draw() {
  background(0);

  shader(my_shader); //set the shader.

  /* pass uniforms into the shader: */
  my_shader.setUniform("u_res", [width, height]); //we use this to translate the drawing onto the center later.

  t += millis();

  my_shader.setUniform("u_time", t);

  for (let i = 0; i < posis.length; i += 4) {
    rect(posis[i], posis[i + 1], posis[i + 2], posis[i +3] ,1);
  }
}
