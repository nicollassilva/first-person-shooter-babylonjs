import {
    GroundMesh,
    MeshBuilder,
    Texture,
    Scene as BabylonScene,
    Color3,
    StandardMaterial,
    PhysicsAggregate,
    PhysicsShapeType
} from "@babylonjs/core"
import GameProvider from "../GameProvider"

export default class GameGround {
    private static instance: GameGround

    private ground: GroundMesh | undefined

    private groundMaterial: StandardMaterial | undefined

    public static getInstance(): GameGround {
        if(!GameGround.instance) GameGround.instance = new GameGround()

        return GameGround.instance
    }

    public init(): void {
        this.initGround()
    }

    private initGround(): void {
        this.ground = MeshBuilder.CreateGroundFromHeightMap('ground', 'assets/ground_heightmap.jpg', {
            width: 100,
            height: 100,
            subdivisions: 500
        })

        const scene: BabylonScene | undefined = GameProvider.getInstance().gameScene?.babylonScene

        if(!scene) throw new Error('[GameGround] Scene is not initialized')

        this.groundMaterial = new StandardMaterial('groundMaterial', scene)
        this.groundMaterial.specularColor = Color3.Black()

        this.groundMaterial.diffuseTexture = new Texture('assets/textures/ground_terrain.jpg', scene)
        this.groundMaterial.diffuseTexture.uScale = 10
        this.groundMaterial.diffuseTexture.vScale = 10

        this.ground.material = this.groundMaterial

        new PhysicsAggregate(this.ground, PhysicsShapeType.BOX, { mass: 0 }, scene)
    }

    public get babylonGround(): GroundMesh | undefined {
        return this.ground
    }
}