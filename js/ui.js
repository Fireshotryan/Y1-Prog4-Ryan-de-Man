// Importeer Excalibur library
import { Engine, TextAlign, BaseAlign, Line, Label, Text, FontUnit, Vector, Color, Circle, ScreenElement, Font } from 'https://esm.sh/excalibur'


export class UI extends ScreenElement {

    score = 0
    scoreText
    Dataclass

    constructor(dataclass) {
        super({ x: 10, y: 550 })
        this.Dataclass = dataclass
    }

    onInitialize(engine) {
        this.scoreText = new Text({
            text: 'Score: 0',
            font: new Font({
                unit: FontUnit.Px,
                size: 30,
                color: Color.White,
                baseAlign: BaseAlign.Top
            }),
        })
        this.graphics.add(this.scoreText)
    }

    reset() {
        this.score = 0
        this.scoreText.text = `Score: 0`
        this.Dataclass.setScore(0)
    }

    updateScore() {
        this.score++
            this.Dataclass.setScore(this.score)
        this.scoreText.text = `Score: ${this.score}`
    }
}