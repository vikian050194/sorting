import BaseAnimation from "./base";

export default class TestAnimation extends BaseAnimation {
    get key() {
        return "test";
    }

    move() {
        return (progress = 0) => {
            const style = {
                bottom: 100 * progress + "px"
            };

            return style;
        };
    }
}
