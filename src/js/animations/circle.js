import BaseAnimation from "./base";

export default class CircleAnimation extends BaseAnimation {
    get key() {
        return "circle";
    }

    swap() {
        return (index, action, progress = 0) => {
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
                dx *= (action.to - action.from);
                dx += distance * (action.to - action.from) / 2;
                dy *= distance / 2;
                dy *= (action.to - action.from);

                if (index === action.to) {
                    dx *= (-1);
                    dy *= (-1);
                }
            }

            bottom = `${dy.toFixed(2)}px`;
            left = `${dx.toFixed(2)}px`;

            return {
                order,
                bottom,
                left
            };
        };
    }
}
