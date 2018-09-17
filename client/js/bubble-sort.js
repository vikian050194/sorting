let swap = function (e, i, j) {
    let temp = e[i];
    e[i] = e[j];
    e[j] = temp;
}

function BubbleSort(elements) {
    let length = elements.length;
    let steps = [];

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i; j++) {
            if (elements[j] > elements[j + 1]) {
                steps.push([j, j + 1]);
                swap(elements, j, j + 1);
            }
        }
    }

    return steps;
};

export default BubbleSort;