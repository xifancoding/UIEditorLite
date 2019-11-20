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

        /**
         * @description display to xml
         * @author xfy
         * @param {comp.Display} display
         * @returns {string}
         */
        export const display2XML = (display: comp.Display): XMLDocument => {

            return null;
        }

        /**
         * @description xml element to propty lines
         * @author xfy
         * @param {Element} element
         * @returns {string}
         */
        const xml2Properties = (element: Element) => {
            let result = "";
            const pName = element.getAttribute(KeyMap.id);
            if(pName) {
                result += snippet.newLine(
                    snippet.ts.propertyTempl(
                        element.getAttribute(KeyMap.id),
                        element.tagName, 
                        element.getAttribute(KeyMap.value),
                        element.getAttribute(KeyMap.modifier) as "public" | "protected" | "private"
                    )
                );
            }

            if(element.children.length > 0) {
                result = Array.from(element.children).reduce((text, ele) => `${text}${xml2Properties(ele)}`, result);
            }

            return result;
        }

        /**
         * @description xml element to propty lines
         * @author xfy
         * @param {XMLDocument} data
         * @param {string} className
         * @param {string} nsName
         * @returns {string}
         */
        export const xml2TS = (data: XMLDocument, className: string, nsName?: string): fp.Just<string> => {
            const root = data.children[0];
            let propLines = xml2Properties(root);
            if(root.getAttribute(KeyMap.id) !== KeyMap.root) {
                propLines = newLine(propertyTempl(KeyMap.root, root.tagName)) + propLines;
            }
            const result = fp.Just.of(propLines)
                .map(snippet.ts.classTempl(className))
                .map(snippet.ts.nsTempl(nsName));
            return result;
        };

        
    }
}
