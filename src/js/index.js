import "regenerator-runtime/runtime";
import { Couturier, convert, insert, replace } from "fandom";
import RandomInt from "random-int";
import Visualizer from "./visualizer";
import {
    TestSort,
    BubbleSort
} from "./algorithms";
import {
    TestAnimation,
    SquareAnimation,
    CircleAnimation
} from "./animations";

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
    const couturier = new Couturier();

    const $root = document.getElementById("root");

    const $main = convert(couturier.div({ id: "main", class: "main-container" }).close().done())[0];

    const $options = convert(couturier.div({ id: "options", class: "options-container" }).close().done())[0];
    const $elements = convert(couturier.div({ id: "elements", class: "elements-container" }).close().done())[0];

    insert($main, [
        $options,
        $elements
    ]);

    insert($root, [
        $main
    ]);

    let sortType = "bubble";
    let animationType = "square";
    let animationDuration = 1;
    let elementsCount = 7;
    let elements = getElements(elementsCount);

    const ss = {};
    const sorts = [
        TestSort,
        BubbleSort
    ];

    for (const sort of sorts) {
        const si = new sort();
        ss[si.key] = si;
    }

    const aa = {};
    const animations = [
        TestAnimation,
        SquareAnimation,
        CircleAnimation
    ];

    for (const animation of animations) {
        const ai = new animation();
        aa[ai.key] = ai;
    }

    const visualizer = new Visualizer({ animationType, animationDuration, animations: aa });
    visualizer.preview({ elements });

    const $sortType = convert(couturier.div({ id: "sort-type" }).close().done())[0];

    const renderSortType = () => {
        for (const key in ss) {
            const selected = key == sortType ? "option selected" : "option";
            couturier.div({ class: selected }).text(key).onClick(() => { sortType = key; renderSortType(); }).close();
        }

        replace($sortType, convert(couturier.done()));
    };

    renderSortType();

    const $animationType = convert(couturier.div({ id: "animation-type" }).close().done())[0];

    const renderAnimationType = () => {
        for (const key in aa) {
            const selected = key == animationType ? "option selected" : "option";
            couturier.div({ class: selected }).text(key).onClick(() => { animationType = key; renderAnimationType(); }).close();
        }

        replace($animationType, convert(couturier.done()));
    };

    renderAnimationType();

    const $elementsCount = convert(couturier.div().input({ value: elementsCount, type: "number", min: 5, max: 21 }).onChange(({ target }) => {
        elementsCount = parseInt(target.value);
        elements = getElements(elementsCount);
        visualizer.preview({ elements });
    }).close().done())[0];

    const $animationDuration = convert(couturier.div().input({ value: animationDuration, type: "number", min: 1, max: 60 }).onChange(({ target }) => {
        animationDuration = parseInt(target.value);
    }).close().done())[0];

    couturier.div({ id: "actions" });
    couturier.button().text("Shuffle").onClick(() => {
        elements = getElements(elementsCount);
        visualizer.preview({ elements });
    }).close();
    couturier.button().text("Start").onClick(() => {
        const instruction = ss[sortType].sort(elements);
        visualizer.setAnimationType(animationType);
        visualizer.setAnimationDuration(animationDuration);
        visualizer.start(instruction);
    }).close();
    couturier.button().text("Stop").onClick(visualizer.stop).close();
    couturier.close();
    const $actions = convert(couturier.done())[0];

    insert($options, [
        $sortType,
        $animationType,
        $elementsCount,
        $animationDuration,
        $actions
    ]);

    visualizer.setAnimationType(animationType);
    visualizer.setAnimationDuration(animationDuration);
});