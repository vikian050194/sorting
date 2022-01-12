import BaseAnimation from "./base";

export default class TestAnimation extends BaseAnimation {
    get key() {
        return "test";
    }

    swap() {
        return (index, action, progress = 0) => {
            let borderColor = "#000000";
            let bottom = "0px";
            let left = "0px";

            const distance = 80;

            let dx = 0;
            let dy = 0;

            if(progress <= 0.25){
                dy = progress / 0.25;
            }
            
            if(progress > 0.25 && progress <= 0.75){
                dx = (progress - 0.25) / 0.5;
                dy = 1;
            }

            if(progress > 0.75){
                dx = 1;
                dy = 1 - ((progress - 0.75) / 0.25);
            }

            dx *= distance;
            dy *= distance / 2;

            if (index === action.from) {
                const colorR = Math.floor(255 * progress).toString(16);
                const colorB = (255 - Math.floor(255 * progress)).toString(16);
                borderColor = `#${colorR}00${colorB}`;
            }

            if (index === action.to) {
                const colorR = (255 - Math.floor(255 * progress)).toString(16);
                const colorB = Math.floor(255 * progress).toString(16);
                borderColor = `#${colorR}00${colorB}`;
                dx *= (-1);
                dy *= (-1);
            }

            bottom = `${dy}px`;
            left = `${dx}px`;

            return {
                borderColor,
                bottom,
                left
            };
        };
    }
}
