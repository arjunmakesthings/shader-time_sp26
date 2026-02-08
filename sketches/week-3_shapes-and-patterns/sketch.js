//impossible origami; arjun; february, 2026.

/*
ask: 

*/

/*
thought: 
we're going to draw symmetrical rectangles.
*/

const margin = 50;

let my_shader;

let num = 20;

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

  blendMode(LIGHTEST); 
}

function calc_posis() {
  for (let i = 0; i < num; i++) {
    //decide whether you have a horizontal twin or a vertical twin.

    let p = 0.2;

    let x = Math.floor(random(margin, width/2 - margin));
    let y = Math.floor(random(margin, height/2 - margin));

    let w = x*2;
    let h = y*2;

    if (p < 0.5) {
      //flip the x.
      let x1 = x;
      let y1 = y;

      let x2 = w;
      let y2 = y1;

      let x3 = x2;
      let y3 = h;

      let x4 = x1;
      let y4 = y3;

      posis.push({ x1: x1, y1: y1, x2: x2, y2: y2, x3: x3, y3: y3, x4: x4, y4: y4 });
    } else {
      // posis.push(x, y, x, - y);
    }
  }
}

function draw() {
  background(0);

  shader(my_shader); //set the shader.

  /* pass uniforms into the shader: */
  my_shader.setUniform("u_res", [width, height]); //we use this to translate the drawing onto the center later.

  t += millis()/1000;

  my_shader.setUniform("u_time", t);

  // fill(255);
  // noFill(); 

  // stroke (255); 
  // strokeWeight (1); 

  beginShape(TRIANGLE_STRIP);
  for (let i = 0; i < posis.length; i++) {
    vertex(posis[i].x1, posis[i].y1);
    vertex(posis[i].x2, posis[i].y2);
    vertex(posis[i].x3, posis[i].y3);
    vertex(posis[i].x4, posis[i].y4);
  }
  endShape();
}
