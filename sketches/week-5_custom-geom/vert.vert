precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

//passed uniforms: 
uniform float u_time;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

varying vec2 vUv;

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

float one_d_noise(float t) {
    float i = floor(t);
    float f = fract(t);
    float a = random(vec2(i, 0.0));
    float b = random(vec2(i + 1.0, 0.0));
    float u = f * f * (3.0 - 2.0 * f); // smoothstep interpolation
    return mix(a, b, u);
}

void main() {

    vec4 got_posis = vec4(position, 1.0);

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * got_posis;

    vUv = uv;
}
