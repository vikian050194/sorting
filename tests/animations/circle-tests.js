import assert from "node:assert";
import { SwapAction } from "../../src/js/actions";
import { CircleAnimation } from "../../src/js/animations";

const circle = new CircleAnimation();
const gen = circle.swap();

describe("Animations: square", function () {
    it("Key", function () {
        const actual = circle.key;
        const expected = "circle";

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

    it("1/6 progress: from", function () {
        const index = 0;
        const action = new SwapAction(0, 1);
        const progress = 1/6;
        const actual = gen(index, action, progress);
        const expected = {
            order: 0,
            bottom: "20.00px",
            left: "5.36px"
        };

        assert.deepEqual(actual, expected);
    });

    it("1/6 progress: to", function () {
        const index = 1;
        const action = new SwapAction(0, 1);
        const progress = 1/6;
        const actual = gen(index, action, progress);
        const expected = {
            order: 1,
            bottom: "-20.00px",
            left: "-5.36px"
        };

        assert.deepEqual(actual, expected);
    });

    it("1/2 progress", function () {
        const index = 0;
        const action = new SwapAction(0, 1);
        const progress = 1/2;
        const actual = gen(index, action, progress);
        const expected = {
            order: 0,
            bottom: "40.00px",
            left: "40.00px"
        };

        assert.deepEqual(actual, expected);
    });

    it("5/6 progress", function () {
        const index = 0;
        const action = new SwapAction(0, 1);
        const progress = 5/6;
        const actual = gen(index, action, progress);
        const expected = {
            order: 0,
            bottom: "20.00px",
            left: "74.64px"
        };

        assert.deepEqual(actual, expected);
    });

    it("6/6 progress: from", function () {
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

    it("6/6 progress: to", function () {
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

    it("1/6 progress: delta > 1", function () {
        const index = 0;
        const action = new SwapAction(0, 2);
        const progress = 1/6;
        const actual = gen(index, action, progress);
        const expected = {
            order: 0,
            bottom: "40.00px",
            left: "10.72px"
        };

        assert.deepEqual(actual, expected);
    });
});
