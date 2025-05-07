import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
  const response = await request(app).post('/api/v1/user/registry/').send({
    name: 'Hermes',
    last_name: 'Pinzon',
    email: 'hermes.pinzon@example.com',
    password: 'password123',
    age: 68,
    userType: 'TUTOR',
  });
  expect(response.status).toBe(201);
});

let accessTokenCookie: string;
let accessTokenCookie2: string;
let studentId: string;
let studentEmail: string;

describe('Integration tests Student - CRUD', () => {
  it('should asign a tutor to a student', async () => {
    const response1 = await request(app).post('/api/v1/auth/login').send({
      email: 'hermes.pinzon@example.com',
      password: 'password123',
    });

    console.log(response1.body);
    const accessTokenTutor = response1.body.accessToken;
    accessTokenCookie2 = accessTokenTutor;

    // Asign tutor to student
    const response2 = await request(app)
      .post('/api/v1/user/')
      .set('Authorization', `Bearer ${accessTokenCookie2}`)
      .send({
        name: 'Beatriz',
        last_name: 'Pinzon',
        email: 'beatriz.pinzon@example.com',
        password: 'password123',
        age: 22,
        userType: 'STUDENT',
        locality: 'Bogotá',
        school: 'Rochischool',
        preferences: {
          economics: true,
        },
      });

    expect(response2.status).toBe(201);
    studentId = response2.body.id;
    studentEmail = response2.body.email;
  });

  it('should login as student', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: studentEmail,
      password: 'password123',
    });
    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('STUDENT');
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();
    accessTokenCookie = response.body.accessToken;
  });

  it('should modify student acount', async () => {
    const response = await request(app)
      .patch(`/api/v1/user/${studentId}`)
      .set('Authorization', `Bearer ${accessTokenCookie2}`)
      .send({
        name: 'Alejandro',
        email: 'alejandro.hernandez@example.com',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Alejandro');
    expect(response.body.email).toBe('alejandro.hernandez@example.com');
  });

  it('should view student acount', async () => {
    const response = await request(app)
      .get(`/api/v1/user/${studentId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body);
  });

  //it('should recover password', async () => {});

  it('should delete student acount', async () => {
    const response = await request(app)
      .delete(`/api/v1/user/`)
      .set('Authorization', `Bearer ${accessTokenCookie2}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });
});

afterAll(async () => {
  await database.disconnect();
});
