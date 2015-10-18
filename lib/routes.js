
'use strict';

function createRouteFromObject(obj) {
    var code = "";
    
    if (obj.condition)
        code += "if (!(" + obj.condition + ")) { cb(null, message); return; } ";
        
    if (obj.process)
        code += obj.process;
        
    if (obj.route)
        code += "context.post(" + JSON.stringify(obj.route) + ", message, cb);"
    else {
        var retval;

        if (obj.transform)
            retval = obj.transform
        else
            retval = "message";
            
        code += "cb(null, " + retval + ");";
    }
        
    code = "try { " + code + " } catch (err) { cb(err, null); }";
    
    var fn = new Function("message", "context", "cb", code);
    
    return fn;
}

function createRouteFromFunction(fn) {
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

function createRouteFromArray(elements) {
    var fns = [];
    
    elements.forEach(function (element) {
        fns.push(createRoute(element));
    });
    
    var l = fns.length;
    
    return function (message, context, cb) {
        var k = 0;
        
        doStep();
        
        function doStep() {
            if (k >= l) {
                setImmediate(function () { cb(null, message) });
                return;
            }
            
            context.returncb = cb;
            
            fns[k++](message, context, function (err, newmsg) {
                if (err) {
                    cb(err, null);
                    return;
                }
                
                message = newmsg;
                
                setImmediate(doStep);
            });
        };
    };
}

function createRoute(routedef) {
    if (typeof routedef == 'function')
        return createRouteFromFunction(routedef);

    if (Array.isArray(routedef))
        return createRouteFromArray(routedef);
        
    if (typeof routedef == 'object')
        return createRouteFromObject(routedef);
}

module.exports = {
    create: createRoute
};

