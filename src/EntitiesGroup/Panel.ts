import "@babylonjs/core"
import "@babylonjs/core/Meshes/meshBuilder";
import { Animatable, Animation, Color3, Light, Mesh, MeshBuilder, PointLight, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";
import { EntityGroup } from "./EntityGroup";
import { EntitiesGroupManger } from "./EntitiesGroupManger";
import { AdvancedDynamicTexture } from "@babylonjs/gui";

export type PanelOpts = { width: number, height: number, depth: number }

export class Panel extends EntityGroup {

    static readonly panelColor = new Color3(0.302, 0.329, 0.537);
    static readonly animationFramerate = 30;
    static readonly baseEnabledAlpha = 0.9;
    static readonly baseEnabledLightIntensity = 0.5;
    static readonly basePanelOptions = { width: 2, height: 1.1, depth: 0.001 }
    static panelIdx = 0; // as long as the number of pannel stays resonable
    static nextPanelName(): string { this.panelIdx += 1; return `panel-${Panel.panelIdx}` }
    static createPanelBaseMaterial(scene: Scene, panelName: string, bgColor: Color3): StandardMaterial {
        
        const matName = panelName + "-mat"
        const mat = new StandardMaterial(matName, scene);

        mat.emissiveColor = bgColor;
        mat.diffuseColor = bgColor;
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


    isEnabled = true
    name: string
    scene: Scene
    mesh: Mesh;
    material: StandardMaterial
    animationHandle: Animatable
    lightAnimationHandle: Animatable
    light: PointLight
    uiTexture: AdvancedDynamicTexture
    
    constructor(scene: Scene, bgColor: Color3, meshOptions?: PanelOpts) {

        super()
        this.scene = scene;
        this.name = Panel.nextPanelName();
        this.mesh = MeshBuilder.CreateBox(this.name, meshOptions ?? Panel.basePanelOptions, scene);
        this.material = Panel.createPanelBaseMaterial(scene, this.name, bgColor); 
        this.mesh.material = this.material
        this.light = Panel.createPanelLight(this.name, this.mesh, scene, bgColor);
        
        const [meshAnim, lightAnim] = Panel.createPanelFadingAnimation(this.mesh.material.alpha, this.name)
        this.mesh.animations.push(meshAnim);
        this.light.animations.push(lightAnim);
        this.material.disableLighting = true
        this.uiTexture = AdvancedDynamicTexture.CreateForMeshTexture(this.mesh);
        this.material.emissiveTexture = this.uiTexture;

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
