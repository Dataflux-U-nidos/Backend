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
      email: 'jose.rodriguez@example.com',
      password: 'password123',
    });
    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('ADMIN');
  });

  it('should login as admin and return the jwt', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'jose.rodriguez@example.com',
      password: 'password123',
    });
    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('ADMIN');

    //Checks for de access and refresh tokens in the response headers
    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([
        expect.stringContaining('accessToken'),
        expect.stringContaining('refreshToken'),
      ]),
    );
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
