import { assert } from 'chai';
import { Stringify } from './stringify';

describe('stringify', () => {
    it('to should stringify and from should objectify   ', () => {

        const s = Stringify().to({ name: "ahmet" });
        const o = Stringify().from(s);

        assert.typeOf(s, 'string');
        assert.typeOf(o, 'object')
        assert.equal(o.name, 'ahmet');
        assert.equal(JSON.stringify(o), s);

    })
});