import "@babylonjs/core"
import { Scene, Color3 } from "@babylonjs/core";
import "@babylonjs/core/Meshes/meshBuilder";
import { AdvancedDynamicTexture, TextBlock, Button, StackPanel, Control, Rectangle, Grid } from "@babylonjs/gui";
import { Panel, PanelOpts } from "../Panel";
import { PagePanel } from "./pagePanel";

export interface TextWithCallback {
    str: string,
    cb?: () => void; 
}

export class TextStackPanel extends Panel {

    constructor(scene: Scene, titleStr: string, texts: TextWithCallback[], bgColor: Color3 = Panel.panelColor, meshOpts?: PanelOpts) {
        super(scene, bgColor, meshOpts);

        const mainstacker = new StackPanel();
        mainstacker.height = 1
        mainstacker.isVertical = true
        mainstacker.paddingBottom = "40px"
        mainstacker.paddingTop = "40px"
        mainstacker.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM

        const title = new TextBlock(this.name + "-title", titleStr)
        title.textWrapping = true
        title.paddingLeft = 50
        title.paddingRight = 50
        title.alpha = 0.7
        title.fontWeight = "bold"
        title.fontSize = 60
        title.color = "white"
        title.resizeToFit = true
        mainstacker.addControl(title); 


        const rect = new Rectangle(this.name + "-pageContent")
        rect.height = "700px"
        rect.thickness = 0
        // rect.background = "red"

        const contentStacker = new StackPanel(this.name + "-contentStack")
        contentStacker.isVertical = true
        contentStacker.height = "300px"
        // contentStacker.background = "red"
        
        texts.forEach((t) => {

            const content = new TextBlock(this.name + "-text-", t.str)
            content.textWrapping = true
            content.paddingLeft = 0
            content.paddingRight = 0
            content.paddingTop = 5
            content.paddingBottom = 50
            content.alpha = 0.7
            content.fontSize = 50
            content.color = "white"
            content.fontStyle = "italic"
            content.resizeToFit = true
            content.onPointerUpObservable.add(() => t?.cb())

            contentStacker.addControl(content)
        })

        rect.addControl(contentStacker);
        mainstacker.addControl(rect);
        this.uiTexture.addControl(mainstacker)

    }
}