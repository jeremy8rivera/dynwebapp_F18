console.log('Booted');

const express = require('express');
const app = express();
const server = app.listen(3000, listening);
//other ports 8000 8080

function listening(){
	console.log("I'm listening...");
}

app.get("/hello", sayHello);

function sayHello(request, response){
	response.send("Hello to you")
}

app.get("/hi/:database", sayHi);

function sayHi(request, response){
	const data = request.params;
	response.send(data.database + "'s shoes? WACK.");
}

app.get("/multHi/:name&:number", multHi);

function multHi(request, response){
	const data = request.params;
    let numHi = "";
    for (let i = 0; i < data.number; i++) {
        numHi += 'Hi ' + data.name + ' How are you?';
    }
    response.send(numHi);
}