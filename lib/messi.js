
var routes = require('./routes');

function Context(processor) {
    this.post = function (name, message, cb) { processor.post(name, message, cb); };
}

function Processor() {
    var routesFn = {};
    
    this.route = function (name, fn) {
        routesFn[name] = routes.create(fn);
    };
    
    this.post = function (routedef, message, cb) {
        var route;
        
        if (typeof routedef === 'string')
            route = routesFn[routedef];
        else
            route = routes.create(routedef);
            
        var context = new Context(this);

        if (!cb)
            cb = function () {};
            
        route(message, context, cb);
    }
}

module.exports = function () { return new Processor(); };