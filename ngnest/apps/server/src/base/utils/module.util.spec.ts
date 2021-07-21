import { keys } from 'lodash';
import { getKeyValueThatKeyEndsWith } from './module.util';

describe('ModuleUtil', () => {
  it('', () => {
    expect(1).toEqual(1);
  });

  it('getKeyValueThatKeyEndsWith', () => {
    const r = getKeyValueThatKeyEndsWith(
      { UsersFakeData: 'b', ProductsFakeData: 'c', UsersService: 'y' },
      'FakeData',
    );

    expect(keys(r).length).toEqual(2);
    expect(r.users).toEqual('b');
    expect(r.products).toEqual('c');
  });
});
