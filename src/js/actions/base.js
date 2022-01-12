export default class BaseAction {
    constructor(){
        this._index = [];
    }

    get key(){
        throw new Error("not implemented");
    }

    get index(){
        return this._index;
    }
}
