import {
    Vector3,
    Scene as BabylonScene,
    UniversalCamera as BabylonCamera
} from "@babylonjs/core"
import GameScene from "../Scene/GameScene"
import GameProvider from "../GameProvider"

export default class GameCamera {
    private static instance: GameCamera

    private camera: BabylonCamera | undefined

    public static getInstance(): GameCamera {
        if(!GameCamera.instance) GameCamera.instance = new GameCamera()

        return GameCamera.instance
    }

    public init(): void {
        this.initCamera()
    }

    private initCamera(): void {
        const babylonScene: BabylonScene | undefined = GameScene.getInstance().babylonScene

        if(!babylonScene) throw new Error('[GameCamera] Scene is not initialized')

        this.camera = new BabylonCamera('camera', new Vector3(0, 5, -10), babylonScene)

        const canvas: HTMLCanvasElement | undefined = GameProvider.getInstance().gameCanvas

        if(!(canvas instanceof HTMLCanvasElement)) throw new Error('[GameCamera] Canvas is not initialized')

        babylonScene.activeCamera = this.camera

        this.camera.setTarget(Vector3.Zero())
        this.camera.attachControl(canvas, true)
    }

    public get babylonCamera(): BabylonCamera | undefined {
        return this.camera
    }
}