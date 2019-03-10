console.log('main.js loaded')

class Main {
    constructor() {
        console.log('main.js initialized')
        this.pack = {}
        this.pack.size = $('#ctrl-select').val()
        this.pack.level = []
        this.type  = 'wall'
        this.hexes = []
        this.nextIn = -1
        this.init()
    }

    init() {
        this.ctrlsInit()
    }
    
    ctrlsInit() {
        $('#ctrl-genlvl').on('click', function () {
            main.pack.size = $('#ctrl-select').val()
            main.createTiles()
        })
        this.createTiles()

        $('#ctrl-send').on('click', function() {
            main.sendLevel()
        })

        $('#ctrl-load').on('click', function() {
            net.loadLvl()
        })

        $('#ctrl-types').children().on('click', function() {
            main.type  = this.innerHTML
            main.clearTypes()
            this.className = 'active'
        })
    }

    clearTypes() {
        let buts = Array.from($('#ctrl-types')[0].children)
        for (let i in buts) {
            buts[i].className = ''
        }
    }

    createTiles() {
        this.pack.level = []
        this.hexes = []
        $('#cont').html('')
        for (let i = 0; i < this.pack.size; i++) {
            for (let j = 0; j < this.pack.size; j++) {
                let hex = new Hex(this.hexes.length, i, j)
                this.hexes.push(hex)
                hex.object.on('click', this.hexClick)
                $('#cont').append(hex.object)
            }
        }
    }

    hexClick() {
        console.log(this.hex.dirOut)
        if (this.hex.dirOut == -1) {
            this.hex.dirIn = main.nextIn
            let dataPack = {}
            dataPack.id = this.hex.id
            dataPack.x = this.hex.x
            dataPack.z = this.hex.z
            dataPack.dirOut = this.hex.dirOut
            dataPack.dirIn = this.hex.dirIn
            dataPack.type = this.hex.type
            main.pack.level.push(dataPack)
        }
        this.hex.type = main.type

        this.hex.dirOut += 1
        if (this.hex.dirOut > 5) {
            this.hex.dirOut = 0
        }    
        this.style.transform = 'rotate(' + 60 * this.hex.dirOut + 'deg)'
        this.innerHTML = '^<br>' + this.hex.dirOut
        main.nextIn = (this.hex.dirOut + 3) % 6
        for (let i in main.pack.level) {
            let dataPack = main.pack.level[i]
            if (dataPack.id == this.hex.id) {
                dataPack.dirOut = this.hex.dirOut
                dataPack.type = this.hex.type
                break
            }
        }
        
    }

    sendLevel() {
        net.sendLvl(main.pack)
    }

    loadLevel(data) {
        console.log(data)
        main.pack.size = data.size
        this.createTiles()
        main.pack.level = data.level
        for (let i in data.level) {
            let dataPack = data.level[i]
            main.hexes[dataPack.id].x = parseInt(dataPack.x)
            main.hexes[dataPack.id].z = parseInt(dataPack.z)
            main.hexes[dataPack.id].dirOut = parseInt(dataPack.dirOut)
            main.hexes[dataPack.id].dirIn = parseInt(dataPack.dirIn)
            main.hexes[dataPack.id].type = parseInt(dataPack.type)
            main.hexes[dataPack.id].setup()
        }
    }
}

