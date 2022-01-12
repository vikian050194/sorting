export const elastic = (x, timeFraction) => {
    return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction);
};

//x = 1.5;