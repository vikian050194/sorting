import assert from "node:assert";
import { SwapAction } from "../../src/js/actions";
import { SelectionSort } from "../../src/js/algorithms";

const selection = new SelectionSort();

describe("Sorting: selection", function () {
    it("No elements", function () {
        const testData = [];
        const actions = selection.sort(testData).actions.filter(a => a.key === "swap");
        const expected = [];

        assert.deepEqual(actions, expected);
    });

    it("Two elements in proper order", function () {
        const testData = [1, 2];
        const actions = selection.sort(testData).actions.filter(a => a.key === "swap");
        const expected = [];

        assert.deepEqual(actions, expected);
    });

    it("Two elements in reverse order", function () {
        const testData = [2, 1];
        const actions = selection.sort(testData).actions.filter(a => a.key === "swap");
        const expected = [new SwapAction(0, 1)];

        assert.deepEqual(actions, expected);
    });

    it("Two elements in reverse order2", function () {
        const testData = [2, 1, 3];
        const actions = selection.sort(testData).actions.filter(a => a.key === "swap");
        const expected = [new SwapAction(0, 1)];

        assert.deepEqual(actions, expected);
    });

    it("Two elements in reverse order3", function () {
        const testData = [3, 1, 2];
        const actions = selection.sort(testData).actions.filter(a => a.key === "swap");
        const expected = [new SwapAction(0, 1), new SwapAction(1, 2)];

        assert.deepEqual(actions, expected);
    });
});
