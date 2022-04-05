import "@babylonjs/core"
import { Color3, Material, Mesh, MeshBuilder, PointLight, Scene, ShadowGenerator, StandardMaterial, Vector3 } from "@babylonjs/core";
import "@babylonjs/core/Meshes/meshBuilder";
import { EntitiesGroupManger } from "./EntitiesGroupManger";
import { EntityGroup } from "./EntityGroup";
import { EntityWithBeforeRenderAction } from "./EntityWithBeforeRenderAction";

export class WallLight extends EntityGroup  {

    static readonly defaultColor = new Color3(1, 0.918, 0.761)
    static readonly defaultIntensity = 0.5;

    static wallLightIdx = 0;
    static nextWallLight(): string { this.wallLightIdx += 1; return `wallLight-${this.wallLightIdx}` }
    static createLight(scene: Scene, wallName: string, lightColor: Color3): PointLight {
        const light = new PointLight(wallName + "-light", new Vector3(0, 0, 0), scene);
        light.specular = lightColor;
        light.diffuse = lightColor;
        light.intensity = WallLight.defaultIntensity;

        return light;
    }
    static createMesh(scene: Scene, wallName: string, light: PointLight): Mesh {
        const mesh = MeshBuilder.CreateBox(wallName + "-mesh", { size: 0.5 }, scene);
        mesh.parent = light

        return mesh
    }
    static createMeshMat(scene: Scene, wallName: string): StandardMaterial {

        const mat = new StandardMaterial(wallName + "-mesh-mat", scene); 
        mat.emissiveColor = WallLight.defaultColor;

        return mat
    }


    name: string
    scene: Scene
    mesh: Mesh
    meshMat: StandardMaterial
    light: PointLight

    constructor(scene: Scene, lightColor: Color3 = WallLight.defaultColor) {
        super()

        this.scene = scene;
        this.name = WallLight.nextWallLight();
        this.light = WallLight.createLight(scene, this.name, lightColor);
        this.mesh = WallLight.createMesh(scene, this.name, this.light);
        this.meshMat = WallLight.createMeshMat(scene, this.name)
        this.mesh.material = this.meshMat

        EntitiesGroupManger.add(this)
    }

}