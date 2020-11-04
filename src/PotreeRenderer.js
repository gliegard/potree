
import {PointCloudTree} from "./PointCloudTree.js";
import {PointCloudOctreeNode} from "./PointCloudOctree.js";
import {PointCloudArena4DNode} from "./arena4d/PointCloudArena4D.js";
import {PointSizeType, ClipTask, ElevationGradientRepeat} from "./defines.js";

// Copied from three.js: WebGLRenderer.js
function paramThreeToGL(_gl, p) {

	let extension;

	if (p === THREE.RepeatWrapping) return _gl.REPEAT;
	if (p === THREE.ClampToEdgeWrapping) return _gl.CLAMP_TO_EDGE;
	if (p === THREE.MirroredRepeatWrapping) return _gl.MIRRORED_REPEAT;

	if (p === THREE.NearestFilter) return _gl.NEAREST;
	if (p === THREE.NearestMipMapNearestFilter) return _gl.NEAREST_MIPMAP_NEAREST;
	if (p === THREE.NearestMipMapLinearFilter) return _gl.NEAREST_MIPMAP_LINEAR;

	if (p === THREE.LinearFilter) return _gl.LINEAR;
	if (p === THREE.LinearMipMapNearestFilter) return _gl.LINEAR_MIPMAP_NEAREST;
	if (p === THREE.LinearMipMapLinearFilter) return _gl.LINEAR_MIPMAP_LINEAR;

	if (p === THREE.UnsignedByteType) return _gl.UNSIGNED_BYTE;
	if (p === THREE.UnsignedShort4444Type) return _gl.UNSIGNED_SHORT_4_4_4_4;
	if (p === THREE.UnsignedShort5551Type) return _gl.UNSIGNED_SHORT_5_5_5_1;
	if (p === THREE.UnsignedShort565Type) return _gl.UNSIGNED_SHORT_5_6_5;

	if (p === THREE.ByteType) return _gl.BYTE;
	if (p === THREE.ShortType) return _gl.SHORT;
	if (p === THREE.UnsignedShortType) return _gl.UNSIGNED_SHORT;
	if (p === THREE.IntType) return _gl.INT;
	if (p === THREE.UnsignedIntType) return _gl.UNSIGNED_INT;
	if (p === THREE.FloatType) return _gl.FLOAT;

	if (p === THREE.HalfFloatType) {

		extension = extensions.get('OES_texture_half_float');

		if (extension !== null) return extension.HALF_FLOAT_OES;

	}

	if (p === THREE.AlphaFormat) return _gl.ALPHA;
	if (p === THREE.RGBFormat) return _gl.RGB;
	if (p === THREE.RGBAFormat) return _gl.RGBA;
	if (p === THREE.LuminanceFormat) return _gl.LUMINANCE;
	if (p === THREE.LuminanceAlphaFormat) return _gl.LUMINANCE_ALPHA;
	if (p === THREE.DepthFormat) return _gl.DEPTH_COMPONENT;
	if (p === THREE.DepthStencilFormat) return _gl.DEPTH_STENCIL;

	if (p === THREE.AddEquation) return _gl.FUNC_ADD;
	if (p === THREE.SubtractEquation) return _gl.FUNC_SUBTRACT;
	if (p === THREE.ReverseSubtractEquation) return _gl.FUNC_REVERSE_SUBTRACT;

	if (p === THREE.ZeroFactor) return _gl.ZERO;
	if (p === THREE.OneFactor) return _gl.ONE;
	if (p === THREE.SrcColorFactor) return _gl.SRC_COLOR;
	if (p === THREE.OneMinusSrcColorFactor) return _gl.ONE_MINUS_SRC_COLOR;
	if (p === THREE.SrcAlphaFactor) return _gl.SRC_ALPHA;
	if (p === THREE.OneMinusSrcAlphaFactor) return _gl.ONE_MINUS_SRC_ALPHA;
	if (p === THREE.DstAlphaFactor) return _gl.DST_ALPHA;
	if (p === THREE.OneMinusDstAlphaFactor) return _gl.ONE_MINUS_DST_ALPHA;

	if (p === THREE.DstColorFactor) return _gl.DST_COLOR;
	if (p === THREE.OneMinusDstColorFactor) return _gl.ONE_MINUS_DST_COLOR;
	if (p === THREE.SrcAlphaSaturateFactor) return _gl.SRC_ALPHA_SATURATE;

	if (p === THREE.RGB_S3TC_DXT1_Format || p === RGBA_S3TC_DXT1_Format ||
		p === THREE.RGBA_S3TC_DXT3_Format || p === RGBA_S3TC_DXT5_Format) {

		extension = extensions.get('WEBGL_compressed_texture_s3tc');

		if (extension !== null) {

			if (p === THREE.RGB_S3TC_DXT1_Format) return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
			if (p === THREE.RGBA_S3TC_DXT1_Format) return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
			if (p === THREE.RGBA_S3TC_DXT3_Format) return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
			if (p === THREE.RGBA_S3TC_DXT5_Format) return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;

		}

	}

	if (p === THREE.RGB_PVRTC_4BPPV1_Format || p === THREE.RGB_PVRTC_2BPPV1_Format ||
		p === THREE.RGBA_PVRTC_4BPPV1_Format || p === THREE.RGBA_PVRTC_2BPPV1_Format) {

		extension = extensions.get('WEBGL_compressed_texture_pvrtc');

		if (extension !== null) {

			if (p === THREE.RGB_PVRTC_4BPPV1_Format) return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
			if (p === THREE.RGB_PVRTC_2BPPV1_Format) return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
			if (p === THREE.RGBA_PVRTC_4BPPV1_Format) return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
			if (p === THREE.RGBA_PVRTC_2BPPV1_Format) return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;

		}

	}

	if (p === THREE.RGB_ETC1_Format) {

		extension = extensions.get('WEBGL_compressed_texture_etc1');

		if (extension !== null) return extension.COMPRESSED_RGB_ETC1_WEBGL;

	}

	if (p === THREE.MinEquation || p === THREE.MaxEquation) {

		extension = extensions.get('EXT_blend_minmax');

		if (extension !== null) {

			if (p === THREE.MinEquation) return extension.MIN_EXT;
			if (p === THREE.MaxEquation) return extension.MAX_EXT;

		}

	}

	if (p === UnsignedInt248Type) {

		extension = extensions.get('WEBGL_depth_texture');

		if (extension !== null) return extension.UNSIGNED_INT_24_8_WEBGL;

	}

	return 0;

};

