import { trimStringAndArray } from "./transformers";

describe('Transformers', () => {

    it('trim should trim string/string[]', () => {
        const r = trimStringAndArray(' abcc ')
        expect(r).toBe('abcc');
        const r0 = trimStringAndArray([' abc ', ' def ']);
        expect(r0[0]).toBe('abc');
        expect(r0[1]).toBe('def');
    })

});