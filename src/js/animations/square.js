import BaseAnimation from "./base";

export default class SquareAnimation extends BaseAnimation {
    get key() {
        return "square";
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

            if (progress <= 0.25) {
                dy = progress / 0.25;
            }

            if (progress > 0.25 && progress <= 0.75) {
                dx = (progress - 0.25) / 0.5;
                dy = 1;
            }

            if (progress > 0.75 && progress < 1) {
                dx = 1;
                dy = 1 - ((progress - 0.75) / 0.25);
            }

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
                dx *= distance;
                dy *= distance / 2;

                if (index === action.from) {
                    const color256 = Math.floor(255 * progress);
                    const colorR = color256.toString(16);
                    const colorB = (255 - color256).toString(16);
                    borderColor = `#${colorR}00${colorB}`;
                }

                if (index === action.to) {
                    const color256 = Math.floor(255 * progress);
                    const colorR = (255 - color256).toString(16);
                    const colorB = color256.toString(16);
                    borderColor = `#${colorR}00${colorB}`;
                    dx *= (-1);
                    dy *= (-1);
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