let attributeLocations = {
	"position": {name: "position", location: 0},
	"color": {name: "color", location: 1},
	"rgba": {name: "color", location: 1},
	"intensity": {name: "intensity", location: 2},
	"classification": {name: "classification", location: 3},
	"returnNumber": {name: "returnNumber", location: 4},
	"return number": {name: "returnNumber", location: 4},
	"returns": {name: "returnNumber", location: 4},
	"numberOfReturns": {name: "numberOfReturns", location: 5},
	"number of returns": {name: "numberOfReturns", location: 5},
	"pointSourceID": {name: "pointSourceID", location: 6},
	"source id": {name: "pointSourceID", location: 6},
	"point source id": {name: "pointSourceID", location: 6},
	"indices": {name: "indices", location: 7},
	"normal": {name: "normal", location: 8},
	"spacing": {name: "spacing", location: 9},
	"gps-time":  {name: "gpsTime", location: 10},
	"aExtra":  {name: "aExtra", location: 11},
};

class Shader {

	constructor(gl, name, vsSource, fsSource) {
		this.gl = gl;
		this.name = name;
		this.vsSource = vsSource;
		this.fsSource = fsSource;

		this.cache = new Map();

		this.vs = null;
		this.fs = null;
		this.program = null;

		this.uniformLocations = {};
		this.attributeLocations = {};
		this.uniformBlockIndices = {};
		this.uniformBlocks = {};
		this.uniforms = {};

		this.update(vsSource, fsSource);
	}

	update(vsSource, fsSource) {
		this.vsSource = vsSource;
		this.fsSource = fsSource;

		this.linkProgram();
	}

