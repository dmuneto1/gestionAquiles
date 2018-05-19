const express = require('express')              //request of the expressjs server library
const bodyParser = require('body-parser')       //request of the body-parser library
const bcrypt = require('bcryptjs')              //request of the bcryptjs library to encrpt strings
const app = express()                           //starting to run app express
const PythonShell = require('python-shell')     //request of the python-shell library
//var pyshell= new PythonShell('enviarCorreo.py');//starting to run and configure the python shell with a specific file

//configurating the express app to work with ejs's files(interfaces), json's files and a static direction  =============
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/interfaz_grafica/public_html/css'));
app.set('view engine', 'ejs');
var prediccion="No has predecido nada";
var prediccion2="No has predecido nada";

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
    var precio=req.body.precio;
    var medioPago= req.body.medioPago;
    var ciudad=req.body.ciudad;
    var args=[precio,medioPago,ciudad];
    var pyshell= new PythonShell('predecirCostoEnvio.py ',args);
    pyshell.send(args);
    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        prediccion=message;
		console.log(message);
		res.json({prediccion: prediccion})

    });
});

//llamado al local host para establecer el servidor
app.listen(8080, function(){
  console.log('Server Express Ready!');
});
