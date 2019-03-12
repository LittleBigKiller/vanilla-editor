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
        let cont = $('<div>')
        let hex0 = $('<div>')
        let hex1 = $('<div>')
        let hex2 = $('<div>')
        let text = $('<div>')
        cont.addClass('hex')
        hex0.addClass('testHex')
        hex1.addClass('testHex')
        hex2.addClass('testHex')
        text.addClass('hexText')
        cont.css('left', this.z * 116 - 29 * this.z + 29)
        if (this.z % 2 == 0) {
            cont.css('top', this.x * 101)
        } else {
            cont.css('top', this.x * 101 + 50)
        }
        hex1.css('transform', 'rotate(60deg)')
        hex2.css('transform', 'rotate(120deg)')
        cont.append(hex0)
        cont.append(hex1)
        cont.append(hex2)
        cont.append(text)
        cont[0].hex = this
        this.dirOut = -1
        this.object = cont
    }

    setup() {
        this.object.css('transform', 'rotate(' + 60 * this.dirOut + 'deg)')
        this.object.children('.hexText').html('^<br>' + this.dirOut)
        console.log(this.type)
        switch (this.type) {
            case 'wall':
                this.object.children('.testHex').css('backgroundColor', '#3388dd')
            break
            case 'enemy':
                this.object.children('.testHex').css('backgroundColor', '#dd3333')
            break
            case 'treasure':
                this.object.children('.testHex').css('backgroundColor', '#dd8833')
            break
            case 'light':
                this.object.children('.testHex').css('backgroundColor', '#dddd33')
            break
        }
    }
}