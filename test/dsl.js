
var messi = require('..');

exports['create transform route'] = function (test) {
    var mproc = messi();
    
    mproc.route("process", {
        transform: "message + 1"
    });
    
    test.async();
    
    mproc.post("process", 1, function (err, data) {
        test.equal(err, null);
        test.ok(data);
        test.equal(data, 2);
        test.done();
    });
};