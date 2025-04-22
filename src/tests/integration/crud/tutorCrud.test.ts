import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
});

let accessTokenCookie: string;
let tutorId: string;

describe('Integration tests tutor - CRUD', () => {
  it('should login as a tutor', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'hermes.pinzon@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('TUTOR');
    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([
        expect.stringContaining('accessToken='),
        expect.stringContaining('refreshToken='),
      ]),
    );

    const rawCookies = response.headers['set-cookie'];
    const cookies = Array.isArray(rawCookies) ? rawCookies : [rawCookies];
    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([
        expect.stringContaining('accessToken'),
        expect.stringContaining('refreshToken'),
      ]),
    );
    accessTokenCookie = cookies
      .find((cookie) => cookie.startsWith('accessToken='))
      ?.split('=')[1]
      ?.split(';')[0];
  });

  it('should create a tutor account', async () => {
    const response = await request(app)
      .post('/api/v1/user/')
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send({
        name: 'Roberto',
        last_name: 'Mendoza',
        email: 'roberto.mendoza@example.com',
        password: 'password123',
        age: 70,
        userType: 'TUTOR',
      });

    expect(response.status).toBe(201);
    tutorId = response.body.id;
  });

  it('should view a tutor acount', async () => {
    const response = await request(app)
      .get(`/api/v1/user/${tutorId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Roberto');
    expect(response.body.last_name).toBe('Mendoza');
  });

  it('should modify a tutor account', async () => {
    const response = await request(app)
      .patch(`/api/v1/user/${tutorId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send({
        name: 'Margarita',
        last_name: 'Mendoza',
        email: 'margarita.mendoza@example.com',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Margarita');
    expect(response.body.last_name).toBe('Mendoza');
    expect(response.body.email).toBe('margarita.mendoza@example.com');
  });

  //it should view related users

  it('should delete tutor account', async () => {
    const response = await request(app)
      .delete(`/api/v1/user/${tutorId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });
});

afterAll(async () => {
  await database.disconnect();
});
