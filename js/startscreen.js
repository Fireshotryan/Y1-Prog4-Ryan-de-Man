import { Engine, TextAlign, BaseAlign, Actor, Label, Input, FontUnit, Vector, Color, Scene, Font } from 'https://esm.sh/excalibur'
import { Resources } from './resources.js'

export class StartScreen extends Scene {

    onInitialize(engine) {
        const bg = new Actor()
        bg.graphics.use(Resources.Startscreen.toSprite())
        bg.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 2)
        this.add(bg)

        const label = new Label({
            text: 'Welkom!\nKlik spacebar voor level 1\n Klik enter voor level 2',
            pos: new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 3),
            font: new Font({
                unit: FontUnit.Px,
                size: 20,
                color: Color.White,
                textAlign: TextAlign.Center,
                baseAlign: BaseAlign.Top
            })
        })
        this.add(label)
    }

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(Input.Keys.Space)) {
            engine.goToScene('level')
        }
        if (engine.input.keyboard.wasPressed(Input.Keys.Enter)) {
            engine.goToScene('leveltwo')
        }
    }
}