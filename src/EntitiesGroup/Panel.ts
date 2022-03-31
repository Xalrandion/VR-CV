import "@babylonjs/core"
import "@babylonjs/core/Meshes/meshBuilder";
import { Animatable, Animation, Color3, Mesh, MeshBuilder, Scene, StandardMaterial } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, ScrollViewer, StackPanel, TextBlock } from "@babylonjs/gui";
import { EntityGroup } from "./EntityGroup";
import { EntitiesGroupManger } from "./EntitiesGroupManger";

const textTEST = "Bonjour, je suis un jeune ingénieur informatique passionné et déterminé à la recherche de défi. J’ai travaillé en tant que développeur backend/devops/mobile depuis mes premières expériences professionnelles, mais malgré une certaine réussite dans ces domaines, après avoir découvert le monde de la réalité virtuelle, j’ai tout arrêté pour m’y initier. \
    Mon objectif est de devenir un expert et de participer à de grand et innovant projet dans le domaine. \
    Actuellement en recherche d’emploi ingénieur, réalité augmenté, réalité virtuelle."


export class Panel extends EntityGroup {

    static animationFramerate = 30;
    static baseEnabledAlpha = 0.8;
    static panelIdx = 0; // as long as the number of pannel stays resonable
    static nextPanelName(): string { this.panelIdx += 1; return `panel-${Panel.panelIdx}` }
    static createPanelBaseMaterial(scene: Scene, panelName: string): StandardMaterial {
        
        const matName = panelName + "-mat"
        const mat = new StandardMaterial(matName, scene);

        mat.useEmissiveAsIllumination = true;
        mat.emissiveColor = new Color3(0, 0, 1);
        mat.alpha = this.baseEnabledAlpha;
        return mat;
    }
    static createPanelFadingAnimation(alpha: number, panelName: string): Animation {

        const anim = new Animation(panelName + "-fadeanim", "visibility", 30, Animation.ANIMATIONTYPE_FLOAT)
        const keyFrame = [];
        keyFrame.push({ frame: 0, value: alpha })
        keyFrame.push({ frame: Panel.animationFramerate * 3, value: 0 })
        anim.setKeys(keyFrame); 

        return anim;
    }

    isEnabled = false
    name: string
    scene: Scene
    mesh: Mesh;
    material: StandardMaterial
    animationHandle: Animatable
    
    constructor(scene: Scene) {

        super()
        this.scene = scene;
        this.name = Panel.nextPanelName();
        this.mesh = MeshBuilder.CreateBox(this.name, { width: 2, height: 1, depth: 0.001 }, scene);
        this.material = Panel.createPanelBaseMaterial(scene, this.name); 
        this.mesh.material = this.material
        this.mesh.animations.push(Panel.createPanelFadingAnimation(this.mesh.material.alpha, this.name));
        EntitiesGroupManger.add(this);
    }

    enable() {
        this.material.alpha = Panel.baseEnabledAlpha;
        if (this.animationHandle) {
            this.animationHandle.stop();
            this.animationHandle = null;
        }
        this.mesh.visibility = Panel.baseEnabledAlpha;
        this.isEnabled = true
    }

    disable() {
        if (this.animationHandle || !this.isEnabled) {
            return;
        }
        this.isEnabled = false
        this.mesh.animations[0].getKeys()[0].value = this.material.alpha;
        this.animationHandle = this.scene.beginAnimation(this.mesh, 0, Panel.animationFramerate * 3, false, 1)
        this.animationHandle.onAnimationEnd = () => {
            this.animationHandle = null; 
        }
    }
}


export class TestPanel extends Panel {

    constructor(scene: Scene) {
        super(scene);

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