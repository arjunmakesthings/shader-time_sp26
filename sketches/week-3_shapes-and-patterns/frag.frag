#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_res;
uniform float u_time;

varying vec3 v_pos;

void main() {
gl_FragColor = vec4(v_pos.xy / u_res, 0.05,0.03); 
}