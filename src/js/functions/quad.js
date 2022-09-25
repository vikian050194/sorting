import BaseTimeFunction from "./base";

export default class QuadTimeFunction extends BaseTimeFunction {
    get key() {
        return "quad";
    }

    calculate(timeFraction) {
        return Math.pow(timeFraction, 2);
    }
}
