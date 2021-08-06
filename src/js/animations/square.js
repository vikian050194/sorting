import BaseAnimation from "./base";

const nameOfAnimationForLeftElement = "animationForLeftElement";
const nameOfAnimationForRightElement = "animationForRightElement";

export default class SquareAnimation extends BaseAnimation {
    get key() {
        return "square";
    }

    swap({
        height,
        width,
        margin,
        leftIndex,
        rightIndex
    }) {
        let template = `@keyframes {NAME} {
            0% {
                border-color: black;
                left: 0px;
                top: 0px;
            }
        
            20% {
                left: 0px;
                top: 0px;
            }
        
            40% {
                left: 0px;
                top: {Y}px;
            }
    
            50% {
                border-color: {COLOR};
            }
    
            60% {
                left: {X}px;
                top: {Y}px;
            }
        
            80% {
                left: {X}px;
                top: 0px;
            }
        
            100% {
                border-color: black;
                left: {X}px;
                top: 0px;
            }
        }
    `;

        const x = (rightIndex - leftIndex) * (width + margin * 2);
        const y = height / 2 + margin;

        let animationForLeftElement = this.setAnimationName(template, nameOfAnimationForLeftElement)
            .replace(/\{X\}/g, x)
            .replace(/\{Y\}/g, y)
            .replace(/\{COLOR\}/g, "red");

        let animationForRightElement = this.setAnimationName(template, nameOfAnimationForRightElement)
            .replace(/\{X\}/g, -x)
            .replace(/\{Y\}/g, -y)
            .replace(/\{COLOR\}/g, "blue");

        return animationForLeftElement + animationForRightElement;
    }
}
