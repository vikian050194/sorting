import BaseSort from "./base";

export default class BubbleSort extends BaseSort {
    get key(){
        return "bubble";
    }

    sort(items) {
        const elements = [...items];
        const length = elements.length;
        const steps = [];

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length - i; j++) {
                if (elements[j] > elements[j + 1]) {
                    steps.push([j, j + 1]);
                    this.swap(elements, j, j + 1);
                }
            }
        }

        return {
            steps,
            elements
        };
    }
}
