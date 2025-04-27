import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
});

let accessTokenCookie: string;
let accessTokenCookie2: string;
let studentId: string;
let studentId2: string;
let studentEmail: string;

describe('Integration tests Student - CRUD', () => {
  it('should create a student account', async () => {
    const response = await request(app)
      .post('/api/v1/user/registry')
      .send({
        name: 'Hermann',
        last_name: 'Hernandez',
        email: 'hermann.hernandez@example.com',
        password: 'password123',
        age: 22,
        userType: 'STUDENT',
        locality: 'Bogotá',
        school: 'San Bartolome',
        preferences: {
          'formula 1': true,
        },
      });

    expect(response.status).toBe(201);
    expect(response.body.userType).toBe('STUDENT');

    studentId = response.body.id;
    studentEmail = response.body.email;
  });

  it('should asign a tutor to a student', async () => {
    const response1 = await request(app).post('/api/v1/auth/login').send({
      email: 'hermes.pinzon@example.com',
      password: 'password123',
    });

    const accessTokenCookieTutor = response1.body.accessToken;
    accessTokenCookie2 = accessTokenCookieTutor;

    // Asign tutor to student
    const response2 = await request(app)
      .post('/api/v1/user/')
      .set('Authorization', `Bearer ${accessTokenCookieTutor}`)
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
    studentId2 = response2.body.id;

    const response3 = await request(app)
      .get(`/api/v1/user/6803dccb5262c6ac9613bc1d`)
      .set('Authorization', `Bearer ${accessTokenCookieTutor}`);

    expect(response3.status).toBe(200);
    expect(response3.body.students).toContainEqual(studentId2);
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
      .delete(`/api/v1/user/${studentId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });
});

afterAll(async () => {
  const response2 = await request(app)
    .delete(`/api/v1/user/${studentId2}`)
    .set('Authorization', `Bearer ${accessTokenCookie}`);
  expect(response2.status).toBe(200);
  await database.disconnect();
});
