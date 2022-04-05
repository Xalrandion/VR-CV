import "@babylonjs/core"
import { Scene, Color3 } from "@babylonjs/core";
import "@babylonjs/core/Meshes/meshBuilder";
import { AdvancedDynamicTexture, TextBlock, Button, StackPanel, Control, Rectangle, Grid } from "@babylonjs/gui";
import { Panel } from "../Panel";

export interface Topic {
    topic: string
    content: TopicContent[]
}  

export interface TopicContent {
    title: string
    subTitle?: string
    content: string
}

export class TopicPanel extends Panel {


    contentIdx = 0; 
    topic: Topic

    constructor(scene: Scene, topic: Topic, bgColor: Color3 = Panel.panelColor) {
        super(scene, bgColor);

        this.topic = topic;

        const contentStacker = new StackPanel(this.name + "-contentStack")
        contentStacker.isVertical = true
        // contentStacker.adaptHeightToChildren = true
        contentStacker.height = "600px"
        // contentStacker.background = "purple"

        const rect = new Rectangle("d")
        rect.height = "700px"
        rect.thickness = 0
        // rect.background = "red"
        rect.addControl(contentStacker)

        const title = new TextBlock(this.name + "-title", topic.topic)
        title.textWrapping = true
        title.paddingLeft = 50
        title.paddingRight = 50
        title.alpha = 0.7
        title.fontWeight = "bold"
        title.fontSize = 60
        title.color = "white"
        title.resizeToFit = true

        const topicContent = topic.content[this.contentIdx]
        const contentTitle = new TextBlock(this.name + "-contentTitle", topicContent.title)
        contentTitle.textWrapping = true
        contentTitle.paddingLeft = 50
        contentTitle.paddingRight = 50
        contentTitle.paddingBottom = 50
        contentTitle.alpha = 0.7
        contentTitle.fontSize = 50
        contentTitle.fontWeight = "bold"
        contentTitle.color = "white"
        contentTitle.resizeToFit = true

        const contentSub = new TextBlock(this.name + "-contentTitle", topicContent.subTitle ?? "")
        contentSub.textWrapping = true
        contentSub.paddingLeft = 50
        contentSub.paddingRight = 50
        contentSub.alpha = 0.7
        contentSub.fontSize = 40
        contentSub.color = "white"
        contentSub.resizeToFit = true

        const content = new TextBlock(this.name + "-content", topicContent.content)
        content.textWrapping = true
        content.paddingLeft = 50
        content.paddingRight = 50
        content.paddingTop = 10
        content.alpha = 0.7
        content.fontSize = 40
        content.color = "white"
        content.fontStyle = "italic"
        content.height = "400px"
        content.lineSpacing = "4%"


        contentStacker.addControl(contentTitle)
        contentStacker.addControl(contentSub)
        contentStacker.addControl(content)

        const buttonSpacer = new Rectangle(this.name + "button-spacer")
        buttonSpacer.width = "30px"
        buttonSpacer.thickness = 0;


        const button1 = Button.CreateSimpleButton(this.name + "-button-1", "Page suivante →");
        button1.width = "400px";
        button1.height = "130px";
        button1.color = "white";
        button1.fontSize = 50;
        button1.onPointerUpObservable.add(() => {

            const idx = this.nextContentIdx()
            contentTitle.text = this.topic.content[idx].title
            contentSub.text = this.topic.content[idx].subTitle ?? ""
            content.text = this.topic.content[idx].content
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
            contentTitle.text = this.topic.content[idx].title
            contentSub.text = this.topic.content[idx].subTitle ?? ""
            content.text = this.topic.content[idx].content
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
    }

    isLastPage(): boolean {
        return this.contentIdx == this.topic.content.length -1
    }

    isFirstPage(): boolean {
        return this.contentIdx == 0;
    }


    nextContentIdx(): number {
        this.contentIdx += 1;
        if (this.contentIdx >= this.topic.content.length) {
            this.contentIdx = this.topic.content.length - 1;
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