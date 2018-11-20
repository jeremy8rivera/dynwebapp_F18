var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
app.set('view engine', 'ejs')

app.get('/', function(req, res){
	res.render('index', {question: currentQ});
});


var numUsers = 0;
var answeredAmount = 0;
var questionTracker = 4; // 5 titles
var userID = 1;

var currentQ = jsonReader(questionTracker%4);



function jsonReader(questionNum){
	let rawData = fs.readFileSync('pollData.json');
	let stringied = JSON.parse(rawData);
	return stringied.questions[questionNum].title;
}

io.on('connection', function(socket){
	numUsers++;
	socket.username = "User" + userID;
	userID++;
	socket.on('chat message', function(msg){
		io.emit('chat message', '['+socket.username + '] ' + msg);
		if(msg.slice(0,7) == "Answer:"){ 
			answeredAmount++;
		};

		if(answeredAmount == numUsers){
			questionTracker++;
			currentQ = jsonReader(questionTracker%4);
			io.emit('chat message', "Question: " + jsonReader(questionTracker%4))
			answeredAmount = 0;
		}
	})
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('a user disconnected');
		numUsers--;
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

