import {
    Engine as BabylonEngine
} from '@babylonjs/core'

export default class GameEngine {
    private static instance: GameEngine

    private engine: BabylonEngine | undefined
    private canvas: HTMLCanvasElement | undefined

    public static getInstance(): GameEngine {
        if(!GameEngine.instance) GameEngine.instance = new GameEngine()

        return GameEngine.instance
    }

    public init(canvas: HTMLCanvasElement | undefined): void {
        this.canvas = canvas

        this.initEngine()
    }

    private initEngine(): void {
        if(this.engine instanceof BabylonEngine) throw new Error('[GameEngine] Engine is already initialized')

        if(!(this.canvas instanceof HTMLCanvasElement)) throw new Error('[GameEngine] Canvas is not initialized')

        this.engine = new BabylonEngine(this.canvas, true, {
            preserveDrawingBuffer: true,
            stencil: true
        })

        this.setupEvents()
    }

    private setupEvents(): void {
        window.addEventListener('resize', () => {
            if(!this.engine) throw new Error('[GameEngine] Engine is not initialized')

            this.engine.resize()
        })
    }

    public get babylonEngine(): BabylonEngine | undefined {
        return this.engine
    }
}