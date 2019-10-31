namespace comp {
    //constructor
    type Constrctor<T> = {
        new (...args):T;
    }

    //MappingType
    type MappingType = {
        Display: Constrctor<comp.Display>;
        Container: Constrctor<comp.Container>;
        Button: Constrctor<comp.Button>;
        Lable: Constrctor<comp.Lable>;
    }

    //Mapping manager
    const Mapping: MappingType = Object.create(null);
    
    /**
     * @description generator 
     * @author xfy
     * @param {string} key
     * @returns {new (...args) => T}  compnent class
     */
    export const generator = <T extends keyof MappingType>(key: T): MappingType[T] => {
        const g = Mapping[key];
        if(!g) {
            throw `${key} not exsit , try regist first!`;
        }
        return g;
    }
    
    /**
     * @description register
     * @author xfy
     * @param {string} key
     * @param {new (...args) => T} generator
     * @returns 
     */
    export const register = <T extends keyof MappingType>(key: T, generator: MappingType[T]) => {
        Mapping[key] = generator;
    }
}





