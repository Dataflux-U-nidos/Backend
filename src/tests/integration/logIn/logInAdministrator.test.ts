import request from 'supertest';
import { database } from '../../../infrastructure';
import app from '../../../server';

// Connect to the database before all tests
beforeAll(async () => {
  console.log('⏳ Conectando a la base de datos en pruebas...');
  await database.connect();
  console.log('✅ Base de datos lista para pruebas.');
});

describe('Integration tests Admin - Login', () => {
  it('should login as admin', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'lucho.mendoza@example.com',
      password: 'password123',
    });

    console.log('Status:', response.status);
    expect(response.status).toBe(200);
  });

  it('should login as admin and return the jwt', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'lucho.mendoza@example.com',
      password: 'password123',
    });

    console.log('Status:', response.status);
    console.log('Response body:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
  });

  it('should deny login using nonexisting admin credentials', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'mario.calderon@example.com',
      password: 'password123',
    });

    console.log('Status:', response.status);

    expect(response.status).toBe(401);
  });
});

// Disconnect from the database after all tests
afterAll(async () => {
  console.log('🔴 Cerrando conexión a la base de datos...');
  await database.disconnect();
});
