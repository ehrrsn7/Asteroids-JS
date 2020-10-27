import draw from "../scripts/draw.js"
import debug from "../scripts/misc scripts/debug.js"
import math from "../scripts/misc scripts/math.js"
import time from "../scripts/misc scripts/time.js"
import Projectile from "../scripts/misc scripts/projectile.js"
import Velocity from "../scripts/misc scripts/velocity.js"

const LASER_SPEED = 7  // laser speed in pixels/second
const LASER_LIFE  = .5 // laser expiration time in seconds

class Laser extends Projectile {
    constructor(x, y, dx, dy, a, r) {
        console.log("Laser fired")
        super()
        this.name       = "laser"
        this.angle      = a + math.rad(90)
        this.radius     = r / 10
        this.timer      = LASER_LIFE
        
        // 'fire'
        console.log(a)
        this.point.x = x + (r * Math.cos(this.angle))
        this.point.y = y - (r * Math.sin(this.angle))
        this.v.dx = dx + (LASER_SPEED * Math.cos(this.angle))
        this.v.dy = dy + (LASER_SPEED * Math.sin(this.angle))
    }

    update() {
        this.display()
        this.p.translate(this.v)
        this.timer -= time.deltaTime
        if (this.timer <= 0) this.alive = false
    }

    display() {
        draw.circle(this.p, this.r, true)
    }
}

export const FIRING_RATE = 15
export default Laser