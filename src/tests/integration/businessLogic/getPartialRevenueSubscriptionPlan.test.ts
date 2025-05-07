import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
  const response = await request(app).post('/api/v1/auth/login').send({
    email: 'marcela.valencia@gmail.com',
    password: 'password123',
  });
  expect(response.status).toBe(200);
  expect(response.body.userType).toBe('FINANCES');
  accessTokenCookie = response.body.accessToken;
});

let accessTokenCookie: string;

describe('FINANCES can view revenues by subscription category', () => {
  it('should view revenue of BASIC subscription plan', async () => {
    const response2 = await request(app)
      .get(`/api/v1/subscription-plan/revenue/BASIC`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response2.statusCode).toBe(200);
    expect(response2.body.revenue % 1).not.toBe(0);
  });
  it('should view revenue of STANDARD subscription plan', async () => {
    const response2 = await request(app)
      .get(`/api/v1/subscription-plan/revenue/STANDARD`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response2.statusCode).toBe(200);
    expect(response2.body.revenue % 1).not.toBe(0);
  });
  it('should view revenue of PREMIUM subscription plan', async () => {
    const response2 = await request(app)
      .get(`/api/v1/subscription-plan/revenue/PREMIUM`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response2.statusCode).toBe(200);
    expect(response2.body.revenue % 1).not.toBe(0);
  });
});
