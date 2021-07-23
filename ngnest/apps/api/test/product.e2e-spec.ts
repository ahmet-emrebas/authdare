import * as supertest from 'supertest';
import { HttpStatus } from '@nestjs/common';

describe('Product Controller', () => {
  const req = supertest('localhost:3000/api/products');
  it('should return none', async () => {
    const res = await req.get('');
    expect(res.status).toEqual(HttpStatus.OK);
  });

  it('should creat the item ', async () => {
    const res = await req.post('').send({
      firstName: 'AHmet Emrebas',
    });
    expect(res.status).toEqual(HttpStatus.CREATED);
  });
});
