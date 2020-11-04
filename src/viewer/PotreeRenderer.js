
export class PotreeRenderer {

	constructor (viewer) {
		this.viewer = viewer;
		this.renderer = viewer.renderer;
	}

	clearTargets(){

	}

	clear(){
		let {viewer, renderer} = this;

		// render skybox
		if(viewer.background === "skybox"){
			renderer.setClearColor(0x000000, 0);
			renderer.clear(true, true, false);
		}else if(viewer.background === "gradient"){
			renderer.setClearColor(0x000000, 0);
			renderer.clear(true, true, false);
		}else if(viewer.background === "black"){
			renderer.setClearColor(0x000000, 1);
			renderer.clear(true, true, false);
		}else if(viewer.background === "white"){
			renderer.setClearColor(0xFFFFFF, 1);
			renderer.clear(true, true, false);
		}else{
			renderer.setClearColor(0x000000, 0);
			renderer.clear(true, true, false);
		}
	}

	render(params){
		let {viewer, renderer} = this;

		const camera = params.camera ? params.camera : viewer.scene.getActiveCamera();

		viewer.dispatchEvent({type: "render.pass.begin",viewer: viewer});

		const renderAreaSize = renderer.getSize(new THREE.Vector2());
		const width = params.viewport ? params.viewport[2] : renderAreaSize.x;
		const height = params.viewport ? params.viewport[3] : renderAreaSize.y;


		for(let pointcloud of this.viewer.scene.pointclouds){
			const {material} = pointcloud;
			material.useEDL = false;
			//material.updateShaderSource();
		}

		const volumes = {
			clipSpheres: viewer.scene.volumes.filter(v => (v instanceof Potree.SphereVolume)),
		}


		viewer.pRenderer.render(viewer.scene.scenePointCloud, camera, null, volumes);

		// render scene
		renderer.render(viewer.scene.scene, camera);

		viewer.dispatchEvent({type: "render.pass.scene",viewer: viewer});

		viewer.dispatchEvent({type: "render.pass.end",viewer: viewer});
	}

}
