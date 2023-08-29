import {
    Mesh,
    MeshBuilder,
    Scene as BabylonScene,
    StandardMaterial,
    Texture,
    HDRCubeTexture,
    Color3
} from "@babylonjs/core"

export default class GameSkybox {
    private static instance: GameSkybox

    private skybox: Mesh | undefined

    private skyboxMaterial: StandardMaterial | undefined

    public static getInstance(): GameSkybox {
        if(!GameSkybox.instance) GameSkybox.instance = new GameSkybox()

        return GameSkybox.instance
    }

    public init(scene: BabylonScene | undefined): void {
        this.initSkybox(scene)
    }

    private initSkybox(scene: BabylonScene | undefined): void {
        if(!scene) {
            throw new Error('[GameSkybox] Scene is not initialized')
        }

        this.skybox = MeshBuilder.CreateBox('skybox', { size: 800.0 }, scene)
        this.skyboxMaterial = new StandardMaterial('skyboxMaterial', scene)

        this.skyboxMaterial.backFaceCulling = false
        this.skyboxMaterial.reflectionTexture = new HDRCubeTexture('assets/hdr/skybox.hdr', scene, 800)
        this.skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE
        this.skyboxMaterial.diffuseColor = Color3.Black()
        this.skyboxMaterial.specularColor = Color3.Black()
        this.skybox.material = this.skyboxMaterial
    }

    public get babylonSkybox(): Mesh | undefined {
        return this.skybox
    }
}