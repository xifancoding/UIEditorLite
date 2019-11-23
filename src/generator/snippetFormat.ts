namespace snippet {
    export namespace format {

        
        // a(?=b) 匹配后面有 b 的 a。
        // a(?!b) 匹配后面没有 b 的 a。
        // (?<= a) b 匹配前面有 a 的 b。
        // (? <!a) b 匹配前面没有 a 的 b。

        /**
         * @description linefeed format
         * @author xfy
         * @param {string} code
         * @returns {string}  linefeed code
         */
        export const linefeed = (code: string) => code.replace(/(?<=[\{|\}|;])/gm, Enter);

        /**
         * @description linefeed format
         * @author xfy
         * @param {string} multiline multiline code
         * @returns {string}  indent code
         */
        export const indent = (multiline: string) => multiline.replace(/(?<=\n)(?=[^\}])/gm, Tab);


        // let temp = "namespace ns {export class c {public a: number;private b: string;c: boolean;test(){const a = 10;const b = 20;console.log(a+b);}test2(){const a1 = 10;const b1 = 20;console.log(a1+b1);}}}";

        // temp = snippet.format.linefeed(temp);
        // temp = snippet.format.indent(temp);
        // console.log(temp);
    }
}