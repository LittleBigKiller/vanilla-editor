class Player {
    constructor() {
        this.container = new THREE.Object3D()
        this.model = new PlayerModel()

        let klasa = this

        this.model.loadModel(function (modeldata) {
            klasa.player = modeldata
            klasa.container.add(klasa.player)

            klasa.axes = new THREE.AxesHelper(20)
            klasa.player.add(klasa.axes)
            klasa.axes.position.y = 10
        })
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
}