namespace snippet {
    export namespace templ {
//============== don't format ==================
//============== don't format ==================

//brace templete
export const braceTemp = (
`{
    {$statement}
}`);

//class templete
export const classTempl = `class {$class} ${braceTemp}`;

//namespace templete
export const nsTempl2= (
`namespace {$namespace} {
    ${tabBlock("export " + classTempl)}
}`); 
//namespace templete
export const nsTempl = `namespace {$namespace} ${braceTemp.replace("{$statement}", tabBlock(classTempl))}`;




//============== don't format ==================
//============== don't format ==================

    }
}


