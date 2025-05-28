import request from 'supertest';
import { app } from '../../../server';
import { database } from '../../../infrastructure';

beforeAll(async () => {
  await database.connect();
});

describe('POST /impersonate', () => {
  let adminToken: string;

  it('should login as ADMIN', async () => {
    const loginRes = await request(app).post('/api/v1/auth/login').send({
      email: 'tesis@gmail.com',
      password: 'password123',
    });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.userType).toBe('ADMIN');
    adminToken = loginRes.body.accessToken;
  });

  it('should impersonate a user successfully', async () => {
    const response = await request(app)
      .post('/api/v1/auth/impersonate')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        targetUserId: '681fa3263c4dca210a69660a',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
  });

  it('should reject impersonation if role is not ADMIN or SUPPORT', async () => {
    const loginRes = await request(app).post('/api/v1/auth/login').send({
      email: 'student@example.com',
      password: 'studentpassword',
    });

    const response = await request(app)
      .post('/api/v1/auth/impersonate')
      .set('Authorization', `Bearer ${loginRes.body.accessToken}`)
      .send({
        userId: '665c3f2b457ad25e689d7a9a',
      });

    expect(response.status).toBe(401);
  });
});
