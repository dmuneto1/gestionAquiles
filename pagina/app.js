const express = require('express')              //request of the expressjs server library
const bodyParser = require('body-parser')       //request of the body-parser library
const bcrypt = require('bcryptjs')              //request of the bcryptjs library to encrpt strings
const app = express()                           //starting to run app express
const PythonShell = require('python-shell')     //request of the python-shell library
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const btoa = require("btoa");
const wml_credentials = new Map();

//var pyshell= new PythonShell('enviarCorreo.py');//starting to run and configure the python shell with a specific file

//configurating the express app to work with ejs's files(interfaces), json's files and a static direction  =============


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/interfaz_grafica/public_html/css'));
app.set('view engine', 'ejs');
wml_credentials.set("url", "https://ibm-watson-ml.mybluemix.net");
wml_credentials.set("username", "6490bc65-d6d2-4cc4-a74d-83cae0715391");
wml_credentials.set("password", "f4887677-241d-4d62-877d-bb16bbd50321");

var prediccion="No has predecido nada";
var prediccion2="No has predecido nada";

function apiGet(url, username, password, loadCallback, errorCallback){
    const oReq = new XMLHttpRequest();
    const tokenHeader = "Basic " + btoa((username + ":" + password));
    const tokenUrl = url + "/v3/identity/token";

    oReq.addEventListener("load", loadCallback);
    oReq.addEventListener("error", errorCallback);
    oReq.open("GET", tokenUrl);
    oReq.setRequestHeader("Authorization", tokenHeader);
    oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    oReq.send();
}


function apiPost(scoring_url, token, payload, loadCallback, errorCallback){
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", loadCallback);
    oReq.addEventListener("error", errorCallback);
    oReq.open("POST", scoring_url);
    oReq.setRequestHeader("Accept", "application/json");
    oReq.setRequestHeader("Authorization", token);
    oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    oReq.send(payload);
}


apiGet(wml_credentials.get("url"),
    wml_credentials.get("username"),
    wml_credentials.get("password"),
    function (res) {
        let parsedGetResponse;
        try {
            parsedGetResponse = JSON.parse(this.responseText);
        } catch(ex) {
            // TODO: handle parsing exception
        }
        if (parsedGetResponse && parsedGetResponse.token) {
            const token = parsedGetResponse.token
            const wmlToken = "Bearer " + token;

            // NOTE: manually define and pass the array(s) of values to be scored in the next line
            const payload = {"fields": ["Referencia", "Id producto", "Producto", "Descripcion", "Cantidad", "Id Color", "Color", "Talla", "Id Material", "Material", "Cuidados", "Id Medio de Pago", "Medio de pago", "Id Ciudad", "Ciudad", "Costo envio"], "values": [values]};
            const scoring_url = "https://ibm-watson-ml.mybluemix.net/v3/wml_instances/15bfc20c-6cf5-4c37-8297-5340360560f4/published_models/01fd3ad5-c8cd-456b-82d4-53745170b251/deployments/d0d0867f-f774-492c-9098-ea0cd2344d36/online";

            apiPost(scoring_url, wmlToken, payload, function (resp) {
                let parsedPostResponse;
                try {
                    parsedPostResponse = JSON.parse(this.responseText);
                } catch (ex) {
                    // TODO: handle parsing exception
                }
                console.log("Scoring response");
                console.log(parsedPostResponse);
            }, function (error) {
                console.log(error);
            });
        } else {
            console.log("Failed to retrieve Bearer token");
        }
    }, function (err) {
        console.log(err);
    });


app.get("/", function (req,res){

	res.render("menu")
	
});

app.get("/predecir", function (req,res){
	//prediccion="No has predecido nada";
	res.render("predecir",{prediccion: prediccion})
	
});

app.get("/predecirEnvio", function (req,res){
	//prediccion="No has predecido nada";
	res.render("predecirEnvio",{prediccion2: prediccion2})
	
});



app.post('/predecir',function(req,res){
    var producto=req.body.producto;
    var color= req.body.color;
    var material=req.body.material;
    var args=[producto,color,material];
    var pyshell= new PythonShell('pythonCostoProducto.py ',args);
    pyshell.send(args);
    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        prediccion=message;
		console.log(message);
		res.json({prediccion: prediccion})

    });
});

app.post('/predecirEnvio',function(req,res){
    console.log("Entre a predecir");
    var precio=req.body.precio;
    var medioPago= req.body.medioPago;
    var ciudad=req.body.ciudad;
    var args=[precio,medioPago,ciudad];
    var pyshell= new PythonShell('predecirCostoEnvio.py ',args);
    console.log("Despues de la consola");
    pyshell.send(args);
    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        prediccion=message;
		console.log(message);
		res.json({prediccion: prediccion})

    });
});

//llamado al local host para establecer el servidor
var port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log("Server Ready!");
});
