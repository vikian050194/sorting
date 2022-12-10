import assert from "node:assert";
import { SwapAction } from "../../src/js/actions";
import { SquareAnimation } from "../../src/js/animations";

const square = new SquareAnimation();
const gen = square.swap();

describe("Animations: sqare", function () {
    it("Zero progress", function () {
        const index = 0;
        const action = new SwapAction(0, 1);
        const progress = 0;
        const actual = gen(index, action, progress);
        const expected = {
            order: 0,
            bottom: "0px",
            left: "0px"
        };

        assert.deepEqual(actual, expected);
    });

    it("50% passed", function () {
        const index = 0;
        const action = new SwapAction(0, 1);
        const progress = 0.5;
        const actual = gen(index, action, progress);
        const expected = {
            order: 0,
            bottom: "40px",
            left: "40px"
        };

        assert.deepEqual(actual, expected);
    });

    it("Completed", function () {
        const index = 0;
        const action = new SwapAction(0, 1);
        const progress = 1;
        const actual = gen(index, action, progress);
        const expected = {
            order: 1,
            bottom: "0px",
            left: "0px"
        };

        assert.deepEqual(actual, expected);
    });
});
