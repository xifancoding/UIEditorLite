const testCodeSnippet = () => {

    const nsTemp = snippet.nsTempl("nsTest");

    const classTemp = snippet.classTempl("classTest");

    const funcTemp = snippet.functionTempl("funcTest", "a: number, b: number", "void");

    console.log(funcTemp("console.log(a+b);").flatMap(classTemp).flatMap(nsTemp).unsafeValue());

}
testCodeSnippet();










