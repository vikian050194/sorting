export const makeEaseInOut = (timing) => {
    return (timeFraction) => {
        if (timeFraction < .5) {
            return timing(2 * timeFraction) / 2;

        } else {
            return (2 - timing(2 * (1 - timeFraction))) / 2;
        }
    };
};

export const makeEaseOut = (timing) => {
    return (timeFraction) => {
        return 1 - timing(1 - timeFraction);
    };
};

export default class BaseTimeFunction {
    get key() {
        throw new Error("not implemented");
    }

    calculate() {
        throw new Error("not implemented");
    }
}
