var express = require('express')
var app = express()
var path = require('path')

// setting up express
var exphbs = require('express-handlebars')
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));

// setting up body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

// importing helper function
var getSearch = require('./google.js').getSearch

app.get('/', function(req, res) {
  res.render('search')
});

app.post('/analyze', function(req, res) {
  var searchWord = req.body.searchWord
  getSearch(searchWord)
  .then(function(linkArr) {
    console.log(linkArr);
    console.log('success');
    res.render('results', {aggregate: aggregate, linkArr: linkArr})
  }).catch(function(err) {
    res.render('error', {err: err});
  });
})

app.get('*',function (req, res) {
  res.redirect('/');
});

var port = process.env.PORT || 3000
app.listen(port, function() {
  console.log('succesfully connected to port', port);
})

var http = require("http");
setInterval(function() {
  console.log('PINGING HEROKU TO KEEP AWAKE');
  http.get("http://secure-cove-66195.herokuapp.com/");
}, 300000);





