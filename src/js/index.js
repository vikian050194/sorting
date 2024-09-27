import { Builder, convert, insert, replace } from "fandom";
import RandomInt from "random-int";
import Animator from "./animator";
import {
    BubbleSort,
    GnomeSort,
    SelectionSort
} from "./algorithms";
import {
    SquareAnimation,
    CircleAnimation
} from "./animations";
import {
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
        BubbleSort,
        GnomeSort,
        SelectionSort
    ];

    for (const sort of sorts) {
        const si = new sort();
        ss[si.key] = si;
    }

    const aa = {};
    const animations = [
        SquareAnimation,
        CircleAnimation
    ];

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

    for (const f of functions) {
        const fi = new f();
        tf[fi.key] = fi.calculate;
    }

    const animator = new Animator({
        animationType,
        functionName: timeFunction,
        animationDuration,
        animations: aa,
        functions: tf
    });
    animator.preview({ elements });

    const $timeType = convert(builder.div({ id: "time-type" }).close().done())[0];

    const renderTimeType = () => {
        for (const key in tf) {
            const onClick = () => {
                timeFunction = key;
                renderTimeType();
            };

            builder.div();
            const inputProps = { type: "radio", id: key, class: "option", value: key, name: "time" };

            if (key == timeFunction) {
                inputProps["checked"] = true;
            }

            builder.input(inputProps).onClick(onClick);
            builder.open("label", { for: key }).text(key).close();
            builder.close();

        }

        replace($timeType, convert(builder.done()));
    };

    renderTimeType();

    const $sortType = convert(builder.div({ id: "sort-type" }).close().done())[0];

    const renderSortType = () => {
        for (const key in ss) {
            const onClick = () => {
                sortType = key;
                renderSortType();
            };

            builder.div();
            const inputProps = { type: "radio", id: key, class: "option", value: key, name: "sorting" };

            if (key == sortType) {
                inputProps["checked"] = true;
            }

            builder.input(inputProps).onClick(onClick);
            builder.open("label", { for: key }).text(key).close();
            builder.close();
        }

        replace($sortType, convert(builder.done()));
    };

    renderSortType();

    const $animationType = convert(builder.div({ id: "animation-type" }).close().done())[0];

    const renderAnimationType = () => {
        for (const key in aa) {
            const onClick = () => {
                animationType = key;
                renderAnimationType();
            };

            builder.div();
            const inputProps = { type: "radio", id: key, class: "option", value: key, name: "animation" };

            if (key == animationType) {
                inputProps["checked"] = true;
            }

            builder.input(inputProps).onClick(onClick);
            builder.open("label", { for: key }).text(key).close();
            builder.close();
        }

        replace($animationType, convert(builder.done()));
    };

    renderAnimationType();

    const countOptions = [5, 8, 13, 21];

    const $elementsCount = convert(builder.div({ id: "elements-count" }).close().done())[0];

    const renderElementsCount = () => {
        for (const key of countOptions) {
            const onClick = () => {
                elementsCount = parseInt(key);
                elements = getElements(elementsCount);
                animator.preview({ elements });
                renderElementsCount();
            };

            builder.div();
            const id = `count-${key}`;
            const inputProps = { type: "radio", id, class: "option", value: key, name: "count" };

            if (key == elementsCount) {
                inputProps["checked"] = true;
            }

            builder.input(inputProps).onClick(onClick);
            builder.open("label", { for: id }).text(key).close();
            builder.close();
        }

        replace($elementsCount, convert(builder.done()));
    };

    renderElementsCount();

    const $animationDuration = convert(builder.div({ id: "animation-type" }).close().done())[0];

    const durationOptions = [1, 2, 3, 5, 8];

    const renderAnimationDuration = () => {
        for (const key of durationOptions) {
            const onClick = () => {
                animationDuration = parseInt(key);
                renderAnimationDuration();
            };

            builder.div();
            const id = `duration-${key}`;
            const inputProps = { type: "radio", id, class: "option", value: key, name: "duration" };

            if (key == animationDuration) {
                inputProps["checked"] = true;
            }

            builder.input(inputProps).onClick(onClick);
            builder.open("label", { for: id }).text(key).close();
            builder.close();
        }

        replace($animationDuration, convert(builder.done()));
    };

    renderAnimationDuration();

    builder.button({ class: "action" }).text("shuffle").onClick(() => {
        elements = getElements(elementsCount);
        animator.preview({ elements });
    }).close();

    builder.button({ class: "action" }).text("start").onClick(() => {
        const instructions = ss[sortType].sort(elements);
        animator.setAnimationType(animationType);
        animator.setAnimationDuration(animationDuration);
        animator.setTimeFunction(timeFunction);
        animator.start(instructions);
    }).close();

    builder.button({ class: "action" }).text("stop").onClick(() => animator.stop()).close();

    insert($actions, convert(builder.done()));

    insert($options, [
        $timeType,
        $sortType,
        $animationType,
        $elementsCount,
        $animationDuration
    ]);

    animator.setAnimationType(animationType);
    animator.setAnimationDuration(animationDuration);
});