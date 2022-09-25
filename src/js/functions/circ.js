import BaseTimeFunction from "./base";

export default class CircleTimeFunction extends BaseTimeFunction {
    get key() {
        return "circ";
    }

    calculate(timeFraction) {
        return 1 - Math.sin(Math.acos(timeFraction));
    }
}
