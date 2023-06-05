// Importeer Excalibur library
import { Engine, Physics, Vector } from 'https://esm.sh/excalibur'
import { ResourceLoader } from "./resources.js"
import { Level } from "./level.js"
import { LevelTwo } from "./leveltwo.js"
import { GameOver } from "./gameover.js"
import { StartScreen } from './startscreen.js'
import { DataClass } from './Data.js'

export class Game extends Engine {

    constructor() {
        super({ displayMode: 'FitScreenAndFill', width: 800, height: 600, maxFps: 60, })

        // Physics.useRealisticPhysics()
        Physics.acc = new Vector(0, 800)
            //this.showDebug(true)

        this.start(ResourceLoader).then(() => this.startGame())
    }


    startGame() {
        let Dataclass = new DataClass()

        let level = new Level(Dataclass)
        let gameover = new GameOver(Dataclass)
        let leveltwo = new LevelTwo(Dataclass)
        let startscreen = new StartScreen(Dataclass)

        // alle scenes toevoegen
        this.add('level', level)
        this.add('leveltwo', leveltwo)
        this.add('game-over', gameover)
        this.add('start-screen', startscreen)

        // naar game level springen - level state blijft bewaard als wisselt van scenes
        // via activate/deactivate in het level kan je bepalen wat er na goToScene moet gebeuren
        this.goToScene('start-screen')
    }

}

new Game()