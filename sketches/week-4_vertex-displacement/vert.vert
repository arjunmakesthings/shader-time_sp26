precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

//passed uniforms: 
uniform float u_time;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

//helper from stackoverflow to generate a random number between 0,1.
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {

    float prob = random(position.xy);

    float new_x = position.x;
    float new_y = position.y;

    float new_r = 2.0;

    if(prob < 0.5) {
        new_x = position.x + cos(u_time);
        new_y = position.y + sin(u_time);
    } else {
        new_x = position.x - cos(u_time);
        new_y = position.y - sin(u_time);
    }

    //comes as a vec3; convert to vec4, by adding 1.0: 
    // vec4 model_position = vec4(position, 1.0);

    vec4 model_position = vec4(new_x, new_y, position.z, 1.0);

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * model_position;

    vUv = uv;
}
