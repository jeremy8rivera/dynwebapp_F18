console.log('Booted');

var fs = require('fs');
var data = fs.readFileSync('contacts.json');
var contactJSON = JSON.parse(data);
console.log(contactJSON);

const express = require('express');
const app = express();
const server = app.listen(3000, listening);
//other ports 8000 8080

function listening(){
	console.log("I'm listening...");
}

app.get('/add/:contact/:emoji', addContact);

function addContact(request, response){
	var data = request.params; //word and score are parameters
	var contact = data.contact;	
	var emoji = data.emoji;
	contactJSON[contact] = emoji;
	var data = JSON.stringify(contactJSON); 
	fs.writeFile('contacts.json', data, finished);
	function finished(err) {
		console.log('got the contact')
	} 
	var reply = {
		msg: "Thank you for your contact."
	}
	response.send(reply)
}


app.get('/all', showAll);
function showAll(request,response){
	response.send(contactJSON);
}
