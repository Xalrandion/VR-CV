import "@babylonjs/core"
import { Scene, Color3 } from "@babylonjs/core";
import "@babylonjs/core/Meshes/meshBuilder";
import { AdvancedDynamicTexture, TextBlock, Button, StackPanel, Control, Rectangle, Grid } from "@babylonjs/gui";
import { strings } from "../../Strings";
import { Panel } from "../Panel";
import { PagePanel } from "./pagePanel";

export class WelcomePanel extends PagePanel {

    constructor(scene: Scene, bgColor: Color3 = Panel.panelColor) {
        super(scene, bgColor);
    }

    get numberOfPages(): number {
        return 3
    }


    genPage(pageIdx: number): [Control, string] {


        if (pageIdx == 0) {
            return this.genPage0();
        }
        if (pageIdx == 1) {
            return this.genPage1();
        }
        return this.genPage2();
    }

    genPage0(): [Control, string] {
        const content = this.genFullTextControl(strings.singleStrings.welcomePanelText1);

        return [content, strings.singleStrings.welcomePanelTitle];
    }

    genPage1(): [Control, string] {
        const content = this.genFullTextControl(strings.singleStrings.welcomePanelText2);

        return [content, strings.singleStrings.welcomePanelTitle];
    }

    genPage2(): [Control, string] {

        const contentStacker = new StackPanel(this.name + "-contentStack")
        contentStacker.isVertical = true
        contentStacker.height = "600px"

        const commandsTB = new TextBlock(this.name + "-content", "←↑↓→ ou wasd pour se déplacer")
        commandsTB.textWrapping = true
        commandsTB.paddingLeft = 50
        commandsTB.paddingRight = 50
        commandsTB.paddingBottom = 20
        commandsTB.alpha = 0.7
        commandsTB.fontSize = 40
        commandsTB.color = "white"
        commandsTB.fontStyle = "italic"
        commandsTB.height = "150px"
        commandsTB.lineSpacing = "4%"

        const cameraTB = new TextBlock(this.name + "-content", "maintenez le clic de molette pour bouger la camera")
        cameraTB.textWrapping = true
        cameraTB.paddingLeft = 50
        cameraTB.paddingRight = 50
        cameraTB.paddingBottom = 20
        cameraTB.alpha = 0.7
        cameraTB.fontSize = 40
        cameraTB.color = "white"
        cameraTB.fontStyle = "italic"
        cameraTB.height = "150px"
        cameraTB.lineSpacing = "4%"

        const vrTB = new TextBlock(this.name + "-content", "si disponible, cliquez sur l'icone de casque en bas a droite pour passez en VR")
        vrTB.textWrapping = true
        vrTB.paddingLeft = 50
        vrTB.paddingRight = 50
        vrTB.paddingBottom = 20
        vrTB.alpha = 0.7
        vrTB.fontSize = 40
        vrTB.color = "white"
        vrTB.fontStyle = "italic"
        vrTB.height = "150px"
        vrTB.lineSpacing = "4%"

        const arrowTB = new TextBlock(this.name + "-content", "vous pouvez aussi cliquez sur ↗ pour acceder au contenu associé")
        arrowTB.textWrapping = true
        arrowTB.paddingLeft = 50
        arrowTB.paddingRight = 50
        arrowTB.paddingBottom = 20
        arrowTB.alpha = 0.7
        arrowTB.fontSize = 40
        arrowTB.color = "white"
        arrowTB.fontStyle = "italic"
        arrowTB.height = "150px"
        arrowTB.lineSpacing = "4%"

        contentStacker.addControl(commandsTB)
        contentStacker.addControl(cameraTB)
        contentStacker.addControl(vrTB)
        contentStacker.addControl(arrowTB)
        return [contentStacker, "Naviguer dans mon CV virtuel:"]
    }

    genFullTextControl(str: string) {
        const content = new TextBlock(this.name + "-content", str)
        content.textWrapping = true
        content.paddingLeft = 50
        content.paddingRight = 50
        content.paddingTop = 10
        content.alpha = 0.7
        content.fontSize = 40
        content.color = "white"
        content.fontStyle = "italic"
        content.height = "650px"
        content.lineSpacing = "4%"

        return content;
    }

}