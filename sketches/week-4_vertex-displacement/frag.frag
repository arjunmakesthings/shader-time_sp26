precision mediump float;

varying vec2 vUv;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    //since texture coords are called uv, we call normalized position values st.
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec2 st_flipped = vec2(1.0 - st.x, 1.0 - st.y);

    float scale = tan(u_time*0.005)*3000.0;

    vec2 grid = floor(st * scale);
    vec2 grid_flipped = floor(st_flipped * scale);

    float checker = mod(grid.x + grid.y, 2.0);

    float speed = 2.0;
    float v = sin(grid.y * grid.x + u_time * speed) / 1.0;

    float r = cos(grid_flipped.x * grid.y + u_time * speed) / 1.0;
    float g = sin(grid.y / grid.x - u_time * speed) / 1.0;
    float b = tan(grid_flipped.x / grid_flipped.y + u_time * speed) / 1.0;

    vec3 col = vec3(r, v, v);

    gl_FragColor = vec4(r,g,b, 1.0);
}