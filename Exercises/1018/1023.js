console.log('Booted');

const express = require('express');
const app = express();
const server = app.listen(3000, listening);
//other ports 8000 8080

function listening(){
	console.log("I'm listening...");
}

app.get('/a(pp)?le', appleorale);

function appleorale(request, response){
	response.send("Apple or Ale?")
}


app.get('/who+a+', whoa);

function whoa(request, response){
	response.send("I know right?")
}

app.get('/:fname/:lname', names);

function names(request, response){
	let data = request.params;
	response.send(data.fname + " " + data.lname);
}

app.get('/:word', reverse);

function reverse(request, response){
	response.send(request.params.word.split('').reverse().join(''));
	
}


app.get('/*', whatever);

function whatever(request, response){
	response.send("None.");
}