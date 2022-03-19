import { Couturier, replace, convert } from "fandom";
import * as functions from "./functions";

class Visualizer {
    constructor({
        animations,
        animationType,
        animationDuration
    }) {
        this.animations = animations;
        this.animationType = animationType;
        this.animationDuration = animationDuration;
    }

    setAnimationDuration(value) {
        this.animationDuration = value * 1000;
    }

    setAnimationType(value) {
        this.animationType = value;
    }

    preview({ elements }) {
        const couturier = new Couturier();

        for (let i = 0; i < elements.length; i++) {
            couturier.div({ id: elements[i], class: "element-container", style: `order: ${i}` }).div({ class: "element" }).text(elements[i]).close().close();
        }

        const container = document.querySelector("#elements");

        const models = couturier.done();
        const domElements = convert(models);

        replace(container, domElements);
    }

    startAnimation = ({ timing, draw, duration }) => {
        let start = performance.now();
        let finish = false;
        // console.info({ start });

        return new Promise((resolve) =>
            requestAnimationFrame(function animate(now) {
                // const time = performance.now();
                const delta = now - start;
                let timeFraction = delta / duration;

                if (timeFraction < 0) {
                    timeFraction = 0;
                }

                if (timeFraction >= 1) {
                    timeFraction = 1;
                    finish = true;
                }

                // console.info({ timeFraction });
                const progress = timing(timeFraction);

                draw(progress);

                if (finish) {
                    resolve();
                } else {
                    requestAnimationFrame(animate);
                }
            })
        );
    };

    async applyAction(action) {
        const { animationDuration } = this;
        const func = this.animation[action.key]();
        const elements = action.index.map(i => {
            return {
                element: document.querySelector(`[style*="order: ${i}"]`),
                index: i
            };
        });

        await this.startAnimation({
            duration: animationDuration,
            timing: functions.linear,
            draw(progress) {
                for (const { element, index } of elements) {
                    const styles = func(index, action, progress);
                    for (const key in styles) {
                        element.style[key] = styles[key];
                    }
                }
            }
        });
    }

    async start({ actions }) {
        this.animation = this.animations[this.animationType];
        for (const action of actions) {
            await this.applyAction(action);
        }
    }
}

export default Visualizer;
