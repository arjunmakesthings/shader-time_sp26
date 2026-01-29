/* eslint-disable no-undef, no-unused-vars */

let simpleShader;
let elapsedTime;

let norm_mx, norm_my; 

function preload() {
  simpleShader = loadShader("simple.vert", "simple.frag");
}

function setup() {
  setAttributes("alpha", true);
  createCanvas(windowWidth, windowHeight, WEBGL);

  elapsedTime = 0;
}

function draw() {
  background("#292f33");

  noStroke();

  elapsedTime += deltaTime;

  simpleShader.setUniform("uResolution", [width, height]);
  simpleShader.setUniform("uTime", elapsedTime);

  norm_mx = map(mouseX, 0, width, -1,1); 
  norm_my = map(mouseY, 0, height, -1,1); 

  simpleShader.setUniform("mouse_pos", [norm_mx, norm_my]); 

  shader(simpleShader);

  console.log(norm_mx); 

  const paddingX = width * 0.1;
  const paddingY = height * 0.1;
  const thickness = width * 0.1;

  const left = paddingX;
  const top = paddingY;
  const right = width - paddingX;
  const bottom = height - paddingY;

  beginShape(TRIANGLE_STRIP);

  fill("#d4605a");
  vertex(left, top);
  fill("#3D38D9");
  vertex(left + thickness, top + thickness);

  fill("#4AF092");
  vertex(right, top);
  fill("#D9C038");
  vertex(right - thickness, top + thickness);

  fill("#F85441");
  vertex(right, bottom);
  fill("#12A357");
  vertex(right - thickness, bottom - thickness);

  fill("#4F3EF0");
  vertex(left, bottom);
  fill("#12A357");
  vertex(left + thickness, bottom - thickness);

  fill("#d4605a");
  vertex(left, top);
  fill("#3D38D9");
  vertex(left + thickness, top + thickness);

  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
