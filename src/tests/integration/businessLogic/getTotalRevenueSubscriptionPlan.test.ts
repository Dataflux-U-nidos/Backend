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

describe('FINANCES can view total revenue', () => {
  it('should view total revenue between start and end dates', async () => {
    const startDate = '2025-04-07';
    const endDate = '2025-05-07';

    const response = await request(app)
      .get(
        `/api/v1/subscription-plan/revenue?start=${startDate}&end=${endDate}`,
      )
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.revenue % 1).not.toBe(0);
    console.log('🔍 Revenue response:', response.body);
  });
});
