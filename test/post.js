
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