import BaseSort from "./base";
import {
    SelectAction,
    MoveAction
} from "../actions";

export default class TestSort extends BaseSort {
    get key() {
        return "test";
    }

    sort(items) {
        const elements = [...items];
        const actions = [];

        actions.push(new SelectAction(0));
        actions.push(new MoveAction(0, 1));

        return {
            actions,
            elements
        };
    }
}
