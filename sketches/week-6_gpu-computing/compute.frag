#ifdef GL_ES
precision mediump float;
#endif

// Passed attributes.
varying vec2 vTexCoord;

// Custom uniforms.
uniform sampler2D uCaptureMap;

void main() {
    gl_FragColor = vec4(255.0, 0.0, 0.0, 1.0);
}