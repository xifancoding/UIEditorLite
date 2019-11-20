namespace snippet {


    export const KeyMap = {
        id: "id",
        type: "type",
        value: "value",
        modifier: "modifier",
        ns: "ns",
        root: "root"
    };

    type Folder = "root" | "code" | "assets";

    export let Path: { [K in Folder]: string};
}