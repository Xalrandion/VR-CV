import "@babylonjs/core"
import { AbstractMesh, Color3, Material, Mesh, MeshBuilder, Scene, StandardMaterial } from "@babylonjs/core";
import "@babylonjs/core/Meshes/meshBuilder";
import { StackPanel, TextBlock } from "@babylonjs/gui";
import { EntityGroup } from "./EntityGroup";
import { Panel } from "./Panel";
import { ImagePanel } from "./panels/ImagePanel";
import { TextStackPanel, TextWithCallback } from "./panels/TextPanel";

export class WallStation extends EntityGroup {
    
    static baseName = "wallStation"
    static stationIdx = 0; // as long as the number of pannel stays resonable
    static nextStationName(): string { this.stationIdx += 1; return `${WallStation.baseName}-${WallStation.stationIdx}` }
    
    scene: Scene;
    name: string
    mesh: Mesh
    material: StandardMaterial
    displayPanel: ImagePanel
    titlePanel: WallStationTitlePanel

    constructor(scene: Scene, imagePath: string, content: [TextWithCallback, string]) {
        super()

        this.scene = scene;
        this.name = WallStation.nextStationName();
        this.mesh = MeshBuilder.CreateBox(this.name, {width: 1, height: 0.5, depth: 0.05}, scene);
        this.displayPanel = new ImagePanel(scene, imagePath, new Color3(1, 1, 1))
        this.displayPanel.mesh.parent = this.mesh
        this.displayPanel.mesh.position.y = 1.5
        this.displayPanel.mesh.scaling.x = 2
        this.displayPanel.mesh.scaling.y = 2
        this.titlePanel = new WallStationTitlePanel(scene, content)
        this.titlePanel.mesh.parent  = this.mesh
        this.titlePanel.mesh.position.z = -0.04
    }

}

class WallStationTitlePanel extends Panel {

    constructor(scene: Scene, content: [TextWithCallback, string]) {
        super(scene, Panel.panelColor, {width: 0.9, height: 0.4, depth: 0.001})

        const mainstacker = new StackPanel();
        // mainstacker.height = 1
        mainstacker.isVertical = true


        const title = new TextBlock(this.name + `-${WallStation.baseName}-title`, content[0].str)
        title.textWrapping = true
        title.alpha = 0.7
        title.fontSize = 150
        title.color = "white"
        title.height = "200px"
        title.paddingLeft = 10
        title.paddingRight = 10
        title.onPointerUpObservable.add(() => {
            content[0]?.cb()
        })

        const contentTB = new TextBlock(this.name + `-${WallStation.baseName}-contentTB`, content[1])
        contentTB.textWrapping = true
        contentTB.alpha = 0.7
        contentTB.fontSize = 100
        contentTB.color = "white"
        contentTB.fontStyle = "italic"
        contentTB.height = "450px"
        contentTB.paddingLeft = 10
        contentTB.paddingRight = 10

        mainstacker.addControl(title);
        mainstacker.addControl(contentTB);
        
        this.uiTexture.addControl(mainstacker)

    }
}