	compileShader(shader, source){
		let gl = this.gl;

		gl.shaderSource(shader, source);

		gl.compileShader(shader);

		let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		if (!success) {
			let info = gl.getShaderInfoLog(shader);
			let numberedSource = source.split("\n").map((a, i) => `${i + 1}`.padEnd(5) + a).join("\n");
			throw `could not compile shader ${this.name}: ${info}, \n${numberedSource}`;
		}
	}

	linkProgram() {

		const tStart = performance.now();

		let gl = this.gl;

		this.uniformLocations = {};
		this.attributeLocations = {};
		this.uniforms = {};

		gl.useProgram(null);

		let cached = this.cache.get(`${this.vsSource}, ${this.fsSource}`);
		if (cached) {
			this.program = cached.program;
			this.vs = cached.vs;
			this.fs = cached.fs;
			this.attributeLocations = cached.attributeLocations;
			this.uniformLocations = cached.uniformLocations;
			this.uniformBlocks = cached.uniformBlocks;
			this.uniforms = cached.uniforms;

			return;
		} else {

			this.vs = gl.createShader(gl.VERTEX_SHADER);
			this.fs = gl.createShader(gl.FRAGMENT_SHADER);
			this.program = gl.createProgram();

			for(let name of Object.keys(attributeLocations)){
				let location = attributeLocations[name].location;
				let glslName = attributeLocations[name].name;
				gl.bindAttribLocation(this.program, location, glslName);
			}

			this.compileShader(this.vs, this.vsSource);
			this.compileShader(this.fs, this.fsSource);

			let program = this.program;

			gl.attachShader(program, this.vs);
			gl.attachShader(program, this.fs);

			gl.linkProgram(program);

			gl.detachShader(program, this.vs);
			gl.detachShader(program, this.fs);

			let success = gl.getProgramParameter(program, gl.LINK_STATUS);
			if (!success) {
				let info = gl.getProgramInfoLog(program);
				throw `could not link program ${this.name}: ${info}`;
			}

			{ // attribute locations
				let numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

				for (let i = 0; i < numAttributes; i++) {
					let attribute = gl.getActiveAttrib(program, i);

					let location = gl.getAttribLocation(program, attribute.name);

					this.attributeLocations[attribute.name] = location;
				}
			}

			{ // uniform locations
				let numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

				for (let i = 0; i < numUniforms; i++) {
					let uniform = gl.getActiveUniform(program, i);

					let location = gl.getUniformLocation(program, uniform.name);

					this.uniformLocations[uniform.name] = location;
					this.uniforms[uniform.name] = {
						location: location,
						value: null,
					};
				}
			}

			// uniform blocks
			if(gl instanceof WebGL2RenderingContext){
				let numBlocks = gl.getProgramParameter(program, gl.ACTIVE_UNIFORM_BLOCKS);

				for (let i = 0; i < numBlocks; i++) {
					let blockName = gl.getActiveUniformBlockName(program, i);

					let blockIndex = gl.getUniformBlockIndex(program, blockName);

					this.uniformBlockIndices[blockName] = blockIndex;

					gl.uniformBlockBinding(program, blockIndex, blockIndex);
					let dataSize = gl.getActiveUniformBlockParameter(program, blockIndex, gl.UNIFORM_BLOCK_DATA_SIZE);

					let uBuffer = gl.createBuffer();
					gl.bindBuffer(gl.UNIFORM_BUFFER, uBuffer);
					gl.bufferData(gl.UNIFORM_BUFFER, dataSize, gl.DYNAMIC_READ);

					gl.bindBufferBase(gl.UNIFORM_BUFFER, blockIndex, uBuffer);

					gl.bindBuffer(gl.UNIFORM_BUFFER, null);

					this.uniformBlocks[blockName] = {
						name: blockName,
						index: blockIndex,
						dataSize: dataSize,
						buffer: uBuffer
					};

				}
			}

			let cached = {
				program: this.program,
				vs: this.vs,
				fs: this.fs,
				attributeLocations: this.attributeLocations,
				uniformLocations: this.uniformLocations,
				uniforms: this.uniforms,
				uniformBlocks: this.uniformBlocks,
			};

			this.cache.set(`${this.vsSource}, ${this.fsSource}`, cached);
		}

		const tEnd = performance.now();
		const duration = tEnd - tStart;

		console.log(`shader compile duration: ${duration.toFixed(3)}`);


	}

