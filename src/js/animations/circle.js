import BaseAnimation from "./base";

export default class CircleAnimation extends BaseAnimation {
    get key() {
        return "circle";
    }

    swap() {
        return (index, action, progress = 0) => {
            let borderColor = "#000000";
            let bottom = "0px";
            let left = "0px";
            let order = index;

            const distance = 80;

            let dx = 0;
            let dy = 0;

            const radians = Math.PI * (1 - progress);

            dx = Math.cos(radians);
            dy = Math.sin(radians);

            if (progress >= 1) {
                dx = 0;
                dy = 0;

                if (index === action.from) {
                    order = action.to;
                }

                if (index === action.to) {
                    order = action.from;
                }
            } else {
                dx *= distance / 2;
                dx += distance / 2;
                dy *= distance / 2;

                if (index === action.from) {
                    const color256 = Math.floor(255 * progress);
                    const colorR = color256.toString(16);
                    const colorB = (255 - color256).toString(16);
                    borderColor = `#${colorR}00${colorB}`;
                }

                if (index === action.to) {
                    dx *= (-1);
                    dy *= (-1);

                    const color256 = Math.floor(255 * progress);
                    const colorR = (255 - color256).toString(16);
                    const colorB = color256.toString(16);
                    borderColor = `#${colorR}00${colorB}`;
                }
            }

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
