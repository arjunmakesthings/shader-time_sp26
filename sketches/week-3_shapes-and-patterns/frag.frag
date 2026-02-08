#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_res;
uniform float u_time;

varying vec3 v_pos;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f * f * (3.0 - 2.0 * f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
        (c - a) * u.y * (1.0 - u.x) +
        (d - b) * u.x * u.y;
}

void main() {
    vec2 col = v_pos.xy / u_res;

    float time_osc = sin(u_time)*0.0004; 

    float r = noise(col ); // noise expects vec2
    float g = noise(col + time_osc);
    float b = col.x - (col.y);
    float a = 0.2;

    gl_FragColor = vec4(r, g, b, a);
}