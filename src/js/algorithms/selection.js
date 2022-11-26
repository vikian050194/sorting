import BaseSort from "./base";
import {
    SelectAction,
    ResetAction,
    SwapAction
} from "../actions";

export default class SelectionSort extends BaseSort {
    get key() {
        return "selection";
    }

    sort(items) {
        const elements = [...items];
        const length = elements.length;
        const actions = [];

        let minIndex = 0;

        for (let index = 0; index < length - 1; index++) {
            minIndex = index;

            actions.push(new SelectAction(minIndex));
            actions.push(new ResetAction(minIndex));

            minIndex = this.min(elements, index + 1, length);

            actions.push(new SelectAction(minIndex));
            actions.push(new ResetAction(minIndex));

            actions.push(new SelectAction(minIndex, index));
            actions.push(new SwapAction(minIndex, index));
            actions.push(new ResetAction(minIndex, index));

            this.swap(elements, minIndex, index);
        }

        return {
            actions,
            elements
        };
    }

    min(elements, left, right) {
        let min = left;

        for (let index = left; index <= right; index++) {
            if (elements[index] < elements[min]) {
                min = index;
            }
        }

        return min;
    }
}