	setUniformMatrix4(name, value) {
		const gl = this.gl;
		const location = this.uniformLocations[name];

		if (location == null) {
			return;
		}

		let tmp = new Float32Array(value.elements);
		gl.uniformMatrix4fv(location, false, tmp);
	}

	setUniform1f(name, value) {
		const gl = this.gl;
		const uniform = this.uniforms[name];

		if (uniform === undefined) {
			return;
		}

		if(uniform.value === value){
			return;
		}

		uniform.value = value;

		gl.uniform1f(uniform.location, value);
	}

	setUniformBoolean(name, value) {
		const gl = this.gl;
		const uniform = this.uniforms[name];

		if (uniform === undefined) {
			return;
		}

		if(uniform.value === value){
			return;
		}

		uniform.value = value;

		gl.uniform1i(uniform.location, value);
	}

	setUniformTexture(name, value) {
		const gl = this.gl;
		const location = this.uniformLocations[name];

		if (location == null) {
			return;
		}

		gl.uniform1i(location, value);
	}

	setUniform2f(name, value) {
		const gl = this.gl;
		const location = this.uniformLocations[name];

		if (location == null) {
			return;
		}

		gl.uniform2f(location, value[0], value[1]);
	}

	setUniform3f(name, value) {
		const gl = this.gl;
		const location = this.uniformLocations[name];

		if (location == null) {
			return;
		}

		gl.uniform3f(location, value[0], value[1], value[2]);
	}

	setUniform(name, value) {

		if (value.constructor === THREE.Matrix4) {
			this.setUniformMatrix4(name, value);
		} else if (typeof value === "number") {
			this.setUniform1f(name, value);
		} else if (typeof value === "boolean") {
			this.setUniformBoolean(name, value);
		} else if (value instanceof WebGLTexture) {
			this.setUniformTexture(name, value);
		} else if (value instanceof Array) {

			if (value.length === 2) {
				this.setUniform2f(name, value);
			} else if (value.length === 3) {
				this.setUniform3f(name, value);
			}

		} else {
			console.error("unhandled uniform type: ", name, value);
		}

	}


	setUniform1i(name, value) {
		let gl = this.gl;
		let location = this.uniformLocations[name];

		if (location == null) {
			return;
		}

		gl.uniform1i(location, value);
	}

};

class WebGLTexture {

	constructor(gl, texture) {
		this.gl = gl;

		this.texture = texture;
		this.id = gl.createTexture();

		this.target = gl.TEXTURE_2D;
		this.version = -1;

		this.update(texture);
	}

	update() {

		if (!this.texture.image) {
			this.version = this.texture.version;

			return;
		}

		let gl = this.gl;
		let texture = this.texture;

		if (this.version === texture.version) {
			return;
		}

		this.target = gl.TEXTURE_2D;

		gl.bindTexture(this.target, this.id);

		let level = 0;
		let internalFormat = paramThreeToGL(gl, texture.format);
		let width = texture.image.width;
		let height = texture.image.height;
		let border = 0;
		let srcFormat = internalFormat;
		let srcType = paramThreeToGL(gl, texture.type);
		let data;

		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
		gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha);
		gl.pixelStorei(gl.UNPACK_ALIGNMENT, texture.unpackAlignment);

		if (texture instanceof THREE.DataTexture) {
			data = texture.image.data;

			gl.texParameteri(this.target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(this.target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

			gl.texParameteri(this.target, gl.TEXTURE_MAG_FILTER, paramThreeToGL(gl, texture.magFilter));
			gl.texParameteri(this.target, gl.TEXTURE_MIN_FILTER, paramThreeToGL(gl, texture.minFilter));

			gl.texImage2D(this.target, level, internalFormat,
				width, height, border, srcFormat, srcType,
				data);
		} else if ((texture instanceof THREE.CanvasTexture) || (texture instanceof THREE.Texture)) {
			data = texture.image;

			gl.texParameteri(this.target, gl.TEXTURE_WRAP_S, paramThreeToGL(gl, texture.wrapS));
			gl.texParameteri(this.target, gl.TEXTURE_WRAP_T, paramThreeToGL(gl, texture.wrapT));

			gl.texParameteri(this.target, gl.TEXTURE_MAG_FILTER, paramThreeToGL(gl, texture.magFilter));
			gl.texParameteri(this.target, gl.TEXTURE_MIN_FILTER, paramThreeToGL(gl, texture.minFilter));

			gl.texImage2D(this.target, level, internalFormat,
				internalFormat, srcType, data);

			if (texture instanceof THREE.Texture) {gl.generateMipmap(gl.TEXTURE_2D);}
		}

		gl.bindTexture(this.target, null);

		this.version = texture.version;
	}

};

class WebGLBuffer {

