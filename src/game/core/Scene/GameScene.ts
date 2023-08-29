import {
    Engine as BabylonEngine,
    Scene as BabylonScene,
    HavokPlugin,
    Vector3
} from '@babylonjs/core'
import GameLight from './GameLight'
import GameSkybox from './GameSkybox'
import GameProvider from '../GameProvider'
import HavokPhysics from "@babylonjs/havok"

export default class GameScene {
    private static instance: GameScene

    private scene: BabylonScene | undefined
    private engine: BabylonEngine | undefined

    private gameSkybox: GameSkybox | undefined
    private gameLight: GameLight | undefined

    public static getInstance(): GameScene {
        if(!GameScene.instance) GameScene.instance = new GameScene()

        return GameScene.instance
    }

    public async init(engine: BabylonEngine | undefined): Promise<void> {
        this.engine = engine

        await this.initScene()
        this.initLight()
        this.initSkybox()
    }

    private async initScene(): Promise<void> {
        const engine: BabylonEngine | undefined = GameProvider.getInstance().gameEngine?.babylonEngine

        if(!engine) {
            throw new Error('[GameScene] Engine is not initialized')
        }
            
        this.scene = new BabylonScene(engine)

        const havokInstance = await HavokPhysics(),
            havokPlugin = new HavokPlugin(true, havokInstance)

        this.scene.enablePhysics(new Vector3(0, -9.81, 0), havokPlugin)

        this.setupEvents()
    }

    private setupEvents(): void {
        if(!(this.engine instanceof BabylonEngine)) throw new Error('[GameScene] Engine is not initialized')

        this.engine.runRenderLoop(() => {
            if(!this.scene) throw new Error('[GameScene] Scene is not initialized')

            this.scene.render()
        })

        window.addEventListener('resize', () => {
            this.engine?.resize()
        })
    }

    private initLight(): void {
        this.gameLight = GameLight.getInstance()
        this.gameLight.init(this.babylonScene)
    }

    private initSkybox(): void {
        this.gameSkybox = GameSkybox.getInstance()
        this.gameSkybox.init(this.babylonScene)
    }

    public get babylonScene(): BabylonScene | undefined {
        return this.scene
    }
}