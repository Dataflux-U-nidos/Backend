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

describe('FINANCES can view total investment in school and university campaigns', () => {
  it('should return the total investment amount for educational campaigns', async () => {
    const response = await request(app)
      .get('/api/v1/campaign/total')
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.statusCode).toBe(200);
    expect(typeof response.body.total).toBe('number');
    expect(response.body.total).toBeGreaterThanOrEqual(0);
    console.log('Total investment:', response.body);
  });
});
