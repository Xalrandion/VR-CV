import "@babylonjs/core"
import { FreeCamera, Mesh, MeshBuilder, Scene, UniversalCamera, Vector3, WebXRDefaultExperience } from "@babylonjs/core";
import "@babylonjs/core/Meshes/meshBuilder";
import { LightFPSKeyboardCameraInput, LightFPSMouseCameraInput } from "../CameraInput/LightFPSCameraInput";
import { EntitiesGroupManger } from "./EntitiesGroupManger";
import { EntityGroup } from "./EntityGroup";
import { EntityWithBeforeRenderAction } from "./EntityWithBeforeRenderAction";
import { Station } from "./Station";

export class Player extends EntityGroup implements EntityWithBeforeRenderAction {


    static createFPSCamera(scene: Scene): FreeCamera {
        const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 2, -10), scene);
        camera.checkCollisions = true
        camera.applyGravity = true
        camera.ellipsoid = new Vector3(1, 1, 2);
        camera.speed = 0.5
        camera.inputs.clear();
        camera.inputs.add(new LightFPSKeyboardCameraInput())
        camera.inputs.add(new LightFPSMouseCameraInput())
        camera.speed = 0.1

        return camera
    }

    static createPlayerTriggerBox(scene: Scene, camera: FreeCamera): Mesh {
        const triggerBox = MeshBuilder.CreateBox("playerTriggerBox", { width: 3, height: 3, depth: 1.5}, scene)
        triggerBox.visibility = 1;
        triggerBox.position.y = 0
        triggerBox.parent = camera;
        triggerBox.checkCollisions = false

        return triggerBox;
    }
    

    name: string
    fpsCamera: FreeCamera
    xrHelper: WebXRDefaultExperience
    triggerBox: Mesh

    constructor(scene: Scene) {
        super()

        this.name = "player";
        this.fpsCamera = Player.createFPSCamera(scene);
        this.triggerBox = Player.createPlayerTriggerBox(scene, this.fpsCamera);   
        EntitiesGroupManger.add(this);     
    }

    async initVR(scene: Scene, ground: Mesh) {
        this.xrHelper = await scene.createDefaultXRExperienceAsync({ floorMeshes: [ground] })
        this.xrHelper.baseExperience.sessionManager.onXRSessionInit.add(() => {
            this.triggerBox.parent = this.xrHelper.baseExperience.camera;
            this.xrHelper.baseExperience.camera.position = this.fpsCamera.position;
        })
        this.xrHelper.baseExperience.sessionManager.onXRSessionEnded.add(() => {
            this.triggerBox.parent = this.fpsCamera;
        })
    }

    handleStationIntersect() {
        const stations = EntitiesGroupManger.findByNameContains(Station.baseName) as Station[]

        stations.forEach((it) => {
            if (this.triggerBox.intersectsMesh(it.triggerBox)) {
                it.panel.enable();
            }
            else {
                it.panel.disable()
            }
        })
    }

    doBeforeRender(scene: Scene): void {

        this.handleStationIntersect();
    }

}