
function Processor() {
    var routes = {};
    
    this.route = function (name, fn) {
        routes[name] = fn;
    };
    
    this.post = function (name, message, cb) {
        var response = routes[name](message);
        
        setImmediate(function () {
            cb(null, response);
        });
    }
}

module.exports = function () { return new Processor(); };