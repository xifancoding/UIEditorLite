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
         * @description add class
         * @author xfy
         * @param {string} name class name
         * @param {true} _export preffix "export"
         * @returns {(Snippet[] | Snippet) => Snippet[]}
         */
        export const addClass = (name: string, _export?: true) => (target: Snippet | Snippet[]) => toSnippet(
            `${_export && "export " || ""}class ${name}{${ChildrenReg.source}}`,
            target instanceof Array ? target : [target]
        );

        /**
         * @description add namespace
         * @author xfy
         * @param {string} name namespace name
         * @returns {(Snippet[] | Snippet) => Snippet[]}
         */
        export const addNamespace = (name: string) => (target: Snippet | Snippet[]) => toSnippet(
            `namespace ${name}{${ChildrenReg.source}}`,
            target instanceof Array ? target : [target]
        );

        /**
         * @description xml element to propty lines
         * @author xfy
         * @param {Element} element
         * @returns {string}
         */
        const xml2Properties = (element: Element) => {
            let props: string[] = [];
            const pName = element.getAttribute(KeyMap.id);
            if(pName) {
                props.push(
                    propertyTempl(
                        element.getAttribute(KeyMap.id),
                        element.tagName, 
                        element.getAttribute(KeyMap.value),
                        element.getAttribute(KeyMap.modifier) as "public" | "protected" | "private"
                    )
                )
            }
            props = element.children && Array.from(element.children).reduce((p, c) => p.concat(xml2Properties(c)), props) || props;
            return props;
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
            const propLines = xml2Properties(root);
            if(root.getAttribute(KeyMap.id) !== KeyMap.root) {
                propLines.push(propertyTempl(KeyMap.root, root.tagName));
            }

            return fp.Just.of(
                snippet.toSnippet(propLines)
            )
            .map(
                addClass(className)
            )
            .map(
                addNamespace(nsName)
            )
            .map(output);
        };

        

        /**
         * @description display to xml
         * @author xfy
         * @param {comp.Display} display
         * @returns {string}
         */
        export const display2XML = (display: comp.Display): XMLDocument => {

            return null;
        }



    }
}
