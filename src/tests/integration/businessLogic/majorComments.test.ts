import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
});

let accessTokenCookie: string;

describe('Comments on mayors', () => {
  it('should create a comment', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'nicolas.mora@example.com',
      password: 'password123',
    });
    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('STUDENT');
    accessTokenCookie = response.body.accessToken;
  });
});
