var net
var lvl
var main = {}
var model
var ally_table = []
var player_following = []

$(document).ready(function () {
    scene = new THREE.Scene()
    main.scene = scene

    var winWidth = $(window).width()
    var winHeight = $(window).height()

    var camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 0.1, 10000)
    var renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor(0xAAAAAA)
    renderer.setSize(winWidth, winHeight)
    //renderer.setPixelRatio(2)

    /* var orbitControl = new THREE.OrbitControls(camera, renderer.domElement)
    orbitControl.addEventListener('change', function () {
        renderer.render(scene, camera)
    }) */

    //#region Camera Control Variables
    var input = {
        keyA: false,
        keyD: false,
    }
    var camAngle = 0
    var camPosMulti = 500
    //#endregion

    //#region Camera Control Inputs
    $(document).keydown(function (e) {
        switch (e.which) {
            case 65:
                input.keyA = true
                break
            case 68:
                input.keyD = true
                break
            default:
                break
        }
    })

    $(document).keyup(function (e) {
        switch (e.which) {
            case 65:
                input.keyA = false
                break
            case 68:
                input.keyD = false
                break
            default:
                break
        }
    })
    //#endregion

    $('#root').append(renderer.domElement)

    camera.position.set(500, 500, 500)
    camera.lookAt(scene.position)

    var grid = new Grid(2000, 200)
    scene.add(grid.getGH())

    net = new Net()
    lvl = new Level(0)
    ui = new Ui()

    player = new Player()
    scene.add(player.getCont())

    marker = new Marker()
    scene.add(marker.getCont())

    var axes = new THREE.AxesHelper(1000)
    scene.add(axes)

    main.scene = scene

    $(window).resize(function () {
        winWidth = $(window).width()
        winHeight = $(window).height()
        camera.aspect = winWidth / winHeight
        camera.updateProjectionMatrix()
        renderer.setSize(winWidth, winHeight)
    })

    var targetVec = new THREE.Vector3(0, 0, 0)
    var dirVec = new THREE.Vector3(0, 0, 0)

    $(document).on('mousemove', function (e) {
        var raycaster = new THREE.Raycaster()
        var mouseVector = new THREE.Vector2()

        mouseVector.x = (e.clientX / $(window).width()) * 2 - 1
        mouseVector.y = -(e.clientY / $(window).height()) * 2 + 1
        raycaster.setFromCamera(mouseVector, camera)
        var inter = raycaster.intersectObjects(scene.children, true)

        for (let i in ally_table) {
            ally_table[i].lowlight()
        }
        $(document).off('click')

        if (inter.length > 0) {
            if (inter[0].object.name == 'Ally') {
                var obj = inter[0].object.parent.parent
                for (let i in ally_table) {
                    if (obj == ally_table[i].getCont()) {
                        ally_table[i].highlight()
                        $(document).on('click', function () {
                            if (ally_table[i].getCont().position.clone().distanceTo(player.getCont().position) < 150) {
                                if (player_following.indexOf(ally_table[i]) == -1) {
                                    player_following.push(ally_table[i])
                                }
                            }
                        })
                    }
                }
            }
        }
    })

    $('#root').mousedown(function (e) {
        movementTarget(e)

        $('#root').on('mousemove', function (e) {
            movementTarget(e)
        })
    })
    $('#root').mouseup(function (e) {
        $('#root').off('mousemove')
    })

    var playerSpeed = settings.playerSpeed
    var angle

    function movementTarget(e) {
        var raycaster = new THREE.Raycaster()
        var mouseVector = new THREE.Vector2()

        mouseVector.x = (e.clientX / $(window).width()) * 2 - 1
        mouseVector.y = -(e.clientY / $(window).height()) * 2 + 1
        raycaster.setFromCamera(mouseVector, camera)
        var inter = raycaster.intersectObjects(scene.children, true)

        if (inter.length > 0) {
            if (inter[0].object.name == "NAV-PLANE") {
                if (e.type == 'mousedown')
                    moveAnimDone = false

                targetVec = inter[0].point
                targetVec.y = 0
                dirVec = targetVec.clone().sub(player.getCont().position).normalize()

                marker.getCont().position.x = targetVec.x
                marker.getCont().position.y = targetVec.y
                marker.getCont().position.z = targetVec.z

                angle = Math.atan2(
                    player.getCont().position.clone().x - targetVec.x,
                    player.getCont().position.clone().z - targetVec.z
                )

                player.getMesh().rotation.y = angle + Math.PI
            }
        }
    }

    function movePlayer() {
        if (player.getCont().position.clone().distanceTo(targetVec) > playerSpeed) {
            player.getCont().translateOnAxis(dirVec, playerSpeed)
            camera.position.x = player.getCont().position.x + camPosMulti * Math.sin(camAngle)
            camera.position.z = player.getCont().position.z + camPosMulti * Math.cos(camAngle)
            camera.position.y = player.getCont().position.y + 400
            camera.lookAt(player.getCont().position)

            if (player.getModel().animname != 'run') {
                player.getModel().setAnimation('run')
            }
        } else {
            if (player.getModel().animname != 'stand') {
                player.getModel().setAnimation('stand')
            }
        }
    }

    function moveFollowing() {
        for (let i in player_following) {
            let angle = Math.atan2(
                player_following[i].getCont().position.clone().x - targetVec.x,
                player_following[i].getCont().position.clone().z - targetVec.z
            )

            player_following[i].getMesh().rotation.y = angle + Math.PI

            let dirVec = player.getCont().position.clone().sub(player_following[i].getCont().position).normalize()
            if (player_following[i].getCont().position.clone().distanceTo(player.getCont().position) > (50 + 50 * i)) {
                player_following[i].getCont().translateOnAxis(dirVec, playerSpeed * 9 / 10)

                if (player_following[i].getModel().animname != 'run') {
                    player_following[i].getModel().setAnimation('run')
                }
            } else {
                if (player_following[i].getModel().animname != 'stand') {
                    player_following[i].getModel().setAnimation('stand')
                }
            }
        }
    }

    function cameraControls() {
        if (input.keyA) {
            camAngle -= 0.05
            updateCamera()
        }
        if (input.keyD) {
            camAngle += 0.05
            updateCamera()
        }
    }

    function updateCamera() {
        camera.position.x = player.getCont().position.x + camPosMulti * Math.sin(camAngle)
        camera.position.z = player.getCont().position.z + camPosMulti * Math.cos(camAngle)
        camera.lookAt(player.getCont().position)
    }

    main.createAllies = function () {
        for (let i in hexes) {
            if (hexes[i].roomType == 'ally') {
                let tempAlly = new Ally()
                ally_table.push(tempAlly)
                scene.add(tempAlly.getCont())

                tempAlly.getCont().position.x = hexes[i].position.x
                tempAlly.getCont().position.z = hexes[i].position.z
            }
        }
    }

    function updateAllies() {
        for (let i in ally_table) {
            ally_table[i].getModel().updateModel()
        }
    }

    function render() {
        cameraControls()
        movePlayer()
        moveFollowing()

        player.getModel().updateModel()
        updateAllies()

        requestAnimationFrame(render)

        renderer.render(scene, camera)
    }

    render()
})

main.addHexes = function () {
    hexes = lvl.getHexTable()
    for (let i in hexes) {
        main.scene.add(hexes[i])
    }

    marker.getCont().position.x = hexes[0].position.x
    player.getCont().position.x = hexes[0].position.x
    marker.getCont().position.z = hexes[0].position.z
    player.getCont().position.z = hexes[0].position.z

    main.createAllies()
}

