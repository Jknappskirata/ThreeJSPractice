var renderer	= new THREE.WebGLRenderer({
    antialias	: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 'lightblue', 1 );
document.body.appendChild( renderer.domElement );
var onRenderFcts= [];
var scene	= new THREE.Scene();
var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 10;
camera.position.y=10;

var controls = new THREE.OrbitControls(camera, renderer.domElement);



loader=new THREE.TextureLoader();
//////////////////////////////////////////////////////////////////////////////////
//		set 3 point lighting						//
//////////////////////////////////////////////////////////////////////////////////
;(function(){
    // add a ambient light
    var light	= new THREE.AmbientLight(0x020202,0.5)
    scene.add( light )
    // add a light in front
    var light	= new THREE.DirectionalLight('white', 0.5)
    light.position.set(0.5, 0.5, 2)
    scene.add( light )
    // add a light behind
    var light	= new THREE.DirectionalLight('white', 0.5)
    light.position.set(-0.5, -0.5, -2)
    scene.add( light )		
})()

// add a light behind

// onRenderFcts.push(function(delta, now){
//     var angle	= now*Math.PI*2 * 0.2
//     light.position.x= Math.cos(angle)*3
//     light.position.y= Math.sin(angle)*3
//     // light.position.z= Math.sin(angle)*3
// })

//////////////////////////////////////////////////////////////////////////////////
//		grass ground							//
//////////////////////////////////////////////////////////////////////////////////

var textureUrl	= 'textures/grasslight-small.jpg'
var texture	= loader.load(textureUrl);
texture.wrapS	= THREE.RepeatWrapping;
texture.wrapT	= THREE.RepeatWrapping;
texture.repeat.x= 10
texture.repeat.y= 10
texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
// build object3d
var geometry	= new THREE.PlaneGeometry(20, 20)
var material	= new THREE.MeshPhongMaterial({
    map	: texture,
    emissive: 'green',
})
var object3d	= new THREE.Mesh(geometry, material)
object3d.rotateX(-Math.PI/2)
scene.add(object3d)

stats = new Stats();
stats.setMode(0);

stats.domElement.style.position='absolute';
stats.domElement.style.left ='0px';
stats.domElement.style.top ='0px';
document.body.appendChild(stats.domElement);


//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////
var nTufts	= 5000
var positions	= new Array(nTufts)
for(var i = 0; i < nTufts; i++){
    var position	= new THREE.Vector3()
    position.x	= (Math.random()-0.5)*20
    position.z	= (Math.random()-0.5)*20
    positions[i]	= position
}
var mesh	= THREEx.createGrassTufts(positions)
scene.add(mesh)
// load the texture
var textureUrl		= 'textures/grass01.png'
var material		= mesh.material
material.map		= loader.load(textureUrl);
material.alphaTest	= 0.7
//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////


var nTufts	= 5000
var positions	= new Array(nTufts)
for(var i = 0; i < nTufts; i++){
    var position	= new THREE.Vector3()
    position.x	= (Math.random()-0.5)*20
    position.z	= (Math.random()-0.5)*20
    positions[i]	= position
}
var mesh	= THREEx.createGrassTufts(positions)
scene.add(mesh)
// load the texture
var textureUrl		= 'textures/grass02.png'
var material		= mesh.material
material.map		= loader.load(textureUrl);
material.alphaTest	= 0.7

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////
var nTufts	= 100
var positions	= new Array(nTufts)
for(var i = 0; i < nTufts; i++){
    var position	= new THREE.Vector3()
    position.x	= (Math.random()-0.5)*20
    position.z	= (Math.random()-0.5)*20
    positions[i]	= position
}
var mesh	= THREEx.createGrassTufts(positions)
scene.add(mesh)
// load the texture
var material		= mesh.material
var textureUrl		= 'textures/flowers01.png'
material.map		= loader.load(textureUrl);
material.emissive.set(0x888888)
material.alphaTest	= 0.7

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////
var nTufts	= 100
var positions	= new Array(nTufts)
for(var i = 0; i < nTufts; i++){
    var position	= new THREE.Vector3()
    position.x	= (Math.random()-0.5)*20
    position.z	= (Math.random()-0.5)*20
    positions[i]	= position
}
var mesh	= THREEx.createGrassTufts(positions)
scene.add(mesh)
// load the texture
var material		= mesh.material
var textureUrl		= 'textures/flowers02.png'
material.map		= loader.load(textureUrl);
material.emissive.set(0x888888)
material.alphaTest	= 0.7

//////////////////////////////////////////////////////////////////////////////////
//		Camera Controls							//
//////////////////////////////////////////////////////////////////////////////////
var mouse	= {x : 0, y : 0}
document.addEventListener('mousemove', function(event){
    // mouse.x	= (event.clientX / window.innerWidth ) - 0.5
    // mouse.y	= (event.clientY / window.innerHeight) - 0.5
}, false)
onRenderFcts.push(function(delta, now){
    //camera.position.x += (mouse.x*2 - camera.position.x) * (delta*3)
    //camera.position.y += (mouse.y*2 - camera.position.y) * (delta*3)
    camera.lookAt( scene.position )
})
//////////////////////////////////////////////////////////////////////////////////
//		render the scene						//
//////////////////////////////////////////////////////////////////////////////////
onRenderFcts.push(function(){
    renderer.render( scene, camera );		
})

//////////////////////////////////////////////////////////////////////////////////
//		loop runner							//
//////////////////////////////////////////////////////////////////////////////////
var lastTimeMsec= null
requestAnimationFrame(function animate(nowMsec){

    stats.update();
    // keep looping
    requestAnimationFrame( animate );
    // measure time
    lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
    var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
    lastTimeMsec	= nowMsec
    // call each update function
    onRenderFcts.forEach(function(onRenderFct){
        onRenderFct(deltaMsec/1000, nowMsec/1000)
    })
})