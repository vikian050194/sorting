import { TreeBuilder, TreeConverter } from "fandom";
import {
    TestAnimation,
    SquareAnimation,
    CircleAnimation
} from "./animations";

import * as functions from "./functions";

export const defaultValues = {
    animationType: "square",
    animationDuration: 1000
};

class Visualizer {
    constructor({
        animationType,
        animationDuration
    }) {
        this.animationType = animationType;
        this.animationDuration = animationDuration;

        this.tb = new TreeBuilder();
        this.tc = new TreeConverter();
    }

    setAnimationDuration(value) {
        this.animationDuration = value;
    }

    setAnimationType(value) {
        this.animationType = value;
        switch (value) {
            case "square":
                this.animation = new SquareAnimation();
                break;
            case "circle":
                this.animation = new CircleAnimation();
                break;
            case "test":
                this.animation = new TestAnimation();
                break;
            default:
                break;
        }
    }

    preview({ elements }) {
        for (let i = 0; i < elements.length; i++) {
            this.tb.div({ id: elements[i], class: "element-container", style: `order: ${i}` }).div({ class: "element" }).text(elements[i]).close().close();
        }

        const container = document.querySelector("#elements");

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        const tree = this.tb.build();

        const children = this.tc.convert(tree);

        for (const c of children) {
            container.appendChild(c);
        }
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
        for (const action of actions) {
            await this.applyAction(action);
        }
    }
}

export default Visualizer;
