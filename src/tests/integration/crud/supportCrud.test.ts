/*import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
});

let accessTokenCookie: string;
let supportId: string;
let supportId2: string;

describe('Integration tests support - CRUD', () => {
  it('should create a support account', async () => {
    const response = await request(app).post('/api/v1/user/registry').send({
      name: 'Hugo',
      last_name: 'Lombardi',
      email: 'hugo.lombardi@example.com',
      password: 'password123',
      age: 30,
      userType: 'support',
    });

    expect(response.status).toBe(201);
    expect(response.body.userType).toBe('support');
    supportId2 = response.body.id;
  });

  it('should create a support user by an admin', async () => {
    const response = await request(app).post('/api/v1/user/auth/login').send({
      email: 'tesis@gmail.com',
      password: 'password123',
    });

    accessTokenCookie = response.body.accessToken;

    const response2 = await request(app)
      .post('/api/v1/user/')
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send({
        name: 'Marcela',
        last_name: 'Valencia',
        email: 'marcela.valencia@gmail.com',
        password: 'password123',
        age: 29,
        userType: 'support',
      });

    expect(response2.status).toBe(201);
    expect(response2.body.userType).toBe('support');
    supportId = response2.body.id;
  });

  it('should modify a support user', async () => {
    const response = await request(app)
      .patch(`/api/v1/user/${supportId}`)
      .send({
        name: 'Mario',
        last_name: 'Duarte',
        email: 'mario.duarte@example.com',
      })
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Mario');
    expect(response.body.last_name).toBe('Duarte');
    expect(response.body.email).toBe('mario.duarte@example.com');
  });

  it('should delete a support user', async () => {
    const response = await request(app)
      .delete(`/api/v1/user/${supportId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });
});

afterAll(async () => {
  const response = await request(app)
    .delete(`/api/v1/user/${supportId2}`)
    .set('Authorization', `Bearer ${accessTokenCookie}`);
  expect(response.status).toBe(200);
  await database.disconnect();
});
*/