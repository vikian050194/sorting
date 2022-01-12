import BaseAction from "./base";

export class SelectAction extends BaseAction {
    get key() {
        return "select";
    }

    constructor(index) {
        super();

        this._index = [index];
    }
}
