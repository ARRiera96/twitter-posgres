var express = require( 'express' );
var app = express(); // creates an instance of an express application
var port = 3000;
var morgan = require("morgan");
var swig = require("swig");
var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
var routes = require('./routes/');


app.use('/', routes);
app.use(express.static('public'));



// app.get("/stylesheets/style.css", function(req, res){
// 	res.sendFile(__dirname + '/public/stylesheets/style.css');
// });
// var locals = {
// 	title: 'An Example',
//     people: [
//         { name: 'Spock'},
//         { name: 'Frodo' },
//         { name: 'Hermione'}
//     ]
// };

// swig.renderFile(__dirname + '/views/index.html', locals, function (err, output) {
//     console.log(output);
// });
// swig.setDefaults({ cache: false });


app.engine("html", swig.renderFile);
app.set("view engine", "html");
app.set("views", __dirname + '/views');

router.get( '/users/:name', function (req, res) {
	var name = req.params.name.split("_").join(" ");
	var list = tweetBank.find({name: name});
	res.render( 'index', {title: 'Twitter.js - Posts by ' + name, list: list});
});


// app.use(morgan("dev"));


// app.get("/", function(req, res){
// 	res.render( 'index', {title: 'Hall of Fame', people: locals.people} );
// });

// app.get("/is-anybody-in-there", function(request, response){
// 	response.send("nah youre in this one alone");
// });

// app.post("/modernism", function(request, response){
// 	response.send("Bienvenidos a the news");
// });

app.listen(port, function(){
	console.log("We listening on port tree thousand");
});