// Built-in transformation matrices.
uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

// Mesh attributes.
attribute vec3 aPosition;
attribute vec4 aVertexColor;

// Custom uniforms.
uniform vec2 uResolution;

// Passed attributes.
varying vec4 vColor;

//uniforms from p5: 
uniform vec2 mouse_pos; 

void main() {
  // Copy the vec3 position into a vec4.
    vec4 position = vec4(aPosition, 1.0);

  // Move the shape for the origin in the center.

  //center: 
    position.xy -= uResolution * 0.5; 

    position.xy += mouse_pos *uResolution * 0.5 ; 

  // Set the clip space position.
    gl_Position = uProjectionMatrix * uModelViewMatrix * position;

  // Pass data to the fragment shader.
    vColor = aVertexColor;
}