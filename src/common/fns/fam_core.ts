namespace fp {

    //Functor, fn => wrapped value
    type Functor<T, U> = (fn: (param: T) => U) => Maybe<U>;

    //Applicative, wrapped fn => wrapped value
    type Applicative<T, U> = (fn: Maybe<(param: T) => U>) => Maybe<U>;

    //Monad fn(return wrapped value) => wrapped value
    type Monad<T, U> = (fn: (param: T) => Maybe<U>) => Maybe<U>;

    //IFunctor
    export interface IFunctor<T> {
        fmap<U>(fn: (param: T) => U): Maybe<U>;
    }

    //IApplicative
    export interface IApplicative<T> {
        ap<U>(maybe: Maybe<(param: T) => U>): Maybe<U>;
    }

    //IMonad
    export interface IMonad<T> { 
        flatMap<U>(fn: (param: T) => Maybe<U>): Maybe<U>;
        
    }

    //IJoinable
    export interface IJoinable {
        join<U>(this: Maybe<Maybe<U>>): Maybe<U>;
    }

    //Maybe
    export type Maybe<T> = {unsafeValue(): T} & IFunctor<T> & IApplicative<T> & IMonad<T> & IJoinable;

    //MaybeType
    export type MaybeType = {
        //of
        of<T>(value: T): Maybe<T>;
    }

   
    
}


