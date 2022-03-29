import "@babylonjs/core"
import "@babylonjs/core/Meshes/meshBuilder";
import { Engine, EventState, ICameraInput, Observer, PointerEventTypes, PointerInfo, UniversalCamera, Vector3 } from "@babylonjs/core";
import { KeyBoardCommandKeys, MouseCommands } from "./Commands";

type CameraInput = ICameraInput<UniversalCamera>
type KeyboardEventHandler = (this: HTMLElement, evt: KeyboardEvent) => any
type MouseElementEventHandler = (this: HTMLElement, evt: MouseEvent) => any
type MouseEventHandler = (info: PointerInfo, evtState: EventState) => any 

export class LightFPSKeyboardCameraInput implements CameraInput {
    camera: UniversalCamera;
    
    _keysToHandleQueue = [];
    keysLeft = KeyBoardCommandKeys.LEFT
    keysRight = KeyBoardCommandKeys.RIGHT
    keysUp = KeyBoardCommandKeys.UP
    keysDown = KeyBoardCommandKeys.DOWN

    private doesMonitoredKeysconcernedByEvent(keyCode: number): boolean {

        const keys = [...this.keysLeft, ...this.keysRight, ...this.keysDown, ...this.keysUp];
        return keys.indexOf(keyCode) !== -1
    }

    private addKeyToQueue(key: number) {
        if (this._keysToHandleQueue.indexOf(key) !== -1)
            return
        this._keysToHandleQueue.push(key)
    }

    private removeKeyFromQueue(key: number) {
        const idx = this._keysToHandleQueue.indexOf(key)
        if (idx < 0) {
            return ;
        }
        this._keysToHandleQueue.splice(idx, 1);
    }

    private isKeyInKeySet(keySet: number[], key: number): Boolean {
        return keySet.indexOf(key) !== -1
    }

    genOnKeyDownEventHandler(noPreventDefault?: boolean): KeyboardEventHandler {
        const _this = this;

        return function (evt) {
            if (_this.doesMonitoredKeysconcernedByEvent(evt.keyCode)) {
                _this.addKeyToQueue(evt.keyCode)
            }
            if (!noPreventDefault) {
                evt.preventDefault();
            }
        }
    }

    genOnKeyUpEventHandler(noPreventDefault?: boolean): KeyboardEventHandler {

        const _this = this;

        return function (evt) {
            if (_this.doesMonitoredKeysconcernedByEvent(evt.keyCode)) {
                _this.removeKeyFromQueue(evt.keyCode)
            }
            if (!noPreventDefault) {
                evt.preventDefault();
            }
        }
    }

    genOnLostFocusHandler() {
        const _this = this;
        return function (evt: FocusEvent) {
            _this._keysToHandleQueue = []
        }
    }

    


    _onKeyDownHolder: (this: HTMLElement, evt: KeyboardEvent) => any = null
    _onKeyUpHolder: (this: HTMLElement, evt: KeyboardEvent) => any = null


    
    getClassName(): string {
        return "UniversalCameraKeyboardLightFPS"
    }
    getSimpleName(): string {
        return "LightFPSKeyboard"
    }
    attachControl(noPreventDefault?: boolean): void {
        
        const engine = this.camera.getEngine();
        const element = engine.getInputElement();


        if (this._onKeyDownHolder) {
            return
        }
        element.tabIndex = 1;
        this._onKeyDownHolder = this.genOnKeyDownEventHandler(noPreventDefault);
        this._onKeyUpHolder = this.genOnKeyUpEventHandler(noPreventDefault);

        element.addEventListener("keydown", this._onKeyDownHolder, false)
        element.addEventListener("keyup", this._onKeyUpHolder, false)
        
    }
    detachControl(): void {
        const engine = this.camera.getEngine();
        const element = engine.getInputElement()

        if (!this._onKeyDownHolder) {
            return;
        }

        element.removeEventListener("keydown", this._onKeyDownHolder);
        element.removeEventListener("keyup", this._onKeyUpHolder);
        //  Tools.UnregisterTopRootEvents([{name: "blur", handler: this.genOnLostFocusHandler()}]) fix maybe ? 
    }
    checkInputs () {
        if (! this._onKeyDownHolder) {
            return
        }

        
        const speed = this.camera.speed;
        this._keysToHandleQueue.forEach((key) => {
            if (this.isKeyInKeySet(this.keysDown, key)) {
                this.camera.cameraDirection = this.camera.getDirection(new Vector3(0, 0, 1)).scale(-speed)
            }
            else if (this.isKeyInKeySet(this.keysUp, key)) {
                this.camera.cameraDirection = this.camera.getDirection(new Vector3(0, 0, 1)).scale(speed)
            }
            else if (this.isKeyInKeySet(this.keysLeft, key)) {
                this.camera.cameraDirection = this.camera.getDirection(new Vector3(1, 0, 0)).scale(-speed)
            }
            else if (this.isKeyInKeySet(this.keysRight, key)) {
                this.camera.cameraDirection = this.camera.getDirection(new Vector3(1, 0, 0)).scale(speed)
            } 

        })
    }


}


