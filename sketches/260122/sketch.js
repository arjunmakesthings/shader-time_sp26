//untitled; arjun; month, 2026.

/*
ask: 
make a reactive mesh, with vertices that use the z-parameter. use position & colour. 
*/

/*
thought: 

*/

let cam;

let pixelation = 10;

let similarity_threshold = 50;

function setup() {
  cam = createCapture(VIDEO, { flipped: true }, make_canvas);
  pixelDensity(1);
  cam.hide();
}

//make canvas the same size as camera for easier calculations.
function make_canvas() {
  createCanvas(cam.width, cam.height, WEBGL);
}

function draw() {
  background(0);

  push();
  translate(-width / 2, -height / 2);
  //webgl renders canvas from the center of the screen; so.
  image(cam, 0, 0, width, height);
  pop();

  make_groups();

  console.log(get_neighbours(0, 0));
}

//this function will read all colour values, cluster similar colours together into a group.
// this'll be in an array groups[n][e], where [n] is the number of groups, and [e] is the number of pixels it has clustered together.

let groups;

function make_groups() {
  cam.loadPixels();
  //^ returns a cam.pixels array with rgba information.

  // go through every single pixel and compare its colour value with its neighbour.

  let group_numbers = 0;

  for (let x = 0; x < cam.width; x += pixelation) {
    for (let y = 0; y < cam.height; y += pixelation) {

      let neighbours = get_neighbours(x, y);

      let n = get_pixel_index(x, y);

      //study calculations. we study hue.
      let studied_rgba = color(cam.pixels[n], cam.pixels[n + 1], cam.pixels[n + 2], cam.pixels[n + 3]);
      let studied_hue = Math.floor(hue(studied_rgba));

      //now we compare it to every neighbour.
      for (let i = 0; i < neighbours.length; i++) {
        // see if it has been grouped previously or not. 
        
        let neighbour_rgba = color(cam.pixels[i], cam.pixels[i + 1], cam.pixels[i + 2], cam.pixels[i + 3]);
        let studied_hue = Math.floor(hue(neighbour_rgba));

        if (neighbour_hue >= studied_hue - similarity_threshold && neighbour_hue <= studied_hue + similarity_threshold) {
          //this is a valid colour to be grouped.
        } else {
          continue;
        }
      }
    }
  }
}

//helper written by an llm to fetch neighbours for a given pixel, taking in mind the pixelation value.
function get_neighbours(x, y) {
  let neighbours = [];

  // Check all 8 surrounding positions (or fewer at edges)
  for (let dx = -pixelation; dx <= pixelation; dx += pixelation) {
    for (let dy = -pixelation; dy <= pixelation; dy += pixelation) {
      // Skip the center pixel itself
      if (dx === 0 && dy === 0) continue;

      let nx = x + dx;
      let ny = y + dy;

      // Check bounds
      if (nx >= 0 && nx < cam.width && ny >= 0 && ny < cam.height) {
        let index = get_pixel_index(nx, ny);
        neighbours.push(index); // just return the index of the neighbours.
        //     {
        //   x: nx,
        //   y: ny,
        //   index: index,
        //   color: {
        //     r: cam.pixels[index],
        //     g: cam.pixels[index + 1],
        //     b: cam.pixels[index + 2],
        //     a: cam.pixels[index + 3],
        //   },
        // });
      }
    }
  }

  return neighbours;
}

//helper to convert x,y coordinates to pixels index.
function get_pixel_index(x, y) {
  return (y * cam.width + x) * 4;
}
