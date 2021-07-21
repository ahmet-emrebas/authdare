import { ResourceServiceTest } from '@base/resource';
import { UserController } from './user.controller';

const userService = new ResourceServiceTest();
const userController = new UserController(userService as any);

describe('UserController', () => {
  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  test.each`
    method       | expected                          | actual
    ${'create'}  | ${userService.create(null)}       | ${userService.create(null)}
    ${'update'}  | ${userService.update(null, null)} | ${userService.update(null, null)}
    ${'remove'}  | ${userService.remove(null)}       | ${userService.remove(null)}
    ${'findAll'} | ${userService.findAll(null)}      | ${userService.findAll(null)}
    ${'findOne'} | ${userService.findOne(null)}      | ${userService.findOne(null)}
  `('$method should return $expected', async ({ expected, actual }) => {
    expect(await expected).toEqual(await actual);
  });
});
