precision mediump float;

varying vec2 vUv;
varying vec4 position_things;

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
    float slow_time = u_time * 0.8;

    float r = position_things.x * 0.5 + 0.5 * sin(slow_time + position_things.x);
    float g = position_things.y * 0.5 + 0.5 * cos(slow_time + position_things.y);
    float b = 0.5 + 0.5 * sin(slow_time + position_things.z);

    gl_FragColor = vec4(r, g, b, 1.0);
}