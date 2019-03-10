console.log('hex.js loaded')

class Hex {
    constructor(id, x, z) {
        this.id = id
        this.x = x
        this.z = z
        this.dirIn
        this.dirOut
        this.type
        
        this.create()
        this.object
    }

    create() {
        let hex = $('<div>')
        hex.addClass('hex')
        hex.css('left', this.z * 116 - 29 * this.z)
        if (this.z % 2 == 0) {
            hex.css('top', this.x * 100)
        } else {
            hex.css('top', this.x * 100 + 50)
        }
        hex[0].hex = this
        this.dirOut = -1
        this.object = hex
    }

    setup() {
        this.object.css('transform', 'rotate(' + 60 * this.dirOut + 'deg)')
        this.object.html('^<br>' + this.dirOut)
    }
}