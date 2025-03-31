const request = require('supertest');
const { database } = require('../../../infrastructure');
const { app } = require('../../../server'); // Importa `app` en lugar de `server`

beforeAll(async () => {
  await database.connect();
});

describe('Integration tests Admin - Login', () => {
  it('should login as admin', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'lucho.mendoza@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
  });

  it('should login as admin and return the jwt', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'lucho.mendoza@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
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
