import Visualizer from "./visualizer";

window.addEventListener("load", function () {
    document.getElementById("start").addEventListener("click", () => {
        const countOfElements = parseInt(document.getElementById("count").value || "10");
        const animationDuration = parseInt(document.getElementById("duration").value || "1");
        const animationTypes = document.getElementById("type");
        const animationType = animationTypes.options[animationTypes.selectedIndex].value;
        Visualizer({
            animationDuration,
            countOfElements,
            animationType
        });
    });

    document.getElementById("stop").addEventListener("click", () => {
        document.getElementsByClassName("main-container")[0].innerHTML = "";
    });
});