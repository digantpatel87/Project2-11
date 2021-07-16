/* all our JavaScript code goes here */
var canvas = document.getElementById("render-canvas");
    /* all our JavaScript code goes here */
    var engine = new BABYLON.Engine(canvas);
    var scene = new BABYLON.Scene(engine);
    // scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    
    // camera
    var camera = new BABYLON.ArcRotateCamera("camera1",  -Math.PI / 2.5, Math.PI / 3, 25, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    // lights
    //var light = new BABYLON.PointLight("light", new BABYLON.Vector3(10, 10, 0), scene);
    // lights
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 0, -1), scene);
    light.intensity = 0.9;
    
    //Set font type
    var font_type = "fantasy";
	
	//Set width an height for plane
    var planeWidth = 15;
    var planeHeight = 6;

    //Create plane
    var plane = BABYLON.MeshBuilder.CreatePlane("plane", {width:planeWidth, height:planeHeight}, scene);

    //Set width and height for dynamic texture using same multiplier
    var DTWidth = planeWidth * 60;
    var DTHeight = planeHeight * 60;

    //Set text
    var text = "PRO WRESTLING insights";
    
    //Create dynamic texture
    var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", {width:DTWidth, height:DTHeight}, scene);

    //Check width of text for given font type at any size of font
    var ctx = dynamicTexture.getContext();
	var size = 12; //any value will work
    ctx.font = size + "px " + font_type;
    var textWidth = ctx.measureText(text).width;
    
    //Calculate ratio of text width to size of font used
    var ratio = textWidth/size;
	
	//set font to be actually used to write text on dynamic texture
    var font_size = Math.floor(DTWidth / (ratio * 1)); //size of multiplier (1) can be adjusted, increase for smaller text
    var font = font_size + "px " + font_type;
	
	//Draw text
    dynamicTexture.drawText(text, null, null, font, "#000000", "#ffffff", true);

    //create material
    var mat = new BABYLON.StandardMaterial("mat", scene);
    mat.diffuseTexture = dynamicTexture;
    
    //apply material
    plane.material = mat;

    var renderLoop = function () {
    scene.render();
    };
    engine.runRenderLoop(renderLoop);