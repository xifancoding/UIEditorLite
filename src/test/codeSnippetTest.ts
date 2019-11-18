const testCodeSnippet = () => {

    const nsTemp = snippet.ts.nsTempl("nsTest");

    const classTemp = snippet.ts.classTempl("classTest");

    const funcTemp = snippet.ts.methodTempl("funcTest", "a: number, b: number")("console.log(a, b);").map(snippet.append);


     const props = snippet.ts.propertyTempl({name: "prop", type: "number", value: "10"}, {name: "prop2", type: "string", modify: "public"}).map(v => {
         console.log(v);
         return v;
        });
    props.ap(funcTemp).flatMap(classTemp).flatMap(nsTemp).map(console.log);
}
testCodeSnippet();





