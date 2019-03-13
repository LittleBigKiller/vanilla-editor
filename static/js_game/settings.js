var settings = {
    hexRadius: 100,
    wallMat: new THREE.MeshNormalMaterial({
        color: 0x8888ff,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true,
        opacity: 0.5
    }),
    wallGeo: new THREE.BoxGeometry(20, 5, 1),
}