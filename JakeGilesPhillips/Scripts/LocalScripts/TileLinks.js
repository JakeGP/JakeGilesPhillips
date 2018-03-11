var lastCategory = null;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera();
var renderer = new THREE.WebGLRenderer();
var cube = new THREE.Mesh();
var loadedObject = new THREE.Group();

$(document).ready(function () {
    addTileClickHandlers();
});

function addTileClickHandlers() {
    $(".card, .item-card.large").bind("click tap", function () {
        var _name = $(this).find('.title').data("title");
        var _category = $(this).find('.category').data("category");
        $("#loading").addClass("show");

        getWorkItem(_name, _category);
    });

    $("#popup-menu .column-heading").bind("click tap", function () {
        var _name = $(this).data("title");
        var _category = $(this).data("category");
        $("#loading").addClass("show");

        closeMenu();
        getWorkItem(_name, _category);
    });
}

function getWorkItem(_name, _category) {
    $.post("/Home/WorkItem", { category: _category, name: _name }, function (data) {
        $("#popup-content").html(data).addClass("show");
        $("#popup-content").scrollTop(0);
        $("#main-header").addClass("popup-open");
        $("#secondary-header").addClass("hide");
        $("body").addClass("small");
        lastCategory = $(".sorting-item.selected").attr("data-category");
        $(".sorting-item").removeClass("selected");
        $(".sorting-item[data-category='" + _category + "']").addClass("selected");
        setTimeout(function () {
            $("#loading").removeClass("show");
        }, 500);
        checkForCanvas(_name, _category);
        refreshClickHandlers();
    });
}

function checkForCanvas(name, category) {
    if ($("#model-renderer").length) {
        setTimeout(setUp3DRenderer(name, category), 500);
    }
}

function setUp3DRenderer(name, category) {
    loadedObject.rotation.y = 0;
    var canvas = document.getElementById("model-renderer");
    
    renderer = null;
    renderer = new THREE.WebGLRenderer({ canvas: canvas });
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);

    scene = new THREE.Scene();
    scene.background = new THREE.Color("rgb(247,249,251)");
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 1, 4);
    
    objectLoader(name, category);
    var controls = new THREE.OrbitControls(camera);

    var light = new THREE.DirectionalLight(0xffffff, 0.75);
    light.position.set(30, 40, 30);
    scene.add(light);

    onResize(canvas, function () {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        renderer.setViewport(0, canvas.clientHeight * -0.8, canvas.clientWidth, canvas.clientHeight);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    });
    controls.update();
    render();
}

function objectLoader(name, category) {
    //THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
    //var mtlLoader = new THREE.MTLLoader();
    //mtlLoader.load("Content/Files/OBJ/" + category + "/" + name + ".mtl", function (materials) {
    //    materials.preload();

    //    var objLoader = new THREE.OBJLoader();
    //    objLoader.setMaterials(materials);
    //    objLoader.load(
    //        filePath,
    //        function (object) {
    //            loadedObject = object;
    //            loadedObject.rotateY(60);
    //            scene.add(loadedObject);
    //            camera.lookAt(loadedObject.position);
    //        },
    //        function (xhr) {
    //            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    //        },
    //        function (error) {
    //            console.log("Error loading the file: '" + filePath + "'");
    //        });
    //});

    //var texture = new THREE.TextureLoader().load("Content/Files/OBJ/" + category + "/" + name + "-texture.png");
    //var normal = new THREE.TextureLoader().load("Content/Files/OBJ/" + category + "/" + name + "-normal.png");
    //var material = new THREE.MeshPhongMaterial({ map: texture, normalMap: normal });
    var loader = new THREE.OBJLoader();
    var filePath = "Content/Files/OBJ/" + category + "/" + name + ".obj";
    loader.load(
        filePath,
        function (object) {
            loadedObject = object;
            loadedObject.rotateY(60);
            scene.add(loadedObject);
            camera.lookAt(loadedObject.position);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log("Error loading the file: '" + filePath + "'");
        });
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function onResize(element, callback) {
    var height = element.clientHeight;
    var width = element.clientWidth;

    return setInterval(function () {
        if (element.clientHeight != height || element.clientWidth != width) {
            height = element.clientHeight;
            width = element.clientWidth;
            callback();
        }
    }, 500);
}