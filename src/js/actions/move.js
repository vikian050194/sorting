import BaseAction from "./base";

export class MoveAction extends BaseAction {
    get key() {
        return "move";
    }

    constructor(from, to) {
        super();

        this._from = from;
        this._to = to;
        this._index = [from, to];
    }

    get from(){
        return this._from;
    }

    get to(){
        return this._to;
    }
}
