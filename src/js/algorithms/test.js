import BaseSort from "./base";

export default class TestSort extends BaseSort {
    get key(){
        return "test";
    }

    sort(items) {
        const elements = [...items];
        const steps = [];

        steps.push([0, 1]);

        return {
            steps,
            elements
        };
    }
}
