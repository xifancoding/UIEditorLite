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
testCodeSnippet();




