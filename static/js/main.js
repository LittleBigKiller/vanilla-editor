var level = []
var net = new Net()

$(document).ready(function () {
    $('#ctrl-hex-select').on('input', function () {
        createTiles(this.value)
    })
    createTiles($('#ctrl-hex-select').val())

    $('#ctrl-hex-send').on('click', genAndSend)
})

function createTiles(amount) {
    $('#cont').html('')
    for (let i = 0; i < amount; i++) {
        for (let j = 0; j < amount; j++) {
            let hex = $('<div>')
            hex.addClass('hex')
            hex.css('left', i * 116 - 29 * i)
            if (i % 2 == 0) {
                hex.css('top', j * 100)
            } else {
                hex.css('top', j * 100 + 50)
            }
            hex.html('^<br>0')
            hex[0].rot = 0
            hex[0].x = i
            hex[0].y = j
            hex[0].z = 0
            hex.on('click', hexClick)
            $('#cont').append(hex)
        }
    }
}

function hexClick() {
    this.rot += 1
    if (this.rot > 5) {
        this.rot = 0
    }

    this.style.transform = 'rotate(' + 60 * this.rot + 'deg)'
    this.innerHTML = '^<br>' + this.rot
}

function genAndSend() {
    level = []
    // Łapać wszystko z klasą "hex"?
    let hexes = Array.from($('#cont')[0].children)
    console.log(Array.from($('#cont')[0].children))
    for (let i in hexes) {
        let tile = {
            x: hexes[i].x,
            y: hexes[i].y,
            z: hexes[i].z,
            rot: hexes[i].rot,
        }
        level.push(tile)
    }
    console.log(level)
    net.sendLvl(level)
}

