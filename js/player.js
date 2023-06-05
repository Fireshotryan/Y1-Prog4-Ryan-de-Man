import { CollisionType, Actor, Input, Vector, vec, DegreeOfFreedom, Engine, Sprite, AnimationStrategy, SpriteSheet, Animation, range, Shape } from 'https://esm.sh/excalibur'
import { Coin } from "./coin.js"
import { Resources } from './resources.js'

export class Player extends Actor {

    game
    playerAnimations = []
    jumped = false
    onGround = true
    facing = 'R'
    animplaying = 0

    constructor() {
        super({
                name: "Player",
                collisionType: CollisionType.Active,
                collider: Shape.Box(20, 40, Vector.half, vec(0, 0))
            }) // collision box!

    }

    onInitialize(engine) {

        let runAnimation = SpriteSheet.fromImageSource({
            image: Resources.Player,
            grid: {
                rows: 1,
                columns: 6,
                spriteWidth: 50,
                spriteHeight: 37
            },
            spacing: {
                originOffset: { x: 50, y: 37 }
            }
        })

        let jumpAnimation = SpriteSheet.fromImageSource({
            image: Resources.Player,
            grid: {
                rows: 2,
                columns: 5,
                spriteWidth: 50,
                spriteHeight: 37
            },
            spacing: {
                originOffset: { x: 100, y: 74 }
            }
        })

        let idleAnimation = SpriteSheet.fromImageSource({
            image: Resources.Player,
            grid: {
                rows: 1,
                columns: 4,
                spriteWidth: 50,
                spriteHeight: 37
            },
            spacing: {
                originOffset: { x: 0, y: 0 }
            }
        })
        this.playerAnimations['runAnimation'] = Animation.fromSpriteSheet(runAnimation, range(0, 5), 100, );
        this.playerAnimations['jumpAnimation'] = Animation.fromSpriteSheet(jumpAnimation, range(0, 7), 100, AnimationStrategy.Freeze);
        this.playerAnimations['idleAnimation'] = Animation.fromSpriteSheet(idleAnimation, range(0, 3), 100, );

        this.game = engine

        // enable physics
        this.body.useGravity = true
        this.body.collisionType = CollisionType.Active
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation) 
        this.reset()

        // hit something
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    reset() {
        this.pos = new Vector(this.game.screen.resolution.width / 2, this.game.screen.resolution.height / 3)
    }

    hitSomething(event) {
        if (event.other instanceof Coin) {
            event.other.pickedUpByPlayer()
           
            this.game.currentScene.ui.updateScore()
        }
    }

    onPreUpdate(engine, delta) {

        console.log(this.animplaying)
        console.log(this.jumped)

        if (this.vel.y == 0) {
            this.jumped = false
            this.onGround = true
        } else {
            this.onGround = false
        }
        // console.log(this.onGround + " " + this.vel.y + " " + this.pos.y)
        switch (true) {
            case this.vel.x > 0 && this.onGround && this.animplaying != 0:
                this.playerAnimations['runAnimation'].flipHorizontal = false
                this.graphics.use(this.playerAnimations['runAnimation'])
                this.animplaying = 0
                this.facing = 'R'
                break;

            case this.vel.x < 0 && this.onGround && this.animplaying != 1:
                this.playerAnimations['runAnimation'].flipHorizontal = true
                this.graphics.use(this.playerAnimations['runAnimation'])
                this.animplaying = 1
                this.facing = 'L'
                break;

            case this.jumped && this.animplaying != 2:
                switch (this.facing) {
                    case 'R':
                        this.playerAnimations['jumpAnimation'].flipHorizontal = false
                        break;

                    case 'L':
                        this.playerAnimations['jumpAnimation'].flipHorizontal = true
                        break;

                }
                this.animplaying = 2
                this.graphics.use(this.playerAnimations['jumpAnimation'])
                break;

            case this.vel.x == 0 && !this.jumped && this.animplaying != 4:
                switch (this.facing) {
                    case 'R':
                        this.playerAnimations['idleAnimation'].flipHorizontal = false
                        break;

                    case 'L':
                        this.playerAnimations['idleAnimation'].flipHorizontal = true
                        break;

                }
                this.animplaying = 4
                this.graphics.use(this.playerAnimations['idleAnimation'])
                break;

        }

        let xspeed = 0
        if (engine.input.keyboard.wasPressed(Input.Keys.W) || engine.input.keyboard.wasPressed(Input.Keys.Up)) {
            if (this.onGround) {
                this.playerAnimations['jumpAnimation'].reset()
                this.vel.y = -600
                this.jumped = true
            }
        }
        if (engine.input.keyboard.isHeld(Input.Keys.A) || engine.input.keyboard.isHeld(Input.Keys.Left)) {
            xspeed = -300
        }
        if (engine.input.keyboard.isHeld(Input.Keys.D) || engine.input.keyboard.isHeld(Input.Keys.Right)) {
            xspeed = 300
        }
        this.vel.x = xspeed

        // check out of bounds
        if (this.pos.y > 1200) {
            engine.goToScene('game-over')
            Resources.SplashSound.play()
        }
    }

}