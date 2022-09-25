import { Builder, convert, insert, replace } from "fandom";
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
import {
    TestTimeFunction,
    LinearTimeFunction,
    QuadTimeFunction,
    BounceTimeFunction,
    CircleTimeFunction,
    BowTimeFunction,
    ElasticTimeFunction
} from "./functions";

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
    const isTest = false;

    const builder = new Builder();

    const $options = document.getElementById("options");
    const $actions = document.getElementById("actions");

    let sortType = "bubble";
    let animationType = "square";
    let timeFunction = "linear";
    let animationDuration = 1;
    let elementsCount = 8;
    let elements = getElements(elementsCount);

    const ss = {};
    const sorts = [
        BubbleSort
    ];
    if (isTest) {
        sorts.splice(0, 0, TestSort);
    }

    for (const sort of sorts) {
        const si = new sort();
        ss[si.key] = si;
    }

    const aa = {};
    const animations = [
        SquareAnimation,
        CircleAnimation
    ];
    if (isTest) {
        animations.splice(0, 0, TestAnimation);
    }

    for (const animation of animations) {
        const ai = new animation();
        aa[ai.key] = ai;
    }

    const tf = {};
    const functions = [
        LinearTimeFunction,
        QuadTimeFunction,
        BounceTimeFunction,
        CircleTimeFunction,
        BowTimeFunction,
        ElasticTimeFunction
    ];
    if (isTest) {
        functions.splice(0, 0, TestTimeFunction);
    }

    for (const f of functions) {
        const fi = new f();
        tf[fi.key] = fi.calculate;
    }

    const visualizer = new Visualizer({
        animationType,
        functionName: timeFunction,
        animationDuration,
        animations: aa,
        functions: tf
    });
    visualizer.preview({ elements });

    const $timeType = convert(builder.div({ id: "time-type" }).close().done())[0];

    const renderTimeType = () => {
        for (const key in tf) {
            const selected = key == timeFunction ? "option selected" : "option";
            builder.div({ class: selected }).text(key).onClick(() => { timeFunction = key; renderTimeType(); }).close();
        }

        replace($timeType, convert(builder.done()));
    };

    renderTimeType();

    const $sortType = convert(builder.div({ id: "sort-type" }).close().done())[0];

    const renderSortType = () => {
        for (const key in ss) {
            const selected = key == sortType ? "option selected" : "option";
            builder.div({ class: selected }).text(key).onClick(() => { sortType = key; renderSortType(); }).close();
        }

        replace($sortType, convert(builder.done()));
    };

    renderSortType();

    const $animationType = convert(builder.div({ id: "animation-type" }).close().done())[0];

    const renderAnimationType = () => {
        for (const key in aa) {
            const selected = key == animationType ? "option selected" : "option";
            builder.div({ class: selected }).text(key).onClick(() => { animationType = key; renderAnimationType(); }).close();
        }

        replace($animationType, convert(builder.done()));
    };

    renderAnimationType();

    const $elementsCount = convert(builder.div({ id: "elements-count" }).close().done())[0];

    const countOptions = [5, 8, 13, 21];

    const renderElementsCount = () => {
        for (const key of countOptions) {
            const selected = key == elementsCount ? "option selected" : "option";
            builder.div({ class: selected }).text(key).onClick(() => {
                elementsCount = parseInt(key);
                elements = getElements(elementsCount);
                visualizer.preview({ elements });
                renderElementsCount();
            }).close();
        }

        replace($elementsCount, convert(builder.done()));
    };

    renderElementsCount();

    const $animationDuration = convert(builder.div({ id: "animation-type" }).close().done())[0];

    const durationOptions = [1, 2, 3, 5, 8];

    const renderAnimationDuration = () => {
        for (const key of durationOptions) {
            const selected = key == animationDuration ? "option selected" : "option";
            builder.div({ class: selected }).text(key).onClick(() => { animationDuration = parseInt(key); renderAnimationDuration(); }).close();
        }

        replace($animationDuration, convert(builder.done()));
    };

    renderAnimationDuration();

    builder.button().text("shuffle").onClick(() => {
        elements = getElements(elementsCount);
        visualizer.preview({ elements });
    }).close();
    builder.button().text("start").onClick(() => {
        const instruction = ss[sortType].sort(elements);
        visualizer.setAnimationType(animationType);
        visualizer.setAnimationDuration(animationDuration);
        visualizer.setTimeFunction(timeFunction);
        visualizer.start(instruction);
    }).close();
    builder.button({ "disabled": true }).text("stop").onClick(visualizer.stop).close();
    insert($actions, convert(builder.done()));

    insert($options, [
        $timeType,
        $sortType,
        $animationType,
        $elementsCount,
        $animationDuration
    ]);

    visualizer.setAnimationType(animationType);
    visualizer.setAnimationDuration(animationDuration);
});