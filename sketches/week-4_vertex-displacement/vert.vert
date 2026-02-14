precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float u_time;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    f = f * f * (3.0 - 2.0 * f); // smoothstep

    float a = fract(sin(dot(i, vec2(12.9898, 78.233))) * 43758.5453);
    float b = fract(sin(dot(i + vec2(1.0, 0.0), vec2(12.9898, 78.233))) * 43758.5453);
    float c = fract(sin(dot(i + vec2(0.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453);
    float d = fract(sin(dot(i + vec2(1.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453);

    float ab = mix(a, b, f.x);
    float cd = mix(c, d, f.x);
    return mix(ab, cd, f.y);
}

float f_noise(float p) {
    float i = floor(p);
    float f = fract(p);

    f = f * f * (3.0 - 2.0 * f); // smoothstep

    float a = fract(sin(i * 12.9898) * 43758.5453);
    float b = fract(sin((i + 1.0) * 12.9898) * 43758.5453);

    return mix(a, b, f);
}

void main() {

    //comes as a vec3; convert to vec4, by adding 1.0: 
    vec4 model_position = vec4(position, 1.0);

    float elevation = f_noise(model_position.x * model_position.y + u_time);
    model_position.xyz += elevation;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * model_position;

    vUv = uv;
}
