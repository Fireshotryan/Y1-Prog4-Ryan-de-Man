import { Physics, CollisionType, Actor, Vector } from 'https://esm.sh/excalibur'
import { Resources } from './resources.js'

export class Barrel extends Actor {

    constructor() {
        super({ width: Resources.Barrel.width, height: Resources.Barrel.height}) // collision box! 
    }
    
    onInitialize(engine){
        this.graphics.use(Resources.Barrel.toSprite())
        // enable physics
        this.body.bounciness = 0.1 // not working?
        this.body.useGravity = true
        this.body.collisionType = CollisionType.Active
        this.pos = new Vector(Math.random() * engine.screen.resolution.width * 2, Math.random() * engine.screen.resolution.height - 300)
    }

    onPostUpdate(engine, delta) {
        if (this.pos.y > engine.screen.resolution.height * 2) {
            this.kill()
        }
    }
}