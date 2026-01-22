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
  cam = createCapture(VIDEO, canv_to_asp);
  cam.hide();
}

//helper to convert canvas to aspect ratio. run once. 
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

  translate(width/2,-height/2); //bring back to the center. 

  assign_vertices(); 

  image(cam, 0, 0, width, height);
  pop();
}

function assign_vertices(){
  cam.loadPixels(); 
  //now we get a cam.pixels array with rgba values for each pixel. 



  cam.updatePixels(); 
}

//helper to convert x,y coordinates to pixels index. 
function get_pixel_index(x, y) {
  return (y * width + x) * 4;
}
