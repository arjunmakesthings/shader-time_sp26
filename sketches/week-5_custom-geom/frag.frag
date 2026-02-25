precision mediump float;

varying vec2 vUv;

uniform vec2 u_resolution;
uniform float u_time;

//helper from stackoverflow to generate a random number between 0,1.
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

//helper for noise.
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec4 posis = gl_FragCoord;

    vec2 norm_posis = vec2(posis.x, posis.y) / u_resolution;

    gl_FragColor = vec4(norm_posis.x, 0.0, 0.0, 1.0);
}