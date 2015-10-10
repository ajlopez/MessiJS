
function Processor() {
    var routes = {};
    
    this.route = function (name, fn) {
        routes[name] = fn;
    };
    
    this.post = function (name, message, cb) {
        var route = routes[name];
        var context = {};
        
        if (route.length == 3)
            route(message, context, cb);
        else {
            var response = route(message, context);
            
            setImmediate(function () {
                cb(null, response);
            });
        }
    }
}

module.exports = function () { return new Processor(); };