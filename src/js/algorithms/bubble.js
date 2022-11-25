import BaseSort from "./base";
import {
    SelectAction,
    ResetAction,
    SwapAction
} from "../actions";

export default class BubbleSort extends BaseSort {
    get key() {
        return "bubble";
    }

    sort(items) {
        const elements = [...items];
        const length = elements.length;
        const actions = [];

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length - i; j++) {
                if (elements[j] > elements[j + 1]) {
                    actions.push(new SelectAction(j, j + 1));
                    actions.push(new SwapAction(j, j + 1));
                    actions.push(new ResetAction(j, j + 1));

                    this.swap(elements, j, j + 1);
                }
            }
        }

        return {
            actions,
            elements
        };
    }

    swap(e, i, j) {
        let temp = e[i];
        e[i] = e[j];
        e[j] = temp;
    }
}
