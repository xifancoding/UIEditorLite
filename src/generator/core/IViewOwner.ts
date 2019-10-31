

/**
 * @description IViewOwner
 * @author xfy
 * @interface IViewOwner
 * @template T
 */
interface IViewOwner<T extends IViewEntity> {
    //view Entity
    readonly view: T;
}