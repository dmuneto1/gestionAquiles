const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const btoa = require("btoa");
const wml_credentials = new Map();

// NOTE: you must manually construct wml_credentials hash map below using information retrieved
// from your IBM Cloud Watson Machine Learning Service instance
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
var precio=10000;
var dicMedio={"Contraentrega":1, "Consignacion":2}
var dicCiu={"Medellin":1,"Cali":2,"Pereira":3,"Sabaneta":4,"Bello":5,"Bogota":6}
var idMe=dicMedio["Contraentrega"]
var idCiudad=dicCiu["Sabaneta"]
var values=["null","null", "null","null","null", "null","null","null", precio, "null","null","null",idMe,"null",idCiudad,"null"];
var resultado="["


valores="[null,null,null,null,null,null,null,null,111,null,null,null,1,null,2,null]"	;
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