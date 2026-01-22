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

let col_similarity_threshold = 50; 

function setup() {
  cam = createCapture(VIDEO, canv_to_asp);
  cam.hide();
}

//helper to convert canvas to aspect ratio. runs once.
function canv_to_asp() {
  let asp_ratio = cam.height / cam.width;

  let wh = windowWidth * asp_ratio;

  createCanvas(windowWidth, wh, WEBGL);
}

function draw() {
  background(0);
  push();
  //first flip
  scale(-1, 1);
  translate(-width, 0);

  translate(width / 2, -height / 2); //bring back to the center.

  assign_vertices();

  image(cam, 0, 0, width, height);
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

  //make each pixel an object, so that it can remember whether it has been accumulated or not.
  let p_objs = [];

  //initalise:
  for (let i = 0; i < cam.pixels.length; i += 4) {
    p_objects.push({ r: cam.pixels[i].r, g: cam.pixels[i].g, b: cam.pixels[i].b, a: cam.pixels[i].a, grouped: false });
  }

  //go through every single pixel. see if it has been grouped or not. 
  // if not, see its neighbours. if colours are similar, group them into one object. 
  for (let x = 0; x<cam.width;x++){

  }


}

//helper to convert x,y coordinates to pixels index.
function get_pixel_index(x, y) {
  return (y * width + x) * 4;
}
