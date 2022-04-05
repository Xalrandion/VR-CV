import "@babylonjs/core"
import { Scene, Color3 } from "@babylonjs/core";
import "@babylonjs/core/Meshes/meshBuilder";
import { AdvancedDynamicTexture, TextBlock, Button, StackPanel, Control, Rectangle, Grid } from "@babylonjs/gui";
import { Panel } from "../Panel";


type PageGenerator = () => [Control, string]; // controll and title
 
export class PagePanel extends Panel {


    contentIdx = 0;
    pageGenerators: PageGenerator[]

    constructor(scene: Scene, pageGens: PageGenerator[] ,bgColor: Color3 = Panel.panelColor) {
        super(scene, bgColor);

        const uiTexture = AdvancedDynamicTexture.CreateForMeshTexture(this.mesh);
        this.pageGenerators = pageGens;

        const [control, titlestr] = pageGens[0]();

        const rect = new Rectangle("d")
        rect.height = "700px"
        rect.thickness = 0
        // rect.background = "red"
        rect.addControl(control)

        const title = new TextBlock(this.name + "-title", titlestr)
        title.textWrapping = true
        title.paddingLeft = 50
        title.paddingRight = 50
        title.alpha = 0.7
        title.fontWeight = "bold"
        title.fontSize = 60
        title.color = "white"
        title.resizeToFit = true

        var button1 = Button.CreateSimpleButton(this.name + "-button-1", "Next");
        button1.width = "100px";
        button1.height = "170px";
        button1.color = "white";
        button1.fontSize = 50;
        button1.onPointerUpObservable.add(() => {

            const idx = this.nextContentIdx()
            const [control, titlestr] = pageGens[idx]();
            rect.clearControls()
            rect.addControl(control)
            title.text = titlestr
        });
        button1.isFocusInvisible = true
        button1.isEnabled = true

        var button2 = Button.CreateSimpleButton(this.name + "-button-2", "Prev");
        button2.width = "100px";
        button2.height = "170px";
        button2.color = "white";
        button2.fontSize = 50;
        button2.onPointerUpObservable.add(() => {

            const idx = this.prevContentIdx()
            const [control, titlestr] = pageGens[idx]();
            rect.clearControls()
            rect.addControl(control)
            title.text = titlestr
        });
        button2.isFocusInvisible = true
        button2.isEnabled = true

        const constrollStacker = new StackPanel()
        constrollStacker.isVertical = false
        constrollStacker.height = "200px";
        constrollStacker.addControl(button2);
        constrollStacker.addControl(button1);

        const mainstacker = new StackPanel();
        mainstacker.height = 1
        mainstacker.isVertical = true
        mainstacker.paddingBottom = "40px"
        mainstacker.paddingTop = "40px"
        mainstacker.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM

        mainstacker.addControl(title)
        mainstacker.addControl(rect);
        mainstacker.addControl(constrollStacker);

        uiTexture.addControl(mainstacker);
        this.material.emissiveTexture = uiTexture;
    }

    isLastPage(): boolean {
        return this.contentIdx == this.pageGenerators.length - 1
    }


    nextContentIdx(): number {
        this.contentIdx += 1;
        if (this.contentIdx >= this.pageGenerators.length) {
            this.contentIdx = this.pageGenerators.length - 1;
        }
        return this.contentIdx;
    }

    prevContentIdx(): number {

        this.contentIdx -= 1;
        if (this.contentIdx < 0) {
            this.contentIdx = 0
        }
        return this.contentIdx;
    }
}