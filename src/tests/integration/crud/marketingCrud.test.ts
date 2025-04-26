import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
});

let accessTokenCookie: string;
let marketingId: string;
let marketingId2: string;

describe('Integration tests fincences - CRUD', () => {
  it('should create a fincences account', async () => {
    const response = await request(app).post('/api/v1/user/registry').send({
      name: 'Gustavo',
      last_name: 'Olarte',
      email: 'gustavo.olarte@example.com',
      password: 'password123',
      age: 30,
      userType: 'MARKETING',
    });

    expect(response.status).toBe(201);
    expect(response.body.userType).toBe('MARKETING');
    marketingId2 = response.body.id;
  });

  it('should create a fincences user by an admin', async () => {
    const response = await request(app).post('/api/v1/auth/login')
    .send({
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
        userType: 'MARKETING',
      });
      console.log("\nEste es el segundo body de la respuesta: \n")
      console.log(response2.body);

    expect(response2.status).toBe(201);
    expect(response2.body.userType).toBe('MARKETING');
    marketingId = response2.body.id;
  });

  it('should modify a fincences user', async () => {
    const response = await request(app)
      .patch(`/api/v1/user/${marketingId}`)
      .send({
        name: 'Mario',
        email: 'mario.valencia@example.com',
      })
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Mario');
    expect(response.body.email).toBe('mario.valencia@example.com');
  });

  it('should delete a fincences user', async () => {
    const response = await request(app)
      .delete(`/api/v1/user/${marketingId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });
});

afterAll(async () => {
  const response = await request(app)
    .delete(`/api/v1/user/${marketingId2}`)
    .set('Authorization', `Bearer ${accessTokenCookie}`);
  expect(response.status).toBe(200);
  await database.disconnect();
});