import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
  const response = await request(app).post('/api/v1/user/registry/').send({
    name: 'Juan',
    last_name: 'Granada',
    email: 'juan.granada@example.com',
    password: 'password123',
    age: 22,
    userType: 'ADMIN',
  });
  expect(response.status).toBe(201);
});

let accessTokenCookie: string;
let supportId: string;

describe('Integration tests support - CRUD', () => {
  it('should create a support user by an admin', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'juan.granada@example.com',
      password: 'password123',
    });
    accessTokenCookie = response.body.accessToken;

    const response2 = await request(app)
      .post('/api/v1/user/')
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send({
        name: 'Marcela',
        last_name: 'Cardona',
        email: 'marcela.cardona@gmail.com',
        password: 'password123',
        age: 29,
        userType: 'SUPPORT',
      });
    expect(response2.status).toBe(201);
    expect(response2.body.userType).toBe('SUPPORT');
    supportId = response2.body.id;
  });

  it('should modify a support user', async () => {
    const response = await request(app)
      .patch(`/api/v1/user/${supportId}`)
      .send({
        name: 'Isabela',
        email: 'isabela.cardona@example.com',
      })
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Isabela');
    expect(response.body.email).toBe('isabela.cardona@example.com');
  });

  it('should delete a support user', async () => {
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
