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

            minIndex = this.min(elements, minIndex, index + 1, length - 1);

            if (index === minIndex) {
                break;
            }

            actions.push(new SelectAction(minIndex));
            actions.push(new ResetAction(minIndex));

            actions.push(new SelectAction(index, minIndex));
            actions.push(new SwapAction(index, minIndex));
            actions.push(new ResetAction(index, minIndex));

            this.swap(elements, index, minIndex);
        }

        return {
            actions,
            elements
        };
    }

    min(elements, initialMin, left, right) {
        let min = initialMin;

        for (let index = left; index <= right; index++) {
            if (elements[index] < elements[min]) {
                min = index;
            }
        }

        return min;
    }
}
