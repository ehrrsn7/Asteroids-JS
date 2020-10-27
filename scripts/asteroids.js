import draw         from "./draw.js"
import Ship         from "../gameobject scripts/ship.js"
import Rock         from "../gameobject scripts/rock.js"
import MousePointer from "../gameobject scripts/mousePointer.js"
import Image        from "./misc scripts/image.js"
import Dimensions   from "./misc scripts/dimensions.js"
import debug        from "./misc scripts/debug.js"
import time         from "./misc scripts/time.js"
import Point        from "./misc scripts/point.js"
import { FIRING_RATE } from "../gameobject scripts/laser.js"
import inputManager from "./inputManager.js"
import stateManager from "./stateManager.js"
const canvas = document.querySelector("canvas")

// Asteroids Game
class Game {
    constructor() {
        console.log("Game constructor called.")

        // game objects
        this.ship           = new Ship()
        this.lasers         = []
        this.rocks          = []
        this.asteroidBelt(5)
        this.mousePointer   = new MousePointer()
    }

    /*********
     * UPDATE
     *********/
    update() {
        draw.point(new Point(10, 10))
        time.tick()
        // stateManager.states[2].update()
        draw.fillBackground()
        this.mousePointer.update()
        this.ship.update()
        this.rocks.forEach((rock) => rock.update())
        this.updateLasers()
        this.handleInput()
        this.wrapObjects()
        this.handleLaserDelayTimer()
    }

    /***************
     * HANDLE INPUT
     ***************/
    handleInput() {
        var key = ""
        for (var i in inputManager.inputKeys) {
            key = inputManager.inputKeys[i]
            switch(key.name) {
                case ' ':
                    // fire on ' ' (space)
                    if (key.pressed)
                        if (this.laserDelayTimer <= 0.0) {
                            debug.log(this.laserDelayTimer)
                            this.lasers.push(this.ship.fire())
                            this.laserDelayTimer = 1 / FIRING_RATE
                        }

                    break
                case "ArrowUp":
                    // accelerate on 'up' arrow key
                    if (key.pressed)
                        this.ship.thrust = true
                    else this.ship.thrust = false
                    break
                case "ArrowDown":
                    if (key.pressed)
                        this.ship.brake = true
                    else this.ship.brake = false
                    break
                case "ArrowLeft":
                    if (key.pressed) this.ship.rotateLeft()
                    break
                case "ArrowRight":
                    if (key.pressed) this.ship.rotateRight()
                    break
            }
        }
    }

    /***
     * FIRE
     */
    handleLaserDelayTimer() {
        if (this.laserDelayTimer > 0.0)
            this.laserDelayTimer -= time.deltaTime
    }
    laserDelayTimer = 0.0

    /**
     * WRAP
     */
    wrapObjects() {
        this.wrap(this.ship)
        this.lasers.forEach((laser) => this.wrap(laser))
        this.rocks.forEach((rock)   => this.wrap(rock))
    }

    wrap(projectile) {
        var buffer = projectile.radius * 1
        if      (projectile.p.x < buffer) { projectile.p.x = canvas.width - buffer; return true }
        else if (projectile.p.x > canvas.width - buffer) { projectile.p.x = buffer; return true }

        if      (projectile.p.y < buffer) { projectile.p.y = canvas.height - buffer; return true }
        else if (projectile.p.y > canvas.height - buffer) { projectile.p.y = buffer; return true }

        return false
    }

    /**
     * LASERS
     */
    updateLasers() {
        for (var i = 0; i < this.lasers.length; i++)
            this.lasers[i].update()
        for (var i = 0; i < this.lasers.length; i++) {
            if (!this.lasers[i].alive) {
                this.lasers.splice(i, 1)
                break
            }
        }
    }

    /**
     * ROCKS
     */
    asteroidBelt(n) {
        for (var i = 0; i < n; i++) {
            this.rocks.push(new Rock())
        }
    }

    /**
     * MOUSE POINTER
     */
    updateMousePosition(point) {
        this.mousePointer.p = point
    }
}

export default Game
