// Mesh attributes.
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// Passed attributes.
varying vec2 vTexCoord;

void main() {
  // Copy the vec3 position into a vec4.
  vec4 position = vec4(aPosition, 1.0);

  // Move the shape for the origin in the center.
  position.xy = position.xy * 2.0 - 1.0;

  // Set the clip space position.
  gl_Position = position;

  // Pass data to the fragment shader.
  vTexCoord = aTexCoord;
}