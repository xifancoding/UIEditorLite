var comp;
(function (comp) {
    //Mapping manager
    var Mapping = Object.create(null);
    /**
     * @description generator
     * @author xfy
     * @param {string} key
     * @returns {new (...args) => T}  compnent class
     */
    comp.generator = function (key) {
        var g = Mapping[key];
        if (!g) {
            throw key + " not exsit , try regist first!";
        }
        return g;
    };
    /**
     * @description register
     * @author xfy
     * @param {string} key
     * @param {new (...args) => T} generator
     * @returns
     */
    comp.register = function (key, generator) {
        Mapping[key] = generator;
    };
})(comp || (comp = {}));
//========================================================
comp.register("Display", egret.DisplayObject);
comp.register("Container", egret.DisplayObjectContainer);
var c = comp.generator("Display");
var cc = new c();
console.log(cc);
var d = comp.generator("Container");
var dd = new d();
console.log(dd);
// const b = comp.Mapping.generator(comp.Mapping.Button.desc);
// const bb = new b();
// console.log(bb);
