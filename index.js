var clone = require('clone');

var collector = function(){
  this.routes = null;
};

collector.prototype.middleware = function(expressApp){
  this.routes = clone(expressApp.routes);

  return function(req, res, next){
    console.log("req.url: ", req.url);

    next();
  };
};


// only doing usage stats for now
collector.prototype.getStats = function(){
  return routes;
};


module.exports = collector;
