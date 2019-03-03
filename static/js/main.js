function createTiles(amount) {
    $('#cont').html('')
    for (let i = 0; i < amount; i++) {
        for (let j = 0; j < amount; j++) {
            let div = $('<div>')
            div.addClass('hex')
            div.css('left', i * 116 - 29 * i)
            if (i % 2 == 0) {
                div.css('top', j * 100)
            } else {
                div.css('top', j * 100 + 50)
            }
            div.html('^<br>0')
            $('#cont').append(div)
        }
    }
}

$(document).ready(function () {
    $('#ctrl-hex-select').on('input', function () {
        createTiles(this.value)
    })
    createTiles($('#ctrl-hex-select').val)
})