
function createRoute(fn) {
    if (fn.length == 1)
        return function (message, context, cb) {
            try {
                cb(null, fn(message));
            }
            catch (err) {
                cb(err, null);
            }
        }
        
    if (fn.length == 2)
        return function (message, context, cb) {
            try {
                cb(null, fn(message, context));
            }
            catch (err) {
                cb(err, null);
            }
        }
        
    return fn;
}

module.exports = {
    create: createRoute
};