import {
    MeshBuilder,
    Mesh,
    Scene as BabylonScene,
    UniversalCamera
} from "@babylonjs/core"
import GameProvider from "../GameProvider"

export default class GamePlayer {
    private _id: string
    private _name: string

    private _body: Mesh | undefined

    constructor(id: string, name: string) {
        this._id = id
        this._name = name
    }

    public get id(): string {
        return this._id
    }

    public get name(): string {
        return this._name
    }

    public init(): void {
        const babylonScene: BabylonScene | undefined = GameProvider.getInstance().gameScene?.babylonScene,
            camera: UniversalCamera | undefined = GameProvider.getInstance().gameCamera?.babylonCamera

        if(!(babylonScene instanceof BabylonScene)) throw new Error('[GamePlayer] Scene is not initialized')

        this._body = MeshBuilder.CreateBox('player', { width: 1, height: 2 }, babylonScene)

        if(!(camera instanceof UniversalCamera)) throw new Error('[GamePlayer] Camera is not initialized')

        this._body.setParent(camera)
    }
}