
var messi = require('..');

exports['create transform route using an object'] = function (test) {
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

exports['create transform route using an array of objects'] = function (test) {
    var mproc = messi();
    
    mproc.route("process", [
        {
            transform: "message + 2"
        }
        ,
        {
            transform: "message * 5"
        }
    ]);
    
    test.async();
    
    mproc.post("process", 1, function (err, data) {
        test.equal(err, null);
        test.ok(data);
        test.equal(data, 15);
        test.done();
    });
};

exports['create transform route using retval'] = function (test) {
    var mproc = messi();
    
    mproc.route("process", [
        {
            transform: "message + 2",
            retval: true
        }
        ,
        {
            transform: "message * 5"
        }
    ]);
    
    test.async();
    
    mproc.post("process", 3, function (err, data) {
        test.equal(err, null);
        test.ok(data);
        test.equal(data, 5);
        test.done();
    });
};

exports['use named route in route'] = function (test) {
    var mproc = messi();
    
    mproc.route("subprocess", [
        {
            transform: "message + 2"
        }
        ,
        {
            transform: "message * 5"
        }
    ]);
    
    mproc.route("process", { route: "subprocess" });
    
    test.async();
    
    mproc.post("process", 1, function (err, data) {
        test.equal(err, null);
        test.ok(data);
        test.equal(data, 15);
        test.done();
    });
};

exports['create transform route using an array of objects and condition'] = function (test) {
    var mproc = messi();
    
    mproc.route("process", [
        {
            condition: "message % 2",
            transform: "message + 2"
        }
        ,
        {
            transform: "message * 5"
        }
    ]);
    
    test.async();
    
    mproc.post("process", 2, function (err, data) {
        test.equal(err, null);
        test.ok(data);
        test.equal(data, 10);
        test.done();
    });
};

exports['create process route using an object'] = function (test) {
    var mproc = messi();
    
    mproc.route("process", {
        process: "message.data = 1;"
    });
    
    test.async();
    
    mproc.post("process", {}, function (err, data) {
        test.equal(err, null);
        test.ok(data);
        test.equal(data.data, 1);
        test.done();
    });
};
