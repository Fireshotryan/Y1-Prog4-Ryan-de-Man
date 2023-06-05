// Importeer Excalibur library
import { Engine, TextAlign, BaseAlign, Actor, Label, Input, FontUnit, Vector, Color, Scene, Font } from 'https://esm.sh/excalibur'
import { Resources } from './resources.js'

export class GameOver extends Scene {

    Dataclass
    score
    engine
    label

    constructor(dataclass) {
        super({})
        this.Dataclass = dataclass
    }

    onInitialize(engine) {
        this.engine = engine
        const bg = new Actor()
        bg.graphics.use(Resources.Gameover.toSprite())
        bg.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 2)
        this.add(bg)
        this.score = this.Dataclass.getScore()

        this.label = new Label({
            text: `Spel voorbij!\nKlik spacebar voor level 1\n Klik enter voor level 2\n score: ${this.score}`,
            pos: new Vector(this.engine.screen.resolution.width / 2, this.engine.screen.resolution.height / 3),
            font: new Font({
                unit: FontUnit.Px,
                size: 20,
                color: Color.White,
                baseAlign: BaseAlign.Top,
                textAlign: TextAlign.Center
            })
        })

        // een Label is een Actor die automatisch een Text graphic toevoegt.
    }



    onActivate() {
        this.score = this.Dataclass.getScore()
        this.label.text = `Spel voorbij!\nKlik spacebar voor level 1\n Klik enter voor level 2 \n je eindscore: ${this.score}`
        this.add(this.label)
        Resources.UnderwaterSound.play()
    }

    onPreUpdate(engine, delta) {
        this.score = this.Dataclass.getScore()
        if (engine.input.keyboard.wasPressed(Input.Keys.Space)) {
            engine.goToScene('level')
        }
        if (engine.input.keyboard.wasPressed(Input.Keys.Enter)) {
            engine.goToScene('leveltwo')
        }
    }
}