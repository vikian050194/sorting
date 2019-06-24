import assert from "assert";
import BubbleSort from "../bubble-sort";

describe("Sorting: bubble", function () {
    it("No elements", function () {
        let testData = [];
        let actual = BubbleSort(testData);
        let expected = [];

        assert.deepEqual(actual, expected);
    });

    it("Two elements in proper order", function () {
        let testData = [1, 2];
        let actual = BubbleSort(testData);
        let expected = [];

        assert.deepEqual(actual, expected);
    });

    it("Two elements in reverse order", function () {
        let testData = [2, 1];
        let actual = BubbleSort(testData);
        let expected = [[0, 1]];

        assert.deepEqual(actual, expected);
    });

    it("Two elements in reverse order2", function () {
        let testData = [2, 1, 3];
        let actual = BubbleSort(testData);
        let expected = [[0, 1]];

        assert.deepEqual(actual, expected);
    });

    it("Two elements in reverse order3", function () {
        let testData = [3, 1, 2];
        let actual = BubbleSort(testData);
        let expected = [[0, 1], [1, 2]];

        assert.deepEqual(actual, expected);
    });
});