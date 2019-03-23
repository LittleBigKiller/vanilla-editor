class Room {
    constructor(doorIn, doorOut, type) {
        var radius = settings.radius

        var container = new THREE.Object3D()

        var wall = new THREE.Mesh(settings.wallGeo, settings.wallMat)

        let floor = new THREE.Mesh(settings.floorGeo, settings.floorMat)
        floor.position.y = -settings.wallHeight / 2
        floor.name = 'NAV-PLANE'
        container.add(floor)

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

        switch (type) {
            case 'light':
                let light = new Light().getLight()
                light.position.y = 50
                container.add(light)
            break
            case 'treasure':
                let item = new Item()
                item.position.y = settings.radius * 0.1 / 2
                container.add(item)
            break
            case 'enemy':
            break
            case 'wall': default:
            break
        }

        return container
    }
}