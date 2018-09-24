import AnimationTemplate from "./animation";
import RandomInt from "random-int";
import BubbleSort from "./bubble-sort";

function setElementAnimation(id, name) {
    document.getElementById(`${id}`).style.animationName = name;
}

function removeElementAnimation(id) {
    document.getElementById(id).style.removeProperty("animation-name");
}

function setElementOrder(id, order) {
    document.getElementById(`${id}`).style.order = order;
}

function insertAnimation(items) {
    //it's really interesting problem, that without timeout nothing works
    setTimeout(() => {
        let style = document.createElement("style");
        let itemAnimation = "";
        style.type = "text/css";

        for (let index = 0; index < items.length; index++) {
            const {
                id,
                name,
                x,
                y
            } = items[index];

            setElementAnimation(id, name);

            itemAnimation = AnimationTemplate.replace("{NAME}", name);
            itemAnimation = itemAnimation.replace(/\{X\}/g, x);
            itemAnimation = itemAnimation.replace(/\{Y\}/g, y);
            style.innerHTML += itemAnimation;
        }

        document.getElementsByTagName("head")[0].appendChild(style);
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

export default function SortingVisualizer(countOfElements) {
    const animationDurationInSeconds = 0.5;
    const nameOfAnimationForLeftElement = "animationForLeftElement";
    const nameOfAnimationForRightElement = "animationForRightElement";

    const elements = getElements(countOfElements);
    const steps = BubbleSort([...elements]);
    let index = 0;

    let content = "";

    for (let i = 0; i < elements.length; i++) {
        content += `<h2 id="${i}" class="element" style="order: ${i};">${elements[i]}</h2>`;
    }

    document.getElementsByClassName("elements-container")[0].innerHTML = content;

    const firstElement = document.getElementsByClassName("element")[0];
    const height = firstElement.clientHeight;
    const width = firstElement.clientWidth;
    const border = firstElement.clientTop;
    const margin = parseInt((firstElement.currentStyle || window.getComputedStyle(firstElement)).marginTop);

    [].forEach.call(document.getElementsByClassName("element"), function (e) {
        e.style.animationDuration = animationDurationInSeconds + "s";
    });

    let leftId = null;
    let leftIndex = null;
    let rightId = null;
    let rightIndex = null;
    let x = null;
    let y = null;
    let countOfFinishedAnimations = 0;

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

        if (countOfFinishedAnimations === 2 || !e) {
            countOfFinishedAnimations = 0;

            [leftIndex, rightIndex] = steps[index++];

            if (leftId && rightId) {
                removeElementAnimation(leftId);
                removeElementAnimation(rightId);
            }

            leftId = document.querySelector(`[style*="order: ${leftIndex}"]`).getAttribute("id");
            rightId = document.querySelector(`[style*="order: ${rightIndex}"]`).getAttribute("id");

            x = (rightIndex - leftIndex) * (width + margin * 2 + border * 2);
            y = height + margin * 2 + border * 2;

            insertAnimation([{
                    id: leftId,
                    name: nameOfAnimationForLeftElement,
                    x: x,
                    y: y
                },
                {
                    id: rightId,
                    name: nameOfAnimationForRightElement,
                    x: -x,
                    y: -y
                }
            ]);
        }
    };

    document.addEventListener("animationend", tick, false);

    tick();
}