// import
import debug        from "../scripts/misc scripts/debug.js"
import time         from "../scripts/misc scripts/time.js"
import draw         from "../scripts/draw.js"
import Image        from "../scripts/misc scripts/image.js"
import Projectile   from "../scripts/misc scripts/projectile.js"
import Point        from "../scripts/misc scripts/point.js"
import Dimensions   from "../scripts/misc scripts/dimensions.js"
import Laser        from "./laser.js"
import Velocity     from "../scripts/misc scripts/velocity.js"
import math         from "../scripts/misc scripts/math.js"
const canvas = document.querySelector("canvas")

// define
const ACCELERATION_AMOUNT   = 20 // ship acceleration amount in pixels/s/s
const FRICTION_AMOUNT       = 5 // brake deceleration amount

// ship module
class Ship extends Projectile {
    constructor() {
        console.log("Ship constructor called.")
        
        // set GameObject components
        super()
        this.name       = "Ship"
        this.point      = new Point(canvas.width/2, canvas.height/2)
        this.velocity   = new Velocity(0, 0)
        this.r          = 15
        this.dimensions = new Dimensions(1, 1)
        this.a          = 10
        this.image      = new Image("../assets/shipImage.png", "ship image", this.dim, true)

        // set ship components
        this.thrust     = false
        this.brake      = false
    }

    // methods
    update() {
        super.update()
        var dt = time.deltaTime
        this.accelerate(this.rotation, dt * ACCELERATION_AMOUNT, this.thrust)
        if (this.brake) {
            this.applyFriction(dt * FRICTION_AMOUNT)
            debug.display("Braking...")
        }
    }
    
    display() {
        super.display()
        if (!draw.drawImages)
            draw.triangle(this.point, this.r, this.rotation)
    }

    fire() {
        return new Laser(this.p.x, this.p.y, this.v.dx, this.v.dy, this.rotation, this.r)
    }
}

// export module
export default Ship