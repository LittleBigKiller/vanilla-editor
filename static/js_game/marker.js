class Marker {
    constructor(color) {
        this.container = new THREE.Object3D()

        let geo = new THREE.SphereGeometry( 5, 8, 2 )
        let mat = new THREE.MeshBasicMaterial({
            color: color,
            wireframe: true
        })

        this.marker = new THREE.Mesh(geo, mat)
        this.container.add(this.marker)

        this.marker.position.y = 1
    }
    
    getCont() {
        return this.container
    }

    getMesh() {
        return this.marker
    }

}