import BaseTimeFunction from "./base";

export default class TestTimeFunction extends BaseTimeFunction {
    get key() {
        return "test";
    }

    calculate(timeFraction) {
        return timeFraction;
    }
}
