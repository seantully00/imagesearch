'use strict';

//Define port
var port = process.env.PORT || 8080;

//Define api
var api = "pixabay.com/api/?key=3000757-4153ed7dfc33723eb8193813e&q=";

//Moment
var moment = require('moment');

//Express
var express = require('express');
var app = express();

//Handlebars
var hbs = require('express-hbs');
app.set('view engine', 'hbs');

// configure the view engine 
app.engine('hbs', hbs.express4({  
  defaultLayout: __dirname + '/views/layouts/main.hbs',
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts'
}));

var path = require('path');
app.set('views', path.join(__dirname,'/views'));

app.get('/', function(req, res) {  
  var user = {
    first: 'Sean',
    last: 'Tully',
    site: 'http://twitter.com/seantully',
    age: 34
  }
  res.render('index', user);
});
  

//Mongoose
var mongoose = require('mongoose');
var url = process.env.MONGOLAB_URI2;
mongoose.connect(url);
var conn = mongoose.connection;
var coll = conn.collection('searchhistory');

var historySchema = mongoose.Schema({
    term    : String,
    when    : Date,
});

//Search results
app.get('/api/latest/:term*', function(req, res) {
  var term = req.params['term'];
  api = api + term;
  var date = moment().format('YYYY-MM-DD hh:mm:ss a');
  var doc = {'term': term, 'when': date};
  conn.collection('searchhistory').insert(doc);
  res.redirect('https://' + api);
});


//Search history



app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});