export const makeEaseOut = (timing) => {
    return (timeFraction) => {
        return 1 - timing(1 - timeFraction);
    };
};

export const makeEaseInOut = (timing) => {
    return (timeFraction) => {
        if (timeFraction < .5)
            return timing(2 * timeFraction) / 2;
        else
            return (2 - timing(2 * (1 - timeFraction))) / 2;
    };
};

export * from "./linear";
export * from "./quad";
export * from "./circ";
export * from "./bow";
export * from "./bounce";
export * from "./elastic";
