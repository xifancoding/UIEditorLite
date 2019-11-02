namespace snippet {

    //tab    
    const Tab = "\t";        //&nbsp;&nbsp;&nbsp;&nbsp; 
    //enter 
    const Enter = "\n";

    //get tail pattern in consecutive patterns 'pattern(?!pattern)'
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
     * @description new line
     * @author xfy
     * @param {string} origin
     * @returns {string} `${Enter + code}`
     */
    export const newLine = prepend(Enter);

    /**
     * @description tab line
     * @author xfy
     * @param {string} origin
     * @returns {string}  `${Tab + code}`
     */
    export const tabLine = prepend(Tab);

    /**
     * @description tab multiline block
     * @author xfy
     * @param {string} multiline multiline string
     * @returns {string}
     */
    export const tabBlock = (multiline: string) => multiline.replace(TailEnterReg, `$1${Tab}`);

    /**
     * @description recover tab multiline block
     * @author xfy
     * @param {string} multiline  multiline string
     * @returns {string}
     */
    export const untabBlock = (multiline: string) => multiline.replace(AheadTabReg, "");

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
        return fp.Just.of(statement).fmap(newLine).fmap(tabBlock).fmap(block => `{${block + newLine("}")}`);
    }
    
}


