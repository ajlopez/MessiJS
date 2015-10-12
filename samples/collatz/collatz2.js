
var messi = require('../..');

var mproc = messi();

mproc.route("collatz", [
    function (message) {
        if (typeof message == 'number')
            return [message];
            
        return message;
    }
    ,
    function (message) {
        var number = message[0];
        
        if (number % 2 == 0)
            message.unshift(number / 2);
        else if (number > 1)
            message.unshift(number * 3 + 1);
            
        return message;
    }
    ,
    function (message, context, cb) {
        if (message[0] == 1)
            cb(null, message);
        else
            context.post("collatz", message, context.returncb);
    }
]);

function processNumber(n) {
    mproc.post('collatz', n, function (err, msg) {
        if (err)
            console.log(err);
        else
            console.dir(msg);
    });
}

for (var k = 1; k < 100; k++)
    processNumber(k);

    