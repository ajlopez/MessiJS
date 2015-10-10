
var messi = require('..');

exports['post message to route'] = function (test) {
    test.async();
    
    var mproc = messi();
    
    mproc.route('myroute', function (message) {
        return message + 1;
    });
    
    mproc.post('myroute', 1, function (err, message) {
        test.equal(err, null);
        test.ok(message);
        test.equal(message, 2);
        test.done();
    });
}

exports['post message to route using context'] = function (test) {
    test.async();
    
    var mproc = messi();
    
    mproc.route('myroute', function (message, context) {
        test.ok(context);
        test.equal(typeof context, 'object');
        return message + 1;
    });
    
    mproc.post('myroute', 1, function (err, message) {
        test.equal(err, null);
        test.ok(message);
        test.equal(message, 2);
        test.done();
    });
}


exports['post message to route using context and callback'] = function (test) {
    test.async();
    
    var mproc = messi();
    
    mproc.route('myroute', function (message, context, cb) {
        test.ok(context);
        test.equal(typeof context, 'object');
        test.ok(cb);
        test.equal(typeof cb, 'function');
        cb(null, message + 1);
    });
    
    mproc.post('myroute', 1, function (err, message) {
        test.equal(err, null);
        test.ok(message);
        test.equal(message, 2);
        test.done();
    });
}