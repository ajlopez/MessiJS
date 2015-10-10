
var routes = require('./routes');

function Processor() {
    var routesFn = {};
    
    this.route = function (name, fn) {
        routesFn[name] = routes.create(fn);
    };
    
    this.post = function (name, message, cb) {
        var route = routesFn[name];
        var context = {};
        
        route(message, context, cb);
    }
}

module.exports = function () { return new Processor(); };