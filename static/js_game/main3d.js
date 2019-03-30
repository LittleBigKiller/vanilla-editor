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

    renderer.setClearColor(0xAAAAAA)
    renderer.setSize(winWidth, winHeight)

    $("#root").append(renderer.domElement)

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

    model = player.getModel()
    /* model.loadModel(function (modeldata) {
        //console.log("model został załadowany", modeldata)
        scene.add(modeldata)

        console.log(modeldata.children[0].geometry.animations)

        console.log(modeldata)
        //var box = new THREE.Box3().setFromObject(modeldata.meshModel);
        //console.log(box.getSize().y)

        for (var i = 0; i < modeldata.meshModel.animations.length; i++) {
            console.log(modeldata.meshModel.animations[i].name)
        }
    }) */

    var orbitControl = new THREE.OrbitControls(camera, renderer.domElement)
    orbitControl.addEventListener('change', function () {
        renderer.render(scene, camera)
    })

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
        var raycaster = new THREE.Raycaster()
        var mouseVector = new THREE.Vector2()

        mouseVector.x = (e.clientX / $(window).width()) * 2 - 1
        mouseVector.y = -(e.clientY / $(window).height()) * 2 + 1
        raycaster.setFromCamera(mouseVector, camera)
        var inter = raycaster.intersectObjects(scene.children, true)

        if (inter.length > 0) {
            if (inter[0].object.name == "NAV-PLANE") {
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

                moveAnimDone = false
            }
        }
    })

    var playerSpeed = settings.playerSpeed
    var angle
    var moveAnimDone = true
    var standAnimDone = true

    function movementTarget() {
        
    }

    function movePlayer() {
        if (player.getCont().position.clone().distanceTo(targetVec) > playerSpeed) {
            player.getCont().translateOnAxis(dirVec, playerSpeed)
            camera.position.x = player.getCont().position.x
            camera.position.z = player.getCont().position.z + 200
            camera.position.y = player.getCont().position.y + 200
            camera.lookAt(player.getCont().position)

            if (!moveAnimDone) {
                //console.log('move')
                model.setAnimation('run')
                moveAnimDone = true
                standAnimDone = false
            }
        } else  {
            //console.log('lmao')
            player.getCont().position.setX(targetVec.x)
            player.getCont().position.setY(targetVec.y)
            player.getCont().position.setZ(targetVec.z)

            if (!standAnimDone) {
                //console.log('stand')
                model.setAnimation('stand')
                standAnimDone = true
                moveAnimDone = false
            }
        }
    }

    function render() {
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
}

