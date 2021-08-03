import { toUndefined } from "./undefined";
import { expect } from 'chai'

describe('undefined', () => {
    it('should return undefined for null and empty string, the value otherwiser', () => {

        expect(toUndefined(null)).to.be.undefined;
        expect(toUndefined('     ')).to.be.undefined;
        expect(toUndefined('abc')).to.eq('abc')
        expect(toUndefined(' x y z ')).to.eq(' x y z ');
        expect(toUndefined(0)).to.equal(0);
        expect(toUndefined(-1)).to.equal(-1);

    })
});