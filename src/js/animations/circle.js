import BaseAnimation from "./base";

export default class CircleAnimation extends BaseAnimation {
    get key() {
        return "circle";
    }

    swap() {
        // eslint-disable-next-line no-unused-vars
        return (index, action, progress = 0) => {
            let borderColor = "#000000";
            let bottom = "0px";
            let left = "0px";
            let order = index;

            let dx = 0;
            let dy = 0;

            bottom = `${dy}px`;
            left = `${dx}px`;

            return {
                order,
                borderColor,
                bottom,
                left
            };
        };
    }
}
