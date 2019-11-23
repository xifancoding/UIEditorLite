namespace snippet {

    //tab    
    export const Tab = "\t";
    //enter 
    export const Enter = "\n";

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
    export const TailEnterReg = tailPattern(Enter, true);
    // the ahead '\t' of '\t...\t\t\t'
    export const AheadTabReg = tailPattern(Tab, true);

    /**
     * @description new line `${Enter + code}`
     */
    export const newLine = (code: string) => `${Enter}${code}`

    /**
     * @description indent block
     * @author xfy
     * @param {string} multiline multiline string
     * @returns {string}
     */
    export const indentBlock = (multiline: string) => multiline.replace(TailEnterReg, `$1${Tab}`);

    /**
    * @description affix "{}"
    * @author xfy
    * @param {string} code
    * @param {boolean} format
    * @returns {string} `{\n${statement}\n}` | `{${statement}}`
    */
    export const braceAffix = (code: string) => {
        const fmtStatement = code.indexOf(Enter) === 0 ? code : newLine(code);
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


    //============================================================
    //============================================================
    //============================================================
    //============================================================



    //Snippet type
    export type Snippet = {
        // raw code
        readonly raw: string;
        //indent snippets
        readonly children?: Snippet[];
        //to fp.Just       
        toJust(this: Snippet): fp.Just<Snippet>;
    };

    //to JustSnippet
    function toJust<T>(this: T): fp.Just<T> {
        return fp.Just.of(this);
    }

    //ChildrenReg
    export const ChildrenReg = /#/;

    /**
     * @description create Snippet
     * @author xfy
     * @param {string | string[]} raw
     * @param {Snippet[]} children
     * @returns {nippet | Snippet[]}
     */
    export function toSnippet(raw: string, children?: Snippet[]): Snippet;
    export function toSnippet(raw: string[]): Snippet[]
    export function toSnippet(raw: string | string[], children?: Snippet[]): Snippet | Snippet[] {
        if (raw instanceof Array) {
            return raw.map(value => ({ raw: value, toJust }));
        }
        return { raw, children, toJust };
    }

    //unity snippet
    export const unify = (snpt: string | Snippet) => typeof snpt === "string" ? toSnippet(snpt) : snpt;

    /**
     * @description add children lines
     * @author xfy
     * @param {Snippet[]} children
     * @returns {Snippet => Snippet}
     */
    export const addChildren = (children: Array<string | Snippet>) => (father: Snippet) => toSnippet(father.raw, addLines(children)(father.children));

    /**
     * @description add new line snippets
     * @author xfy
     * @param {Snippet[]} lines
     * @returns {(Snippet[] | Snippet) => Snippet[]}
     */
    export const addLines = (lines: Array<string | Snippet>) => (target: Snippet | Snippet[]): Snippet[] => {
        target = target || [];
        if (target instanceof Array) {
            return target.concat(lines.map(unify));
        }
        return [target, ...lines.map(unify)]
    }

    /**
     * @description output
     * @author xfy
     * @param {Snippet} snpt
     * @param {string} tabPreffix
     * @returns {string}
     */
    export const output = (snpt: Snippet, tabPreffix: string = "") => {
        const childPreffix = tabPreffix + Tab;
        const templs = snpt.raw.split(ChildrenReg);
        let code = `${tabPreffix}${templs[0]}${Enter}`;
        if (snpt.children) {
            code = snpt.children.reduce((text, line) => `${text}${output(line, childPreffix)}`, code) as string;
        }
        if (templs.length > 1) {
            code += `${tabPreffix}${templs[1]}${Enter}`;
        }
        return code;
    };
    
    
    
}


