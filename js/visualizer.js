import {
    nameOfAnimationForLeftElement,
    nameOfAnimationForRightElement,
    type1,
    type2
} from "./animation";
import RandomInt from "random-int";
import BubbleSort from "./bubble-sort";

function setElementAnimation(id, name) {
    ((e) => {
        e.offsetHeight; //it forces browser to calculate (each elements properties) and DOM reflow occurred before required changes in CSS
        e.style.animationName = name;
    })(document.getElementById(`${id}`));
}

function removeElementAnimation(id) {
    document.getElementById(id).style.removeProperty("animation-name");
}

function setElementOrder(id, order) {
    document.getElementById(`${id}`).style.order = order;
}

function insertAnimation(options, leftId, rightId) {
    //it's really interesting problem: without setTimeout nothing works
    //
    setTimeout(() => {
        setElementAnimation(leftId, nameOfAnimationForLeftElement);
        setElementAnimation(rightId, nameOfAnimationForRightElement);

        let animation = document.getElementById("animation");

        if (!animation) {
            animation = document.createElement("style");
            animation.type = "text/css";
            animation.setAttribute("id", "animation");
            document.getElementsByTagName("head")[0].appendChild(animation);
        }

        if (options.animationType === "type1") {
            animation.innerHTML = type1(options);
        } else {
            animation.innerHTML = type2(options);
        }

    }, 0);
}

function getElements(count) {
    const result = [];

    while (result.length !== count) {
        let newElement = RandomInt(1, count);

        if (result.indexOf(newElement) === -1) {
            result.push(newElement);
        }
    }

    return result;
}

export default function SortingVisualizer({
    countOfElements,
    animationType,
    animationDuration: animationDurationInSeconds
}) {
    const elements = getElements(countOfElements);
    const steps = BubbleSort([...elements]);
    let index = 0;

    let content = "";

    for (let i = 0; i < elements.length; i++) {
        content += `<div id="${i}" class="element-container" style="order: ${i};"><div class="element">${elements[i]}</div></div>`;
    }

    document.getElementsByClassName("main-container")[0].innerHTML = `<div class="elements-container">${content}</div>`;

    const firstElement = document.getElementsByClassName("element-container")[0];
    const height = firstElement.clientHeight;
    const width = firstElement.clientWidth;
    const border = firstElement.clientTop;
    const margin = parseInt((firstElement.currentStyle || window.getComputedStyle(firstElement)).marginTop);

    [].forEach.call(document.getElementsByClassName("element-container"), function (e) {
        e.style.animationDuration = animationDurationInSeconds + "s";
    });

    let leftId = null;
    let leftIndex = null;
    let rightId = null;
    let rightIndex = null;
    let countOfFinishedAnimations = 2;

    let tick = (e) => {
        if (e) {
            countOfFinishedAnimations++;

            if (e.target.id === leftId) {
                setElementOrder(leftId, rightIndex);
            }

            if (e.target.id === rightId) {
                setElementOrder(rightId, leftIndex);
            }

            if (index === steps.length) {
                return;
            }
        }

        if (countOfFinishedAnimations === 2) {
            countOfFinishedAnimations = 0;

            [leftIndex, rightIndex] = steps[index++];

            if (leftId && rightId) {
                removeElementAnimation(leftId);
                removeElementAnimation(rightId);
            }

            leftId = document.querySelector(`[style*="order: ${leftIndex}"]`).getAttribute("id");
            rightId = document.querySelector(`[style*="order: ${rightIndex}"]`).getAttribute("id");

            insertAnimation({
                leftIndex,
                rightIndex,
                height,
                width,
                margin,
                border,
                animationType
            }, leftId, rightId);
        }
    };

    document.getElementsByClassName("elements-container")[0].addEventListener("animationend", tick, false);

    tick();
}