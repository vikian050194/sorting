import BaseTimeFunction from "./base";

export default class BowTimeFunction extends BaseTimeFunction {
    get key() {
        return "bow";
    }

    calculate(timeFraction) {
        const x = 1.5;
        return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
    }
}