	constructor() {
		this.numElements = 0;
		this.vao = null;
		this.vbos = new Map();
	}

};

export class Renderer {

	constructor(threeRenderer) {
		this.threeRenderer = threeRenderer;
		this.gl = this.threeRenderer.getContext();

		this.buffers = new Map();
		this.shaders = new Map();
		this.textures = new Map();

		this.glTypeMapping = new Map();
		this.glTypeMapping.set(Float32Array, this.gl.FLOAT);
		this.glTypeMapping.set(Uint8Array, this.gl.UNSIGNED_BYTE);
		this.glTypeMapping.set(Uint16Array, this.gl.UNSIGNED_SHORT);

		this.toggle = 0;
	}

	deleteBuffer(geometry) {

		let gl = this.gl;
		let webglBuffer = this.buffers.get(geometry);
		if (webglBuffer != null) {
			for (let attributeName in geometry.attributes) {
				gl.deleteBuffer(webglBuffer.vbos.get(attributeName).handle);
			}
			this.buffers.delete(geometry);
		}
	}

	createBuffer(geometry){
		let gl = this.gl;
		let webglBuffer = new WebGLBuffer();
		webglBuffer.vao = gl.createVertexArray();
		webglBuffer.numElements = geometry.attributes.position.count;

		gl.bindVertexArray(webglBuffer.vao);

		for(let attributeName in geometry.attributes){
			let bufferAttribute = geometry.attributes[attributeName];

			let vbo = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
			gl.bufferData(gl.ARRAY_BUFFER, bufferAttribute.array, gl.STATIC_DRAW);

			let normalized = bufferAttribute.normalized;
			let type = this.glTypeMapping.get(bufferAttribute.array.constructor);

			if(attributeLocations[attributeName] === undefined){
				//attributeLocation = attributeLocations["aExtra"];
			}else{
				let attributeLocation = attributeLocations[attributeName].location;

				gl.vertexAttribPointer(attributeLocation, bufferAttribute.itemSize, type, normalized, 0, 0);
				gl.enableVertexAttribArray(attributeLocation);
			}


			webglBuffer.vbos.set(attributeName, {
				handle: vbo,
				name: attributeName,
				count: bufferAttribute.count,
				itemSize: bufferAttribute.itemSize,
				type: geometry.attributes.position.array.constructor,
				version: 0
			});
		}

		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		gl.bindVertexArray(null);

		let disposeHandler = (event) => {
			this.deleteBuffer(geometry);
			geometry.removeEventListener("dispose", disposeHandler);
		};
		geometry.addEventListener("dispose", disposeHandler);

		return webglBuffer;
	}

	updateBuffer(geometry){
		let gl = this.gl;

		let webglBuffer = this.buffers.get(geometry);

		gl.bindVertexArray(webglBuffer.vao);

		for(let attributeName in geometry.attributes){
			let bufferAttribute = geometry.attributes[attributeName];

			let normalized = bufferAttribute.normalized;
			let type = this.glTypeMapping.get(bufferAttribute.array.constructor);

			let vbo = null;
			if(!webglBuffer.vbos.has(attributeName)){
				vbo = gl.createBuffer();

				webglBuffer.vbos.set(attributeName, {
					handle: vbo,
					name: attributeName,
					count: bufferAttribute.count,
					itemSize: bufferAttribute.itemSize,
					type: geometry.attributes.position.array.constructor,
					version: bufferAttribute.version
				});
			}else{
				vbo = webglBuffer.vbos.get(attributeName).handle;
				webglBuffer.vbos.get(attributeName).version = bufferAttribute.version;
			}

			gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
			gl.bufferData(gl.ARRAY_BUFFER, bufferAttribute.array, gl.STATIC_DRAW);

			if(attributeLocations[attributeName] === undefined){
				//attributeLocation = attributeLocations["aExtra"];
			}else{
				let attributeLocation = attributeLocations[attributeName].location;

				gl.vertexAttribPointer(attributeLocation, bufferAttribute.itemSize, type, normalized, 0, 0);
				gl.enableVertexAttribArray(attributeLocation);
			}
		}

		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		gl.bindVertexArray(null);
	}

