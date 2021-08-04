import { assert, expect } from "chai";
import { __initEach } from "./init-each";

describe('InitEach', () => {
    it('should init each value with provided contructor', () => {
        class A { public a!: string; constructor(a: string) { this.a = a; } }

        const notEmpty = __initEach(A, [{ a: 'ahmet' }])
        const empty = __initEach(A, [])
        const __udnefiend = __initEach(A, 'undefiend param');

        assert.equal(notEmpty[0].a, 'ahmet');
        assert.deepEqual(empty, []);
        assert.equal(__udnefiend, undefined);


    })
});