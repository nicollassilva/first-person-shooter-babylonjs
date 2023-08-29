import {
    Vector3,
    Scene as BabylonScene,
    HemisphericLight,
    Color3
} from "@babylonjs/core"

export default class GameLight {
    private static instance: GameLight

    private light: HemisphericLight | undefined

    public static getInstance(): GameLight {
        if(!GameLight.instance) GameLight.instance = new GameLight()

        return GameLight.instance
    }

    public init(scene: BabylonScene | undefined): void {
        this.initLight(scene)
    }

    private initLight(scene: BabylonScene | undefined): void {
        if(!scene) {
            throw new Error('[GameLight] Scene is not initialized')
        }

        this.light = new HemisphericLight('gameLight', new Vector3(-1, 1, 1), scene)

        this.light.diffuse = new Color3(1, 1, 1)
        this.light.specular = new Color3(1, 1, 1)
        this.light.groundColor = new Color3(0, 0, 0)
    }

    public get babylonLight(): HemisphericLight | undefined {
        return this.light
    }
}