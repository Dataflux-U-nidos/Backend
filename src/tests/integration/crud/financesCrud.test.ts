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
let fincencesId: string;

describe('Integration tests fincences - CRUD', () => {
  it('should create a fincences user by an admin', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'juan.granada@example.com',
      password: 'password123',
    });
    accessTokenCookie = response.body.accessToken;

    const response2 = await request(app)
      .post('/api/v1/user/')
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send({
        name: 'Luis',
        last_name: 'Diaz',
        email: 'luis.diaz@gmail.com',
        password: 'password123',
        age: 29,
        userType: 'FINANCES',
      });
    expect(response2.status).toBe(201);
    expect(response2.body.userType).toBe('FINANCES');
    fincencesId = response2.body.id;
  });

  it('should modify a fincences user', async () => {
    const response = await request(app)
      .patch(`/api/v1/user/${fincencesId}`)
      .send({
        name: 'Claudio',
        email: 'claudio.valencia@example.com',
      })
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Claudio');
    expect(response.body.email).toBe('claudio.valencia@example.com');
  });

  it('should delete a fincences user', async () => {
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
