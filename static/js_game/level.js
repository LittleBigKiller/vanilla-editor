class Level {
    constructor(levelId) {
        console.error(levelId)
        this.hexes = []
        this.pack
        net.loadLvl3D(levelId).then(function(value) {
            lvl.pack = value
            lvl.loadLevel()
        })
        this.lights = []
    }

    loadLevel() {
        console.log('lvl.loadLevel()')
        let data = this.pack.level
        let radius = settings.radius
        for (let i in data) {
            let hex = new Room(data[i].dirIn, data[i].dirOut, data[i].type)
            hex.position.z = -data[i].z * 3 * radius / 2
            if (data[i].z % 2 == 0) {
                hex.position.x = data[i].x * Math.sqrt(3 * radius * radius)
            } else {
                hex.position.x = data[i].x * Math.sqrt(3 * radius * radius) + Math.sqrt(3 * radius * radius) / 2
            }
            hex.position.y += settings.wallHeight / 2
            hex.rotation.y = Math.PI
            this.hexes.push(hex)
        }
        console.log(lvl.hexes)
        main.addHexes()
    }

    getHexTable() {
        return this.hexes
    }
}