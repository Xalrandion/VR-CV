import "@babylonjs/core"
import { AbstractMesh, Color3, Mesh, MeshBuilder, Scene, StandardMaterial } from "@babylonjs/core";
import "@babylonjs/core/Meshes/meshBuilder";
import { EntitiesGroupManger } from "./EntitiesGroupManger";
import { EntityGroup } from "./EntityGroup";
import { EntityWithBeforeRenderAction } from "./EntityWithBeforeRenderAction";
import { Panel } from "./Panel";

export class Station extends EntityGroup{

    static baseName = "station"
    static stationIdx = 0; // as long as the number of pannel stays resonable
    static nextStationName(): string { this.stationIdx += 1; return `${Station.baseName}-${Station.stationIdx}` }

    name: string
    mesh: AbstractMesh
    panel: Panel
    scene: Scene
    material: StandardMaterial
    collisionBox: Mesh
    readonly height = 0.7

    constructor(scene: Scene, panel: Panel) {
        super()

        this.scene = scene;
        this.name = Station.nextStationName();
       
       // this.mesh = MeshBuilder.CreateBox(this.name, { width: 1, height: this.height, depth: 0.5 }, scene);
        this.mesh = scene.getMeshByName("baseStationMesh").clone(this.name, null)
        this.mesh.isVisible = true
        this.mesh.checkCollisions = false
        this.collisionBox = MeshBuilder.CreateBox(this.name + "colBox", {width: 1.2, height: 1.2, depth: 0.8}, scene)
        this.collisionBox.parent = this.mesh
        this.collisionBox.checkCollisions = true
        this.collisionBox.isVisible = false
        // this.material = new StandardMaterial(this.name + "-mat", scene);
        // this.material.diffuseColor = new Color3(1, 0, 0)
        // this.mesh.material = this.material; 
        
        this.panel = panel;
        this.panel.mesh.parent = this.mesh;
        this.panel.mesh.position.y = 1.5
    
        EntitiesGroupManger.add(this);
    }
}