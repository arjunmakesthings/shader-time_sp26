/* eslint-disable no-undef, no-unused-vars */

/*
ask: 
Create a dynamic shader effect on a live webcam image.

Use p5.js and WebGL.
Your effect can be coded in the vertex or fragment unit of your shader (or both).
Your effect should be animated, either using a value that changes every frame (like the elapsed time), or using user input, or both.

thought: 
to use random walkers. 
*/

const margin = 50;
let num = 99;
let walkers = [];

let my_shader;

let cam;

function preload() {
  my_shader = loadShader("vert.vert", "frag.frag");
}

function setup() {
  createCanvas(640, 480, WEBGL);
  cam = createCapture(VIDEO, { flipped: true });
  cam.hide();

  for (let i = 0; i < num; i++) {
    walkers.push(new Walker(random(margin, width - margin), random(margin, height - margin)));
  }

  noStroke();
}

function make_canvas() {
  // createCanvas(cam.width, cam.height, WEBGL);
}

function draw() {
  // image (cam, 0, 0);
  // background(255);

  shader(my_shader);

  my_shader.setUniform("u_res", [width, height]); //pass a uniform into the shader files as the resolution of the sketch.

  my_shader.setUniform("u_tex", cam); //set texture as uniform from cam.

  beginShape(TRIANGLE_STRIP);
  for (let walker of walkers) {
    cam.loadPixels();
    walker.display();
    walker.move();
  }
  endShape();
}

class Walker {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
  }
  display() {
    

    //vertex is going to accept x, y, z and uv coordinates normalized as 0,1.

    let cam_x = map(this.pos.x, 0, width, 0, cam.width);
    let cam_norm_x = map(cam_x, 0, cam.width, 0, 1); //normalize the value.

    let cam_y = map(this.pos.y, 0, width, 0, cam.height);
    let cam_norm_y = map(cam_y, 0, cam.height, 0, 1); //normalize the value.

    vertex(this.pos.x, this.pos.y, 0, cam_norm_x, cam_norm_y);

    /* to see: */
  }
  move() {
    this.vel = p5.Vector.random2D().mult(1);
    this.pos.add(this.vel);
  }
}
