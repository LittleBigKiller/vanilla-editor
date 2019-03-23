class Ui {
    constructor() {
        console.log('ui initiated')
        this.genRanges()
    }
    genRanges() {
        let cont = $('#ctrl-light')[0]

        let rHeight = document.createElement('input')
        rHeight.type = "range"
        rHeight.min = 50
        rHeight.value = 50
        rHeight.max = 500
        rHeight.step = 1
        cont.append(rHeight)
        rHeight.oninput = function() {
            for (let i in lvl.lights) {
                lvl.lights[i].position.y = this.value
            }
        }

        let rIntensity = document.createElement('input')
        rIntensity.type = "range"
        rIntensity.min = 0
        rIntensity.value = 1
        rIntensity.max = 2
        rIntensity.step = 0.1
        cont.append(rIntensity)
        rIntensity.oninput = function() {
            for (let i in lvl.lights) {
                lvl.lights[i].setIntensity(this.value)
            }
        }
    }
}