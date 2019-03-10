console.log('net.js loaded')

class Net {
    constructor() {
        console.log('net.js initialized')
    }

    sendLvl(pack) {
        console.log('net.sendLvl')
        console.log(main.pack),
        $.ajax({
            url: '/SEND-LVL',
            data: {
                size: pack.size,
                level: pack.level,
            },
            type: 'POST',
            success: function (data) {
                console.log('Level sent successfully')
            },
            error: function (xhr, status, error) {
                console.log(error)
                console.log(xhr)
            },
        })
    }

    loadLvl() {
        console.log('net.sendLvl')
        $.ajax({
            url: '/LOAD-LVL',
            type: 'POST',
            success: function (data) {
                console.log('Level loaded successfully')
                main.loadLevel(data)
            },
            error: function (xhr, status, error) {
                console.log(error)
                console.log(xhr)
            },
        })
    }
}