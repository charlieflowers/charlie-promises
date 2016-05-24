module.exports = {
    resolved: resolved,

    rejected: reason => {

    },

    deferred: () => {
        return {
            promise: {},
            resolve: value => {

            },
            reject: reason => {

            }
        }
    }
}

function newPromise() {
    var promise = {
        successCbs: [],
        errorCbs: [],
        state: 'unsettled',
        value: undefined,
    };

    return {
        resolve: val => {
            if (promise.state != 'unsettled') { return; } // Dont change state if we are fulfilled.
            promise.val = val;
            promise.state = 'resolved';
        },
        then: (successCb, errorCb) => {
            if (successCb) { promise.successCbs.push(successCb) };
            if (errorCb) { promise.errorCbs.push(errorCb) };
            return this;
        }
    }
}

function resolved(value) {
    var p = newPromise();
    p.resolve(value);

    return p;
}