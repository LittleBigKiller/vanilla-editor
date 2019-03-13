class Hex3D {
    constructor() {
        this.radius = settings.hexRadius
        this.container = new THREE.Object3D() // kontener na obiekty 3D
        this.wall = new THREE.Mesh(settings.wallGeo, settings.wallMat);
        this.genHex()
    }
    genHex() {
        for (let i = 0; i < 6; i++) {
            var side = this.wall.clone()
            side.position.x = Math.cos(i * 60) * settings.radius
            side.position.z = Math.sin(i * 60) * settings.radius
            side.lookAt(this.container.position) // nakierowanie ścian na środek kontenera 3D 
            this.container.add(side)
        }
        return this.container
    }
}