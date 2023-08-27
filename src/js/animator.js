import { Builder, replace, convert } from "fandom";

class Animator {
    constructor({
        $container,
        animations,
        functions,
        functionName,
        animationType,
        animationDuration
    }) {
        this.$container = $container;
        this.animations = animations;
        this.functions = functions;
        this.functionName = functionName;
        this.animationType = animationType;
        this.animationDuration = animationDuration;
        this.next = true;
    }

    setAnimationDuration(value) {
        this.animationDuration = value * 1000;
    }

    setAnimationType(value) {
        this.animationType = value;
    }

    setTimeFunction(value) {
        this.functionName = value;
    }

    preview({ elements }) {
        const builder = new Builder();

        for (let i = 0; i < elements.length; i++) {
            builder.div({ id: elements[i], class: "element-container", style: `order: ${i}` }).div({ class: "element" }).text(elements[i]).close().close();
        }

        const models = builder.done();
        const domElements = convert(models);

        replace(this.$container, domElements);
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
        const animationFunc = this.animation[action.key]();
        const timeFunc = this.functions[this.functionName];
        const elements = action.index.map(i => {
            return {
                element: document.querySelector(`[style*="order: ${i}"]`),
                index: i
            };
        });

        await this.startAnimation({
            duration: animationDuration,
            timing: timeFunc,
            draw(progress) {
                for (const { element, index } of elements) {
                    const styles = animationFunc(index, action, progress);
                    for (const key in styles) {
                        element.style[key] = styles[key];
                    }
                }
            }
        });
    }

    async start({ actions }) {
        this.next = true;
        this.animation = this.animations[this.animationType];
        for (const action of actions) {
            if (this.next) {
                await this.applyAction(action);
            } else {
                break;
            }
        }
    }

    async stop() {
        this.next = false;
    }
}

export default Animator;
