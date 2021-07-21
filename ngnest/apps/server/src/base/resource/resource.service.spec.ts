import { RepositoryTest, ResourceService } from './resource.service';

const repository = new RepositoryTest();
const resourceService = new ResourceService(repository as any);

describe('ResourceService', () => {
  it('should be defined', () => {
    expect(resourceService).toBeDefined();
    expect(repository).toBeDefined();
  });

  test.each`
    method       | expected                    | actual
    ${'save'}    | ${repository.save(null)}    | ${resourceService.save(null)}
    ${'update'}  | ${repository.update(null)}  | ${resourceService.update(null, null)}
    ${'remove'}  | ${repository.delete(null)}  | ${resourceService.delete(null)}
    ${'find'}    | ${repository.find(null)}    | ${resourceService.find(null)}
    ${'findOne'} | ${repository.findOne(null)} | ${resourceService.findOne(null)}
  `('$method should return $expected', async ({ expected, actual }) => {
    expect(await expected).toEqual(await actual);
  });
});
