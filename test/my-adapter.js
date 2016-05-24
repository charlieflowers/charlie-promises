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
        then: (successCb, errorCb) => {
            if (successCb) { promise.successCbs.push(successCb) };
            if (errorCb) { promise.errorCbs.push(errorCb) };
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