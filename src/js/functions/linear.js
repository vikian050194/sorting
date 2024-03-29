import BaseTimeFunction from "./base";

export default class LinearTimeFunction extends BaseTimeFunction {
    get key() {
        return "linear";
    }

    calculate(timeFraction) {
        return timeFraction;
    }
}
