const testCodeSnippet = () => {

    const nsTemp = snippet.ts.nsTempl("nsTest");

    const classTemp = snippet.ts.classTempl("classTest");

    const funcTemp = snippet.ts.methodTempl("funcTest", "a: number, b: number")("console.log(a, b);").map(snippet.append);


    const props1 = snippet.ts.propertyTempl("props", "number").map(snippet.prepend("public ")).map(snippet.newLine)
    const props2 = snippet.ts.propertyTempl("props2", "string").map(snippet.prepend("protected ")).map(snippet.newLine).map(snippet.append);
    const props = props1.ap(props2)

    props.ap(funcTemp).flatMap(classTemp).flatMap(nsTemp).map(console.log);



}
testCodeSnippet();





