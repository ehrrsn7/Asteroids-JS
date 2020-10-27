import debug from "./debug.js"

class Point {
    constructor(x=0, y=0) {
        this.x = x
        this.y = y
    }

    translate(v, debug=false) {
        if (debug) console.warn(v)
        this.x += v.dx
        this.y -= v.dy
    }

    set(x, y) {
        this.x = x
        this.y = y
    }

    get up()    { return new Point( 0, -1) }
    get down()  { return new Point( 0,  1) }
    get right() { return new Point( 1,  0) }
    get left()  { return new Point(-1,  0) }

    tostring() { return `Point: ${this.x} ${this.y}` }
}

export default Point