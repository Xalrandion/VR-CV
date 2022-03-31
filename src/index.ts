import "@babylonjs/core/Debug/debugLayer"; // Augments the scene with the debug methods
import "@babylonjs/inspector" // Injects a local ES6 version of the inspector to prevent automatically relying on the none compatible version
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Color3, Vector3 } from "@babylonjs/core/Maths/math";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/loaders/OBJ/objFileLoader"
import { GridMaterial } from "@babylonjs/materials/grid";

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core"
import { CubeTexture, MultiMaterial, SceneLoader, StandardMaterial, Texture, Tools } from "@babylonjs/core";
import { TestPanel } from "./EntitiesGroup/Panel";
import { Station } from "./EntitiesGroup/Station";
import { Player } from "./EntitiesGroup/Player";


async function start() {

    const groundLevel = 2.010;
    const textTEST = "Bonjour, je suis un jeune ingénieur informatique passionné et déterminé à la recherche de défi. J’ai travaillé en tant que développeur backend/devops/mobile depuis mes premières expériences professionnelles, mais malgré une certaine réussite dans ces domaines, après avoir découvert le monde de la réalité virtuelle, j’ai tout arrêté pour m’y initier. \
    Mon objectif est de devenir un expert et de participer à de grand et innovant projet dans le domaine. \
    Actuellement en recherche d’emploi ingénieur, réalité augmenté, réalité virtuelle."
    
    // Get the canvas element from the DOM.
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement; 
    
    // Associate a Babylon Engine to it.
    const engine = new Engine(canvas);
    
    // Create our first scene.
    var scene = new Scene(engine);
    scene.debugLayer.show();
    

    // Parameters : name, position, scene

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
        light.intensity = 0.7;
    
    // Create a grid material
    var material = new GridMaterial("grid", scene);
    
    
    const roomMeshes = await SceneLoader.ImportMeshAsync("", "./room/", "room.obj", scene)
    const room = Mesh.MergeMeshes(roomMeshes.meshes as Mesh[], true, true, undefined, true); 
    room.name = "room"
   //var room = MeshBuilder.CreateBox("room", {width: 11, depth: 49, height: 16, sideOrientation: Mesh.BACKSIDE}, scene);
    room.checkCollisions = true; 
    room.position = new Vector3(0, 10, -5);
    room.rotation.y = Tools.ToRadians(90);
    room.scaling = new Vector3(4, 4, 4)
    
    const roomMat1 = new StandardMaterial("roomMat1", scene);
    roomMat1.diffuseColor = new Color3(1, 0, 0)
    const roomMat2 = new StandardMaterial("roomMat2", scene);
    roomMat2.diffuseColor = new Color3(1, 1, 0)
    roomMat2.alpha = 0.5
    const roomMat3 = new StandardMaterial("roomMat3", scene);
    roomMat3.diffuseColor = new Color3(0, 0, 0)
    const roomMat = new MultiMaterial("roomMat", scene)
    roomMat.subMaterials.push(roomMat1);
    roomMat.subMaterials.push(roomMat2);
    roomMat.subMaterials.push(roomMat3);
    room.subMeshes[1].materialIndex = 1; 
    room.subMeshes[2].materialIndex = 2; 
    
    const roomTex = new Texture("./room/diffuse.png", scene)
    roomTex.hasAlpha = true;
    // roomMat.diffuseTexture = roomTex;
    
    room.material = roomMat;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground = Mesh.CreateGround("ground1", 20, 50, 2, scene);
    ground.checkCollisions = true;
    ground.material = material;


    const player = new Player(scene);
    player.fpsCamera.attachControl(canvas, true);
    await player.initVR(scene, ground);
    
   
    var skybox = MeshBuilder.CreateBox("skyBox", { size: 10000.0 }, scene);
    var skyboxMaterial = new StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    var files = [
        "skybox/sky_down.png",
        "skybox/sky_back.png",
        "skybox/sky_up.png",
        "skybox/sky_front.png",
        "skybox/sky_left.png",
        "skybox/sky_right.png",
    ];
    skyboxMaterial.reflectionTexture = CubeTexture.CreateFromImages(files, scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;	

    const meshes = await SceneLoader.ImportMeshAsync("", "./station/", "station.obj", scene)
    meshes.meshes[0].isVisible = false;
    meshes.meshes[0].name = "baseStationMesh"
    const baseStationMat = new StandardMaterial("baseStationMat", scene)
    baseStationMat.diffuseTexture = new Texture("./station/diffuse.png", scene)
    meshes.meshes[0].material = baseStationMat;

 
    const pan = new TestPanel(scene);
    const station = new Station(scene, pan);

    const pan3 = new TestPanel(scene);
    const station3 = new Station(scene, pan3);

    const pan4 = new TestPanel(scene);
    const station4 = new Station(scene, pan4);

    const pan6 = new TestPanel(scene);
    const station6 = new Station(scene, pan6);
   
    const pan7 = new TestPanel(scene);
    const station7 = new Station(scene, pan7);

    const pan8 = new TestPanel(scene);
    const station8 = new Station(scene, pan8);

    const pan9 = new TestPanel(scene);
    const station9 = new Station(scene, pan9);
    
    scene.registerBeforeRender(() => {
        player.doBeforeRender(scene)

    })

    // scene layout
    station.mesh.position = new Vector3(0, 1, -19)
    station3.mesh.position = new Vector3(3, 1, -14)
    station4.mesh.position = new Vector3(-3, 1, -10)
    station6.mesh.position = new Vector3(3, 1, -6)
    station7.mesh.position = new Vector3(-3, 1, -2)
    station8.mesh.position = new Vector3(3, 1, 2)
    station9.mesh.position = new Vector3(-3, 1, 6)
    

    player.fpsCamera.position = new Vector3(0, groundLevel, -22.48)

    // Render every frame
    engine.runRenderLoop(() => {
        scene.render();
    });
}
start()