class Model {

    constructor() {
        this.container = new THREE.Object3D()
        this.mixer = null
        this.clock = new THREE.Clock()
    }

    loadModel(callback) {

        var klasa = this

        var modelMat = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("models/combined.png"),
            morphTargets: true
        })

        var loader = new THREE.JSONLoader()

        var meshModel

        loader.load('models/combined.js', function (geo) {
            meshModel = new THREE.Mesh(geo, modelMat)
            meshModel.name = 'test'
            meshModel.rotation.y = Math.PI / 2
            meshModel.position.y = 25
            meshModel.scale.set(1, 1, 1)

            klasa.mixer = new THREE.AnimationMixer(meshModel)
            klasa.mixer.clipAction('stand').play()

            klasa.container.add(meshModel)

            callback(klasa.container)
        })

        this.meshModel = meshModel
    }

    updateModel() {
        let delta = this.clock.getDelta()
        if (this.mixer) this.mixer.update(delta)
    }

    setAnimation(animName) {
        this.mixer.uncacheRoot(this.mixer.getRoot())
        //this.mixer.stopAllAction()
        this.mixer.clipAction(animName).play();
    }

}