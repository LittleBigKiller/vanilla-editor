var settings = {
    radius: 150,
    wallMat: new THREE.MeshPhongMaterial({
        color: 0x3388dd,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true,
        opacity: 1
    }),
    floorMat: new THREE.MeshPhongMaterial({
        color: 0xdd3388,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true,
        opacity: 1
    }),
    playerSpeed: 5,
}
settings.wallHeight = 75//settings.radius * 0.25
settings.wallGeo = new THREE.BoxGeometry(settings.radius, settings.wallHeight, settings.radius * 0.05)
settings.doorPartGeo = new THREE.BoxGeometry(settings.radius * 0.3, settings.wallHeight, settings.radius * 0.05)
settings.floorGeo = new THREE.CylinderGeometry(settings.radius, settings.radius, 2, 6)