
const express = require('express')
const app = express()
var translate = require('node-google-translate-skidz');
const bodyParser = require('body-parser');

app.use(express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));

var fs = require('fs');
var data = fs.readFileSync('userDB.json');
var userDB = JSON.parse(data);

app.set('view engine', 'ejs')

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/', function (req, res) {
	res.render('index');

})

app.post('/', function (req, res) {
	let username = req.body.username;
	let password = req.body.password;
	userDB[username] = password;
	var data = JSON.stringify(userDB); 
	fs.writeFile('userDB.json', data, finished);
	function finished(err) {
		console.log('got the contact')
		res.redirect('/app/' + username);
	} 
	var reply = {
		msg: "Thank you for your contact."
	}
})

app.get('/app/:username', function (req, res) {
	res.render('app', {target: ' ', name: req.params.username});

})

app.post('/app/:username', function(req, res) {
	let sourceLang = req.body.source;

	translate({
		text: sourceLang,
		source: 'en',
		target: 'es'
	}, function(result) {
		res.render('app', {target: result.translation, name: req.params.username, error: null});
	});


})