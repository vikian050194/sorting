import assert from "assert";
import { BubbleSort } from "../../src/js/algorithms";

const bubble = new BubbleSort();

describe("Sorting: bubble", function () {
    it("No elements", function () {
        const testData = [];
        const { actions } = bubble.sort(testData);
        const expected = [];

        assert.deepEqual(actions, expected);
    });

    it("Two elements in proper order", function () {
        const testData = [1, 2];
        const { actions } = bubble.sort(testData);
        const expected = [];

        assert.deepEqual(actions, expected);
    });

    it("Two elements in reverse order", function () {
        const testData = [2, 1];
        const { actions } = bubble.sort(testData);
        const expected = [[0, 1]];

        assert.deepEqual(actions, expected);
    });

    it("Two elements in reverse order2", function () {
        const testData = [2, 1, 3];
        const { actions } = bubble.sort(testData);
        const expected = [[0, 1]];

        assert.deepEqual(actions, expected);
    });

    it("Two elements in reverse order3", function () {
        const testData = [3, 1, 2];
        const { actions } = bubble.sort(testData);
        const expected = [[0, 1], [1, 2]];

        assert.deepEqual(actions, expected);
    });
});
