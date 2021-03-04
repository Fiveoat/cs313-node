const express = require('express');
var port = process.env.PORT || 5000;
var rate_calculator = require('./rate_calculator.js');
var app = express();

app.set('port', port)
   .use(express.static(__dirname + "/public"))
   .set('views', __dirname + '/views')
   .set('view engine', 'ejs')
   .get('/', (req, res) => {
       res.sendFile('index.html', {root: __dirname + '/public'});
   })
   .get('/get_rate', rate_calculator.get_rate)
   .listen(app.get('port'), () => {
       console.log('Listening on port: ' + app.get('port'));
   })
