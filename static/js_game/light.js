class Light {
    constructor(intensity) {
        this.intensity = intensity

        this.container = new THREE.Object3D()

        this.init()
    }

    init() {
        this.light = new THREE.SpotLight(this.color, this.initensity)
        this.light.position.set(0, 0, 0)
        this.light.castShadow = true
        this.light.shadowMapWidth = 4096;
        this.light.shadowMapHeight = 4096;

        this.container.add(this.light)

        this.light.lookAt(this.container.position)

        var geometry = new THREE.BoxGeometry(20, 20, 20)
        var material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true
        })
        this.mesh = new THREE.Mesh(geometry, material)

        this.container.add(this.mesh)
    }

    getLight() {
        return this.container
    }

    setIntensity (inten) {
        this.light.intensity = inten
    }

}