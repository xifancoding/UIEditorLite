const testCodeSnippet = () => {

    

    const xmlTxt = `<DisplayObjectContainer>
    <Image id="img" value="100"/>
    <Lable id="lbl" modifier="public"/>
    <Button id="btn" modifier="private"/>

    <DisplayObjectContainer>
        <Image/>
        <Lable id="lbl2" modifier="public"/>
        <Button/>
        <DisplayObjectContainer id="box">
            <Image  id="img2"/>
            <Lable/>
            <Button/>
        </DisplayObjectContainer>
    </DisplayObjectContainer>
</DisplayObjectContainer>`;






const parser = new DOMParser();
const xml = parser.parseFromString(xmlTxt, "application/xml");

    const lg = (v: string) => {
        console.log(v); 
        return v;
    }


    snippet.ts.xml2TS(xml, "My_Class", "My_Namespace").map(lg);


}
// testCodeSnippet();




fp.Just.of(
    snippet.toSnippet([
        "public prop1: string",
        "public prop2: number",
        "public prop3: boolean",
    ])
)
.map(
    snippet.addLines([
        "public prop0: any",
        snippet.toSnippet("public test():void{}")
    ])
)
.map(
    snippet.ts.addClass("myclass", true)
)
.map(
    snippet.ts.addNamespace("mynamespace")
)
.map(snippet.output)
.map(console.log);








