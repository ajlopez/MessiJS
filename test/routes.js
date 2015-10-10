
var routes = require('../lib/routes');

exports['create route from unary function'] = function (test) {
    var fn = routes.create(function (message) { return message + 1; });
    
    test.ok(fn);
    test.equal(typeof fn, 'function');
    test.equal(fn.length, 3);
    
    test.async();
    
    fn(1, null, function (err, result) {
        test.equal(err, null);
        test.equal(result, 2);
        test.done();
    });
};

exports['create route from binary function'] = function (test) {
    var fn = routes.create(function (message, context) { 
        test.ok(context);
        test.equal(typeof context, 'object');
        return message + 1;
    });
    
    test.ok(fn);
    test.equal(typeof fn, 'function');
    test.equal(fn.length, 3);
    
    test.async();
    
    fn(1, {}, function (err, result) {
        test.equal(err, null);
        test.equal(result, 2);
        test.done();
    });
};