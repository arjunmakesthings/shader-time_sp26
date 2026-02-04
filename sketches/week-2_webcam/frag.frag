#ifdef GL_ES
precision lowp float;
#endif

// Passed attributes.
varying vec2 vTexCoord;

// Custom uniforms.
uniform sampler2D u_tex;

uniform float u_time;

void main() {
    vec4 texColor = texture2D(u_tex, vTexCoord); 

    texColor.r *= 0.5 + sin(u_time + vTexCoord.x / 0.8);
    texColor.g *= sin(u_time + vTexCoord.x / 0.2);
    // texColor.b *= sin(u_time + vTexCoord.x / 0.05);
    gl_FragColor = texColor;
}