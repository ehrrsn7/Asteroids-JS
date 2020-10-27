// import
import debug from "./misc scripts/debug.js"
import Point from "./misc scripts/point.js"
const canvas = document.querySelector("canvas")

// define
var mousePosition = new Point()
const FPS = 60
export default FPS

/************
 * GAME LOOP
 ************/
import Game from "./asteroids.js"
import draw from "./draw.js"
var asteroids = new Game()
setInterval(() => asteroids.update(), 1000 / FPS)


/****************
 * INPUT MANAGER
 ****************/
import inputManager from "./inputManager.js"

// keyboard input
document.addEventListener("keydown", keyDown)

// key up (remove keys)
document.addEventListener("keyup", keyUp)

// mouse click
document.addEventListener("mousedown", onClick)

// mouse movement
document.addEventListener("mousemove", mouseMove)



function keyDown(event) {
    debug.log("keydown: " + event.key)
    
    switch(event.key) {
        case 'd':
            debug.toggleDebug()
            break
        case 'D':
            draw.toggleDarkMode()
            break
        case 'i':
            draw.drawImages = !draw.drawImages
            break
        case 'r':
            debug.display("Restarting game.")
            asteroids = new Game()
            break
        case ' ':
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
            for (var i in asteroids.inputKeys)
                if (asteroids.inputKeys[i].name == event.key)
                    asteroids.inputKeys[i].pressed = true
                    debug.display(event.key)
                    return
    }
}

function keyUp(event) {
    for (var i in asteroids.inputKeys) {
        var key = asteroids.inputKeys[i]
        if (key.name == event.key)
            key.pressed = false
    }
}

function onClick(event) {
    debug.log("click")
    asteroids.mousePointer.toggleVisible()
}

function mouseMove(event) {
    debug.log("Updating mouse position", event.clientX, event.clientY)    
    mousePosition.x = event.clientX - 41
    mousePosition.y = event.clientY - 101
    asteroids.updateMousePosition(mousePosition)
}
