import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
});

let accessTokenCookie: string;

describe('search Job Opportunities', () => {
  it('should return a list of job opportunities', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'nicolas.mora@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('STUDENT');
    accessTokenCookie = response.body.accessToken;

    const response2 = await request(app)
      .get('/api/v1/opportunity/')
      .set('Authorization', `Bearer ${accessTokenCookie}`);
    expect(response2.status).toBe(200);
  });
});

afterAll(async () => {
  await database.disconnect();
});
