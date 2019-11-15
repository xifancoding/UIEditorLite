// TypeScript file

/// <reference path="fam_core.ts" />


// None
namespace fp {
    
    //valueKey
    export const valueKey = Symbol("__@@value");
    
    //Nothing<T>
    export type Nothing = typeof nil;
    
    //is none
    export const isNone = (test: any): boolean => {
        return test === nil;
    }
    
    //nil
    export const nil: Maybe<any> = {
        //unsafeValue
        unsafeValue: () => null,
        //fmap
        map: (fn: (value: any) => any) => nil,
        //ap
        ap: (maybe: Maybe<(value: any) => any>) => nil,
        //flatmap
        flatMap: (fn: (value: any) => Maybe<any>) => nil,
        //join
        join: (): Maybe<any> => nil
    }

    //Just
    export class Just<T> implements Maybe<T> {

        //of
        public static of<T>(value: T): Maybe<T> {
            if(value === null || value === undefined) {
                return nil;
            }
            return new Just(value);
        }

        //constructor
        public constructor(value: T) {
            this[valueKey] = value;
        }

        //unsafeValue
        public unsafeValue(): T {
            return this[valueKey];
        }

        //fmap
        public map<U>(fn: (value: T) => U): Maybe<U> {
            return Just.of(fn(this.unsafeValue()));
        }

        //ap
        public ap<U>(maybe: Maybe<(value: T) => U>): Maybe<U> {
            if(isNone(maybe)) {
                return nil;
            }
            return this.map(maybe.unsafeValue());
        }

        //flatMap
        public flatMap<U>(fn: (value: T) => Maybe<U>): Maybe<U> {
            return fn(this.unsafeValue());
        }

        //join
        public join<U>(this: Maybe<Maybe<U>>): Maybe<U> {
            return this.unsafeValue();
        }

    }
}

