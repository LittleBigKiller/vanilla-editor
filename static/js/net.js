console.log('net.js loaded')

class Net {
    constructor() {
        console.log('net.js initialized')
    }

    sendLvl(pack) {
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
        $.ajax({
            url: '/LOAD-LVL',
            type: 'POST',
            success: function (data) {
                console.log('level loaded')
                main.loadLevel(data)
            },
            error: function (xhr, status, error) {
                console.log(error)
                console.log(xhr)
            },
        })
    }

    async loadLvl3D(levelId) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '/LOAD-LVL-3D',
                data: {
                    id: levelId,
                },
                type: 'POST',
                success: function (data) {
                    console.log('level loaded')
                    resolve(data)
                },
                error: function (xhr, status, error) {
                    console.log(error)
                    console.log(xhr)
                },
            })
        })
    }
}