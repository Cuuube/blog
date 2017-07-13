module.exports = function toPromise(fn) {
    function promiseFunction(...args) {
        if (fn instanceof Function) {
            let promise = new Promise((resolve, reject) => {
                fn(...args, function(...innerArgs) {
                    if (innerArgs[0] instanceof Error) {
                        reject(innerArgs[0]);
                    } else {
                        resolve(innerArgs);
                    }
                });
            });
            return promise;
        } else {
            return new Promise((reject) => {
                reject(new Error('Argument 1 must be a function'))
            })
        }
    }
    return promiseFunction;
}
