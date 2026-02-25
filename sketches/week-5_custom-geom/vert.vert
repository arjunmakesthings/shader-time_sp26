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

varying vec4 position_things; 

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
    position_things = got_posis; 

    float t = u_time * 0.3;
    got_posis.x += noise(vec2(got_posis.y * 1.0 + sin(t), t * 0.5)) * 0.07;
    got_posis.x += sin(t + got_posis.y * 1.0) * 0.04;
    got_posis.y += noise(vec2(got_posis.x * 1.0 + cos(t), t * 0.7 + 100.0)) * 0.07;
    got_posis.y += cos(t + got_posis.x * 1.0) * 0.04;

    float angle = u_time * 0.2;
    float s = sin(angle);
    float c = cos(angle);
    vec2 rotated = vec2(
        got_posis.x * c - got_posis.y * s,
        got_posis.x * s + got_posis.y * c
    );
    got_posis.x = rotated.x;
    got_posis.y = rotated.y;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * got_posis;
    vUv = uv;
}
