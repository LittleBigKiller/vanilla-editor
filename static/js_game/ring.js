class Ring {
    constructor () {
        this.container = new THREE.Object3D()
        var geo = new THREE.RingGeometry( 20, 30, 6 )
        var mat = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide
        })
        this.mesh = new THREE.Mesh(geo, mat)

        this.container.add(this.mesh)

        this.mesh.rotation.x = Math.PI / 2
        this.mesh.position.y = 3
    }

    getCont() {
        return this.container
    }

    changeColor(color) {
        this.mesh.material.color.setHex(color)
    }
}