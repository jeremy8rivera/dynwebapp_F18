
const express = require('express')
const app = express()
var fs = require('fs');
var data = fs.readFileSync('userDB.json');
app.use(express.static('public'));
var translate = require('node-google-translate-skidz');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.get('', function(req, res){
	res.render('index');
}

app.get('/app', function (req, res) {
	res.render('index', {target: ' '});

})

app.post('/app', function(req, res) {
	let sourceLang = req.body.source;

	translate({
		text: sourceLang,
		source: 'en',
		target: 'es'
	}, function(result) {
		res.render('index', {target: result.translation, error: null});
	});


})