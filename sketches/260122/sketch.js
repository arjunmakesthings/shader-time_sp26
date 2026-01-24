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

function setup() {
  cam = createCapture(VIDEO, { flipped: true }, make_canvas);
  cam.hide();
}

//make canvas the same size as camera for easier calculations.
function make_canvas() {
  createCanvas(cam.width, cam.height, WEBGL);
}

function draw() {
  background(0);
  image(cam, 0, 0, width, height); 
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
