/* eslint-disable no-undef, no-unused-vars */

const USE_WEBGL = true;

function setup() {
  if (USE_WEBGL) {
    createCanvas(500, 500, WEBGL);
  } else {
    createCanvas(500, 500);
  }
}

function draw() {
  background("#292f33");

  fill("#eae3ce");

  translate(0, 0, 100);

  translate(-125, -125, -1000);
  box(50, 50, 50);

  translate(250, 0, 0);
  sphere(50);

  translate(0, 250, 0);
  cylinder(50, 20);

  translate(-250, 0, 0);
  torus(50, 20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
