var clone = require('clone');

var collector = function(app){
  if (this instanceof collector) {
    this.app = app;
    return;
  }
  return new collector(app);
};

collector.prototype.middleware = function(){
  var that = this;
  return function(req, res, next){
    if (!that.routes){
      that.routes = prepareStatsObject(that.app.routes);
    }
    var routes = that.routes[req.method.toLowerCase()];
    if (!!routes){
      for(var i = 0; i < routes.length; i++){
        if (routes[i].regexp.test(req.url)){
          routes[i].stats.hits++;
          break;
        }
      }
    }
    next();
  };
};

// only doing usage stats for now
collector.prototype.getStats = function(){
  return this.routes;
};

prepareStatsObject = function(routes){
  routes = clone(routes);
  var methods = ['get', 'post', 'delete', 'put', 'patch', 'head', 'options'];
  methods.forEach(function(method){
    if (!routes[method]){
      return;
    }
    routes[method] = routes[method].map(function(obj){
      delete obj.keys;
      delete obj.callbacks;
      delete obj.method;
      obj.stats = {
        hits : 0
      };
      return obj;
    });
  });
  return routes;
};

module.exports = collector;
