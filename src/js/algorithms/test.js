import BaseSort from "./base";
import {
    SelectAction,
    SwapAction
} from "../actions";

export default class TestSort extends BaseSort {
    get key() {
        return "test";
    }

    sort(items) {
        const elements = [...items];
        const actions = [];

        // for (const element of elements) {
        //     const index = elements.indexOf(element);
        //     actions.push(new SelectAction(index));
        // }

        // for (let index = 1; index <= elements.length; index++) {
        //     const order = elements.indexOf(index);
        //     actions.push(new SelectAction(order));
        // }

        actions.push(new SelectAction(0));
        actions.push(new SwapAction(0, 1));
        actions.push(new SwapAction(1, 2));
        actions.push(new SelectAction(3));
        actions.push(new SelectAction(4));

        return {
            actions,
            elements
        };
    }
}
