// input keys
class Key {
    constructor(name="unknown key") {
        this.name = name
        this.pressed = false
    }
}

const inputManager = {
    inputKeys: [
        new Key("ArrowUp"),
        new Key("ArrowDown"),
        new Key("ArrowRight"),
        new Key("ArrowLeft"),
        new Key(" ")
    ]
}

export default inputManager