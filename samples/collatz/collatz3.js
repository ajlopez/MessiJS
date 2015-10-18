
var messi = require('../..');

var mproc = messi();

mproc.route("collatz", [
    {
        condition: "typeof message == 'number'",
        transform: "[message]"
    }
    ,
    {
        condition: "message[0] % 2 == 0",
        process: "message.unshift(message[0] / 2);"
    }
    ,
    {
        condition: "message[0] == 1",
        retval: true,
    }
    ,
    {
        condition: "message[0] % 2",
        process: "message.unshift(message[0] * 3 + 1);"
    }
    ,
    {
        route: "collatz",
        retval: true
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

    