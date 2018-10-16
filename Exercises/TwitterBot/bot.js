console.log('Good Morning Bot')

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);


T.get('search/tweets', { q: '@Jevera_', count: 1 }, function(err, data, response) {
  console.log(data)
})



function tweets() {
	var costume = ["Ghost", "The Nun", "Witch", "David S. Pumpkin", "Vampire"]
	var quote = costume[Math.floor(Math.random()*costume.length)]
	//console.log(quote);

	var tweet = {
		status: quote
	}
	return tweet;
}

function didItTweet(err, data, response){
	if (err){
		console.log("riperino");
	}
	else{
		console.log("it's yah boi")
	}
}


/*
setInterval(function(){
	T.post('statuses/update', tweets(), didItTweet)
}, 1000*20);
*/