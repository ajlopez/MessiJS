
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
]);

function processNumber(n) {
    mproc.post('collatz', n, function (err, msg) {
        if (err)
            console.log(err);
        else if (msg[0] == 1)
            console.dir(msg);
        else
            processNumber(msg);
    });
}

for (var k = 1; k < 100; k++)
    processNumber(k);

    