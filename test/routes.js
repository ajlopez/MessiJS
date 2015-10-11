
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

exports['create route from binary function using callback'] = function (test) {
    var fn = routes.create(function (message, context, cb) { 
        test.ok(context);
        test.equal(typeof context, 'object');
        cb(null, message + 1);
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

exports['create route from array of functions'] = function (test) {
    var fn = routes.create([
        function (message) { return message + 1; },
        function (message) { return message * 3; },
        function (message) { return message + 5; }
    ]);
    
    test.ok(fn);
    test.equal(typeof fn, 'function');
    test.equal(fn.length, 3);
    
    test.async();
    
    fn(1, {}, function (err, result) {
        test.equal(err, null);
        test.equal(result, 11);
        test.done();
    });
};

exports['return message at middle of route'] = function (test) {
    var fn = routes.create([
        function (message) { return message + 1; },
        function (message, context, cb) { cb('done', message * 3); },
        function (message) { return message + 5; }
    ]);
    
    test.ok(fn);
    test.equal(typeof fn, 'function');
    test.equal(fn.length, 3);
    
    test.async();
    
    fn(1, {}, function (err, result) {
        test.equal(err, null);
        test.equal(result, 6);
        test.done();
    });
};