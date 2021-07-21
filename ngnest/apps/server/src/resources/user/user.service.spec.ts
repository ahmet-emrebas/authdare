import { RepositoryTest } from '@base/resource';
import { UserService } from './user.service';

const userRepository = new RepositoryTest();
const userService = new UserService(userRepository as any);

describe('UserService', () => {
  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  test.each`
    method       | expected                        | actual
    ${'save'}    | ${userRepository.save(null)}    | ${userService.save(null)}
    ${'update'}  | ${userRepository.update(null)}  | ${userService.update(null, null)}
    ${'remove'}  | ${userRepository.delete(null)}  | ${userService.delete(null)}
    ${'find'}    | ${userRepository.find(null)}    | ${userService.find(null)}
    ${'findOne'} | ${userRepository.findOne(null)} | ${userService.findOne(null)}
  `('$method should return $expected', async ({ expected, actual }) => {
    expect(await expected).toEqual(await actual);
  });
});
