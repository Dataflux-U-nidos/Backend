import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect(); // Ensure database connection before running tests
});

describe('Integration tests Student - Login', () => {
  it('should login as student', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'andrea@example.com',
      password: 'password123',
    });
    expect(response.status).toBe(200); // Check if the request was successful
    expect(response.body.userType).toBe('STUDENT'); // Validate user type
  });

  it('should login as student and return the jwt', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'andrea@example.com',
      password: 'password123',
    });
    expect(response.status).toBe(200); // Ensure successful response
    expect(response.body.userType).toBe('STUDENT'); // Verify correct user type
    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([
        expect.stringContaining('accessToken'), // Check if accessToken is set
        expect.stringContaining('refreshToken'), // Check if refreshToken is set
      ]),
    );
  });

  it('should deny login using nonexisting student credentials', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'mario.calderon@example.com',
      password: 'password123',
    });
    expect(response.status).toBe(401); // Expect unauthorized status for invalid credentials
  });
});

afterAll(async () => {
  await database.disconnect(); // Close database connection after tests
});
