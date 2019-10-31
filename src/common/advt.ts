namespace advt {

    //is type
    export type IsType<T> = (value: any) => value is T;

    // //NoNullable
    // export type NoNullable<T> = T extends null | undefined ? never : T;
    // export type NoNullable2<T> = Exclude<T, null | undefined>;

    //Readonly
    export type Readonly<T> = {
        readonly [K in keyof T]: T[K];
    }

    //DeepReadOnly
    export type DeepReadOnly<T> = {
        readonly [K in keyof T]: DeepReadOnly<T[K]>;
    }

    //Partical
    export type Partical<T> = {
        [K in keyof T]?: T[K];
    }

    // //Required
    // export type Required<T> = {
    //     [K in keyof T]-?: T[K];
    // }

    //Record
    export type Record<T extends keyof any, U> = {
        [K in T]: U;
    }

    // //Inlude
    // export type Extract<T, U> = T extends U ? T: never;

    // //Exlude(Diff)
    // export type Exclude<T, U> = T extends U ? never : T;

    //Pick
    export type Pick<T, U extends keyof T> = {
        [K in U]: T[K];
    }

    // //Omit
    // export type Omit<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>;

    //Proxy
    export type Proxy<T> = {
        set(value: T):void;
        get(): T;
    }

    //Proxify
    export type Proxify<T> = {
        [K in keyof T]: Proxy<T[K]>;
    }

    
    // // FunctionPropertyNames
    // export type FunctionPropertyNames<T> = {
    //     [K in keyof T] : T[K] extends Function ? K : never;
    // }[keyof T];
    
    // //FunctionProperties, 
    // //interface A {a: number, b: () => void, c: (value: number) => string}, type B = advt.FunctionProperties<A>
    // export type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

    // //NoFunctionPropertyNames
    // export type NoFunctionPropertyNames<T> = Exclude<keyof T, FunctionPropertyNames<T>>;

    // //NoFunctionPropertyNames
    // export type NoFunctionProperties<T> = Pick<T, Exclude<keyof T, FunctionPropertyNames<T>>>;

    // //ReturnType, type A = ReturnType<() => string>;
    // export type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;

    // //ParametersType, type A = ParametersType<(a: number, b: string) => void> //[number, string]
    // export type ParametersType<T extends (...args: any[]) => any> = T extends (...args: infer P) => any  ? P : never;
    
    // //ContructorParametersType
    // export type ContructorParametersType<T extends new (...args) => T> = T extends new (...args: infer P) => T ? P : never;
}
