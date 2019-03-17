var settings = {
    radius: 100,
    wallMat: new THREE.MeshNormalMaterial({
        color: 0x8888ff,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true,
        opacity: 1
    })
}
settings.wallGeo = new THREE.BoxGeometry(settings.radius, settings.radius * 0.2, settings.radius * 0.05)
settings.doorPartGeo = new THREE.BoxGeometry(settings.radius * 0.4, settings.radius * 0.2, settings.radius * 0.05)