	traverse(scene) {

		let octrees = [];

		let stack = [scene];
		while (stack.length > 0) {

			let node = stack.pop();

			if (node instanceof PointCloudTree) {
				octrees.push(node);
				continue;
			}

			let visibleChildren = node.children.filter(c => c.visible);
			stack.push(...visibleChildren);

		}

		let result = {
			octrees: octrees
		};

		return result;
	}



	renderNodes(octree, nodes, visibilityTextureData, camera, target, shader, params) {

		if (exports.measureTimings) performance.mark("renderNodes-start");

		let gl = this.gl;

		let material = params.material ? params.material : octree.material;
		let shadowMaps = params.shadowMaps == null ? [] : params.shadowMaps;
		let view = camera.matrixWorldInverse;
		let worldView = new THREE.Matrix4();

		let mat4holder = new Float32Array(16);

		let i = 0;
		for (let node of nodes) {
			// this.threeRenderer.render(node.sceneNode, camera);
			// continue;
			let world = node.sceneNode.matrixWorld;
			worldView.multiplyMatrices(view, world);


			// TODO consider passing matrices in an array to avoid uniformMatrix4fv overhead
			const lModel = shader.uniformLocations["modelMatrix"];
			if (lModel) {
				mat4holder.set(world.elements);
				gl.uniformMatrix4fv(lModel, false, mat4holder);
			}

			const toto = shader.uniformLocations["logDepthBufFC"];
			gl.uniform1f(toto, false, 2.0 / ( Math.log( camera.far + 1.0 ) / Math.LN2 ));

			const lModelView = shader.uniformLocations["modelViewMatrix"];
			//mat4holder.set(worldView.elements);
			// faster then set in chrome 63
			for(let j = 0; j < 16; j++){
				mat4holder[j] = worldView.elements[j];
			}
			gl.uniformMatrix4fv(lModelView, false, mat4holder);

			const geometry = node.geometryNode.geometry;

			let webglBuffer = null;
			if(!this.buffers.has(geometry)){
				webglBuffer = this.createBuffer(geometry);
				this.buffers.set(geometry, webglBuffer);
			}else{
				webglBuffer = this.buffers.get(geometry);
				for(let attributeName in geometry.attributes){
					let attribute = geometry.attributes[attributeName];

					if(attribute.version > webglBuffer.vbos.get(attributeName).version){
						this.updateBuffer(geometry);
					}
				}
			}

			gl.bindVertexArray(webglBuffer.vao);

			for(const attributeName in geometry.attributes){
				const bufferAttribute = geometry.attributes[attributeName];
				const vbo = webglBuffer.vbos.get(attributeName);


				if(attributeLocations[attributeName] !== undefined){
					const attributeLocation = attributeLocations[attributeName].location;

					let type = this.glTypeMapping.get(bufferAttribute.array.constructor);
					let normalized = bufferAttribute.normalized;

					gl.bindBuffer(gl.ARRAY_BUFFER, vbo.handle);
					gl.vertexAttribPointer(attributeLocation, bufferAttribute.itemSize, type, normalized, 0, 0);
					gl.enableVertexAttribArray(attributeLocation);

				}
			}

			let numPoints = webglBuffer.numElements;
			gl.drawArrays(gl.POINTS, 0, numPoints);

			i++;
		}

		gl.bindVertexArray(null);

		if (exports.measureTimings) {
			performance.mark("renderNodes-end");
			performance.measure("render.renderNodes", "renderNodes-start", "renderNodes-end");
		}
	}

