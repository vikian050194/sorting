import {
    TestAnimation
    // SquareAnimation,
    // CircleAnimation
} from "./animations";

// function setElementOrder(id, order) {
//     document.getElementById(`${id}`).style.order = order;
// }

export const defaultValues = {
    animationType: "test",
    animationDuration: 1000
};

class SortingVisualizer {
    constructor({
        animationType,
        animationDuration
    }) {
        this.animationType = animationType;
        this.animationDuration = animationDuration;

    }

    preview({ elements }) {
        let content = "";

        for (let i = 0; i < elements.length; i++) {
            content += `<div id="${i}" class="element-container" style="order: ${i};"><div class="element">${elements[i]}</div></div>`;
        }

        document.querySelector("#elements").innerHTML = content;
    }

    applySelect(action) {
        document.querySelector(`[style*="order: ${action.index}"]`);
    }

    applyAction(action) {
        switch (action.key) {
            case "select":
                return this.applySelect(action);
            case "swap":
                return this.applySwap(action);
            default:
                break;
        }
    }

    start({ actions }) {
        const linear = (timeFraction) => {
            return timeFraction;
        };

        // function quad(timeFraction) {
        //     return Math.pow(timeFraction, 2);
        // }

        const element = document.getElementById("3");

        const startAnimation = ({ timing, draw, duration }) => {

            let start = performance.now();
            console.info({ start });

            requestAnimationFrame(function animate(time) {
                // 
                // const time = performance.now();
                // console.info({ time });
                const delta = time - start;
                console.info({ delta });
                let timeFraction = delta / duration;
                if (timeFraction < 0) {
                    timeFraction = 0;
                }
                if (timeFraction > 1) {
                    timeFraction = 1;
                }

                const progress = timing(timeFraction);

                draw(progress);

                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }

            });
        };

        const dummy = new TestAnimation();
        const calc = dummy.move();

        startAnimation({
            duration: 5000,
            timing: linear,
            draw(progress) {
                const result = calc(progress);
                console.info(result);
                element.style.bottom = result.bottom;
            }
        });

        for (const action of actions) {
            this.applyAction(action);
        }

        // const firstElement = document.getElementsByClassName("element-container")[0];
        // const height = firstElement.clientHeight;
        // const width = firstElement.clientWidth;
        // const border = firstElement.clientTop;
        // const margin = parseInt((firstElement.currentStyle || window.getComputedStyle(firstElement)).marginTop);

        // [].forEach.call(document.getElementsByClassName("element-container"), function (e) {
        //     e.style.animationDuration = this.animationDuration + "ms";
        // }, this);

        // let leftId = null;
        // let leftIndex = null;
        // let rightId = null;
        // let rightIndex = null;
        // let countOfFinishedAnimations = 2;

        // let tick = (e) => {
        //     if (e) {
        //         countOfFinishedAnimations++;

        //         if (e.target.id === leftId) {
        //             setElementOrder(leftId, rightIndex);
        //         }

        //         if (e.target.id === rightId) {
        //             setElementOrder(rightId, leftIndex);
        //         }

        //         if (index === actions.length) {
        //             return;
        //         }
        //     }

        //     if (countOfFinishedAnimations === 2) {
        //         countOfFinishedAnimations = 0;

        //         if (leftId && rightId) {
        //             removeElementAnimation(leftId);
        //             removeElementAnimation(rightId);
        //         }

        //         leftId = document.querySelector(`[style*="order: ${leftIndex}"]`).getAttribute("id");
        //         rightId = document.querySelector(`[style*="order: ${rightIndex}"]`).getAttribute("id");

        //         insertAnimation({
        //             leftIndex,
        //             rightIndex,
        //             height,
        //             width,
        //             margin,
        //             border,
        //             animationType: this.animationType,
        //             animationDuration: this.animationDuration
        //         }, leftId, rightId);
        //     }
        // };
    }
}

export default SortingVisualizer;
