class Ally {
    constructor() {
        this.container = new THREE.Object3D()
        this.model = new AllyModel()
        this.ring = new Ring()

        let klasa = this

        this.model.loadModel(function (modeldata) {
            klasa.player = modeldata
            klasa.container.add(klasa.player)

            klasa.axes = new THREE.AxesHelper(20)
            klasa.player.add(klasa.axes)
            klasa.axes.position.y = 10
        })
        this.container.add(this.ring.getCont())
        this.container.name = 'Ally'

        this.lowlight()
    }
    
    getCont() {
        return this.container
    }

    getMesh() {
        return this.player
    }

    getModel() {
        return this.model
    }

    highlight() {
        this.ring.getCont().visible = true
    }

    lowlight() {
        this.ring.getCont().visible = false
    }

    setRingColor(color) {
        this.ring.changeColor(color)
    }
}