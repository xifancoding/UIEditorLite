
namespace comp {
    /**
     * @description   Image
     * @author xfy
    *  @interface Image
     * @extends {Display}
     */
    export interface Image<T> extends Display {
        //url
        url: string;
        //texture
        texture: T;
    }
    
    
    /**
     * @description  Lable
     * @author xfy
     * @interface Lable
     * @extends {Display}
     */
    export interface Lable extends Display {
        //text
        text: string;
    }
    
    
    /**
     * @description   Button
     * @author xfy
     * @interface Button
     * @extends {Display}
     */
    export interface Button extends Display {
        //label
        label: string;
        //skin
        skin: string;
    }
}


