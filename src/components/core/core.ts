

namespace comp {
    /**
     * @description DisplayObject
     * @author xfy
     * @interface IDisplay
     */
    export interface IDisplay {
        //x
        readonly x: number;
        //y
        readonly y: number;
    }
    
    
    /**
     * @description Container display 
     * @author xfy
     * @interface IContainer
     * @extends {IDisplayObject}
     */
    export interface IContainer extends IDisplay {
        
        /**
         * @description     add child display object 
         * @author xfy
         * @param {IDisplay} child
         * @param {number} index
         * @returns {this}
         * @memberof IContainer
         */
        addChildAt(child: IDisplay, index: number): this;
    
        
        /**
         * @description     remove child by index
         * @author xfy
         * @param {number} index
         * @returns {IDisplay}
         * @memberof IContainer
         */
        removeChildAt(index: number): IDisplay;
    }
}
