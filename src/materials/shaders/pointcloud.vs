
precision highp float;
precision highp int;

#extension GL_EXT_frag_depth : enable

#ifdef USE_LOGDEPTHBUF

	#ifdef USE_LOGDEPTHBUF_EXT

		varying float vFragDepth;
		varying float vIsPerspective;

	#else

		uniform float logDepthBufFC;

	#endif

#endif

attribute float intensity;
varying vec3	vColor;


#define max_clip_polygons 8
#define PI 3.141592653589793

bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}

attribute vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
	vec3 transformed = vec3( position );

	vec4 mvPosition = vec4( transformed, 1.0 );

	#ifdef USE_INSTANCING

		mvPosition = instanceMatrix * mvPosition;

	#endif

	mvPosition = modelViewMatrix * mvPosition;

	gl_Position = projectionMatrix * mvPosition;

	#ifdef USE_LOGDEPTHBUF

		#ifdef USE_LOGDEPTHBUF_EXT

			vFragDepth = 1.0 + gl_Position.w;
			vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );

		#else

			if ( isPerspectiveMatrix( projectionMatrix ) ) {

				gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;

				gl_Position.z *= gl_Position.w;

			}

		#endif

	#endif

	float size = 4.0;

	if (size > 0.) {
        gl_PointSize = size;
    } else {
        gl_PointSize = clamp(-size / gl_Position.w, 3.0, 10.0);
    }

	float i = intensity / 4096.0;
	vColor = vec3(i, i, i);
}
