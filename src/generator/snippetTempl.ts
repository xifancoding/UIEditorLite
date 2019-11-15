namespace snippet {
    export namespace templ {
//============== don't format ==================
//============== don't format ==================

//brace templete
export const bracketTemp = (
`{
    {$statement}
}`);

//class templete
export const classTempl = `class {$class} ${bracketTemp}`;

//namespace templete
export const nsTempl2= (
`namespace {$namespace} {
    ${indentBlock("export " + classTempl)}
}`); 
//namespace templete
export const nsTempl = `namespace {$namespace} ${bracketTemp.replace("{$statement}", indentBlock(classTempl))}`;




//============== don't format ==================
//============== don't format ==================

    }
}


