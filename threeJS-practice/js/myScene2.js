
//Stormtrooper Lighting test Scene



var example= (function(){
ambLightIntensity=1;

var scene= new THREE.Scene(),
renderer= window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
light= new THREE.AmbientLight(0xffffff,ambLightIntensity),
camera,
box, 
stats;


var mat;



function initScene(){
    renderer.setSize( window.innerWidth,window.innerHeight);
    renderer.shadowMapEnabled=true;



    document.body.appendChild(renderer.domElement);

    scene.add(light);

    camera = new THREE.PerspectiveCamera(35,window.innerWidth/window.innerHeight,1,10000);
    camera.position.z=100;
    scene.add(camera);
    camera.position.x=-3.67;
    camera.position.y=11.18;
    camera.position.z=-18.86;
    

    // box= new THREE.Mesh( new THREE.BoxGeometry(20,20,20), new THREE.MeshBasicMaterial({color:0xFF0000}));
    // box.name="box";
    // scene.add(box);

    var LightIntensity=0.5;

    spotLight = new THREE.SpotLight( 0xffffff, LightIntensity );
    lightHelper=new THREE.SpotLightHelper(spotLight);
    spotLight.castShadow=true;
    spotLight.shadow.mapSize.width=4000;
    spotLight.shadow.mapSize.height=4000;

    spotLight.position.y=10;
    spotLight.position.z=-10;
    scene.add( spotLight );
    
    
    var cameraHelper= new THREE.CameraHelper(spotLight.shadow.camera);
    scene.add(cameraHelper);

    var geometry = new THREE.PlaneGeometry(50,50);
    var material = new THREE.MeshLambertMaterial({color:0xF0ECEC, side: THREE.DoubleSide});
    var plane= new THREE.Mesh( geometry, material);

    plane.rotation.x=Math.PI/2

    plane.receiveShadow=true;

    scene.add(plane);


    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;

    loader.load('models/stormtrooper.dae', function ( collada ){
        trooper = collada.scene;
        scene.add(trooper)
        
        
        //collada.scene.children[1].material=new THREE.MeshPhongMaterial({color:0xff0000});

        
        

        troopermesh=trooper.children[1];
        troopermesh.castShadow=true;
        troopermesh.receiveShadow=true;

        trooper.traverse(function(child){
            child.castShadow=true;
            child.receiveShadow=true;
        })

        

        console.log(collada.scene.children[1]);
       let bufGeo=collada.scene.children[1].geometry;
       let geometry2=new THREE.Geometry().fromBufferGeometry(bufGeo)
       console.log(geometry2);
        

        
        
        
        render();
    })

    
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position='absolute';
    stats.domElement.style.left ='0px';
    stats.domElement.style.top ='0px';
    document.body.appendChild(stats.domElement);

    var datGUI= new dat.GUI();
    
    var params= {
        'LightIntensity':spotLight.intensity,
        'ambLightIntensity':this.ambLightIntensity,
        'x':spotLight.position.x,
        'y':spotLight.position.y,
        'z':spotLight.position.z
    
    };
        
    datGUI.add(params,'LightIntensity',0,5).onChange(function(val){
        spotLight.intensity=val;
        //render();
    });
    datGUI.add(params,'ambLightIntensity',0,5).onChange(function(val){
        light.intensity=val;
        //render();
    });
    datGUI.add(params,'x',-20,20).onChange(function(val){
        spotLight.position.x=val;
        //render();
    });
    datGUI.add(params,'y',0,20).onChange(function(val){
        spotLight.position.y=val;
        //render();
    });
    datGUI.add(params,'z',-20,20).onChange(function(val){
        spotLight.position.z=val;
        //render();
    });

    datGUI.open();
        
   

    
   // render();
}


function render()
{
    
    // box.rotation.x+=0.01;
    // box.rotation.y+=0.01;
    
    
    requestAnimationFrame(render);
    stats.update();

    

    // console.log(directionalLight.position.x);
    // console.log(directionalLight.position.y);
    // console.log(directionalLight.position.z);

    //console.log(mat);
    

    renderer.render(scene,camera);


}

window.onload= initScene();


return{
    scene : scene
}




})

example();