import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

let accessTokenCookie: string;
let tutorId: string;

beforeAll(async () => {
  await database.connect();
  // Create a test user (tutor) to use for the tests
  const response = await request(app).post('/api/v1/user/registry/').send({
    name: 'Hermes',
    last_name: 'Pinzon',
    email: 'hermes.pinzon@example.com',
    password: 'password123',
    age: 68,
    userType: 'TUTOR',
  });
  expect(response.status).toBe(201);
  tutorId = response.body.id;
});

describe('Integration tests tutor - CRUD', () => {
  it('should login as a tutor', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'hermes.pinzon@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('TUTOR');
    expect(response.body.accessToken).toBeDefined();
    accessTokenCookie = response.body.accessToken;
  });

  it('should view a tutor acount', async () => {
    const response = await request(app)
      .get(`/api/v1/user/${tutorId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Hermes');
    expect(response.body.last_name).toBe('Pinzon');
  });

  it('should modify a tutor account', async () => {
    const response2 = await request(app)
      .patch(`/api/v1/user/`)
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send({
        name: 'Julia',
        email: 'julia.pinzon@example.com',
      });
    expect(response2.status).toBe(200);
    expect(response2.body.name).toBe('Julia');
    expect(response2.body.last_name).toBe('Pinzon');
    expect(response2.body.email).toBe('julia.pinzon@example.com');
  });

  it('should delete tutor account', async () => {
    const response = await request(app)
      .delete(`/api/v1/user/`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });
});

afterAll(async () => {
  await database.disconnect();
});