export class LightFPSMouseCameraInput implements CameraInput {
    camera: UniversalCamera;

    toucheEnabled = false
    previousMouseLocation: { x: 0, y: 0 } =  null
    angularSensibility = 2000.0

    pointerInputHolder: MouseEventHandler = null
    pointerInputObserver: Observer<PointerInfo> = null
    pointerSearchHolder: MouseElementEventHandler = null

    constructor(touchEnabled: boolean = false) {
        this.toucheEnabled = touchEnabled;   
    }

    handleRightButton(info: PointerInfo, evt: any, noPreventDefault: boolean, element: HTMLElement) {


        if (info.type === PointerEventTypes.POINTERDOWN) {
            try {
                evt.srcElement.setPointerCapture(evt.pointerId);
            } catch (error) {

            }
            this.previousMouseLocation = { x: evt.clientX, y: evt.clientY };
            if (!noPreventDefault) {
                element.focus();
            }
        }
        
        else if (info.type === PointerEventTypes.POINTERUP) {
            try {
                evt.srcElement.releasePointerCapture(evt.pointerId);
            } catch (error) {
                
            }
            this.previousMouseLocation = null;
        }
     
    }

    handlePointerMove(engine: Engine, info: PointerInfo, evt: any) {

        if (!this.previousMouseLocation || engine.isPointerLock) {
            return;
        }

        const mouseOffset = {x: evt.clientX - this.previousMouseLocation.x, y: evt.clientY - this.previousMouseLocation.y}
        if (this.camera.getScene().useRightHandedSystem) {
            this.camera.cameraRotation.y -= mouseOffset.x / this.angularSensibility;
        }else {
            this.camera.cameraRotation.y += mouseOffset.x / this.angularSensibility;
        }

        this.camera.cameraRotation.x += mouseOffset.y / this.angularSensibility; 

        this.previousMouseLocation = { x: evt.clientX, y: evt.clientY };
    }


    genPointerInputHandler(noPreventDefault?: boolean): MouseEventHandler {
        const _this = this;
        const engine = this.camera.getEngine();
        const element = engine.getInputElement();

        return function (info, state) {
            const evt = info.event;

            if (!_this.toucheEnabled && evt.pointerType === "touch") {
                return;
            }

            if (evt.button === MouseCommands.RIGHT) {
                _this.handleRightButton(info, evt, noPreventDefault, element);
            }

            if (info.type === PointerEventTypes.POINTERMOVE) {
                _this.handlePointerMove(engine, info, evt);
            }
         
            if (!noPreventDefault) {
                evt.preventDefault();
            }
        }
    }

    genPointerSearchHandler(noPreventDefault?: boolean): MouseElementEventHandler {

        const engine = this.camera.getEngine();

        return function (evt) {
            if (!engine.isPointerLock) {
                return;
            }
            if (!noPreventDefault) {
                evt.preventDefault();
            }
        }
    }

    getClassName(): string {
        return "UniversalCameraMouseLightFPS"
    }
    getSimpleName(): string {
        return "LightFPSMouse"
    }
    attachControl(noPreventDefault?: boolean): void {
        var engine = this.camera.getEngine();
        var element = engine.getInputElement();

        if (this.pointerInputHolder) {
            return
        }
        this.pointerInputHolder = this.genPointerInputHandler(noPreventDefault);
        this.pointerSearchHolder = this.genPointerSearchHandler(noPreventDefault);

        element.addEventListener("mousemove", this.pointerSearchHolder, false) 
        this.pointerInputObserver = this.camera.getScene().onPointerObservable.add(this.pointerInputHolder, PointerEventTypes.POINTERDOWN | PointerEventTypes.POINTERUP | PointerEventTypes.POINTERMOVE)
    }
    detachControl(): void {
        const engine = this.camera.getEngine();
        const element = engine.getInputElement();

        if (!this.pointerInputHolder)
            return;
        
        element.removeEventListener("mousemove", this.pointerSearchHolder)
        this.camera.getScene().onPointerObservable.remove(this.pointerInputObserver);
        this.pointerInputHolder = null;
        this.pointerInputObserver = null;
        this.previousMouseLocation = null;
        this.pointerSearchHolder = null;
    }
    checkInputs?: () => void;

    
}