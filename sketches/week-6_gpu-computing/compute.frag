#ifdef GL_ES
precision mediump float;
#endif

//passed stuff: 
varying vec2 vTexCoord;

//custom uniforms:
uniform vec2 u_mouse;
uniform vec2 u_res;

void main() {
    vec2 fragCoord = vTexCoord * u_res;

    float d = distance(fragCoord, u_mouse);

    if(d < 5.0) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
}