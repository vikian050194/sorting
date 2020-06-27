const nameOfAnimationForLeftElement = "animationForLeftElement";
const nameOfAnimationForRightElement = "animationForRightElement";

const setAnimationName = function (animation, name) {
    return animation.replace("{NAME}", name);
};

const type1 = function ({
    height,
    width,
    margin,
    border,
    leftIndex,
    rightIndex
}) {
    let template = `@keyframes {NAME} {
        0% {
            border-color: black;
            left: 0px;
            top: 0px;
        }
    
        20% {
            left: 0px;
            top: 0px;
        }
    
        40% {
            left: 0px;
            top: {Y}px;
        }

        50% {
            border-color: {COLOR};
        }

        60% {
            left: {X}px;
            top: {Y}px;
        }
    
        80% {
            left: {X}px;
            top: 0px;
        }
    
        100% {
            border-color: black;
            left: {X}px;
            top: 0px;
        }
    }
`;

    const x = (rightIndex - leftIndex) * (width + margin * 2);
    const y = height / 2 + margin;

    let animationForLeftElement = setAnimationName(template, nameOfAnimationForLeftElement)
        .replace(/\{X\}/g, x)
        .replace(/\{Y\}/g, y)
        .replace(/\{COLOR\}/g, "red");

    let animationForRightElement = setAnimationName(template, nameOfAnimationForRightElement)
        .replace(/\{X\}/g, -x)
        .replace(/\{Y\}/g, -y)
        .replace(/\{COLOR\}/g, "blue");

    return animationForLeftElement + animationForRightElement;
};

const type2 = function ({
    width,
    margin,
    border,
    leftIndex,
    rightIndex
}) {
    const template = `@keyframes {NAME} {
        from {
            transform: rotate(0deg)
                    translate(0px)
                    rotate(0deg);
        }
        to {
            transform: rotate(180deg)
                    translate({X}px) 
                    rotate(-180deg);
        }
        0% {
            border-color: black;
        }
    
        50% {
            border-color: {COLOR};
        }
    
        100% {
            border-color: black;
        }
    }
`;

    const x = (rightIndex - leftIndex) * (width + margin * 2);

    const animationForLeftElement = setAnimationName(template, nameOfAnimationForLeftElement)
        .replace(/\{X\}/g, -x)
        .replace(/\{COLOR\}/g, "red");

    const animationForRightElement = setAnimationName(template, nameOfAnimationForRightElement)
        .replace(/\{X\}/g, x)
        .replace(/\{COLOR\}/g, "blue");

    return animationForLeftElement + animationForRightElement;
};

export {
    nameOfAnimationForLeftElement,
    nameOfAnimationForRightElement,
    type1,
    type2
};