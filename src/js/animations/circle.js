import BaseAnimation from "./base";

const nameOfAnimationForLeftElement = "animationForLeftElement";
const nameOfAnimationForRightElement = "animationForRightElement";

export default class CircleAnimation extends BaseAnimation {
    get key() {
        return "circle";
    }

    swap({
        width,
        margin,
        leftIndex,
        rightIndex
    }) {
        const template = `@keyframes {NAME} {
            from {
                transform: rotate(0deg)
                        translate(0px)
                        rotate(0deg);
            }
            to {
                transform: rotate(180deg)
                        translate({X}px) 
                        rotate(-180deg);
            }
            0% {
                border-color: black;
            }
        
            50% {
                border-color: {COLOR};
            }
        
            100% {
                border-color: black;
            }
        }
    `;
    
        const x = (rightIndex - leftIndex) * (width + margin * 2);
    
        const animationForLeftElement = this.setAnimationName(template, nameOfAnimationForLeftElement)
            .replace(/\{X\}/g, -x)
            .replace(/\{COLOR\}/g, "red");
    
        const animationForRightElement = this.setAnimationName(template, nameOfAnimationForRightElement)
            .replace(/\{X\}/g, x)
            .replace(/\{COLOR\}/g, "blue");
    
        return animationForLeftElement + animationForRightElement;
    }
}
