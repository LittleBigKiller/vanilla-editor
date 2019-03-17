class Level {
    constructor(levelId) {
        this.hexes = []
        this.pack
        net.loadLvl3D(levelId).then(function(value) {
            console.log(value);
            lvl.pack = value;
            lvl.loadLevel()
        })
    }

    loadLevel() {
        console.log('lvl.loadLevel()')
        let data = this.pack.level
        let radius = settings.radius
        for (let i in data) {
            let hex = new Hex3D(data[i].dirIn, data[i].dirOut)
            hex.position.z = -data[i].z * 3 * radius / 2
            //hex.position.z = -data[i].z * Math.sqrt(3 * radius * radius)
            if (data[i].z % 2 == 0) {
                hex.position.x = data[i].x * Math.sqrt(3 * radius * radius)
                //hex.position.x = data[i].x * 3 * radius / 2
            } else {
                hex.position.x = data[i].x * Math.sqrt(3 * radius * radius) + Math.sqrt(3 * radius * radius) / 2
                //hex.position.x = data[i].x * 3 * radius / 2 + radius
                //hex.position.z = data[i].z * Math.sqrt(3 * radius * radius) + Math.sqrt(3 * radius * radius) / 2
            }
            hex.position.y += settings.radius * 0.2 / 2
            hex.rotation.y = Math.PI
            this.hexes.push(hex)
        }
        console.log(lvl.hexes)
        main.addHexes()
    }

    getHexTable() {
        return this.hexes
    }
    //tu wygeneruj meshe levelu na podstawie danych zwracanych z serwera
    //i zwróć je do sceny
 
 }