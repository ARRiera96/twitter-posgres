var express = require( 'express' );
var app = express(); // creates an instance of an express application
var port = 3000;

app.get("/", function(request, response){
	response.send("Bienvenidos");
});

app.listen(port, function(){
	console.log("We listening on port tree thousand");
});