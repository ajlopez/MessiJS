
var routes = require('./routes');

function Context(processor) {
    this.post = function (name, message, cb) { processor.post(name, message, cb); };
}

function Processor() {
    var routesFn = {};
    
    this.route = function (name, fn) {
        routesFn[name] = routes.create(fn);
    };
    
    this.post = function (name, message, cb) {
        var route = routesFn[name];
        var context = new Context(this);

        if (!cb)
            cb = function () {};
            
        route(message, context, cb);
    }
}

module.exports = function () { return new Processor(); };