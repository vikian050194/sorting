import BubbleSort from "./bubble-sort";
import RandomInt from "random-int";

$(document).ready(function () {
    let countOfElements = 5;
    let content = "";
    let animationDurationInSeconds = 5;
    let firstId = null;
    let secondId = null;
    const height = 100;
    const nameOfAnimationForLeftElement = "animationForLeftElement";
    const nameOfAnimationForRightElement = "animationForRightElement";
    const animationForLeftElement = `@keyframes {NAME} {
    0% {
        border-color: black;
        left: 0px;
        top: 0px;
    }

    20% {
        border-color: orangered;
        left: 0px;
        top: 0px;
    }

    40% {
        border-color: gold;
        left: 0px;
        top: {Y}px;
    }

    60% {
        border-color: deepskyblue;
        left: {X}px;
        top: {Y}px;
    }

    80% {
        border-color: yellowgreen;
        left: {X}px;
        top: 0px;
    }

    100% {
        border-color: black;
        left: {X}px;
        top: 0px;
    }
}`;

    for (let i = 0; i < countOfElements; i++) {
        content += `<h2 id="${i}" class="element" style="order:${i};">${RandomInt(1, 99)}</h2>`;
    }

    $(".elements-container").html(content);
    $(".element").each(function (i, e) {
        $(this).click(() => {
            const currentId = $(this).attr("id");
            console.log(currentId);

            if (!firstId) {
                firstId = currentId;
            } else {
                secondId = currentId;

                let style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = animationForLeftElement.replace("{NAME}", nameOfAnimationForLeftElement);
                style.innerHTML = style.innerHTML.replace(/\{X\}/g, "240");
                style.innerHTML = style.innerHTML.replace(/\{Y\}/g, height);
                document.getElementsByTagName('head')[0].appendChild(style);

                style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = animationForLeftElement.replace("{NAME}", nameOfAnimationForRightElement);
                style.innerHTML = style.innerHTML.replace(/\{X\}/g, "-240");
                style.innerHTML = style.innerHTML.replace(/\{Y\}/g, -height);
                document.getElementsByTagName('head')[0].appendChild(style);

                $(`#${firstId}`).css("animation-name", nameOfAnimationForLeftElement);
                $(`#${secondId}`).css("animation-name", nameOfAnimationForRightElement);

                setTimeout(() => {
                    $(`#${firstId}`).css("order", secondId);
                    $(`#${secondId}`).css("order", firstId);

                    $(`#${firstId}`).css("animation-name", "none");
                    $(`#${secondId}`).css("animation-name", "none");

                    firstId = null;
                    secondId = null;
                }, animationDurationInSeconds * 1000);
            }
        });
    });
});