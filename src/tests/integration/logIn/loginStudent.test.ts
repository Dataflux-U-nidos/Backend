import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
});

describe('Integration tests Student - Login', () => {
  it('should login as student', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'andrea@example.com',
      password: 'password123',
    });
    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('STUDENT');
  });

  it('should login as student and return the jwt', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'andrea@example.com',
      password: 'password123',
    });
    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('STUDENT');
    expect(response.body).toHaveProperty('accessToken');
  });

  it('should deny login using nonexisting student credentials', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'mario.calderon@example.com',
      password: 'password123',
    });
    expect(response.status).toBe(401);
  });
});

afterAll(async () => {
  await database.disconnect();
});
