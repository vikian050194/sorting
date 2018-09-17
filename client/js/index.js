import BubbleSort from "./bubble-sort";
import RandomInt from "random-int";

$(document).ready(function () {
    let countOfElements = 5;
    let content = "";
    let animationDuration = 3000;
    let firstId = null;
    let secondId = null;
    const nameOfAnimetionForLeftElement = "animetionForLeftElement";
    const nameOfAnimetionForRightElement = "animetionForRightElement";
    const animationForLeftElement = `@keyframes {NAME} {
    0% {
        border-color: orangered;
        left: 0px;
        top: 0px;
    }

    33% {
        border-color: gold;
        left: 0px;
        top: {Y}px;
    }

    66% {
        border-color: deepskyblue;
        left: {X}px;
        top: {Y}px;
    }

    100% {
        border-color: yellowgreen;
        left: {X}px;
        top: 0px;
    }
}`;

    for (let i = 0; i < countOfElements; i++) {
        content += `<div id="${i}" class="element" style="order:${i};">${RandomInt(1, 99)}</div>`;
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
                style.innerHTML = animationForLeftElement.replace("{NAME}", nameOfAnimetionForLeftElement);
                style.innerHTML = style.innerHTML.replace(/\{X\}/g, "240");
                style.innerHTML = style.innerHTML.replace(/\{Y\}/g, "200");
                document.getElementsByTagName('head')[0].appendChild(style);

                style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = animationForLeftElement.replace("{NAME}", nameOfAnimetionForRightElement);
                style.innerHTML = style.innerHTML.replace(/\{X\}/g, "-240");
                style.innerHTML = style.innerHTML.replace(/\{Y\}/g, "-200");
                document.getElementsByTagName('head')[0].appendChild(style);

                $(`#${firstId}`).css("animation-name", nameOfAnimetionForLeftElement);
                $(`#${secondId}`).css("animation-name", nameOfAnimetionForRightElement);

                setTimeout(() => {
                    $(`#${firstId}`).css("order", secondId);
                    $(`#${secondId}`).css("order", firstId);

                    $(`#${firstId}`).css("animation-name", "none");
                    $(`#${secondId}`).css("animation-name", "none");

                    firstId = null;
                    secondId = null;
                }, animationDuration);
            }
        });
    });
});