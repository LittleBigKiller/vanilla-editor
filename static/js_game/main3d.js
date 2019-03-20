var net
var lvl
var main = {}
//var ui = new 

$(document).ready(function () {
    
    scene = new THREE.Scene()
    main.scene = scene
    
    var winWidth = $(window).width()
    var winHeight = $(window).height()
    
    var camera = new THREE.PerspectiveCamera(
        45,    // kąt patrzenia kamery (FOV - field of view)
        winWidth/winHeight,    // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
        0.1,    // minimalna renderowana odległość
        10000    // maxymalna renderowana odległość od kamery
    )
    var renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0xAAAAAA)
    renderer.setSize(winWidth, winHeight)
    
    $("#fovSlider").val(45)
    $("#fovText").text(45)

    $("#root").append(renderer.domElement)
    
    camera.position.x = -200
    camera.position.y = 200
    camera.position.z = 200
    camera.position.set(100,100,100)
    camera.lookAt(scene.position)

    var grid = new Grid(2000, 200)
    scene.add(grid.getGH())

    net = new Net()
    lvl = new Level(0)

    var orbitControl = new THREE.OrbitControls(camera, renderer.domElement)
    orbitControl.addEventListener('change', function () {
        renderer.render(scene, camera)
    })

    var axes = new THREE.AxesHelper(1000)
    scene.add(axes)

    main.scene = scene
    
    function render() {
        //w tym miejscu ustalamy wszelkie zmiany w projekcie (obrót, skalę, położenie obiektów)
        //np zmieniająca się wartość rotacji obiektu\
        
        //wykonywanie funkcji bez końca ok 60 fps jeśli pozwala na to wydajność maszyny
        
        requestAnimationFrame(render)
        
        //ciągłe renderowanie / wyświetlanie widoku sceny nasza kamerą
                
        renderer.render(scene, camera)
    }
    
    $(window).resize(function() {
        winWidth = $(window).width()
        winHeight = $(window).height()
        camera.aspect = winWidth/winHeight
        camera.updateProjectionMatrix()
        renderer.setSize(winWidth, winHeight)
    })
    
    render()
})

main.addHexes = function() {
    hexes = lvl.getHexTable()
    console.log(hexes)
    for (let i in hexes) {
        console.log(hexes[i])
        main.scene.add(hexes[i])
    }
    //main.scene.add(hexes[0])
    //main.scene.add(hexes[1])
}

