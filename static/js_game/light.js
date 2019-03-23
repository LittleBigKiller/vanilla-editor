class Light {
    constructor() {
        this.container = new THREE.Object3D()
        this.container.name = 'light'

        this.init()
    }

    init() {
        this.light = new THREE.PointLight(this.color, this.intensity)
        this.light.position.set(0, 0, 0)
        this.light.castShadow = true
        this.light.shadow.mapSize.width = 4096;
        this.light.shadow.mapSize.height = 4096;

        this.container.add(this.light)

        this.container.setIntensity = function (inten) {
            this.children[0].intensity = inten
        }

        var geometry = new THREE.BoxGeometry(20, 20, 20)
        var material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true
        })
        this.mesh = new THREE.Mesh(geometry, material)

        this.container.add(this.mesh)
    }

    getLight() {
        lvl.lights.push(this.container)
        return this.container
    }

    setIntensity (inten) {
        this.light.intensity = inten
    }

}