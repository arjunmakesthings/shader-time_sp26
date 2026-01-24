//untitled; arjun; jan, 2026.

/*
ask: 
make a reactive mesh, with vertices that use the z-parameter. use position & colour. 
*/

/*
thought: 
every enclosed body is a mesh, with vertices inside. shape is affected by the topology. 

an enclosed body can be thought of as a group of similar colours. 
*/

let cam;

let vertices = [];
let pixelation = 20;

let col_similarity_threshold = 50;

function setup() {
  cam = createCapture(VIDEO, make_canvas);
  cam.hide();
}

//helper to convert canvas to aspect ratio. runs once.
function make_canvas() {
  createCanvas(cam.width, cam.height, WEBGL);
}

function draw() {
  background(0);
  push();
  //first flip
  scale(-1, 1);
  translate(-width, 0);

  translate(width / 2, -height / 2); //bring back to the center.

  assign_vertices();

  //draw vertices to canvas:

  for (let sing_vertex of vertices) {
    beginShape(POINTS);
    sing_vertex.x = map(sing_vertex.x, 0, cam.width, 0, width);
    sing_vertex.y = map(sing_vertex.y, 0, cam.height, 0, height);

    stroke(sing_vertex.r, sing_vertex.g, sing_vertex.b);
    fill(sing_vertex.r, sing_vertex.g, sing_vertex.b);

    vertex(sing_vertex.x, sing_vertex.y);
    endShape();
  }

  //image(cam, 0, 0, width, height);
  pop();
}

function assign_vertices() {
  cam.loadPixels();
  //now we get a cam.pixels array with rgba values for each pixel.

  /*
  algorithm: 
  - we go through every single x, y position on the screen. 
  - for each pixel, look at its neighbours (8).
  - if the colour of the neighbour is similar (under a certain threshold), accumulate them into an object. 
  - if the neighbour has been accumulated, don't look at it again. 
  */

  for (let x = 0; x < cam.width; x += pixelation) {
    for (let y = 0; y < cam.height; y += pixelation) {
      let n = get_pixel_index(x, y);

      let r = cam.pixels[n];
      let g = cam.pixels[n + 1];
      let b = cam.pixels[n + 2];

      vertices.push({
        x,
        y,
        r,
        g,
        b,
      });
    }
  }
}

//helper to convert x,y coordinates to pixels index.
function get_pixel_index(x, y) {
  return (y * cam.width + x) * 4;
}

function get_neighbours(x, y) {
  let neighbours = [];
  const possible_neighbours = [
    [x - 1, y - 1], // top-left
    [x, y - 1], // top
    [x + 1, y - 1], // top-right

    [x - 1, y], // left
    [x + 1, y], // right

    [x - 1, y + 1], // bottom-left
    [x, y + 1], // bottom
    [x + 1, y + 1], // bottom-right
  ];

  for (const [dx, dy] of possible_neighbours) {
    if (dx >= 0 && dx < cam.width && dy >= 0 && dy < cam.height) {
      neighbours.push(get_pixel_index(dx, dy));
    }
  }

  return neighbours;
}
