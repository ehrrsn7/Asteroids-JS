import draw from "../scripts/draw.js"
import GameObject   from "../scripts/misc scripts/gameObject.js"
import math         from "../scripts/misc scripts/math.js"
const context = document.querySelector("canvas").getContext("2d")

class MousePointer extends (GameObject) {
    constructor() {
        super(100, 100, 0, 0, 2.5, 0)
        this.showPointer = false
    }

    display() {
        // if (true) {
        //     draw.point(this.p.x, this.p.y)
            // if (this.showPointer) {
            //     context.strokeStyle = "black"
            //     context.fillStyle   = "red"
            //     context.lineWidth   = this.radius
            //     context.beginPath()
            //     context.arc(this.point.x, this.point.y, this.radius, 0, math.rad(180), false)
            //     context.closePath()
            //     context.stroke()
            //     context.fill()
            // }
        // }
    }

    toggleVisible() { this.showPointer = !this.showPointer }
}

export default MousePointer