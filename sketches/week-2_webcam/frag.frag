#ifdef GL_ES
precision mediump float;
#endif

// Passed attributes.
varying vec2 vTexCoord;

// Custom uniforms.
uniform sampler2D u_tex;

void main() {
    vec4 texColor = texture2D(u_tex, vTexCoord);
    gl_FragColor = texColor;
}