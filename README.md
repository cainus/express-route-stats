express-route-stats
===================

keep stats on route usage in express.js 3.x.x


# example usage:

```javascript
var express = require('express');
var app = express();
var collector = require('express-route-stats')(app);

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
  // show the stats in api output
  res.json(collector.getStats());
});

app.listen(3000);


```
