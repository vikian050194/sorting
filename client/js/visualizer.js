import AnimationTemplate from "./animation";
import RandomInt from "random-int";
import BubbleSort from "./bubble-sort";

function setElementAnimation(id, name) {
    document.getElementById(`${id}`).style.animationName = name;
}

function setElementOrder(id, order) {
    document.getElementById(`${id}`).style.order = order;
}

function insertAnimation(id, name, x, y) {
    let style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = AnimationTemplate.replace("{NAME}", name);
    style.innerHTML = style.innerHTML.replace(/\{X\}/g, x);
    style.innerHTML = style.innerHTML.replace(/\{Y\}/g, y);

    document.getElementsByTagName("head")[0].appendChild(style);

    setElementAnimation(id, name);
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
    const animationDurationInSeconds = 1;
    const defaultAnimation = "none";
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
    let rightId = null;

    let tick = function () {
        if (index === steps.length) {
            clearInterval(id);
            return;
        }

        const [leftIndex, rightIndex] = steps[index++];

        leftId = document.querySelector(`[style*="order: ${leftIndex}"]`).getAttribute("id");
        rightId = document.querySelector(`[style*="order: ${rightIndex}"]`).getAttribute("id");

        const x = (rightIndex - leftIndex) * (width + margin * 2 + border * 2);
        const y = height + margin * 2 + border * 2;
        insertAnimation(leftId, nameOfAnimationForLeftElement, x, y);
        insertAnimation(rightId, nameOfAnimationForRightElement, -x, -y);

        setTimeout(() => {
            setElementOrder(leftId, rightIndex);
            setElementOrder(rightId, leftIndex);
            setElementAnimation(leftId, defaultAnimation);
            setElementAnimation(rightId, defaultAnimation);
        }, animationDurationInSeconds * 1000);
    };

    tick();
    let id = setInterval(tick, animationDurationInSeconds * 1000 + 100);
}