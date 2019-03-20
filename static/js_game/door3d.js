class Door3D {
    constructor() {
        var radius = settings.radius
        var container = new THREE.Object3D()
        var doorPart = new THREE.Mesh(settings.doorPartGeo, settings.wallMat);

        let part0 = doorPart.clone()
        part0.position.x = -radius * 0.3
        container.add(part0)

        let part1 = doorPart.clone()
        part1.position.x = radius * 0.3
        container.add(part1)

        return container
    }
}