//ink-blotting, GPU version; arjun, shobhan & vivek; march 2024 rewrite.
// Preserves CPU logic, but fully parallelized for WebGL.

#ifdef GL_ES
precision mediump float;
#endif

// Passed from vertex shader
varying vec2 vTexCoord;

// Previous frame's ink map
uniform sampler2D u_prev;

// Mouse click position to inject ink
uniform vec2 u_mouse;

// Canvas resolution
uniform vec2 u_res;

// Parameters
const float capacity = 1.0;    // max ink per pixel
const float rate = 0.02;       // max ink offload per frame
const float mouse_radius = 100.0; // radius of ink drop on click

void main() {
    // Convert uv to pixel coordinates
    vec2 fragCoord = vTexCoord * u_res;

    // Fetch previous ink value
    float ink = texture2D(u_prev, vTexCoord).r;

    // --- Drop ink on click ---
    float d = distance(fragCoord, u_mouse);
    if(d < mouse_radius) {
        ink = 1.0; // max ink
    }

    //usually keep to 1.0 for single pixel offset. if you reduce it, it's higher resolution. 
    vec2 px = 1.0 / u_res; // single pixel offset

    //neighbours: 
    float up = texture2D(u_prev, vTexCoord + vec2(0.0, px.y)).r;
    float down = texture2D(u_prev, vTexCoord - vec2(0.0, px.y)).r;
    float left = texture2D(u_prev, vTexCoord - vec2(px.x, 0.0)).r;
    float right = texture2D(u_prev, vTexCoord + vec2(px.x, 0.0)).r;

    float up_left = texture2D(u_prev, vTexCoord + vec2(-px.x, px.y)).r;
    float up_right = texture2D(u_prev, vTexCoord + vec2(px.x, px.y)).r;
    float down_left = texture2D(u_prev, vTexCoord + vec2(-px.x, -px.y)).r;
    float down_right = texture2D(u_prev, vTexCoord + vec2(px.x, -px.y)).r;

    //differences in offloading:
    float dif_up = max(0.0, ink - up);
    float dif_down = max(0.0, ink - down);
    float dif_left = max(0.0, ink - left);
    float dif_right = max(0.0, ink - right);

    float dif_ul = max(0.0, ink - up_left);
    float dif_ur = max(0.0, ink - up_right);
    float dif_dl = max(0.0, ink - down_left);
    float dif_dr = max(0.0, ink - down_right);

    //calculate total demand: 
    float total_demand = dif_up + dif_down + dif_left + dif_right + dif_ul + dif_ur + dif_dl + dif_dr;

    //if there is any demand: 
    if(total_demand > 0.0) {

        //offload proportionally. 
        float ink_to_give = min(rate, total_demand);

        //arbitary values like 97%. 
        ink += (dif_up / total_demand) * ink_to_give * -0.97;
        ink += (dif_down / total_demand) * ink_to_give * -0.97;
        ink += (dif_left / total_demand) * ink_to_give * -0.97;
        ink += (dif_right / total_demand) * ink_to_give * -0.97;

        //corners get lesser (ink spreads circularly). 
        ink += (dif_ul / total_demand) * ink_to_give * -0.54;
        ink += (dif_ur / total_demand) * ink_to_give * -0.54;
        ink += (dif_dl / total_demand) * ink_to_give * -0.54;
        ink += (dif_dr / total_demand) * ink_to_give * -0.54;
    }

    //tiny diffusion: 
    if(ink - up > 0.06)
        ink -= 0.01;
    if(ink - down > 0.06)
        ink -= 0.01;
    if(ink - left > 0.06)
        ink -= 0.01;
    if(ink - right > 0.06)
        ink -= 0.01;

        //only give as much as a paper can take.
    ink = clamp(ink, 0.0, capacity);

    // Output in red channel
    gl_FragColor = vec4(ink, 0.0, 0.0, 1.0);
}