precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

//passed uniforms: 
uniform float u_time;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

attribute vec3 normal;

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

    vec3 got_posis = position;

    float prob = noise(position.xy);
    //prob returns a float between 0,1. 

    // a vertex can move in 1 of 3 axes combinations: xy yz xz. 

    //it can move by this number: 
    float step = noise(vec2(u_time))*0.003;

    if(prob < 0.3) {
        //xy. 
        float movement_prob = random(position.xy + vec2(sin(u_time), cos(u_time)));

        if(movement_prob < 0.125) {
            got_posis.xy += vec2(-step, step); // top-left
        } else if(movement_prob < 0.250) {
            got_posis.xy += vec2(0.0, step); // top
        } else if(movement_prob < 0.375) {
            got_posis.xy += vec2(step, step); // top-right
        } else if(movement_prob < 0.500) {
            got_posis.xy += vec2(-step, 0.0);  // left
        } else if(movement_prob < 0.625) {
            got_posis.xy += vec2(step, 0.0);  // right
        } else if(movement_prob < 0.750) {
            got_posis.xy += vec2(-step, -step); // bottom-left
        } else if(movement_prob < 0.875) {
            got_posis.xy += vec2(0.0, -step); // bottom
        } else {
            got_posis.xy += vec2(step, -step); // bottom-right
        }
    } else if(prob < 0.6 && prob > 0.3) {
        //yz.
        float movement_prob = random(position.xy + vec2(sin(u_time), cos(u_time)));

        if(movement_prob < 0.125) {
            got_posis.yz += vec2(-step, step); // top-left
        } else if(movement_prob < 0.250) {
            got_posis.yz += vec2(0.0, step); // top
        } else if(movement_prob < 0.375) {
            got_posis.yz += vec2(step, step); // top-right
        } else if(movement_prob < 0.500) {
            got_posis.yz += vec2(-step, 0.0);  // left
        } else if(movement_prob < 0.625) {
            got_posis.yz += vec2(step, 0.0);  // right
        } else if(movement_prob < 0.750) {
            got_posis.yz += vec2(-step, -step); // bottom-left
        } else if(movement_prob < 0.875) {
            got_posis.yz += vec2(0.0, -step); // bottom
        } else {
            got_posis.yz += vec2(step, -step); // bottom-right
        }
    } else {
        //xz. 

        float movement_prob = random(position.xy + vec2(sin(u_time), cos(u_time)));

        if(movement_prob < 0.125) {
            got_posis.xz += vec2(-step, step); // top-left
        } else if(movement_prob < 0.250) {
            got_posis.xz += vec2(0.0, step); // top
        } else if(movement_prob < 0.375) {
            got_posis.xz += vec2(step, step); // top-right
        } else if(movement_prob < 0.500) {
            got_posis.xz += vec2(-step, 0.0);  // left
        } else if(movement_prob < 0.625) {
            got_posis.xz += vec2(step, 0.0);  // right
        } else if(movement_prob < 0.750) {
            got_posis.xz += vec2(-step, -step); // bottom-left
        } else if(movement_prob < 0.875) {
            got_posis.xz += vec2(0.0, -step); // bottom
        } else {
            got_posis.xz += vec2(step, -step); // bottom-right
        }
    }

    // float r = one_d_noise(u_time)*5.5;

    float r = u_time;
    float cx = cos(r * one_d_noise(got_posis.x));
    float sx = sin(r * one_d_noise(got_posis.x));

    float cy = cos(r * one_d_noise(got_posis.y));
    float sy = sin(r * one_d_noise(got_posis.y));

    float cz = cos(r * one_d_noise(got_posis.z));
    float sz = sin(r * one_d_noise(got_posis.z));

// Rotation X
    mat3 rotX = mat3(1.0, 0.0, 0.0, 0.0, cx, -sx, 0.0, sx, cx);

// Rotation Y
    mat3 rotY = mat3(cy, 0.0, sy, 0.0, 1.0, 0.0, -sy, 0.0, cy);

// Rotation Z
    mat3 rotZ = mat3(cz, -sz, 0.0, sz, cz, 0.0, 0.0, 0.0, 1.0);

// Combine rotations (order matters!)
    mat3 rot = rotZ * rotY * rotX;

    got_posis.xyz = rot * got_posis.xyz;

    // float angle = u_time * 0.3;

    // mat3 rotX = mat3(1.0, 0.0, 0.0, 0.0, cos(angle), -sin(angle), 0.0, sin(angle), cos(angle));

    // mat3 rotY = mat3(cos(angle), 0.0, sin(angle), 0.0, 1.0, 0.0, -sin(angle), 0.0, cos(angle));

    // mat3 rotZ = mat3(cos(angle), -sin(angle), 0.0, sin(angle), cos(angle), 0.0, 0.0, 0.0, 1.0);

    // got_posis.xyz = rotZ * rotY * rotX * got_posis.xyz;

    vec4 model_position = vec4(got_posis, 1.0);

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * model_position;

    vUv = uv;
}
