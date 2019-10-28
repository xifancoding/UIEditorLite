
namespace comp {
    /**
     * @description   Image
     * @author xfy
     * @interface IImage
     * @extends {IDisplay}
     */
    export interface IImage<T> extends IDisplay {
        //url
        url: string;
        //texture
        texture: T;
    }
    
    
    /**
     * @description  Lable
     * @author xfy
     * @interface ILable
     * @extends {IDisplay}
     */
    export interface ILable extends IDisplay {
        //text
        text: string;
    }
    
    
    /**
     * @description   Button
     * @author xfy
     * @interface IButton
     * @extends {IDisplay}
     */
    export interface IButton extends IDisplay {
        //label
        label: string;
        //skin
        skin: string;
    }
}


