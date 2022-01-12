export const bow = (x, timeFraction) => {
    return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
};
