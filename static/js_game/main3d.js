var net
var lvl
var main = {}
var model

$(document).ready(function () {
    scene = new THREE.Scene()
    main.scene = scene

    var winWidth = $(window).width()
    var winHeight = $(window).height()

    var camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 0.1, 10000)
    var renderer = new THREE.WebGLRenderer()
    
    /* var orbitControl = new THREE.OrbitControls(camera, renderer.domElement)
    orbitControl.addEventListener('change', function () {
        renderer.render(scene, camera)
    }) */

    //#region Camera Control Variables
    var input = {
        keyA : false,
        keyD : false,
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

    renderer.setClearColor(0xAAAAAA)
    renderer.setSize(winWidth, winHeight)

    $("#root").append(renderer.domElement)

    /* camera.position.set(500, 500, 500)
    camera.lookAt(scene.position) */

    var grid = new Grid(2000, 200)
    scene.add(grid.getGH())

    net = new Net()
    lvl = new Level(0)
    ui = new Ui()

    player = new Player()
    scene.add(player.getCont())

    marker = new Marker()
    scene.add(marker.getCont())

    model = player.getModel()

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

    $(document).mousedown(function (e) {
        movementTarget(e)

        $(document).on('mousemove', function (e) {
            movementTarget(e)
        })
    })
    $(document).mouseup(function (e) {
        $(document).off('mousemove')
    })

    var playerSpeed = settings.playerSpeed
    var angle
    var moveAnimDone = true
    var standAnimDone = true

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
                //console.log(targetVec)
                targetVec.y = 0
                dirVec = targetVec.clone().sub(player.getCont().position).normalize()
                //console.log(dirVec)

                marker.getCont().position.x = targetVec.x
                marker.getCont().position.y = targetVec.y
                marker.getCont().position.z = targetVec.z

                //console.log(player.getCont().position.clone().distanceTo(targetVec))
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

            if (!moveAnimDone) {
                model.setAnimation('run')
                moveAnimDone = true
                standAnimDone = false
            }
        } else {
            /* player.getCont().position.setX(targetVec.x)
            player.getCont().position.setY(targetVec.y)
            player.getCont().position.setZ(targetVec.z) */

            if (!standAnimDone) {
                model.setAnimation('stand')
                standAnimDone = true
                moveAnimDone = false
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

    function render() {
        cameraControls()
        movePlayer()

        model.updateModel()

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
}

