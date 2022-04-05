import "@babylonjs/core"
import { Color3, Scene } from "@babylonjs/core";
import "@babylonjs/core/Meshes/meshBuilder";
import { AdvancedDynamicTexture, Image } from "@babylonjs/gui";
import { Panel } from "../Panel";

export class ImagePanel extends Panel {

    constructor(scene: Scene, imagePath: string, bgColor: Color3 = Panel.panelColor) {
        super(scene, bgColor);

        this.material.emissiveColor = new Color3(0, 0, 0); // to make the image appear

        const image = new Image(this.name + "-img", imagePath);
        image.paddingBottom = 50
        image.paddingTop = 50
        image.paddingRight = 50
        image.paddingLeft = 50

        this.uiTexture.addControl(image);

    }
}