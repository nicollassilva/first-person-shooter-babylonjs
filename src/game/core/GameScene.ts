import { Engine as BabylonEngine } from '@babylonjs/core';

export default class GameScene {
    private static instance: GameScene

    private canvas: HTMLCanvasElement | null = null
    private engine: BabylonEngine | null = null

    constructor() {
        this.initScene()
    }

    public static getInstance(): GameScene {
        if (!GameScene.instance) {
            GameScene.instance = new GameScene()
        }

        return GameScene.instance
    }

    public init(canvas: HTMLCanvasElement | null): void {
        this.canvas = canvas
    }

    public get canvasElement(): HTMLCanvasElement | null {
        return this.canvas
    }

    private initScene(): void {
        this.initEngine()
    }

    private initEngine(): void {
        if(this.engine instanceof BabylonEngine) return

        this.engine = new BabylonEngine(this.canvas, true)
    }
}