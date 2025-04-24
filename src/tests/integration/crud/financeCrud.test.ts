/*import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
});

let accessTokenCookie: string;
let financeId: string;
let financeId2: string;

describe('Integration tests finance - CRUD', () => {
  it('should create a finance account', async () => {
    const response = await request(app).post('/api/v1/user/registry').send({
      name: 'Gustavo',
      last_name: 'Olarte',
      email: 'gustavo.olarte@example.com',
      password: 'password123',
      age: 30,
      userType: 'finance',
    });

    expect(response.status).toBe(201);
    expect(response.body.userType).toBe('finance');
    financeId2 = response.body.id;
  });

  it('should create a finance user by an admin', async () => {
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
        userType: 'finance',
      });

    expect(response2.status).toBe(201);
    expect(response2.body.userType).toBe('finance');
    financeId = response2.body.id;
  });

  it('should modify a finance user', async () => {
    const response = await request(app)
      .patch(`/api/v1/user/${financeId}`)
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

  it('should delete a finance user', async () => {
    const response = await request(app)
      .delete(`/api/v1/user/${financeId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });
});

afterAll(async () => {
  const response = await request(app)
    .delete(`/api/v1/user/${financeId2}`)
    .set('Authorization', `Bearer ${accessTokenCookie}`);
  expect(response.status).toBe(200);
  await database.disconnect();
});
*/