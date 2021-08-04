import { assert } from 'chai';
import { _trim, _trim_each } from './trim';

fdescribe('Trim Transformers', () => {
    it('should trim or undefined ', () => {
        assert.equal(_trim('  '), undefined)
        assert.equal(_trim(null), undefined)
        assert.equal(_trim(1231), undefined)
    })

    it('should trim each ', () => {
        assert.deepEqual(_trim_each([]), []);
        assert.deepEqual(_trim_each(['  ', '']), [undefined, undefined])
        assert.deepEqual(_trim_each(['   as', 'ab   ']), ['as', 'ab'])
    })
});