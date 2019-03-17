class Hex3D {
    constructor(doorIn, doorOut) {

        var radius = settings.radius

        var container = new THREE.Object3D()

        var wall = new THREE.Mesh(settings.wallGeo, settings.wallMat);

        for (let i = 0; i < 6; i++) {
            let side
            if (i == doorIn || i == doorOut) {
                side = new Door3D()
            } else {
                side = wall.clone()
            }
            side.position.x = Math.cos(i * Math.PI / 3) * Math.sqrt(3 * radius * radius) / 2
            side.position.z = Math.sin(i * Math.PI / 3) * Math.sqrt(3 * radius * radius) / 2
            side.lookAt(container.position) 
            container.add(side)
        }
        return container
    }
}