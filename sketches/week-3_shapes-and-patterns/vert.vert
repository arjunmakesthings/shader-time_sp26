#ifdef GL_ES
precision mediump float;
#endif

// built in uniforms: 
uniform mat4 uProjectionMatrix; //this converts 3d coordinates to 2d screen coordinates.
uniform mat4 uModelViewMatrix; //combines model & camera transformations.

// additionally, p5 passes the following:
attribute vec3 aPosition;
attribute vec2 aTexCoord; //only when we pass a texture.

// custom uniforms that we may have passed:
uniform vec2 u_res;
uniform float u_time;

varying vec3 v_pos;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

    // Four corners in 2D of a tile
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
  vec2 u = f * f * (3.0 - 2.0 * f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
  return mix(a, b, u.x) +
    (c - a) * u.y * (1.0 - u.x) +
    (d - b) * u.x * u.y;
}

void main() {
  //p5 passes a vec3. we convert this to a vec4. let the fourth just be 1, because it makes matrix multiplication easier.
  vec4 position = vec4(aPosition, 1.0);

  v_pos = aPosition;

  //since p5 sets the origin to the center, we do this to avoid offsetting the drawing.
  position.xy -= u_res * 0.5;

  position.xy *= tan(noise(position.xy * 0.005 + sin(u_time * 0.0005)))+0.02;

  // position.xy *= tan(noise(vec2(aPosition.x * u_res.x, aPosition.y*u_res.y) * 0.005 + sin(u_time * 0.0009))) - 0.1;

  position.y+=60.0; 

  //transforms vertex position from model to screen space. we let this be as is. this tells the gpu where to draw the vertex.
  gl_Position = uProjectionMatrix * uModelViewMatrix * position;
}