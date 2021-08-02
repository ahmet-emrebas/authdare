import { assert } from "chai";
import { trimStringAndArray } from "./transformers";

describe('Transformers', () => {

    it('trim should trim string/string[]', () => {
        const r = trimStringAndArray(' abcc ')
        assert.equal(r, 'abcc');
        const r0 = trimStringAndArray([' abc ', ' def ']);
        assert.equal(r0[0], 'abc');
        assert.equal(r0[1], 'def');
    })

});