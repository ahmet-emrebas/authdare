import { assert } from 'chai';
import { message } from './message'
describe('Message', () => {
    it('should return an object with property message', () => {

        const m = message('hello')
        assert.equal(m.message, 'hello');

    })
});