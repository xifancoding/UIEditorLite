namespace snippet {

    //tab    
    const Tab = "\t";
    //enter 
    const Enter = "\n";

    //brace content
    // const braceContentPattern = new RegExp("(?<=\{)[^\{\}]+(?=\})", "gm");


    //get tail pattern in constant patterns 'pattern(?!pattern)'
    const tailPattern = (pattern: string, cacheContext?: true) => {
        const regStr = `${pattern}(?!${pattern})`;
        return new RegExp(!cacheContext ? regStr : `(${regStr})`, "gm");
    }

    //get ahead pattern in consecutive patterns, '(?<=pattern)pattern'
    const aheadPattern = (pattern: string, cacheContext?: true) => {
        const regStr = `(?<!${pattern})${pattern}`;
        return new RegExp(!cacheContext ? regStr : `(${regStr})`, "gm");
    }

    // the tail '\n' of '\n\n\n...\n'
    const TailEnterReg = tailPattern(Enter, true);
    // the ahead '\t' of '\t...\t\t\t'
    const AheadTabReg = tailPattern(Tab, true);

    /**
     * @description prepend addition
     * @author xfy
     * @param {string} addition
     * @returns {(origin: string) => string}
     */
    export const prepend = (addition: string) => (origin: string) => addition + origin;
    
    /**
     * @description append addition
     * @author xfy
     * @param {string} addition
     * @returns {(origin: string) => string}
     */
    export const append = (addition: string) => (origin: string) => origin + addition;
    
    /**
     * @description new line `${Enter + code}`
     */
    export const newLine = prepend(Enter);

    /**
     * @description tab line `${Tab + code}`
     */
    export const indentLine = prepend(Tab);

    /**
     * @description indent block
     * @author xfy
     * @param {string} multiline multiline string
     * @returns {string}
     */
    export const indentBlock = (multiline: string) => multiline.replace(TailEnterReg, `$1${Tab}`);

    /**
     * @description reindent block
     * @author xfy
     * @param {string} multiline  multiline string
     * @returns {string}
     */
    export const reindentBlock = (multiline: string) => multiline.replace(AheadTabReg, "");

    /**
    * @description affix "{}"
    * @author xfy
    * @param {string} statement
    * @param {boolean} format
    * @returns {string} `{\n${statement}\n}` | `{${statement}}`
    */
    export const braceAffix = (statement: string) => {
        const fmtStatement = statement.indexOf(Enter) === 0 ? statement : newLine(statement);
        return `{${indentBlock(fmtStatement)}${newLine("}")}`;
    };

    /**
    * @description prefix "private" | "protected" | "public"
    * @author xfy
    * @param {string} statement
    * @param {"private" | "protected" | "public"} modifier
    * @returns {string} "private" | "protected" | "public" statement
    */
    export const prefixModifier = (statement: string, modifier?: "private" | "protected" | "public") => `${modifier || "public"} ${statement}`;

}


