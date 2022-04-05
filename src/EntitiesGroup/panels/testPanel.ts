import "@babylonjs/core"
import { Scene, Color3 } from "@babylonjs/core";
import "@babylonjs/core/Meshes/meshBuilder";
import { AdvancedDynamicTexture, TextBlock, Button, StackPanel, Control, Rectangle, Grid } from "@babylonjs/gui";
import { Panel } from "../Panel";

const textTEST = "Bonjour, je suis un jeune ingénieur informatique passionné et déterminé à la recherche de défi. J’ai travaillé en tant que développeur backend/devops/mobile depuis mes premières expériences professionnelles, mais malgré une certaine réussite dans ces domaines, après avoir découvert le monde de la réalité virtuelle, j’ai tout arrêté pour m’y initier. \
    Mon objectif est de devenir un expert et de participer à de grand et innovant projet dans le domaine. \
    Actuellement en recherche d’emploi ingénieur, réalité augmenté, réalité virtuelle."

const textTest2 = "If you can see this well it workded"

const txtes = [textTEST, textTest2]
var txtesidx = 0;


export class TestPanel extends Panel {


    constructor(scene: Scene, bgColor: Color3 = Panel.panelColor) {
        super(scene, bgColor);

        const uiTexture = AdvancedDynamicTexture.CreateForMeshTexture(this.mesh);

        var textBloc1 = new TextBlock(this.name + "-textBloc-1", textTEST)
        textBloc1.textWrapping = true
        textBloc1.paddingLeft = 50
        textBloc1.paddingRight = 50
        textBloc1.alpha = 0.7
        textBloc1.fontWeight = "bold"
        textBloc1.fontSize = 40
        textBloc1.color = "white"
        textBloc1.resizeToFit = true

        var textBloc2 = new TextBlock(this.name + "-textBloc-2", textTEST)
        textBloc2.textWrapping = true
        textBloc2.paddingLeft = 50
        textBloc2.paddingRight = 50
        textBloc2.alpha = 0.7
        textBloc2.fontWeight = "bold"
        textBloc2.fontSize = 40
        textBloc2.color = "red"
        textBloc2.resizeToFit = true


        var button1 = Button.CreateSimpleButton(this.name + "-button-1", "Next");
        button1.width = "100px";
        button1.height = "170px";
        button1.color = "white";
        button1.fontSize = 50;
        button1.onPointerUpObservable.add(function () {

            txtesidx += 1
            if (txtesidx >= txtes.length) txtesidx = 0;
            textBloc1.text = txtes[txtesidx]
        });
        button1.isFocusInvisible = true
        button1.isEnabled = true

        var button2 = Button.CreateSimpleButton(this.name + "-button-2", "Prev");
        button2.width = "100px";
        button2.height = "170px";
        button2.color = "white";
        button2.fontSize = 50;
        button2.onPointerUpObservable.add(function () {

            txtesidx -= 1
            if (txtesidx < 0) txtesidx = txtes.length - 1;
            textBloc1.text = txtes[txtesidx];
        });
        button2.isFocusInvisible = true
        button2.isEnabled = true

        const constrollStacker = new StackPanel()
        constrollStacker.isVertical = false
        constrollStacker.height = "200px";
        constrollStacker.addControl(button1);
        constrollStacker.addControl(button2);

        const mainstacker = new StackPanel();
        mainstacker.height = 1
        mainstacker.isVertical = true
        mainstacker.paddingBottom = "10px"
        mainstacker.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM

        var rect = new Rectangle();
        rect.background = "green";
        rect.thickness = 0;

        const grid = new Grid()
        grid.addColumnDefinition(0.5)
        grid.addColumnDefinition(0.1)
        grid.height = "850px"
        grid.width = 1
        grid.background = "black"

        grid.addControl(textBloc1, 0, 0)
        grid.addControl(rect, 0, 1)

        mainstacker.addControl(grid);
        mainstacker.addControl(constrollStacker);

        uiTexture.addControl(mainstacker);
        this.material.emissiveTexture = uiTexture;
    }
}