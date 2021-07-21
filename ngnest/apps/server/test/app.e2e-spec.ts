import { getFakeDataOfEntities, resourceNames } from '@base';
import * as request from 'supertest';
import * as resources from '@resources';
import { toPairs } from 'lodash';

describe('UsersModule', () => {
  const req = request('http://localhost:3000/api/');
  const fakeData = getFakeDataOfEntities(resources);
  const resourcePaths = resourceNames().map((e) => e + 's');

  beforeAll(async () => {
    for (let i = 0; i < 5; i++) {
      for (const [key, value] of toPairs(fakeData)) {
        const body = value();

        await req
          .post(key + 's')
          .send(body)
          .set('Accept', 'application/json');
      }
    }
  });

  describe('Smoke Test', () => {
    test.each`
      method   | path       | statusCode | body
      ${'get'} | ${'users'} | ${200}     | ${null}
      ${'get'} | ${'orgs'}  | ${200}     | ${null}
    `('', async ({ method, path, statusCode, body }) => {
      const res = await req[method](path, body);

      expect(res.statusCode).toEqual(statusCode);
      if (body) {
        expect(res.body).toEqual(body);
      }
    });
  });

  afterAll(async () => {
    for (const path of resourcePaths) {
      await req.delete(path + '/delete/all');
    }
  });
});
