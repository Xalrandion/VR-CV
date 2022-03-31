import { Scene } from "@babylonjs/core";

export interface EntityWithBeforeRenderAction {

    doBeforeRender(scene: Scene): void
}