// TypeScript file

/// <reference path="fam_core.ts" />


// None
namespace fp {

    //valueKey
    export const valueKey = Symbol("__@@value");

    //Nothing<T>
    export type Nothing = typeof None;

    //is none
    export const isNoting = (test: any): test is Nothing => {
        return test === None;
    }
    
     //None
    export class None {
        //of
        public static of = <T>(): Maybe<T> => None;

        //unsafeValue
        public static unsafeValue = <T>(): T => null;
        
        //fmap
        public static fmap = <T, U>(fn: (value: T) => U): Maybe<U> => None;

        //ap
        public static ap = <T, U>(maybe: Maybe<(value: T) => U>): Maybe<U> => None;

        //flatmap
        public static flatMap = <T, U>(fn: (value: T) => Maybe<U>): Maybe<U> => None;

        //join
        public static join = <U>(): Maybe<U> => None;
    }

    //Just
    export class Just<T> implements Maybe<T> {

        //of
        public static of<T>(value: T): Maybe<T> {
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
        public fmap<U>(fn: (value: T) => U): Maybe<U> {
            return Just.of(fn(this.unsafeValue()));
        }

        //ap
        public ap<U>(maybe: Maybe<(value: T) => U>): Maybe<U> {
            if(isNoting(maybe)) {
                return None;
            }
            return this.fmap(maybe.unsafeValue());
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


