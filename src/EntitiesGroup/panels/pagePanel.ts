import "@babylonjs/core"
import { Scene, Color3 } from "@babylonjs/core";
import "@babylonjs/core/Meshes/meshBuilder";
import { AdvancedDynamicTexture, TextBlock, Button, StackPanel, Control, Rectangle, Grid } from "@babylonjs/gui";
import { Panel } from "../Panel";


interface PageGenerator {
    pageBuilder: (idx: number) => [Control, string]
    pageMax: number
} // controll and title
 
export abstract class PagePanel extends Panel {

    contentIdx = 0;
    
    abstract readonly numberOfPages: number
    abstract genPage(pageIdx: number): [Control, string];

    constructor(scene: Scene, bgColor: Color3) {
        super(scene, bgColor);


        this.uiTexture.onBeginLayoutObservable.addOnce(() => {
            const [page, titleStr] = this.genPage(this.contentIdx);
            const rect = new Rectangle(this.name + "-pageContent")
            rect.height = "700px"
            rect.thickness = 0
            // rect.background = "red"
            rect.addControl(page)

            const title = new TextBlock(this.name + "-title", titleStr)
            title.textWrapping = true
            title.paddingLeft = 50
            title.paddingRight = 50
            title.alpha = 0.7
            title.fontWeight = "bold"
            title.fontSize = 60
            title.color = "white"
            title.resizeToFit = true

            const buttonSpacer = new Rectangle(this.name + "button-spacer")
            buttonSpacer.width = "20px"
            buttonSpacer.thickness = 0


            const button1 = Button.CreateSimpleButton(this.name + "-button-1", "Page suivante →");
            button1.width = "400px";
            button1.height = "130px";
            button1.color = "white";
            button1.fontSize = 50;
            button1.onPointerUpObservable.add(() => {

                const idx = this.nextContentIdx()
                const [page, titleStr] = this.genPage(idx);

                rect.clearControls();
                rect.addControl(page);
                title.text = titleStr;

                button1.isVisible = !this.isLastPage()
                button2.isVisible = !this.isFirstPage()
            });
            button1.isFocusInvisible = true
            button1.isEnabled = true
            button1.isVisible = !this.isLastPage()

            const button2 = Button.CreateSimpleButton(this.name + "-button-2", "←");
            button2.width = "100px";
            button2.height = "130px";
            button2.color = "white";
            button2.fontSize = 50;
            button2.onPointerUpObservable.add(() => {

                const idx = this.prevContentIdx()
                const [page, titleStr] = this.genPage(idx);

                rect.clearControls();
                rect.addControl(page);
                title.text = titleStr;

                button1.isVisible = !this.isLastPage()
                button2.isVisible = !this.isFirstPage()
            });
            button2.isFocusInvisible = true
            button2.isEnabled = true
            button2.isVisible = !this.isFirstPage()

            const constrollStacker = new StackPanel()
            constrollStacker.isVertical = false
            constrollStacker.height = "200px";
            constrollStacker.addControl(button2);
            constrollStacker.addControl(buttonSpacer)
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

            this.uiTexture.addControl(mainstacker);
        })
    }

    isLastPage(): boolean {
        return this.contentIdx == this.numberOfPages - 1;
    }

    isFirstPage(): boolean {
        return this.contentIdx == 0;
    }


    nextContentIdx(): number {
        this.contentIdx += 1;
        if (this.contentIdx >= this.numberOfPages) {
            this.contentIdx = this.numberOfPages - 1;
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