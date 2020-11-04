precision highp float;
precision highp int;

#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	#extension GL_EXT_frag_depth : enable

	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;

#endif

varying vec3	vColor;

void main() {
	#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	// Doing a strict comparison with == 1.0 can cause noise artifacts
	// on some platforms. See issue #17623.
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;

	#endif

	// circular point rendering
    if(length(gl_PointCoord - 0.5) > 0.5){
        discard;
    }
	gl_FragColor = vec4(vColor, 1.0);
}


