import { Like, LessThan, MoreThan } from 'typeorm';
import { assert } from 'chai';
import {
    __lessThan,
    __likeContains,
    __likeEndsWith,
    __likeStartsWith,
    __moreThan,
} from '.';

describe('Class Query Transformers', () => {
    it('__likeContains should return sql query for string input', () => {
        assert.deepEqual(__likeContains('a'), Like('%a%'));
        assert.deepEqual(__likeContains(''), undefined);
    });

    it('__likeStartsWith should return sql query for string input', () => {
        assert.deepEqual(__likeStartsWith('a'), Like('a%'));
        assert.deepEqual(__likeStartsWith(''), undefined);
    });

    it('__likeEndsWith should return sql query for string input', () => {
        assert.deepEqual(__likeEndsWith('a'), Like('%a'));
        assert.deepEqual(__likeEndsWith(''), undefined);
    });

    it('__lessThan should return sql query for string input', () => {
        assert.deepEqual(__lessThan(new Date()), LessThan(new Date()));
        assert.deepEqual(__lessThan(''), undefined);
    });

    it('__moreThan should return sql query for string input', () => {
        assert.deepEqual(__moreThan(new Date()), MoreThan(new Date()));
        assert.deepEqual(__moreThan(''), undefined);
    });
});
