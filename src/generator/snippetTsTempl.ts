namespace snippet {
    //type script snippet 
    export namespace ts {

        //Modifier type
        type TypeModifier = "protected" | "private" | "public";

        /**
        * @description property templete
        * @author xfy
        * @param {string} name
        * @param {string} type
        * @param {string} value
        * @param {"protected" | "private"} modifier
        * @returns {string}  string;
        */
        export const propertyTempl = (name: string, type: string, value?: string, modifier?: TypeModifier) => prefixModifier(`${name}: ${type} = ${value};`, modifier);    

        /**
         * @description classTempl
         * @author xfy
         * @param {string} name
         * @param {string} statement?
         * @returns {string | (statement: string) => string}
         */
        export function classTempl(name: string): (statement: string) => string;
        export function classTempl(name: string, statement: string): string;
        export function classTempl(name: string, statement?: string): string | ((statement: string) => string) {
            if(statement) {
                return `class ${name} ${braceAffix(statement)}`;
            }
            return (statement: string) => `class ${name} ${braceAffix(statement)}`;
        } 
    
        /**
         * @description nsTempl
         * @author xfy
         * @param {string} name
         * @param {string} statement?
         * @param {string} noExport?
         * @returns {true | (statement: string) => string}
         */
        export function nsTempl(name: string): (statement: string) => string;
        export function nsTempl(name: string, statement: string, noExport?: true): string;
        export function nsTempl(name: string, statement?: string, noExport?: true): string | ((statement: string) => string) {
            if(!name) {
                return statement ? statement: (stmt: string) => stmt;
            }

            if(statement) {
                return `namespace ${name} ${braceAffix(`${noExport ? "" : "export"} ${statement}`)}`;
            }
            return (statement: string) => `namespace ${name} ${braceAffix(`${noExport ? "" : "export"} ${statement}`)}`;
        }


        //=================================

        export const display2XML = (display: comp.Display): XMLDocument => {
            return null;
        }

        const xml2Property = (element: Element) => snippet.newLine(
            snippet.ts.propertyTempl(
                element.getAttribute("id"),
                element.tagName, element.getAttribute("value"),
                element.getAttribute("modifier") as "public" | "protected" | "private"
            )
        );

        export const xml2TS = (data: XMLDocument): fp.Just<string> => {
            const root = data.children[0];

            const initText = snippet.newLine(snippet.ts.propertyTempl("root", root.tagName));

            const propLines = Array.from(root.children).reduce((text, node) => `${text}${xml2Property(node)}`, initText);

            
            const result = fp.Just.of(propLines)
                .map(snippet.ts.classTempl(root.getAttribute("id")))
                .map(snippet.ts.nsTempl(root.getAttribute("ns")));


            return result;
        }

        
    }
}


