const testCodeSnippet = () => {

    
    const parser = new DOMParser();
    const xml = parser.parseFromString(`<DisplayObjectContainer id="MyClass" ns="MyNamespace">
    <Image id="img" value="100"/>
    <Lable id="lbl" modifier="public"/>
    <Button id="btn" modifier="private"/>
    </DisplayObjectContainer>`, "application/xml");

    const lg = (v: string) => {
        console.log(v); 
        return v;
    }


    snippet.ts.xml2TS(xml).map(lg);


}
testCodeSnippet();








