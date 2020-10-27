import Dimensions from "./misc scripts/dimensions.js"

// helper class
class state {
    constructor(name, state) {
        this.name   = name
        this.state  = state
    }
}

// Asteroids Game States
class Scene {
    // here, scene is to be the base object for all states 
    // (all states must have a scene to work with)
    constructor() {
        this.backgroundImage = new Image(
            "../assets/stars.png", 
            "background image", 
            new Dimensions(0,0),
            true)
    }


    update() {
        this.display()
    }

    display() {
        this.drawBackground()
    }

    drawBackground() {
        if (draw.drawImages)
            this.backgroundImage.display()
        else draw.fillBackground()
    }
}


class Resume extends Scene {

}

class Pause extends Scene {
    
}

class MainMenu extends Scene {

}

class SettingsState  extends Scene {

}


// state manager module
const stateManager = {
    currentState : 2,
    get state() { return this.states[this.currentState] },
    states : [
        new state("resume",         new Resume()),
        new state("pause",          new Pause()),
        new state("main menu",      new MainMenu()),
        new state("settings menu",  new SettingsState())
    ]
}

export default stateManager
