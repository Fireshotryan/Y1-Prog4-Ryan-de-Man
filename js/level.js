import { Actor, Color, ScreenElement, Engine, Vector, Physics, ParallaxComponent, Scene } from 'https://esm.sh/excalibur'
import { Resources } from "./resources.js"
import { Player } from "./player.js"
import { UI } from "./ui.js"
import { Platform } from "./platform.js"
import { Barrel } from "./barrel.js"
import { Coin } from "./coin.js"

export class Level extends Scene {

    player
    ui
    Dataclass

    constructor(dataclass) {
        super({})
        this.Dataclass = dataclass
    }

    onInitialize(engine) {
        const bg = new Actor()
        bg.graphics.use(Resources.Background.toSprite())
        bg.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 2)
        bg.addComponent(new ParallaxComponent(new Vector(0.5, 0.5)))
        this.add(bg)

        // bouw de platformen
        this.spawnPlatforms()

        this.player = new Player()
        this.add(this.player)

        this.ui = new UI(this.Dataclass)
        this.add(this.ui)

        this.camera.strategy.lockToActor(this.player)
    }

    onActivate(ctx) {
        this.spawnBarrelsCoins()
        this.ui.reset()
        this.player.reset()
        Resources.UnderwaterSound.stop()
    }

    spawnPlatforms() {
        for (let pos of Resources.PlatformData.data) {
            const platform = new Platform(pos.x, pos.y)
            this.add(platform)
        }
    }

    spawnBarrelsCoins() {
        for (let i = 0; i < 8; i++) {
            const barrel = new Barrel()
            this.add(barrel)
            const coin = new Coin()
            this.add(coin)
        }
    }
}