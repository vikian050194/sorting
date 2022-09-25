import BaseTimeFunction from "./base";

export default class ElasticTimeFunction extends BaseTimeFunction {
    get key() {
        return "elastic";
    }

    calculate(timeFraction) {
        const x = 1.5;
        return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction);
    }
}
