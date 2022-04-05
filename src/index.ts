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
import { AbstractMesh, CubeTexture, MultiMaterial, PointLight, SceneLoader, ShadowGenerator, SpotLight, StandardMaterial, Texture, Tools } from "@babylonjs/core";
import { Station } from "./EntitiesGroup/Station";
import { Player } from "./EntitiesGroup/Player";
import { WallLight } from "./EntitiesGroup/WallLight";
import { TestPanel } from "./EntitiesGroup/panels/testPanel";
import { ImagePanel } from "./EntitiesGroup/panels/ImagePanel";
import { Topic, TopicPanel } from "./EntitiesGroup/panels/topicPanel";
import { strings } from "./Strings";
import { TextStackPanel } from "./EntitiesGroup/panels/TextPanel";
import { WelcomePanel } from "./EntitiesGroup/panels/WelcomePanel";
import { WallStation } from "./EntitiesGroup/WallStation";


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
    // var light = new HemisphericLight("light1", new Vector3(0, -1, 0), scene);
    // light.intensity = 1;
    
    const shadowCasters: AbstractMesh[] = []
   

    const light1 = new WallLight(scene)
    light1.light.position = new Vector3(7.5, 4, 0);

    const light2 = new WallLight(scene)
    light2.light.position = new Vector3(7.5, 4, -17);

    const light3 = new WallLight(scene)
    light3.light.position = new Vector3(-7.7, 4, -11);

    const light4 = new WallLight(scene)
    light4.light.position = new Vector3(-7.7, 4, 11);

    const lights: PointLight[] = [light1.light, light2.light, light3.light, light4.light]
    // Create a grid material

    
    
    const roomMeshes = await SceneLoader.ImportMeshAsync("", "./room/", "room.obj", scene)
    const room = Mesh.MergeMeshes(roomMeshes.meshes as Mesh[], true, true, undefined, true); 
    room.name = "room"
   //var room = MeshBuilder.CreateBox("room", {width: 11, depth: 49, height: 16, sideOrientation: Mesh.BACKSIDE}, scene);
    room.checkCollisions = true; 
    room.position = new Vector3(0, 10, -5);
    room.rotation.y = Tools.ToRadians(90);
    room.scaling = new Vector3(4, 4, 4)
    
    const roomMat1 = new StandardMaterial("roomMat1", scene);

    const roomMat1Diffuse = new Texture("./walls/diffuse.jpg", scene)
    roomMat1Diffuse.wAng = Tools.ToRadians(90)
    roomMat1Diffuse.uScale = 30
    roomMat1Diffuse.vScale = 30
    roomMat1.diffuseColor = new Color3(0.663, 0.753, 0.925)
    roomMat1.diffuseTexture = roomMat1Diffuse

    const roomMat1Specular = new Texture("./walls/roughness.jpg", scene)
    roomMat1Specular.wAng = Tools.ToRadians(90)
    roomMat1Specular.uScale = 30
    roomMat1Specular.vScale = 30
    roomMat1.specularTexture = roomMat1Specular;

    const roomMat1Amb = new Texture("./walls/ambientOcclusion.jpg", scene)
    roomMat1Amb.wAng = Tools.ToRadians(90)
    roomMat1Amb.uScale = 30
    roomMat1Amb.vScale = 30
    roomMat1.ambientTexture = roomMat1Amb;
    const roomMat1Normal = new Texture("./walls/normal.jpg", scene)
    roomMat1Normal.wAng = Tools.ToRadians(90)
    roomMat1Normal.uScale = 30
    roomMat1Normal.vScale = 30
    roomMat1.bumpTexture = roomMat1Normal
    roomMat1.invertNormalMapX = true
    roomMat1.invertNormalMapY = true


    const roomMat2 = new StandardMaterial("roomMat2", scene);
    roomMat2.diffuseColor = new Color3(0, 0.420, 1);
    roomMat2.specularColor = new Color3(0, 0.420, 1);
    roomMat2.specularPower = 128;
    roomMat2.alpha = 0.5
    const roomMat3 = new StandardMaterial("roomMat3", scene);
    roomMat3.diffuseColor = new Color3(0.298, 0.298, 0.298)
    roomMat3.specularPower = 128
    roomMat3.specularColor = new Color3()
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
    const ground = Mesh.CreateGround("ground", 17, 40, 2, scene);
    ground.position.z = -5
    ground.receiveShadows = true
    const groundMat = new StandardMaterial("groundMat", scene);

    const grounddiffuse = new Texture("./floor/diffuse.jpg", scene)
    grounddiffuse.uScale = 22
    grounddiffuse.vScale = 35
    groundMat.diffuseTexture = grounddiffuse

    const groundAmb = new Texture("./floor/ambientOcclusion.jpg", scene)
    groundAmb.uScale = 22
    groundAmb.vScale = 35
    groundMat.ambientTexture = groundAmb;
    const groundNormal = new Texture("./floor/normal.jpg", scene)
    groundNormal.uScale = 22
    groundNormal.vScale = 35
    groundMat.bumpTexture = groundNormal
    groundMat.invertNormalMapX = true
    groundMat.invertNormalMapY = true
    ground.checkCollisions = true;
    ground.material = groundMat;


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
    baseStationMat.bumpTexture = new Texture("./station/normal.png", scene)
    // baseStationMat.diffuseColor = new Color3(1, 1, 1)
    meshes.meshes[0].material = baseStationMat;

    const pan = new WelcomePanel(scene);
    const station = new Station(scene, pan);

    const pan3 = new TopicPanel(scene, strings.topics.experiences);
    const station3 = new Station(scene, pan3);

    const pan4 = new TopicPanel(scene, strings.topics.skills);
    const station4 = new Station(scene, pan4);

    const pan6 = new TopicPanel(scene, strings.topics.education);
    const station6 = new Station(scene, pan6);
   
    const pan7 = new TopicPanel(scene, strings.topics.languages);
    const station7 = new Station(scene, pan7);

    const pan8 = new TextStackPanel(scene, strings.singleStrings.contactPanelTitle, strings.contact);
    const station8 = new Station(scene, pan8);

    const pan9 = new TextStackPanel(scene, "", strings.watchProjectStation);
    const station9 = new Station(scene, pan9);

    shadowCasters.push(station.mesh)
    shadowCasters.push(station3.mesh)
    shadowCasters.push(station4.mesh)
    shadowCasters.push(station6.mesh)
    shadowCasters.push(station7.mesh)
    shadowCasters.push(station8.mesh)
    shadowCasters.push(station9.mesh)

    const pan1 = new WallStation(scene, "./projects/view3.png", [strings.projects.view3.title, strings.projects.view3.desc]);
    pan1.mesh.position = new Vector3(-8, 1.4, -5.5)
    pan1.mesh.rotation.y = Tools.ToRadians(270)

    const pan2 = new WallStation(scene, "./projects/raytracer.png", [strings.projects.raytracing.title, strings.projects.raytracing.desc]);
    pan2.mesh.position = new Vector3(-8, 1.4, 5.5)
    pan2.mesh.rotation.y = Tools.ToRadians(270)

    const pan11 = new WallStation(scene, "./projects/vrcv.png", [strings.projects.vrcv.title, strings.projects.vrcv.desc]);
    pan11.mesh.position = new Vector3(7.9, 1.4, 5.5)
    pan11.mesh.rotation.y = Tools.ToRadians(90)
    
    // const pan12 = new WallStation(scene, "./station/diffuse.png");
    // pan12.mesh.position = new Vector3(7.9, 1.4, -5.5)
    // pan12.mesh.rotation.y = Tools.ToRadians(90)


    // const randomBox = MeshBuilder.CreateBox("randomBox", {size: 1}, scene);
    // const wallSpotLight = new PointLight("pointLight", new Vector3(6, 5, 0), scene);
    // wallSpotLight.intensity = 10
    // var ddd = new SpotLight("spotLight", new Vector3(0, 1, -10), new Vector3(0, -1, 0), Math.PI / 3, 2, scene);
    // randomBox.parent = wallSpotLight;

    scene.registerBeforeRender(() => {
        player.doBeforeRender(scene)

    })

    // scene layout
    station.mesh.position = new Vector3(0, 0.5, -19)
    station3.mesh.position = new Vector3(3, 0.5, -14)
    station4.mesh.position = new Vector3(-3, 0.5, -10)
    station6.mesh.position = new Vector3(3, 0.5, -6)
    station7.mesh.position = new Vector3(-3, 0.5, -2)
    station8.mesh.position = new Vector3(3, 0.5, 2)
    station9.mesh.position = new Vector3(-3, 0.5, 6)
    

    player.fpsCamera.position = new Vector3(0, groundLevel, -22.48)

    lights.forEach((l) => {
        const shadowgen = new ShadowGenerator(1024, l); 
        shadowgen.getShadowMap().renderList.push(...shadowCasters);
    })

    // Render every frame
    engine.runRenderLoop(() => {
        scene.render();
    });
}
start()