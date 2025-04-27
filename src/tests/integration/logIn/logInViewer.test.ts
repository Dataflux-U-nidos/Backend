import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
});

describe('Integration tests Viewer - Login', () => {
  it('should login as viewer', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'carlos.vw@example.com',
      password: 'Pass123',
    });
    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('VIEWER');
  });

  it('should login as viewer and return the jwt', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'carlos.vw@example.com',
      password: 'Pass123',
    });

    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('VIEWER');
    expect(response.body.accessToken).toBeDefined();
  });

  it('should deny login using nonexisting admin credentials', async () => {
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
