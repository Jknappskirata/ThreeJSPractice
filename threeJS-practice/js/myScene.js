//Skybox and Texture Updatating




//#region SETUP
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(1000,1000,1000,10000, 0.1, 100000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x101010);
document.body.appendChild(renderer.domElement);
//#endregion

//#region Orbital Controls
 var controls = new THREE.OrbitControls(camera, renderer.domElement);
// //Orbital Control Limits
controls.minDistance = 0;
controls.maxDistance = 100000;
controls.zoomSpeed =0.5;
// controls.enableDamping = false;
// controls.dampingFactor = 2;
controls.minPolarAngle = Math.PI/6; // radians
controls.maxPolarAngle = Math.PI/2; // radians
controls.maxPolarAngle = Math.PI/3; 
controls.panSpeed=0.2;
//#endregion

//#region Sky
var geometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
var cubeMaterials = [
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( "textures/xpos.png" ), side: THREE.DoubleSide }), //front side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'textures/xneg.png' ), side: THREE.DoubleSide }), //back side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'textures/ypos.png' ), side: THREE.DoubleSide }), //up side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'textures/yneg.png' ), side: THREE.DoubleSide }), //up side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'textures/zpos.png' ), side: THREE.DoubleSide }), //right side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'textures/zneg.png' ), side: THREE.DoubleSide }) //left side
];

//var cubeMaterial = new THREE.MeshBasicMaterial(cubeMaterials );
var cube = new THREE.Mesh( geometry, cubeMaterials );
cube.position.setY(0);
scene.add(cube);
//#endregion


//#region Lighting
//Ambient Lighting of the whole scene
var light = new THREE.AmbientLight(0xffffff);
scene.add(light);
//#endregion

//#region Define and Place Geometry

//Add the grass plane
var geometry = new THREE.PlaneGeometry(100, 100);
var texture = new THREE.TextureLoader().load('textures/grass.jpg');
var material1 = new THREE.MeshLambertMaterial({
    map: texture,
    side: THREE.DoubleSide
});
var ground = new THREE.Mesh(geometry, material1);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
scene.add(ground);

//Adding plane with changing textures
//textures to load
var arr = [
     new THREE.TextureLoader().load('textures/download.jfif'),
     new THREE.TextureLoader().load('textures/wood.jpeg'),
     new THREE.TextureLoader().load('textures/wood1.jpg')
   ];
//default texture is the first in the array
var textureToShow=0;

// this function takes in the number of the texture to be displayed and adds a plane with that texture
function textureUpdate(num){
textureToShow=num;
var loader= new THREE.TextureLoader();
loader.crossOrigin = '';
var material2 = new THREE.MeshLambertMaterial();
material2.map = arr[textureToShow];
var geometry=new THREE.PlaneGeometry(1000,1000);
var driveway=new THREE.Mesh(geometry,material2);
driveway.rotation.x = -Math.PI / 2;
driveway.position.x = 1000;
driveway.position.y = 15;
driveway.position.z = 1000;
scene.add(driveway);
}

//default call of method so the initial plane with default texture appears
textureUpdate(textureToShow);

let axisHelper = new THREE.AxesHelper(200);
scene.add(axisHelper);
camera.position.set(4000,4000,4000);
camera.lookAt(0,0,0);
//#endregion

//#region button setup

var resetPosition = document.getElementById('resetPosition');
resetPosition.onclick= function Reset(){  
camera.position.set(4000,4000,4000);
camera.lookAt(0,0,0);
}
var resetPosition = document.getElementById('Texture1');
resetPosition.onclick= function textureUpdate1(){
    textureToShow=0;
    textureUpdate(textureToShow); 
};
var resetPosition = document.getElementById('Texture2');
resetPosition.onclick= function textureUpdate2(){
    textureToShow=1;
    textureUpdate(textureToShow);   
};
var resetPosition = document.getElementById('Texture3');
resetPosition.onclick= function textureUpdate3(){
    textureToShow=2;
    textureUpdate(textureToShow);   
};
//#endregion

var animate = function () {
    requestAnimationFrame(animate);
//Forcing camera to not be able to pan outside of the skybox
if(camera.position.x<-4000){
    camera.position.x=-4000;
}
if(camera.position.x>4000){
    camera.position.x=4000;
}
if(camera.position.y<0){
    camera.position.y=200;
}
if(camera.position.y>4000){
    camera.position.y=4000;
}
if(camera.position.z<-4000){
    camera.position.z=-4000;
}
if(camera.position.z>4000){
    camera.position.z=4000;
}
    
    controls.update();
    renderer.render(scene, camera);
    // console.log('X:' + camera.position.x);
    // console.log('Y:' +camera.position.y);
    // console.log('Z:' +camera.position.z);

     
    

}
animate();