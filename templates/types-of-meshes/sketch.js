/* eslint-disable no-undef, no-unused-vars */

// by elie.

let font;
let shape;
let shapeStr;
let points = [];

const USE_WEBGL = true;

function preload() {
  if (USE_WEBGL) {
    font = loadFont("https://cdn.jsdelivr.net/npm/@typopro/web-fira-code@3.7.5/TypoPRO-FiraCode-Regular.ttf");
  }
}

function setup() {
  if (USE_WEBGL) {
    setAttributes("antialias", true);
    createCanvas(windowWidth, windowHeight, WEBGL);
  } else {
    createCanvas(windowWidth, windowHeight);
  }

  shape = POINTS;
  shapeStr = "POINTS";

  if (USE_WEBGL) {
    textFont(font, 12);
  } else {
    textFont("Fira Code", 12);
  }
}

function draw() {
  background("#292f33");

  if (USE_WEBGL) {
    translate(width * -0.5, height * -0.5);
  }

  // draw info at the top
  textAlign(LEFT, CENTER);
  fill("#d4605a");
  noStroke();

  text("Topology: " + shapeStr + " // " + points.length + " vertices", 10, 20);

  if (shape === POINTS || shape === LINES || shape === LINE_STRIP) {
    noFill();
  }

  // draw the shape
  strokeWeight(2);
  stroke("#eae3ce");

  if (points.length > 0) {
    if (shape === LINE_STRIP) {
      // line strip is undefined but it's the default, so skip the function arg.
      beginShape();
    } else if (shape === TRIANGLE_STRIP && points.length === 1) {
      // triangle strip can't deal with a single vertex, so let's override the topology to avoid an error.
      beginShape(POINTS);
    } else {
      beginShape(shape);
    }
    points.forEach((pt) => {
      vertex(pt.x, pt.y);
    });
    endShape();
  }

  // draw the point labels
  textAlign(CENTER, CENTER);
  noStroke();

  points.forEach((pt, i) => {
    fill("#d4605a");
    circle(pt.x, pt.y, 20);
    fill("#eae3ce");
    text(i.toString(), pt.x, pt.y);
  });
}

function keyPressed() {
  if (key === "1") {
    shape = POINTS;
    shapeStr = "POINTS";
  } else if (key === "2") {
    shape = LINES;
    shapeStr = "LINES";
  } else if (key === "3") {
    shape = LINE_STRIP;
    shapeStr = "LINE_STRIP";
  } else if (key === "4") {
    shape = TRIANGLES;
    shapeStr = "TRIANGLES";
  } else if (key === "5") {
    shape = TRIANGLE_STRIP;
    shapeStr = "TRIANGLE_STRIP";
  } else if (key === "6") {
    shape = TRIANGLE_FAN;
    shapeStr = "TRIANGLE_FAN";
  } else if (key === "7") {
    shape = QUADS;
    shapeStr = "QUADS";
  } else if (key === "8") {
    shape = QUAD_STRIP;
    shapeStr = "QUAD_STRIP";
  } else if (key === "9") {
    shape = TESS;
    shapeStr = "TESS";
  }
  if (key === " ") {
    points = [];
  } else if (keyCode === DELETE) {
    points.pop();
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    points.push(createVector(mouseX, mouseY));
  } else if (mouseButton === RIGHT) {
    points.pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
