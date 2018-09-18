import AnimationTemplate from "./animation";
import RandomInt from "random-int";

function insertAnimation(id, name, x, y) {
    let style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = AnimationTemplate.replace("{NAME}", name);
    style.innerHTML = style.innerHTML.replace(/\{X\}/g, x);
    style.innerHTML = style.innerHTML.replace(/\{Y\}/g, y);
    
    document.getElementsByTagName("head")[0].appendChild(style);

    $(`#${id}`).css("animation-name", name);
}

export default function SortingVisualizer(countOfElements, steps) {
    const animationDurationInSeconds = 5;
    const nameOfAnimationForLeftElement = "animationForLeftElement";
    const nameOfAnimationForRightElement = "animationForRightElement";

    let firstIndex = null;
    let firstId = null;
    let secondIndex = null;
    let secondId = null;
    let content = "";

    for (let i = 0; i < countOfElements; i++) {
        content += `<h2 id="${i}" class="element" style="order:${i};">${RandomInt(1, 99)}</h2>`;
    }

    $(".elements-container").html(content);

    const height = $(".element").height();
    const width = $(".element").width();
    const border = parseInt($(".element").css("border-width"));
    const margin = parseInt($(".element").css("margin-top"));

    $(".element").each(function () {
        $(this).click(() => {
            const currentIndex = $(this).css("order");
            const currentId = $(this).attr("id");

            if (!firstIndex) {
                firstIndex = currentIndex;
                firstId = currentId;
                return;
            } else {
                secondIndex = currentIndex;
                secondId = currentId;

                if(currentIndex === firstIndex){
                    return;
                }

                if(currentIndex < firstIndex){
                    secondIndex = firstIndex;
                    secondId = firstId;

                    firstIndex = currentIndex;
                    firstId = currentId;
                }
            }

            const x = (secondIndex - firstIndex) * (width + margin * 2 + border * 2);
            const y = height + margin * 2 + border * 2;
            insertAnimation(firstId, nameOfAnimationForLeftElement, x, y);
            insertAnimation(secondId, nameOfAnimationForRightElement, -x, -y);

            setTimeout(() => {
                $(`#${firstId}`).css("order", secondIndex);
                $(`#${secondId}`).css("order", firstIndex);

                $(`#${firstId}`).css("animation-name", "none");
                $(`#${secondId}`).css("animation-name", "none");

                firstIndex = null;
                firstId = null;
                secondIndex = null;
                secondId = null;
            }, animationDurationInSeconds * 1000);
        });
    });
}