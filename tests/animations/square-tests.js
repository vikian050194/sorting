import assert from "node:assert";
import { SwapAction } from "../../src/js/actions";
import { SquareAnimation } from "../../src/js/animations";

const square = new SquareAnimation();
const gen = square.swap();

describe("Animations: square", function () {
    it("Key", function () {
        const actual = square.key;
        const expected = "square";

        assert.equal(actual, expected);
    });

    it("Zero progress", function () {
        const index = 0;
        const action = new SwapAction(0, 1);
        const progress = 0;
        const actual = gen(index, action, progress);
        const expected = {
            order: 0,
            bottom: "0.00px",
            left: "0.00px"
        };

        assert.deepEqual(actual, expected);
    });

    it("10% progress: from", function () {
        const index = 0;
        const action = new SwapAction(0, 1);
        const progress = 0.1;
        const actual = gen(index, action, progress);
        const expected = {
            order: 0,
            bottom: "16.00px",
            left: "0.00px"
        };

        assert.deepEqual(actual, expected);
    });

    it("10% progress: to", function () {
        const index = 1;
        const action = new SwapAction(0, 1);
        const progress = 0.1;
        const actual = gen(index, action, progress);
        const expected = {
            order: 1,
            bottom: "-16.00px",
            left: "0.00px"
        };

        assert.deepEqual(actual, expected);
    });

    it("50% progress", function () {
        const index = 0;
        const action = new SwapAction(0, 1);
        const progress = 0.5;
        const actual = gen(index, action, progress);
        const expected = {
            order: 0,
            bottom: "40.00px",
            left: "40.00px"
        };

        assert.deepEqual(actual, expected);
    });

    it("80% progress", function () {
        const index = 0;
        const action = new SwapAction(0, 1);
        const progress = 0.80;
        const actual = gen(index, action, progress);
        const expected = {
            order: 0,
            bottom: "32.00px",
            left: "80.00px"
        };

        assert.deepEqual(actual, expected);
    });

    it("100% progress: from", function () {
        const index = 0;
        const action = new SwapAction(0, 1);
        const progress = 1;
        const actual = gen(index, action, progress);
        const expected = {
            order: 1,
            bottom: "0.00px",
            left: "0.00px"
        };

        assert.deepEqual(actual, expected);
    });

    it("100% progress: to", function () {
        const index = 1;
        const action = new SwapAction(0, 1);
        const progress = 1;
        const actual = gen(index, action, progress);
        const expected = {
            order: 0,
            bottom: "0.00px",
            left: "0.00px"
        };

        assert.deepEqual(actual, expected);
    });

    it("10% progress: delta > 1", function () {
        const index = 0;
        const action = new SwapAction(0, 2);
        const progress = 0.1;
        const actual = gen(index, action, progress);
        const expected = {
            order: 0,
            bottom: "32.00px",
            left: "0.00px"
        };

        assert.deepEqual(actual, expected);
    });
});
