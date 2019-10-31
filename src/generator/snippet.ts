namespace snippet {

    /**
     * @description reduce
     * @author xfy
     * @param {string[]} array
     * @returns {string}
     */
    export const reduce = (array: string[]) => array.reduce((total, current) => total + current, "");
    
    /**
     * @description prefix templete
     * @author xfy
     * @param {string} addition
     * @returns {(origin: string) => string}
     */
    export const prefix = (addition: string) => (origin: string) => addition + origin;

    /**
     * @description suffix templete
     * @author xfy
     * @param {string} addition
     * @returns {(origin: string) => string}
     */
    export const suffix = (addition: string) => (origin: string) => origin + addition;

    /**
     * @description new line
     * @author xfy
     * @param {string} origin
     * @returns {string} `${Enter + code}`
     */
    export const newLine = prefix(Enter);

    /**
     * @description tab line
     * @author xfy
     * @param {string} origin
     * @returns {string}  `${Tab + code}`
     */
    export const tabLine = prefix(Tab);

    /**
     * @description tab multiline block
     * @author xfy
     * @param {string} multiline
     * @returns {string}
     */
    export const tabMultiline = (multiline: string) => multiline.replace(/(\n+\1)/gm, `$1${Tab}`);

    //append newline brace-right
    const suffixBraceRight = (block: string) => `{${block + newLine("}")}`;

    /**
    * @description affix "{}"
    * @author xfy
    * @param {string} statement
    * @param {boolean} format
    * @returns {fp.Just<string>} fp.Just.of(`{\n${statement}\n}` | `{${statement}}`);
    */
    export const braceAffix = (statement: string, format: boolean = true) => {
        if(!format) {
            return fp.Just.of(`{${statement}}`);
        }
        return fp.Just.of(statement).fmap(newLine).fmap(tabMultiline).fmap(suffixBraceRight);
    }


    /**
    * @description method templete
    * @author xfy
    * @param {string} name
    * @param {string} params
    * @param {string} returnType
    * @returns {fp.Just<string>}  fp.Just<string>;
    */
    export const methodTempl = (name: string, params: string, returnType: string) => (
        logic: string
    ) => braceAffix(logic).fmap(block => `${name}(${params}): ${returnType} ${block}`);

    /**
    * @description class templete
    * @author xfy
    * @param {string} name
    * @returns {fp.Just<(statement: string) => string>}
    */
    export const classTempl = (name: string) => (
        statement: string
    ) => braceAffix(statement).fmap(block => `class ${name} ${block}`);


    /**
    * @description namespace templete
    * @author xfy
    * @param {string} name
    * @returns {fp.Just<(statement: string) => string>} 
    */
    export const nsTempl = (name: string) => (
        statement: string
    ) => braceAffix(statement).fmap(block => `namespace ${name} ${block}`);
}


