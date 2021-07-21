import { BaseClass, FindManyQuery } from '@base';
import { Exclude, Expose } from 'class-transformer';
import { TransformQueryPipe } from './transform-query.pipe';

const instance = new TransformQueryPipe();

@Exclude()
class DtoClass extends BaseClass {
  @Expose() entityField: string;
}
describe('TransformQueryPipe', () => {
  it('should be defined', () => {
    expect(instance).toBeDefined();
  });
  it('should transform raw query value into valid query object', async () => {
    const value: FindManyQuery | DtoClass = {
      entityField: 'some value',
      order: 'firstName:asc, lastName:asc',
      relations: 'relation1,relation2',
    };

    const expected = {
      where: {
        entityField: 'some value',
      },
      order: { firstName: 'ASC', lastName: 'ASC' },
      relations: ['relation1', 'relation2'],
    };
    const actual = await instance.transform(value, {
      metatype: DtoClass,
    } as any);

    expect(expected).toEqual(actual);
  });
});
