import BaseSort from "./base";
import {
    SelectAction,
    ResetAction,
    SwapAction
} from "../actions";

export default class GnomeSort extends BaseSort {
    get key() {
        return "gnome";
    }

    sort(items) {
        const elements = [...items];
        const length = elements.length;
        const actions = [];

        let index = 0;

        while (index < length) {
            actions.push(new SelectAction(index));

            if (index === 0) {
                actions.push(new ResetAction(index));

                index++;

                actions.push(new SelectAction(index));
            }

            if (elements[index] >= elements[index - 1]) {
                actions.push(new ResetAction(index));

                index++;

                actions.push(new SelectAction(index));
            }
            else {
                actions.push(new SelectAction(index - 1, index));
                actions.push(new SwapAction(index - 1, index));
                actions.push(new ResetAction(index - 1, index));
        
                this.swap(elements, index - 1, index);
                index--;

                actions.push(new SelectAction(index));
            }
        }

        return {
            actions,
            elements
        };
    }
}
