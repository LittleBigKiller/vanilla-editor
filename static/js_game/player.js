class Player {
    constructor() {
        this.container = new THREE.Object3D()
        this.model = new Model()

        let geo = new THREE.BoxGeometry(20, 20, 20)
        let mat = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            wireframe: true
        })

        let klasa = this

        //this.player = new THREE.Mesh(geo, mat)
        this.model.loadModel(function (modeldata) {
            klasa.player = modeldata
            klasa.container.add(klasa.player)

            klasa.axes = new THREE.AxesHelper(50)
            klasa.player.add(klasa.axes)
            //klasa.player.rotation.y = Math.PI
            //klasa.axes.rotation.y = Math.PI
            klasa.axes.position.y = 10
            //klasa.player.position.y = 11
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