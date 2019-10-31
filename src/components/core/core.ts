

namespace comp {
    /**
     * @description DisplayObject
     * @author xfy
    *  @interface Display
     */
    export interface Display {
        //x
        readonly x: number;
        //y
        readonly y: number;
    }
    
    
    /**
     * @description Container display 
     * @author xfy
     * @interface Container
     * @extends {Display}
     */
    export interface Container extends Display {
        
        /**
         * @description     add child display object 
         * @author xfy
         * @param {Display} child
         * @param {number} index
         * @returns {this}
         * @memberof IContainer
         */
        addChildAt(child: Display, index: number): Display;
    
        
        /**
         * @description     remove child by index
         * @author xfy
         * @param {number} index
         * @returns {Display}
         * @memberof IContainer
         */
        removeChildAt(index: number): Display;
    }
}
