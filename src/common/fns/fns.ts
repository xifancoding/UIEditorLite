// Functional Programming
namespace fp {

    //compose
    export const compose = (...fns: Function[]) =>  (...args) => {
        let idx = fns.length - 1;
        let result = fns[idx].apply(null, args);
        while(--idx > -1) {
            result = fns[idx].call(null, result);
        }
        return result;
    }; 

    //compose
    export const compose2 = (...fns: Function[]) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];


    //spread 
    export const spreadArgs = (fn: (...args) => any) => argsArray => fn(...argsArray);
    //gather
    export const gatherArgs = (fn: (argsArray: any[]) => any) => (...args) => fn(args);

    //curry
    export const curry = (fn: Function, len = fn.length) => {
        const _nextCurry = (...prevParams) => (...nextParams) => {
            const existParams = [...prevParams, ...nextParams];
            return existParams.length >= len ? fn(...existParams) : _nextCurry(...existParams);
        };
        return _nextCurry;
    };

    //curry
    export const curry2 = (fn: Function, len = fn.length) => {
        const _curry = (...args) => {
            if (args.length < len) {
                return _curry.bind(null, ...args);
            }
            return fn.call(null, args);   
        }
        return _curry;
    }

    //partical
    export const partial = (fn: (...args) => any, ...presetArgs) => (...laterArgs) => fn(...presetArgs, ...laterArgs);

}
