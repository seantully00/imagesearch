'use strict';

//Define port
var port = process.env.PORT || 8080;

//Express
var express = require('express');
var app = express();

//Mongoose
var mongoose = require('mongoose');
var url = process.env.MONGOLAB_URI2;
mongoose.connect(url);
var conn = mongoose.connection;
var coll = conn.collection('searchhistory');

var historySchema = mongoose.Schema({
    term    : String,
    when    : String,
});

//Search results
app.get('/api/latest/:term*', function(req, res) {
    
    
});


//Search history



app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});