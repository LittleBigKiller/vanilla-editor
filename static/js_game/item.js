class Item {
    constructor () {
        var container = new THREE.Object3D()
        var geometry = new THREE.BoxGeometry(20, 20, 20) //new THREE.BoxGeometry(settings.radius * 0.1, settings.radius * 0.1, settings.radius * 0.1)
        var material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: false
        })
        var mesh = new THREE.Mesh(geometry, material)

        container.add(mesh)

        return container
    }
}