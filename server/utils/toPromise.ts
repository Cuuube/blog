export const toPromise = (fn: Function): () => Promise<any> => {
    function promiseFunction(...args: any[]): Promise<any> {
        if (fn instanceof Function) {
            let promise = new Promise((resolve, reject) => {
                fn(...args, function(...innerArgs: any[]) {
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
