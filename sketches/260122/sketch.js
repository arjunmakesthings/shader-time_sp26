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

//   push();
//   translate(-width / 2, -height / 2);
//   //webgl renders canvas from the center of the screen; so.
//   image(cam, 0, 0, width, height);
//   pop();

  make_groups();

  draw_groups();
}

//this function will read all colour values, cluster similar colours together into a group.

// we keep two variables: 
let groups; //stores data in the format: groups[id][indices], where id increments sequentially, and indices is a list of all cam.pixels indices that belong to the group. 

let pixel_to_group;//this stores data in this format: studied_index: groupid. we use this to check if the pixel being studied has been grouped or not. 

function make_groups() {
  cam.loadPixels();
  //^ returns a cam.pixels array with rgba information.

  // reset every frame
  groups = [];
  pixel_to_group = {};

  // go through every single pixel and compare its colour value with its neighbour.
  for (let x = 0; x < cam.width; x += pixelation) {
    for (let y = 0; y < cam.height; y += pixelation) {
      // this is the studied pixel. we get its values first.
      let studied_index = get_pixel_index(x, y);

      let studied_rgba = color(cam.pixels[studied_index], cam.pixels[studied_index + 1], cam.pixels[studied_index + 2], cam.pixels[studied_index + 3]);

      let studied_hue = Math.floor(hue(studied_rgba));

      // now we have the hue of the pixel being looked at. we now want to compare it to its neighbours.
      let neighbours = get_neighbours(x, y);
      // ^ returns an array of indices for cam.pixels.

      // this will store the group id if we find a matching neighbour.
      let found_group = null;

      // now we compare the studied hue to neighbour_hue.
      for (let i = 0; i < neighbours.length; i++) {
        let neighbour_index = neighbours[i];

        // first see if the neighbour being studied has been already sent to a group or not. 
        if (pixel_to_group[neighbour_index] === undefined) {
          continue;
        }

        let neighbour_rgba = color(cam.pixels[neighbour_index], cam.pixels[neighbour_index + 1], cam.pixels[neighbour_index + 2], cam.pixels[neighbour_index + 3]);

        let neighbour_hue = Math.floor(hue(neighbour_rgba));

        // study calculations. we study hue.
        if (abs(neighbour_hue - studied_hue) < similarity_threshold) {
          // this is a valid colour to be grouped.
          found_group = pixel_to_group[neighbour_index];
          break; // first valid group is enough
        }
      }

      // if no neighbour matched, create a new group
      if (found_group === null) {
        let new_group_id = groups.length;
        groups.push([studied_index]);
        pixel_to_group[studied_index] = new_group_id;
      }
      // otherwise, add this pixel to the existing group
      else {
        groups[found_group].push(studied_index);
        pixel_to_group[studied_index] = found_group;
      }
    }
  }

  console.log (groups, pixel_to_group); 
}

function draw_groups() {
  push();

  // WEBGL canvas is centered; match image space
  translate(-width / 2, -height / 2);

  noStroke();
  colorMode(RGB, 255);

  for (let g = 0; g < groups.length; g++) {
    for (let i = 0; i < groups[g].length; i++) {
      let index = groups[g][i];
      let { x, y } = index_to_xy(index);

      let r = cam.pixels[index];
      let g_ = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let a = cam.pixels[index + 3];

      fill(r, g_, b, a);
      circle(x, y, pixelation * 0.8);
    }
  }

  pop();
}
  


/* helpers: */

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

//helper to convert index to coordinates.
function index_to_xy(index) {
  let p = index / 4;
  let x = p % cam.width;
  let y = Math.floor(p / cam.width);
  return { x, y };
}

function mousePressed(){
    noLoop(); 
}
