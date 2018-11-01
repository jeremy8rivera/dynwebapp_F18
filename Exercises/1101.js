var express = require('express');
var app = express();
var ejs = require("ejs");

app.set('view engine', 'ejs');

app.get("/", function(request, response){
	response.render('1101');
});

app.get('/name', function(request, response){
	response.render('1101');
})

app.listen(3000, function(){
	console.log("app is running");
})