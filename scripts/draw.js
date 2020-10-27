// import
import  math    from "./misc scripts/math.js"
import  debug   from "./misc scripts/debug.js";
const   bodyTag = document.querySelector("body")
const   canvas  = document.querySelector("canvas")
const   context = canvas.getContext("2d")

// draw module
var draw = {

drawImages: false,
darkMode: true,
// darkMode: ("black" == this.cssGetter(bodyTag, "--color")),

toggleDarkMode: function() {
    this.darkMode = !this.darkMode
    debug.log(`Dark mode set to ${this.darkMode}`)
    bodyTag.style.color = this.color
},

rotateAndDraw: function(img, p, dim, a) {
    console.log("Rotate and draw() called")

    // use context save() and restore() to make sure only image is being rotated
    context.save()

    // translate & rotate
    context.translate(p.x, p.y)
    context.rotate(a)
    
    // draw image with image center on specified x and y coordinates
    context.drawImage(img, p.x, p.y, dim.w, dim.h)
    
    // restore canvas 
    context.translate(-p.x, -p.y)
    context.rotate(-a)
    context.restore()
},

importImage: function(imageFilename, id, gameobject_dimensions) {
    let imageElement = document.createElement("img")
    imageElement.src = imageFilename
    imageElement.id = id
    canvas.appendChild(imageElement)
    return imageElement
},

cssGetter: function(element, varName) {
    return getComputedStyle(element).getPropertyValue(varName)
},

colorDark: "white",
colorLight: "black",
get color()       { return this.darkMode ? this.colorDark : this.colorLight },
get canvasColor() { return this.darkMode ? this.colorLight : this.colorDark },

fillBackground: function() {
    context.fillStyle = this.canvasColor
    context.fillRect(0, 0, canvas.width, canvas.height)
},

triangle: function(
    p,  // point
    sl, // side length
    a   // angle (radians)
) {

    a += math.rad(90)
    // p = new Point(canvas.width / 2, canvas.height / 2)

    // draw a triangular ship
    context.strokeStyle = this.color
    context.lineWidth = sl / 5
    context.beginPath()
    context.moveTo(
        // (jump to) nose of the ship
        p.x + (4 / 3) *sl * Math.cos(a),
        p.y - (4 / 3) *sl * Math.sin(a)
    )
    context.lineTo(
        // (draw to) rear left of the ship
        p.x - sl * ((2 / 3) * Math.cos(a) + Math.sin(a)),
        p.y + sl * ((2 / 3) * Math.sin(a) - Math.cos(a))
    )
    context.lineTo(
        // (draw to) rear right of the ship
        p.x - sl * ((2 / 3) * Math.cos(a) - Math.sin(a)),
        p.y + sl * ((2 / 3) * Math.sin(a) + Math.cos(a))
    )
    context.closePath()
    context.stroke()
},

circle: function(p, r, fill=false) {
    context.strokeStyle = this.color
    context.fillStyle   = this.color
    context.lineWidth   = r
    context.beginPath()
    context.arc(p.x, p.y, r, 0, math.rad(360), false)
    context.closePath()
    context.stroke()
    context.fill()
},

point: function(x, y) {
    if (x === y === NaN) {
        console.error("In draw.point(): invalid input for 'p'")
        return
    }
    context.strokeStyle = "black"
    context.fillRect(x, y, 1, 1)
},

rock: function(x, y, r, a, vertices, color="slategrey") {
    
    // update draw info to draw rock
    context.strokeStyle = "slategrey"
    context.lineWidth   = 1.5

    // draw a path
    context.beginPath();

    context.moveTo(
        x + r * Math.cos(math.rad(a)),
        y + r * Math.sin(math.rad(a))
    )

    var r = 75
    vertices.forEach((vertex) => {
        context.lineTo(
            x + vertex.offset * Math.cos(math.rad(vertex.angle + a)),
            y + vertex.offset * Math.sin(math.rad(vertex.angle + a))
        )
    })

    // tell canvas to paint the paths
    context.closePath();
    context.stroke();
}

}

// export draw object module
export default draw