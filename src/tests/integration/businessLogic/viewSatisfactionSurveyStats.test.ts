import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

let accessTokenCookie: string;
beforeAll(async () => {
  await database.connect();
  const response = await request(app).post('/api/v1/auth/login').send({
    email: 'tesis@gmail.com',
    password: 'password123',
  });
  expect(response.statusCode).toBe(200);
  accessTokenCookie = response.body.accessToken;
});

describe('View satisfaction survey stats', () => {
  it('should view satisfaction survey stats by a admin user', async () => {
    const response2 = await request(app)
      .get('/api/v1/user/platform-stats')
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response2.statusCode).toBe(200);
  });
});

afterAll(async () => {
  await database.disconnect();
});
