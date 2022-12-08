var renderer, cube, plane, orbit, gui, controls, object, material, mesh, pointLight, light
let scene, camera

var Listgeomtry = [new THREE.BoxGeometry(1, 1, 1),
    new THREE.SphereGeometry(1, 30, 30),
    new THREE.ConeGeometry(1, 2, 30),
    new THREE.CylinderGeometry(1, 1, 2, 30),
    new THREE.TorusGeometry(1, 0.5, 50, 100),
    new THREE.TeapotGeometry(1, 10, true, true, true, true, true),
    new THREE.TetrahedronGeometry(1, 0),
    new THREE.OctahedronGeometry(1, 0),
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.RingGeometry(1, 2, 30),
]

var Listmat = [new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 }),
    new THREE.LineBasicMaterial({ color: 0xaaaaaa, linewidth: 10, transparent: true, opacity: 10 }),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
]


function init() {
    // SCENE
    scene = new THREE.Scene()
    gui = new dat.GUI({});
    var enableFog = false;
    if (enableFog) {
        scene.fog = new THREE.FogExp2(0xffffff, 0.2);
    }

    // LIGHT
    var ambieantLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambieantLight);

    var directLight = new THREE.DirectionalLight(0xffffff, 0.5, 100);
    directLight.position.set(0, 10, 0);
    directLight.castShadow = true;
    scene.add(directLight);


    // CAMERA
    camera = new THREE.PerspectiveCamera(
        50, window.innerWidth / window.innerHeight,
        1, 1000
    );

    // RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // CONTROL
    orbit = new THREE.OrbitControls(camera, renderer.domElement);
    // orbit.rotateSpeed = 1;
    // orbit.enableDamping = true;
    // orbit.dampingFactor = .05;
    // camera.position.z = 5;
    // camera.position.y = 2;
    camera.position.x = 1;
    camera.position.y = 1;
    camera.position.z = 8;

}

function getPoints(object) {
    const material = new THREE.PointsMaterial({ size: 0.5 });
    const sphere = new THREE.Points(object, material);
    return sphere;
}

function getBoxHelper(size) {
    const sphere = new THREE.SphereGeometry(size, 24, 24);
    const objectect = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial(0xff0000));
    const box = new THREE.BoxHelper(objectect, 0xffff00);
    return box;
}

function getPlane(size) {
    var geometry = new THREE.PlaneGeometry(size, size);
    var material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(geometry, material)
    mesh.receiveShadow = true;
    return mesh;
}

function getSphere(size) {
    var geometry = new THREE.SphereGeometry(size, 24, 24);
    var material = new THREE.MeshBasicMaterial({ color: 0xFFFF00 })
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

function update() {
    requestAnimationFrame(update);
    // cube.rotation.z += 0.01;
    //cube.rotation.x += 0.01;
    // orbit.update();
    renderer.render(scene, camera);

}
var num = 0;

function addMesh(num) {
    scene.remove(object);
    geometry = Listgeomtry[num];
    material = new THREE.MeshLambertMaterial({ color: 0xffffff });
    object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    scene.add(object);
}


function addPoints() {
    scene.remove(object);
    geometry = Listgeomtry[num];
    material = Listmat[0];
    object = new THREE.Points(geometry, material);
    object.castShadow = true;
    scene.add(object);
}

function addLine() {
    scene.remove(object);
    geometry = Listgeomtry[num];
    material = Listmat[0];
    object = new THREE.LineSegments(
        new THREE.WireframeGeometry(geometry), material);
    object.castShadow = true;
    scene.add(object);
}

function addSolid() {

    addMesh(num)
}

function addTexture() {
    const file = document.getElementById('up_hinh').files[0];
    if (file) {
        const imgSrc = URL.createObjectURL(file);
        const texture = new THREE.TextureLoader().load(imgSrc)
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        scene.remove(object);
        geometry = Listgeomtry[num];
        material = new THREE.MeshLambertMaterial({ map: texture });
        object = new THREE.Mesh(geometry, material);
        object.castShadow = true;
        scene.add(object);
    }

}

var flagPoint = 0;
var flagGUI = 0;

function addPointLight() {
    // SPHERE
    if (flagPoint == 0) {
        pointLight = new THREE.PointLight(0xFFFF00, 1);
        pointLight.position.set(2, 2, 2);
        pointLight.intensity = 0.5;
        pointLight.castShadow = true;

        plane = getPlane(20);
        plane.rotation.x = Math.PI / 2;
        scene.add(plane);

        var sphere = getSphere(0.05);
        pointLight.add(sphere);
        scene.add(pointLight);
        flagPoint = 1;
    }

    // ADD to GUI
    if (flagGUI == 0) {
        light = gui.addFolder('PointLight');
        light.add(pointLight, 'intensity', 0, 1);
        light.add(pointLight.position, 'x', -10, 10);
        light.add(pointLight.position, 'y', -10, 10);
        light.add(pointLight.position, 'z', -10, 10);
        flagGUI = 1;
    }

}

function removePointLight() {
    if (flagPoint == 1) {
        scene.remove(pointLight);
        scene.remove(plane);
        flagPoint = 0;
    }
}

var isPlay = false;

function activeAnimation1() {
    isPlay = true;
    animation1();
}

function animation1() {
    if (isPlay == false) {
        return;
    }
    requestAnimationFrame(animation1);
    object.rotation.x += 0.1;
    renderer.render(scene, camera);

}

function activeAnimation2() {
    isPlay = true;
    animation2();
}

function animation2() {
    if (isPlay == false) {
        return;
    }
    requestAnimationFrame(animation2);
    object.rotation.y += 0.1;
    renderer.render(scene, camera);
}

function activeAnimation3() {
    isPlay = true;
    animation3();
}

function animation3() {
    if (isPlay == false) {
        return;
    }
    requestAnimationFrame(animation3);
    object.rotation.z += 0.1;
    renderer.render(scene, camera);
}

function removeAnimation() {
    isPlay = false;
}
modes = ['translate', 'rotate', 'scale'];
var flagCtrl = 0;


init();
update();