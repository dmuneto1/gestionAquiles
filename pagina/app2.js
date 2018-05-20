const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const btoa = require("btoa");
const wml_credentials = new Map();
const express = require('express')              //request of the expressjs server library
const bodyParser = require('body-parser')       //request of the body-parser library
const bcrypt = require('bcryptjs')              //request of the bcryptjs library to encrpt strings
const app = express()                           //starting to run app express
const PythonShell = require('python-shell')     //request of the python-shell library


// NOTE: you must manually construct wml_credentials hash map below using information retrieved
// from your IBM Cloud Watson Machine Learning Service instance
//var pyshell= new PythonShell('enviarCorreo.py');//starting to run and configure the python shell with a specific file

//configurating the express app to work with ejs's files(interfaces), json's files and a static direction  =============


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/interfaz_grafica/public_html/css'));
app.set('view engine', 'ejs');

var prediccion="Vuelve a intentarlo";
//var prediccion2="No has predecido nada";
var url1= "https://ibm-watson-ml.mybluemix.net";
var username1= "6490bc65-d6d2-4cc4-a74d-83cae0715391";
var password1= "f4887677-241d-4d62-877d-bb16bbd50321";
wml_credentials.set("url", url1);
wml_credentials.set("username", username1);
wml_credentials.set("password", password1);


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

function modificar(pred) {

  prediccion=pred;
}

app.get("/", function (req,res){

    res.render("menu")
    
});

app.get("/predecir", function (req,res){
    //prediccion="No has predecido nada";
    res.render("predecir")
    
});

app.get("/predecirEnvio", function (req,res){
    //prediccion="No has predecido nada";
    res.render("predecirEnvio")
    
});

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


app.post('/predecir',function(req,res){
    var producto=req.body.producto;
    var color= req.body.color;
    var material=req.body.material;
    var dicProd={"Camiseta":1, "Blusa":2, "Pantalon":3, "Gorra":4}
    var dicColor={"Negro":1, "Blanco":2, "Gris":3,"Amarillo":4,"Rojo":5, "Verde":6,"Beige":7,"Cafe":8,"Rosado":9,"Azul":10}
    var dicMat={"Jean":1,"Drill":2,"Corduroy":3,"Algodon":4,"Poliester":5,"Licra":6}
    var resultado="["
    var result;
    idpd=0
    idCo=0
    idMat=0
    idpd=dicProd[producto]
    idCo=dicColor[color]
    idMat=dicMat[material]
    var values=["null", idpd, "null","null","null", idCo,"null","null", idMat, "null","null","null","null","null","null","null"];
   

    for (i = 0; i < values.length; i++) { 
        if ((values.length)-1>i){
            resultado += values[i].toString() +",";    
        }else{
            resultado += values[i].toString()
        }
    }
    resultado+="]";

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
            //const payload = '{"fields": ["Referencia", "Id producto", "Producto", "Descripcion", "Cantidad", "Id Color", "Color", "Talla", "Id Material", "Material", "Cuidados", "Id Medio de Pago", "Medio de pago", "Id Ciudad", "Ciudad", "Costo envio"], "values":['+ values+']}';
            const payload='{"fields":["Referencia","Id producto","Producto","Descripcion","Cantidad","Id Color","Color","Talla","Id Material","Material","Cuidados","Id Medio de Pago","Medio de pago","Id Ciudad","Ciudad","Costo envio"],"values":['+resultado+']}'
            const scoring_url = "https://ibm-watson-ml.mybluemix.net/v3/wml_instances/15bfc20c-6cf5-4c37-8297-5340360560f4/published_models/01fd3ad5-c8cd-456b-82d4-53745170b251/deployments/d0d0867f-f774-492c-9098-ea0cd2344d36/online";
            apiPost(scoring_url, wmlToken, payload, function (resp) {
                let parsedPostResponse;
                try {
                    parsedPostResponse = JSON.parse(this.responseText);
                } catch (ex) {
                    console.log("erorrrrr");
                    // TODO: handle parsing exception
                }
                console.log("Scoring response");
                //console.log(parsedPostResponse);
                console.log(parsedPostResponse.values[0][20])

                prediccion=(parsedPostResponse.values[0][20].toString());
               
            }, function (error) {
                console.log("error"+error);
            });
        } else {
            console.log("Failed to retrieve Bearer token");
        }
    }, function (err) {
        console.log(err);
    });
    res.json({prediccion: prediccion});

   
});

app.post('/predecirEnvio',function(req,res){
    var precio=req.body.precio;
    var medioPago= req.body.medioPago;
    var ciudad=req.body.ciudad;
    var dicMedio={"Contraentrega":1, "Consignacion":2}
    var dicCiu={"Medellin":1,"Cali":2,"Pereira":3,"Sabaneta":4,"Bello":5,"Bogota":6}
    var idMe=dicMedio[medioPago]
    var idCiudad=dicCiu[ciudad]
    var values=["null","null", "null","null","null", "null","null","null", precio, "null","null","null",idMe,"null",idCiudad,"null"];
    var resultado="["


    valores="[null,null,null,null,null,null,null,null,111,null,null,null,1,null,2,null]"    ;
     for (i = 0; i < values.length; i++) { 
            if ((values.length)-1>i){
                resultado += values[i].toString() +",";    
            }else{
                resultado += values[i].toString()
            }
        }
    resultado+="]";


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
                const payload = '{"fields": ["Referencia", "Id producto", "Producto", "Descripcion", "Cantidad", "Id Color", "Color", "Talla", "Precio", "Id Material", "Material", "Cuidados", "Id Medio de Pago", "Medio de pago", "Id Ciudad", "Ciudad"], "values": ['+resultado+']}';
                const scoring_url = "https://ibm-watson-ml.mybluemix.net/v3/wml_instances/15bfc20c-6cf5-4c37-8297-5340360560f4/published_models/b62fd4af-852e-487b-a09f-3eb9c15172b2/deployments/43c3501a-e72d-4322-ba14-01a3354873fb/online";

                apiPost(scoring_url, wmlToken, payload, function (resp) {
                    let parsedPostResponse;
                    try {
                        parsedPostResponse = JSON.parse(this.responseText);
                    } catch (ex) {
                        // TODO: handle parsing exception
                    }
                     console.log("Scoring response");
                    //console.log(parsedPostResponse);
                    console.log(parsedPostResponse.values[0][20])

                    modificar(parsedPostResponse.values[0][20].toString());
                    
                }, function (error) {
                    console.log(error);
                });
            } else {
                console.log("Failed to retrieve Bearer token");
            }
        }, function (err) {
            console.log(err);
        });
    res.json({prediccion: prediccion});



});

//llamado al local host para establecer el servidor
var port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log("Server Ready!");
});
