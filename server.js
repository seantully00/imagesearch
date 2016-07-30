'use strict';

//Define port
var port = process.env.PORT || 8080;

var api = "pixabay.com/api/?key=3000757-4153ed7dfc33723eb8193813e&q=";

//Express
var express = require('express');
var app = express();

//Handlebars
var hbs = require('hbs');
var path = require('path');
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.get('/layouts', function(req, res, next){
    res.render('main', {
    });
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
  api = api + ['term'];
  //var doc = {'term': term, 'when': date};
  res.redirect('https://' + api);
});


//Search history



app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});