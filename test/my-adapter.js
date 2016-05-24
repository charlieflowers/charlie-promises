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
    return {
        successCbs: [],
        errorCbs: [],
        state: 'unsettled',
        value: undefined,
        resolve: val => {
            this.val = val;
            this.state = 'resolved';
        },
        then: (successCb, errorCb) => {
            if (successCb) { this.successCbs.push(cb) };
            if (errorCb) { this.errorCbs.push(cb) };
            return this;
        }
    }
}

function resolved(value) {
    var p = newPromise();
    p.resolve(value);

    return p;
}