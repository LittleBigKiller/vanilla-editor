class Net {
    constructor() {

    }

    sendLvl(lvl) {
        console.log('net.firstReq')
        $.ajax({
            url: '/SEND-LVL',
            data: {
                level: lvl
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
}