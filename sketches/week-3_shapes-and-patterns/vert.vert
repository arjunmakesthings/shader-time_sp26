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

void main() {
  //p5 passes a vec3. we convert this to a vec4. let the fourth just be 1, because it makes matrix multiplication easier.
  vec4 position = vec4(aPosition, 1.0);

  v_pos = aPosition;

  //since p5 sets the origin to the center, we do this to avoid offsetting the drawing.
  position.xy -= u_res * 0.5; 

  //transforms vertex position from model to screen space. we let this be as is. this tells the gpu where to draw the vertex.
  gl_Position = uProjectionMatrix * uModelViewMatrix * position;
}