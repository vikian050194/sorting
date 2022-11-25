import BaseAction from "./base";

export class ResetAction extends BaseAction {
    get key() {
        return "reset";
    }

    constructor(...index) {
        super();

        this._index = index;
    }
}
