
function createRoute(fn) {
    if (fn.length == 1)
        return function (message, context, cb) {
            try {
                var newmsg = fn(message);
                
                setImmediate(function () {
                    cb(null, newmsg);
                });
            }
            catch (err) {
                setImmediate(function () {
                    cb(err, null);
                });                
            }
        }
        
    if (fn.length == 2)
        return function (message, context, cb) {
            try {
                var newmsg = fn(message, context);
                
                setImmediate(function () {
                    cb(null, newmsg);
                });
            }
            catch (err) {
                setImmediate(function () {
                    cb(err, null);
                });                
            }
        }
        
    return fn;
}

module.exports = {
    create: createRoute
};