console.log('Good Morning Bot')

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

var translate = require('node-google-translate-skidz');

//Run Function
function runDatBot(){
	console.log("I'm Running for 2020!")
	//Get all tweets that mention the user
	T.get('search/tweets', { q: '@jr4222F18', count: 10}, function(err, data, response) {
		let botMentionArray = data.statuses;

		compareLastTweet(botMentionArray);
	});
}

function compareLastTweet(botMentionArray){

	//Find last tweet ever made by self. Assumption: Each tweet is just 1 more digit higher than last
	T.get('statuses/user_timeline', {user_id: '1046105688504766464', count: 1}, function(err,data,response){
		let lastResponse = data[0].in_reply_to_status_id_str;
		let lastResponseNum = data[0].in_reply_to_status_id;


		for(var i = botMentionArray.length - 1; i > -1; i--)
		{
			if(lastResponseNum < botMentionArray[i].id){
				//Handle each tweet individually
				readData(botMentionArray[i]);
			}
		}

	});
}

function readData(data){
	//Just seperate the data and convert it to what's needed
	var calledUser = data.user.screen_name;
	var tweetID = data.id_str;
	var tweetText = data.text;
	var originalTweetID = data.in_reply_to_status_id_str;
	var originalTweet = 'temp';
	//Get the full tweet of the original. extended allows for full text vs normal text
	T.get("statuses/show/:id", {id: originalTweetID, tweet_mode: 'extended'},
		function(err,data,response){
			originalTweet = data.full_text;
			var message = originalTweet;
			var authorID = data.user.screen_name;
			var tweetObject = {
				msg: message,
				respondUserName: calledUser,
				respondOGAuthor: authorID,
				respondTweetID: tweetID,
				respondText: tweetText
			}

			postTweet(tweetObject);
		})
}

function postTweet(tweetObject){
	//Almost Done. Gather data, translate it all, and post it online
	console.log(tweetObject);
	var languageInfo = tweetObject.respondText.substring(tweetObject.respondText.search("jr4222F18")+10);
	var sourceLang = languageInfo.substring(0, languageInfo.search(' '));
	var targetLang = languageInfo.substring(languageInfo.search('to')+3);
	console.log(languageInfo);
	console.log(sourceLang);
	console.log(targetLang);
	translate({
		text: tweetObject.msg,
		source: sourceLang,
		target: targetLang
	}, 
	function(result) {
		translatedMessage = '';
		for(let i = 0; i < result.sentences.length; i++){
			translatedMessage += result.sentences[i].trans;
		}
		translatedMessageList = MessageArrayMaker(translatedMessage);
		console.log(translatedMessageList);

		for(const i in translatedMessageList){
			console.log(translatedMessageList[i]);
			T.post('statuses/update', 
				{status: "@" + tweetObject.respondOGAuthor + " @" + tweetObject.respondUserName + " " + translatedMessageList[i], in_reply_to_status_id: tweetObject.respondTweetID}
				, function(err,data,response){console.log(err)})
		}
	});
}

//Make all messages tweetable and arrayable.
function MessageArrayMaker(translatedMessage){
	translatedMessageList = [];
	if(translatedMessage.length > 274){
		while (translatedMessage.length != 0){
			let temp = translatedMessage.slice(0,200);
			translatedMessage = translatedMessage.slice(200);
			firstSpace = translatedMessage.indexOf(' ');
			let addedWord;
			if(firstSpace != -1){
				addedWord = translatedMessage.slice(0, firstSpace);
				if(addedWord.length < 14){
					temp = temp + addedWord;
					translatedMessage = translatedMessage.slice(firstSpace+1);
				}
			}

			translatedMessageList.push(temp);
		}

		if(translatedMessageList.length > 1){
			for(let i = 0; i < translatedMessageList.length; i++){
				if(i == 0){
					translatedMessageList[i] += '...'
				}
				else if(i == translatedMessageList.length - 1){
					translatedMessageList[i] = '...' + translatedMessageList[i];
				}
				else{
					translatedMessageList[i] = '...' + translatedMessageList[i] + '...';
				}
			}
		}
	}
	else{
		translatedMessageList.push(translatedMessage);
	}
	return translatedMessageList;
}

setInterval(function(){
	runDatBot();
}, 1000*5);
