/* eslint-disable no-undef, no-unused-vars */

/*
ask: 
Create a dynamic shader effect on a live webcam image.

Use p5.js and WebGL.
Your effect can be coded in the vertex or fragment unit of your shader (or both).
Your effect should be animated, either using a value that changes every frame (like the elapsed time), or using user input, or both.

thought: 
to use random walkers, but not in the traditional way they're defined. 

a canvas is made of dots. the algorithm decides certain dots must move at certain durations of times. dots take up certain positions in the grid. 

colours of the dots are determined by the mesh they create from the camera. i think the overlapping of meshes could produce an interesting effect. 
*/

let dots = [];
let shuffled_dots = [];

const gap = 10;

let my_shader;

let cam;

let t; 

function preload() {
  my_shader = loadShader("vert.vert", "frag.frag");
}

function setup() {
  createCanvas(640, 480, WEBGL);
  cam = createCapture(VIDEO, { flipped: true });
  cam.hide();

  for (let x = 0; x <= width; x += gap) {
    for (let y = 0; y <= height; y += gap) {
      dots.push(new Dot(x, y));
    }
  }

  //shuffle the dots once so that we can make random triangle meshes from them.
  shuffled_dots = shuffle(dots.slice());

  noStroke(); 
}

function make_canvas() {
  // createCanvas(cam.width, cam.height, WEBGL);
}

function draw() {
  // image (cam, 0, 0);
  background(255);

  t = millis()*1000; 

  // translate(-width / 2, -height / 2);
  cam.loadPixels(); //i'm going to read it later in display().

  shader(my_shader);

  my_shader.setUniform("u_res", [width, height]); //pass a uniform into the shader files as the resolution of the sketch.

  my_shader.setUniform("u_tex", cam); //set texture as uniform from cam.

  my_shader.setUniform("u_time", millis() * 0.001); // pass seconds. 

  beginShape(TRIANGLE_STRIP);
  for (let i = 0; i < shuffled_dots.length - 2; i += 3) {
    shuffled_dots[i].display();
    shuffled_dots[i + 1].display();
    shuffled_dots[i + 2].display();
  }
  endShape();

}

class Dot {
  constructor(x, y) {
    this.pos = createVector(x, y); //create a 2-d vector for the dot.

    //two variables i will need in the future.
    this.starting_pos = createVector(x, y);
    this.dest_pos = createVector(x, y);
  }

  display() {
    //mainly for debug.
    // strokeWeight(2);
    // stroke(0);
    // point(this.pos.x, this.pos.y);

    let cam_x = map(this.pos.x, 0, width, 0, cam.width);
    let cam_y = map(this.pos.y, 0, width, 0, cam.height);

    let norm_x = map(cam_x, 0, cam.width, 0, 1);
    let norm_y = map(cam_y, 0, cam.height, 0, 1);

    // norm_x-=noise(t*0.0000005); 
    // norm_y -= noise(t * 0.0000005); 

    vertex(this.pos.x, this.pos.y, 0, norm_x, norm_y); //pass coordinates (x,y,z) and uv coordinates (0,1).
  }
}
