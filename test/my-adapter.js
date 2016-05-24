const u = require(`./utilities`);

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

function newPromise() {
    var promise = {
        successCbs: [],
        errorCbs: [],
        state: 'pending',
        value: undefined,
    };

    return {
        resolve: val => {
            if (promise.state != 'pending') { return; } // Dont change state if we are fulfilled.
            promise.val = val;
            promise.state = 'resolved';
            return this;
        },
        then: (onFulfilled, onRejected) => {
            if (promise.state === 'pending') {
                if (onFulfilled && typeof (onFulfilled) == 'function') { promise.successCbs.push(onFulfilled) };
                if (onRejected && typeof (onRejected) == 'function') { promise.errorCbs.push(onRejected) };
                return this;
            }

            // promise is fulfilled, so call immediately            
            var fn = promise.state === 'resolved' ? onFulfilled : onRejected;
            if (fn && typeof (fn) == 'function') {
                var result = fn.call(this, promise.value);
                return result;
            }
            
            console.log(`the case you are looking for here. this is ${u.prettyObject(this)}`);
            
            return this;
        },
        reject: reason => {
            if (promise.state != 'pending') { return; } // Dont change state if we are fulfilled.
            promise.val = reason;
            promise.state = 'rejected';
            return this;
        }
    }
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