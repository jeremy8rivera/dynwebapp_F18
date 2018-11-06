const express = require('express')
const app = express()
const request = require('request')
const apiKey = 'e4f487beef08d28fd0aae82b6a8bf54f'
app.set('view engine', 'ejs')
app.use(express.static('1101B'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/', function (req, res) {
	res.render('1101B', {weather: null, error: null});

})

app.post('/', function (req, res) {
   let city = req.body.city;
   console.log(city);
   let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
   request(url, function (err, response, body) {
   	if(err){
    	res.render('1101B', {weather: null, error: 'Error, please try again'});
    }
    else{
    	let weather = JSON.parse(body)
    	if(weather.main == undefined){
        res.render('1101B', {weather: null, error: 'Error, please try again'});
    }
    else {
    	let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    	res.render('1101B', {weather: weatherText, error: null});
    	console.log(weatherText);
      }
    }
  });
})