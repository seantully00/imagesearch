'use strict';

//Define port
var port = process.env.PORT || 8080;

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
  //var user = {
    //first: 'Sean',
    //last: 'Tully',
   // site: 'http://twitter.com/seantully',
    //age: 34
  //}
  res.render('index');
});
  

//Mongoose
var mongoose = require('mongoose');
var url = process.env.MONGOLAB_URI2;
mongoose.connect(url);
var conn = mongoose.connection;
var coll = conn.collection('searchhistory');


var historySchema = mongoose.Schema({
    term    : String,
    when    : Date
});

var Searchhistory = conn.model('searchhistory', historySchema);


//Search history
app.get('/api/latest/imagesearch', function(req, res) {
  Searchhistory.find({}, null, {
      "limit": 10,
      "sort": {
        "when": -1
      }
    }, function(err, history) {
      if (err) return console.error(err);
      console.log(history);
      res.send(history.map(function(arg) {
        return {
          term: arg.term,
          when: arg.when
        };
      }));
    });
});

//Search results
app.get('/api/latest/:term/offset/:offset', function(req, res) {
  api = '';
  var sterm = '';
  var page = '';
  var api = "pixabay.com/api/?key=3000757-4153ed7dfc33723eb8193813e&q=";
  sterm = req.params.term;
  page = req.query.offset;
  if (page === null) {page = 1};
  api = api + sterm + "&page=" + toString(page);
  var date = moment().format('YYYY-MM-DD hh:mm:ss a');
  var doc = new Searchhistory({'term': sterm, 'when': date});
  doc.save(function (err) {
  if (err) return (err);
  // saved!
});
  res.redirect('https://' + api);
});

app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});