	renderOctree(octree, nodes, camera, target, params = {}){

		let gl = this.gl;

		let material = params.material ? params.material : octree.material;
		let shadowMaps = params.shadowMaps == null ? [] : params.shadowMaps;
		let view = camera.matrixWorldInverse;
		let viewInv = camera.matrixWorld;
		let proj = camera.projectionMatrix;
		let projInv = new THREE.Matrix4().getInverse(proj);
		let worldView = new THREE.Matrix4();

		let shader = null;
		let visibilityTextureData = null;

		let currentTextureBindingPoint = 0;

		{ // UPDATE SHADER AND TEXTURES
			if (!this.shaders.has(material)) {
				let [vs, fs] = [material.vertexShader, material.fragmentShader];
				let shader = new Shader(gl, "pointcloud", vs, fs);

				this.shaders.set(material, shader);
			}

			shader = this.shaders.get(material);

			//if(material.needsUpdate){
			{
				let [vs, fs] = [material.vertexShader, material.fragmentShader];

				let numSnapshots = material.snapEnabled ? material.numSnapshots : 0;
				let numClipBoxes = (material.clipBoxes && material.clipBoxes.length) ? material.clipBoxes.length : 0;
				let numClipSpheres = (params.clipSpheres && params.clipSpheres.length) ? params.clipSpheres.length : 0;
				let numClipPolygons = (material.clipPolygons && material.clipPolygons.length) ? material.clipPolygons.length : 0;

				let defines = [
					`#define num_shadowmaps ${shadowMaps.length}`,
					`#define num_snapshots ${numSnapshots}`,
					`#define num_clipboxes ${numClipBoxes}`,
					`#define num_clipspheres ${numClipSpheres}`,
					`#define num_clippolygons ${numClipPolygons}`,
				];


				if(octree.pcoGeometry.root.isLoaded()){
					let attributes = octree.pcoGeometry.root.geometry.attributes;

					if(attributes["gps-time"]){
						defines.push("#define clip_gps_enabled");
					}

					if(attributes["return number"]){
						defines.push("#define clip_return_number_enabled");
					}

					if(attributes["number of returns"]){
						defines.push("#define clip_number_of_returns_enabled");
					}

					if(attributes["source id"] || attributes["point source id"]){
						defines.push("#define clip_point_source_id_enabled");
					}

				}

				let definesString = defines.join("\n");

				let vsVersionIndex = vs.indexOf("#version ");
				let fsVersionIndex = fs.indexOf("#version ");

				if(vsVersionIndex >= 0){
					vs = vs.replace(/(#version .*)/, `$1\n${definesString}`)
				}else{
					vs = `${definesString}\n${vs}`;
				}

				if(fsVersionIndex >= 0){
					fs = fs.replace(/(#version .*)/, `$1\n${definesString}`)
				}else{
					fs = `${definesString}\n${fs}`;
				}


				shader.update(vs, fs);

				material.needsUpdate = false;
			}
		}

		gl.useProgram(shader.program);



		// gl.disable(gl.BLEND);
		// gl.enable(gl.DEPTH_TEST);
		// gl.depthMask(true);

		gl.frontFace( 2305 );
		gl.disable(3042);
		gl.depthFunc( 515 );
		gl.enable( 2929 );
		gl.colorMask( true, true, true, true );
		gl.disable(2960);
		gl.disable(32823);




		//

		shader.setUniformMatrix4("projectionMatrix", proj);

		this.renderNodes(octree, nodes, visibilityTextureData, camera, target, shader, params);

		// gl.activeTexture(gl.TEXTURE2);
		// gl.bindTexture(gl.TEXTURE_2D, null);
		// gl.activeTexture(gl.TEXTURE0);
	}

	render(scene, camera, target = null, params = {}) {

		const gl = this.gl;

		// camera.updateProjectionMatrix();

		const traversalResult = this.traverse(scene);


		// RENDER
		for (const octree of traversalResult.octrees) {
			let nodes = octree.visibleNodes;
			this.renderOctree(octree, nodes, camera, target, params);
		}


		// CLEANUP
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, null)

		this.threeRenderer.state.reset();
	}
};








