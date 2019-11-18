namespace snippet {
    //type script snippet 
    export namespace ts {

        //prop temp type
        type PropTemp = {
            name: string;
            type: string;
            modify?: "public" | "protected" | "private";
            value?:string;
        };

        /**
        * @description property templete
        * @author xfy
        * @param {PropTemp} props
        * @returns {fp.Just<string>}  fp.Just<string>;
        */
        export const propertyTempl = (...props: PropTemp[]) => fp.Just.of(props.reduce((p, c) => p + newLine(`${c.modify ? c.modify + " " : ""}${c.name}: ${c.type} = ${c.value};`), newLine("")));
    
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