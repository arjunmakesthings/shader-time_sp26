#ifdef GL_ES
precision mediump float;
#endif

// Passed attributes.
varying vec4 vColor;

// Custom uniforms.
uniform float uTime;

void main() 
{
  vec4 outColor = vColor;
  outColor.r = min(outColor.r + sin(uTime * 0.001) * 0.5, 1.0);
  outColor.b = cos(uTime * 0.001); //min(outColor.b + cos(uTime) * 0.5, 1.0);
  gl_FragColor = vec4(outColor.rgb, outColor.a);
}