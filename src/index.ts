import "@babylonjs/core/Debug/debugLayer"; // Augments the scene with the debug methods
import "@babylonjs/inspector" // Injects a local ES6 version of the inspector to prevent automatically relying on the none compatible version
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Color3, Vector3 } from "@babylonjs/core/Maths/math";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

import { GridMaterial } from "@babylonjs/materials/grid";

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core"
import { ActionManager, Animatable, Animation, StandardMaterial } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, ScrollViewer, StackPanel, TextBlock } from "@babylonjs/gui";
import { LightFPSKeyboardCameraInput, LightFPSMouseCameraInput } from "./LightFPSCameraInput";

async function start() {

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
    var camera = new UniversalCamera("UniversalCamera", new Vector3(0, 2, -10), scene);
    camera.checkCollisions = true
    camera.applyGravity = true
    camera.ellipsoid = new Vector3(1, 1, 2);
    camera.speed = 0.5
    camera.inputs.clear();
    camera.inputs.add(new LightFPSKeyboardCameraInput())
    camera.inputs.add(new LightFPSMouseCameraInput())
    camera.speed = 0.1
    
    var player = MeshBuilder.CreateBox("playerMesh", {size: 2}, scene)
    // player.checkCollisions = true
    player.parent = camera
     
    // // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
    
    // Create a grid material
    var material = new GridMaterial("grid", scene);
    
    
    var room = MeshBuilder.CreateBox("room", {width: 11, depth: 49, height: 16, sideOrientation: Mesh.BACKSIDE}, scene);
    room.checkCollisions = true; 
    room.position = new Vector3(0, 2.7, 0);
    var rommMat = new StandardMaterial("roomMat", scene);
    
    var randomBox = MeshBuilder.CreateBox("randBox", { size: 3}, scene)
    randomBox.position.z =  5
    randomBox.position.y = 3/2
    var randBoxMat = new StandardMaterial("randBoxMat", scene)
    randBoxMat.diffuseColor = new Color3(1, 0, 0)
    randomBox.material = randBoxMat
    
    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground = Mesh.CreateGround("ground1", 12, 50, 2, scene);
    ground.checkCollisions = true;
    var vrHelper = await scene.createDefaultXRExperienceAsync({ floorMeshes: [ground]})
    // Affect a material
    ground.material = material;
    
    var station = MeshBuilder.CreateBox("station1", { width: 1, height: 0.7, depth: 0.5 }, scene);
    station.position.y = 1
    var stationTriggerArea = MeshBuilder.CreateBox("stationTrigger1", {width: 1, height: 1, depth: 3}, scene);
    stationTriggerArea.parent = station;
    stationTriggerArea.visibility = 0
    stationTriggerArea.position.z = -2
    
    var panelMat = new StandardMaterial("panelMat", scene);
    panelMat.useEmissiveAsIllumination = true;
    panelMat.emissiveColor = new Color3(0, 0, 1);
    
    panelMat.alpha = 0.8
    
    
    
    var panel = MeshBuilder.CreateBox("pannel1", { width: 2, height: 1, depth: 0.001 }, scene)
    panel.parent = station;
    panel.position.y = 1.5
    
    
    var texText = AdvancedDynamicTexture.CreateForMeshTexture(panel);
    // panelMat.diffuseTexture = texText;
    panelMat.emissiveTexture = texText
    panel.material = panelMat;
    
    var texTextBloc = new TextBlock("textTexText", textTEST)
    texTextBloc.textWrapping = true
    texTextBloc.paddingLeft = 50
    texTextBloc.paddingRight = 50
    texTextBloc.alpha = 0.7
    texTextBloc.fontWeight = "bold"
    texTextBloc.fontSize = 40
    texTextBloc.color = "white"
    texTextBloc.resizeToFit = true 
    
    var texTextBloc2 = new TextBlock("textTexText", textTEST)
    texTextBloc2.textWrapping = true
    texTextBloc2.paddingLeft = 50
    texTextBloc2.paddingRight = 
    texTextBloc2.alpha = 0.7
    //texTextBloc2.fontWeight = "bold"
    texTextBloc2.fontSize = 40
    texTextBloc2.color = "red"
    texTextBloc2.resizeToFit = true
    
    var button1 = Button.CreateSimpleButton("but1", "Click Me");
    button1.width = "100px";
    button1.height = "200px";
    button1.color = "white";
    button1.fontSize = 50;
    button1.onPointerUpObservable.add(function () {
        alert("you did it!");
    });
    button1.isFocusInvisible = true
    button1.isEnabled = true
    
    const scroller = new ScrollViewer()
    // //move bar programaticly
    const stacker = new StackPanel();
    scroller.paddingBottom = 50
    scroller.paddingLeft = 50
    scroller.paddingRight = 50
    scroller.paddingTop = 50
    // scroller.isHitTestVisible = true
    // scroller.isFocusInvisible = false
    
    
    
    stacker.addControl(texTextBloc);
    stacker.addControl(texTextBloc2)
    stacker.addControl(button1)
    scroller.addControl(stacker)
    scroller.thickness = 0
    
    stacker.isVertical = true
    texText.addControl(scroller);
    panel.actionManager = new ActionManager(scene)
    
    const fadePanel = new Animation("fadePanel", "visibility", 30, Animation.ANIMATIONTYPE_FLOAT)
    const keyframe = [];
    keyframe.push({frame: 0, value: 0.7})
    keyframe.push({ frame: 30 * 3, value: 0 })
    fadePanel.setKeys(keyframe); 
    panel.animations.push(fadePanel);
    
    var pannelEnabled = false
    var pannelAnimationRunning = false
    var pannelAnim: Animatable = null
    
    scene.registerBeforeRender(() => {
    
    //     scroller.verticalBar.value = 1
        if (player.intersectsMesh(stationTriggerArea)) {
            if (pannelAnimationRunning) {
                pannelAnim.stop()
            }
            panel.visibility = 0.8
            pannelEnabled = true
            
        }
        else {
            if (!pannelAnimationRunning && pannelEnabled) {
                pannelAnimationRunning = true
                pannelAnim = scene.beginAnimation(panel, 0, 3 * 30, false, 1, () => {pannelAnimationRunning = false; pannelEnabled = false})
            }
            // panel.visibility = 0;
            // subPanel.visibility = 0
        }
    
    })
    
    
    
    
    
    // Render every frame
    engine.runRenderLoop(() => {
        scene.render();
    });
}
start()