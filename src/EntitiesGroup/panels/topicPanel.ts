import "@babylonjs/core"
import { Scene, Color3 } from "@babylonjs/core";
import "@babylonjs/core/Meshes/meshBuilder";
import { AdvancedDynamicTexture, TextBlock, Button, StackPanel, Control, Rectangle, Grid } from "@babylonjs/gui";
import { Panel } from "../Panel";
import { PagePanel } from "./pagePanel";

export interface Topic {
    topic: string
    content: TopicContent[]
}  

export interface TopicContent {
    title: string
    subTitle?: string
    content: string
}

export class TopicPanel extends PagePanel {
    
    
    topic: Topic

    constructor(scene: Scene, topic: Topic, bgColor: Color3 = Panel.panelColor) {
        super(scene, bgColor);
        this.topic = topic;
    }

    get numberOfPages(): number {
        return this.topic.content.length;
    }


    genPage(pageIdx: number): [Control, string] {

        const contentStacker = new StackPanel(this.name + "-contentStack")
        contentStacker.isVertical = true
        contentStacker.height = "600px"
        // contentStacker.background = "purple"

        const topicContent = this.topic.content[pageIdx]
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

        return [contentStacker, this.topic.topic]
    }
}