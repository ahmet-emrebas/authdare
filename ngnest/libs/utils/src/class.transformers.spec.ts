import { assert } from 'chai';
import {
  __initEach,
  _toUndefined,
  _trim,
  _trim_each,
} from './class.transformers';
import { expect } from 'chai';

describe('class Transformers', () => {
  describe('initEach', () => {
    it('should init each value with provided contructor', () => {
      class A {
        public a!: string;
        constructor (obj: A) {
          Object.assign(this, obj);
        }
      }

      const notEmpty = __initEach(A, [{ a: 'ahmet' }]);
      const empty = __initEach(A, []);
      const __udnefiend = __initEach(A, 'undefiend param');

      assert.equal(notEmpty[0].a, 'ahmet');
      assert.deepEqual(empty, []);
      assert.equal(__udnefiend, undefined);
    });
  });

  describe('undefined', () => {
    it('should return undefined for null and empty string, the value otherwiser', () => {
      expect(_toUndefined(null)).to.be.undefined;
      expect(_toUndefined('     ')).to.be.undefined;
      expect(_toUndefined('abc')).to.eq('abc');
      expect(_toUndefined(' x y z ')).to.eq(' x y z ');
      expect(_toUndefined(0)).to.equal(0);
      expect(_toUndefined(-1)).to.equal(-1);
    });
  });

  describe('trim Transformers', () => {
    it('should trim or undefined', () => {
      assert.equal(_trim('  '), undefined);
      assert.equal(_trim(null), undefined);
      assert.equal(_trim(1231), undefined);
    });

    it('should trim each', () => {
      assert.deepEqual(_trim_each([]), []);
      assert.deepEqual(_trim_each(['  ', '']), [undefined, undefined]);
      assert.deepEqual(_trim_each(['   as', 'ab   ']), ['as', 'ab']);
    });
  });
});
