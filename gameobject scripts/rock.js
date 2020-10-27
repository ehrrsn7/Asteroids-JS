import Projectile   from "../scripts/misc scripts/projectile.js"
import draw         from "../scripts/draw.js"
import Point        from "../scripts/misc scripts/point.js";
import math         from "../scripts/misc scripts/math.js";
import debug from "../scripts/misc scripts/debug.js";
import Velocity from "../scripts/misc scripts/velocity.js";
import Time from "../scripts/misc scripts/time.js";
import FPS from "../scripts/main.js";
const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

const ROCK_SHIP_BUFFER = canvas.height - 50
const ROCK_SPEED = 60 // rock average speed in pixels / second

class Rock extends Projectile {
    constructor(p=-1) {
        super()
        this.name   = "unknown asteroid"
        this.r      = math.randomrange(30, 50)
        this.a      = math.randomrange(0, math.rad(360))
        this.dr     = math.randomrange(-1, 1)
        this.p_init(p)
        this.v_init()
        this.vertices = this.populate_vertecies()
    }

    p_init(p) {
        if (p != -1) {
            this.p = new Point(p.x, p.y)
        }

        do {
            this.p.x = Math.random() * canvas.width
            this.p.y = Math.random() * canvas.height
        } while (math.dist(this.p, new Point(canvas.width/2, canvas.height/2) < ROCK_SHIP_BUFFER))
    }

    v_init() {
        this.v = new Velocity(
            ROCK_SPEED * math.randomrange(-1, 1) / FPS,
            ROCK_SPEED * math.randomrange(-1, 1) / FPS
        )
    }

    populate_vertecies() {
        var vertices = []

        var offs = this.r
        var jag = .3
        for (var a = 0; a < 360; a += 45) {
            offs = this.r * math.randomrange(1 - jag, 1 + jag)
            vertices.push({angle: a, offset: offs})
        }
        console.log(vertices)
        

        return vertices
    }

    advance() {
        super.advance()
        console.log("x")
        this.a += this.dr
    }

    display() {
        draw.rock(
            this.p.x,
            this.p.y,
            this.r,
            this.a,
            this.vertices
        )
    }
}

export default Rock