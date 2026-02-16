precision mediump float;

varying vec2 vUv;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 posis = gl_FragCoord.xy / u_resolution;
    gl_FragColor = vec4(posis.x, 0.0, 0.0, 1.0);
}