import assert from "node:assert";
import { TestAnimation } from "../../src/js/animations";

const test = new TestAnimation();
const gen = test.swap();

describe("Animations: dummy", function () {
    it("Zero progress", function () {
        const progress = 0;
        const actual = gen(progress);
        const expected = {
            bottom: "0px"
        };

        assert.deepEqual(actual, expected);
    });

    it("50% passed", function () {
        const progress = 0.5;
        const actual = gen(progress);
        const expected = {
            bottom: "50px"
        };

        assert.deepEqual(actual, expected);
    });

    it("Completed", function () {
        const progress = 1;
        const actual = gen(progress);
        const expected = {
            bottom: "100px"
        };

        assert.deepEqual(actual, expected);
    });
});
