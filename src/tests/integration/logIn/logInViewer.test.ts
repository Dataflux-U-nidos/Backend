import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
});

// Group of tests for the login functionality of the viewer user type
describe('Integration tests Viewer - Login', () => {

    
  it('should login as viewer', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'patricia.fernendez@example.com',
      password: 'password123',
    });
    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('VIEWER');
  });

  it('should login as viewer and return the jwt', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'patricia.fernendez@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('VIEWER');

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
