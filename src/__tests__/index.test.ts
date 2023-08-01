import request from 'supertest';

import app from '../index';

describe('Test index.ts', () => {
  test('/', async () => {
    const response = await request(app).get('/');
    expect(response.body).toEqual('Express + TypeScript Server is running');
  });
});
