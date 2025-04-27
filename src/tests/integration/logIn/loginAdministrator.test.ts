import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
});

// Group of tests for the login functionality of the admin user type
describe('Integration tests Admin - Login', () => {
  it('should login as admin', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'tesis@gmail.com',
      password: 'password123',
    });
    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('ADMIN');
  });

  it('should login as admin and return the jwt', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'tesis@gmail.com',
      password: 'password123',
    });
    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('ADMIN');
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
