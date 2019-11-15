namespace snippet {
    //type script snippet 
    export namespace ts {
        /**
        * @description property templete
        * @author xfy
        * @param {string} name
        * @param {string} type
        * @param {string} value
        * @returns {fp.Just<string>}  fp.Just<string>;
        */
        export const propertyTempl = (name: string, type: string, value: string = "null") => fp.Just.of(`${name}: ${type} = ${value}`);
    
        /**
        * @description method templete
        * @author xfy
        * @param {string} name
        * @param {string} params
        * @param {string} returnType
        * @returns {fp.Just<string>}  fp.Just<string>;
        */
        export const methodTempl = (name: string, params: string = "", returnType?: string) => (
            logic: string
        ) => fp.Just.of(logic).map(braceAffix).map(prepend(
            `${name}(${params})${returnType ? ": " + returnType : ""}`
        ));
    
        /**
        * @description class templete
        * @author xfy
        * @param {string} name
        * @returns {fp.Just<(statement: string) => string>}
        */
        export const classTempl = (name: string) => (
            statement: string
        ) => fp.Just.of(statement).map(braceAffix).map(prepend(`class ${name}`));
    
    
        /**
        * @description namespace templete
        * @author xfy
        * @param {string} name
        * @returns {fp.Just<(statement: string) => string>} 
        */
        export const nsTempl = (name: string) => (
            statement: string
        ) => fp.Just.of(statement).map(braceAffix).map(prepend(`namespace ${name}`));
    }
}