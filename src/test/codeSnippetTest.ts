const testCodeSnippet = () => {

    const nsTemp = snippet.ts.nsTempl("nsTest");

    const classTemp = snippet.ts.classTempl("classTest");

    const funcTemp = snippet.ts.methodTempl("funcTest", "a: number, b: number");


    const lg = (value: string) => {
        console.log(value);
        return value;
    }

    const props = snippet.ts.propertyTempl("props", "number").fmap(snippet.prepend("public ")).fmap(snippet.newLine)
    .fmap(total => {
        return snippet.ts.propertyTempl("props2", "string").fmap(snippet.prepend("protected ")).fmap(snippet.newLine).fmap(value => total + value)
    })
    



    // console.log(funcTemp("console.log(a+b);").flatMap(classTemp).flatMap(nsTemp).unsafeValue());
    // console.log(snippet.brace("const a = 10;\nconsole.log(a);").unsafeValue());
    
    
}
testCodeSnippet();




