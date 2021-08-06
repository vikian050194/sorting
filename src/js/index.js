import RandomInt from "random-int";
import Visualizer, { defaultValues } from "./visualizer";
import {
    TestSort,
    BubbleSort
} from "./algorithms";

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

document.addEventListener("DOMContentLoaded", function () {
    let { animationType, animationDuration } = defaultValues;
    let elementsCount = 7;
    let elements = getElements(elementsCount);

    const ss = { };
    const sorts = [
        TestSort,
        BubbleSort
    ];

    for (const sort of sorts) {
        const si = new sort();
        ss[si.key] = si;
    }

    let sortType = "test";

    const $sortType = document.querySelector("#sort-type");

    const sortOptions = Object.keys(ss).map(value => {
        const element = document.createElement("option");
        element.setAttribute("value", value);
        const content = document.createTextNode(value);
        element.appendChild(content);
        return element;
    });

    $sortType.append(...sortOptions);

    const $sortOption = [...$sortType.options].find(({ value }) => value === sortType);
    const sortOptionIndex = [...$sortType.options].indexOf($sortOption);
    $sortType.options.selectedIndex = sortOptionIndex;
    $sortType.addEventListener("change", ({ target }) => {
        sortType = target.selectedOptions[0].value;
    });

    const $elementsCount = document.querySelector("#count");
    $elementsCount.value = elementsCount;
    $elementsCount.addEventListener("change", ({ target }) => {
        elementsCount = parseInt(target.value);
        elements = getElements(elementsCount);
        visualizer.preview({ elements });
    });

    const $animationType = document.querySelector("#animation-type");
    const $animationOption = [...$animationType.options].find(({ value }) => value === animationType);
    const animationOptionIndex = [...$animationType.options].indexOf($animationOption);
    $animationType.options.selectedIndex = animationOptionIndex;
    $animationType.addEventListener("change", ({ target }) => {
        animationType = target.selectedOptions[0].value;
    });

    const $animationDuration = document.getElementById("duration");
    $animationDuration.value = animationDuration;
    $animationDuration.addEventListener("change", ({ target }) => {
        animationDuration = parseInt(target.value);
    });

    const visualizer = new Visualizer({ animationType, animationDuration });
    visualizer.preview({ elements });

    document.getElementById("shuffle").addEventListener("click", () => {
        elements = getElements(elementsCount);
        visualizer.preview({ elements });
    });
    document.getElementById("start").addEventListener("click", () => {
        const instruction = ss[sortType].sort(elements);
        visualizer.start(instruction);
    });
    document.getElementById("stop").addEventListener("click", visualizer.stop);
});