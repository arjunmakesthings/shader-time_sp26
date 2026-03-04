#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform sampler2D u_map;
uniform vec2 u_res;

void main() {
    vec2 uv = vTexCoord;

    float ink = texture2D(u_map, uv).r; //r stores the ink. 

    //white by default, black where there is ink. 
    // vec3 color = mix(vec3(1.0), vec3(0.0), ink);

    gl_FragColor = vec4(ink, ink, ink, 1.0);
}