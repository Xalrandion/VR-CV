import "@babylonjs/core"
import "@babylonjs/core/Meshes/meshBuilder";
import { Animatable, Animation, Color3, Light, Mesh, MeshBuilder, PointLight, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, ScrollViewer, StackPanel, TextBlock } from "@babylonjs/gui";
import { EntityGroup } from "./EntityGroup";
import { EntitiesGroupManger } from "./EntitiesGroupManger";

const textTEST = "Bonjour, je suis un jeune ingénieur informatique passionné et déterminé à la recherche de défi. J’ai travaillé en tant que développeur backend/devops/mobile depuis mes premières expériences professionnelles, mais malgré une certaine réussite dans ces domaines, après avoir découvert le monde de la réalité virtuelle, j’ai tout arrêté pour m’y initier. \
    Mon objectif est de devenir un expert et de participer à de grand et innovant projet dans le domaine. \
    Actuellement en recherche d’emploi ingénieur, réalité augmenté, réalité virtuelle."


export class Panel extends EntityGroup {

    static readonly panelColor = new Color3(0, 0, 1);
    static readonly animationFramerate = 30;
    static readonly baseEnabledAlpha = 0.8;
    static readonly baseEnabledLightIntensity = 0.09;
    static panelIdx = 0; // as long as the number of pannel stays resonable
    static nextPanelName(): string { this.panelIdx += 1; return `panel-${Panel.panelIdx}` }
    static createPanelBaseMaterial(scene: Scene, panelName: string, bgColor: Color3): StandardMaterial {
        
        const matName = panelName + "-mat"
        const mat = new StandardMaterial(matName, scene);

        mat.emissiveColor = bgColor;
        mat.alpha = this.baseEnabledAlpha;
        return mat;
    }
    static createMeshFadingAnimation(alpha: number, panelName: string): Animation {
        const anim = new Animation(panelName + "-fadeanim", "visibility", 30, Animation.ANIMATIONTYPE_FLOAT)
        const keyFrame = [];
        keyFrame.push({ frame: 0, value: alpha })
        keyFrame.push({ frame: Panel.animationFramerate * 3, value: 0 })
        anim.setKeys(keyFrame); 
        return anim;
    }
    static createLightFadingAnimation(panelName: String): Animation {
        const animLight = new Animation(panelName + "-lightfadeanim", "intensity", 30, Animation.ANIMATIONTYPE_FLOAT)
        const keyFrame = [];
        keyFrame.push({ frame: 0, value: Panel.baseEnabledLightIntensity })
        keyFrame.push({ frame: Panel.animationFramerate * 3, value: 0 })
        animLight.setKeys(keyFrame)

        return animLight
    }
    static createPanelFadingAnimation(alpha: number, panelName: string): [Animation, Animation] {

        const anim = Panel.createMeshFadingAnimation(alpha, panelName);
        const animLight = Panel.createLightFadingAnimation(panelName);

        return [anim, animLight];
    }
    static createPanelLight(panelName: string, panelMesh: Mesh, scene: Scene, bgColor: Color3): PointLight {

        const light = new PointLight(panelName + "-light", new Vector3(0, 0, 0), scene);
        light.parent = panelMesh
        light.diffuse = bgColor;
        light.specular = bgColor;
        light.intensity = Panel.baseEnabledLightIntensity

        return light;
    }


    isEnabled = false
    name: string
    scene: Scene
    mesh: Mesh;
    material: StandardMaterial
    animationHandle: Animatable
    lightAnimationHandle: Animatable
    light: PointLight
    
    constructor(scene: Scene, bgColor: Color3 = Panel.panelColor) {

        super()
        this.scene = scene;
        this.name = Panel.nextPanelName();
        this.mesh = MeshBuilder.CreateBox(this.name, { width: 2, height: 1, depth: 0.001 }, scene);
        this.material = Panel.createPanelBaseMaterial(scene, this.name, bgColor); 
        this.mesh.material = this.material
        this.light = Panel.createPanelLight(this.name, this.mesh, scene, bgColor);
        
        const [meshAnim, lightAnim] = Panel.createPanelFadingAnimation(this.mesh.material.alpha, this.name)
        this.mesh.animations.push(meshAnim);
        this.light.animations.push(lightAnim);

        EntitiesGroupManger.add(this);
    }

    enable() {
        this.material.alpha = Panel.baseEnabledAlpha;
        if (this.animationHandle) {
            this.lightAnimationHandle.stop()
            this.animationHandle.stop();
            this.animationHandle = null;
            this.lightAnimationHandle = null;
        }
        this.mesh.visibility = Panel.baseEnabledAlpha;
        this.light.intensity = Panel.baseEnabledLightIntensity
        this.isEnabled = true
        this.light.setEnabled(true);
    }

    disable() {
        if (this.animationHandle || !this.isEnabled) {
            return;
        }
        this.isEnabled = false
        this.mesh.animations[0].getKeys()[0].value = this.material.alpha;
        this.animationHandle = this.scene.beginAnimation(this.mesh, 0, Panel.animationFramerate * 3, false, 1)
        this.lightAnimationHandle = this.scene.beginAnimation(this.light, 0, Panel.animationFramerate * 3, false, 1)
        this.animationHandle.onAnimationEnd = () => {
            this.animationHandle = null; 
        }
    }
}


export class TestPanel extends Panel {

    constructor(scene: Scene, bgColor: Color3= Panel.panelColor) {
        super(scene, bgColor);

        const uiTexture = AdvancedDynamicTexture.CreateForMeshTexture(this.mesh);

        var textBloc1 = new TextBlock(this.name + "-textBloc-1", textTEST)
        textBloc1.textWrapping = true
        textBloc1.paddingLeft = 50
        textBloc1.paddingRight = 50
        textBloc1.alpha = 0.7
        textBloc1.fontWeight = "bold"
        textBloc1.fontSize = 40
        textBloc1.color = "white"
        textBloc1.resizeToFit = true 

        var textBloc2 = new TextBlock(this.name + "-textBloc-2", textTEST)
        textBloc2.textWrapping = true
        textBloc2.paddingLeft = 50
        textBloc2.paddingRight =
            textBloc2.alpha = 0.7
        //textBloc2.fontWeight = "bold"
        textBloc2.fontSize = 40
        textBloc2.color = "red"
        textBloc2.resizeToFit = true

        var button1 = Button.CreateSimpleButton(this.name + "-button-1", "Click Me");
        button1.width = "100px";
        button1.height = "200px";
        button1.color = "white";
        button1.fontSize = 50;
        button1.onPointerUpObservable.add(function () {
            alert("you did it!");
        });
        button1.isFocusInvisible = true
        button1.isEnabled = true

        const stacker = new StackPanel();
        stacker.addControl(textBloc1);
        stacker.addControl(textBloc2)
        stacker.addControl(button1)
        stacker.isVertical = true
        
        const scroller = new ScrollViewer()
        // //move bar programaticly =>  scroller.verticalBar.value = 1
        scroller.paddingBottom = 50
        scroller.paddingLeft = 50
        scroller.paddingRight = 50
        scroller.paddingTop = 50
        scroller.thickness = 0
        scroller.addControl(stacker)

        uiTexture.addControl(scroller);
        this.material.emissiveTexture = uiTexture;
    }
}