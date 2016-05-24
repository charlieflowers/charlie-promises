const u = require(`./../utilities`);

module.exports = {
    resolved: resolved,

    rejected: rejected,

    deferred: () => {

        var p = newPromise();

        return {
            promise: p,
            resolve: p.resolve,
            reject: p.reject
        }
    }
}

function isPromise(x) {
    if (x && x.then && typeof (x.then) == 'function') return true;
    return false;
}

function newPromise() {
    var promise = {
        successCbs: [],
        errorCbs: [],
        state: 'pending',
        value: undefined,
    };

    var promiseResult = {
        resolve: val => {
            if (promise.state != 'pending') { return promiseResult; } // Dont change state if we are fulfilled.
            promise.val = val;
            promise.state = 'fulfilled';
            
            promise.successCbs.forEach(function(element) {
                var result = element.call(promiseResult, promise.val);    
                if (isPromise(result)) { return result; }
                return resolved(result);
            }, this);
            
            return promiseResult;
        },
        then: (onFulfilled, onRejected) => {
            if (promise.state === 'pending') {
                if (onFulfilled && typeof (onFulfilled) == 'function') { promise.successCbs.push(onFulfilled) };
                if (onRejected && typeof (onRejected) == 'function') { promise.errorCbs.push(onRejected) };
                return promiseResult;
            }

            // promise is fulfilled, so call immediately            
            var fn = promise.state === 'fulfilled' ? onFulfilled : onRejected;
            if (fn && typeof (fn) == 'function') {
                var result = fn.call(promiseResult, promise.value);
                if (isPromise(result)) { return result; }

                return resolved(result);
            }

            return promiseResult;
        },
        reject: reason => {
            if (promise.state != 'pending') { return promiseResult; } // Dont change state if we are fulfilled.
            promise.val = reason;
            promise.state = 'rejected';
            return promiseResult;
        }
    }

    return promiseResult;
}

function resolved(value) {
    var p = newPromise();
    p.resolve(value);

    return p;
}

function rejected(value) {
    var p = newPromise();
    p.reject(value);

    return p;
}

var p = rejected(42);

console.log(`p.then is ${p.then}`);