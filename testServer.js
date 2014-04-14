var express = require('express');
var app = express();
var collector = require('./index')(app);

app.use(collector.middleware());

app.get('/hello1', function(req, res){
  res.send('hello world');
});

app.get('/hello2', function(req, res){
  res.send('hello world');
});

app.get('/hello3/:id', function(req, res){
  res.send('hello world');
});

app.get('/seeit', function(req, res){
  res.json(collector.getStats());
});

app.listen(3000);
