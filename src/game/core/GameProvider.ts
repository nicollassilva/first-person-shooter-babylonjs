import GameScene from './Scene/GameScene'
import GameEngine from './Engine/GameEngine'
import GameCamera from './Camera/GameCamera'
import GameGround from './Ground/GameGround'
import GamePlayer from './Entities/GamePlayer'

export default class GameProvider {
    private static instance: GameProvider

    public gameEngine: GameEngine | undefined

    public gameScene: GameScene | undefined
    public gameCamera: GameCamera | undefined
    public gameGround: GameGround | undefined

    public gameCanvas: HTMLCanvasElement | undefined

    public gamePlayer: GamePlayer | undefined

    public static getInstance(): GameProvider {
        if(!GameProvider.instance) GameProvider.instance = new GameProvider()

        return GameProvider.instance
    }

    public async init(canvas: HTMLCanvasElement | undefined): Promise<void> {
        if(!(canvas instanceof HTMLCanvasElement)) {
            throw new Error('Canvas is not initialized')
        }

        this.gameCanvas = canvas

        this.gameEngine = GameEngine.getInstance()
        this.gameEngine.init(this.gameCanvas)

        this.gameScene = GameScene.getInstance()
        await this.gameScene.init(this.gameEngine.babylonEngine)

        this.gameGround = GameGround.getInstance()
        this.gameGround.init()

        this.gameCamera = GameCamera.getInstance()
        this.gameCamera.init()

        this.gamePlayer = new GamePlayer('1', 'Player 1')
        this.gamePlayer.init()
    }
}