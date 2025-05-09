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
let marketingId: string;

describe('Integration tests marketing - CRUD', () => {
  it('should create a marketing user by an admin', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'juan.granada@example.com',
      password: 'password123',
    });
    accessTokenCookie = response.body.accessToken;

    const response2 = await request(app)
      .post('/api/v1/user/')
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send({
        name: 'Lamine',
        last_name: 'Yamal',
        email: 'lamine.yamal@gmail.com',
        password: 'password123',
        age: 17,
        userType: 'MARKETING',
      });

    console.log(response2.body);
    expect(response2.status).toBe(201);
    expect(response2.body.userType).toBe('MARKETING');
    marketingId = response2.body.id;
  });

  it('should modify a marketing user', async () => {
    const response = await request(app)
      .patch(`/api/v1/user/${marketingId}`)
      .send({
        name: 'Vinicius',
        last_name: 'Junior',
        email: 'vini.junior@example.com',
      })
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Vinicius');
    expect(response.body.email).toBe('vini.junior@example.com');
  });

  it('should delete a marketing user', async () => {
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
