// import
import Point        from "./point.js"
import Dimensions   from "./dimensions.js"

/************
 * @abstract
 ************/
class GameObject {
    constructor(x=0, y=0, w=0, h=0, r=0, a=0) {
        this.name   = "unknown GameObject"
        this.p      = new Point(x, y)
        this.dim    = new Dimensions(w, h)
        this.r      = r
        this.a      = a
        this.alive  = true
    }

    // update (advance)
    update() {
        this.display()
    }

    // display (draw)
    display() {

    }

    // fixed update? also implement tick/render if so

    // properties (getters/setters)
    get point()             { return this.p         }
    set point(new_p)        { this.p = new_p        }

    get radius()            { return this.r         }
    set radius(new_r)       { this.r = new_r        }

    get angleRadians()      { return this.a         }
    set angleRadians(new_a) { this.a = new_a        }

    get dimensions()        { return this.dim       }
    set dimensions(new_dim) { this.dim = new_dim    }
}

export default GameObject