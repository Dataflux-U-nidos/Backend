import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
});

let accessTokenCookie: string;
let universityId: string;
let universityEmail: string;
let infoManagerId: string;
let viewerId: string;

describe('Integration tests Universiry - CRUD', () => {
  it('should create a University acount', async () => {
    const response = await request(app).post('/api/v1/user/registry').send({
      name: 'San Marino University',
      email: 'san.marino@example.com',
      password: 'password123',
      userType: 'UNIVERSITY',
      address: 'Calle 123',
    });

    expect(response.status).toBe(201);
    expect(response.body.userType).toBe('UNIVERSITY');

    universityId = response.body.id;
    universityEmail = response.body.email;
  });

  it('should login as a university', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: universityEmail,
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('UNIVERSITY');
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();
    accessTokenCookie = response.body.accessToken;
  });

  it('should create a info manager user', async () => {
    const response = await request(app)
      .post('/api/v1/user/')
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send({
        name: 'Luis Fernando',
        last_name: 'Lee',
        email: 'luis.lee@example.com',
        password: 'password123',
        userType: 'INFOMANAGER',
        universityId: universityId,
      });

    expect(response.status).toBe(201);
    expect(response.body.userType).toBe('INFOMANAGER');

    infoManagerId = response.body.id;

    const response2 = await request(app)
      .get(`/api/v1/user/${universityId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response2.status).toBe(200);
    expect(response2.body.infomanagers).toContainEqual(infoManagerId);
  });

  it('should modify a info manager user', async () => {
    const response = await request(app)
      .patch(`/api/v1/user/${infoManagerId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send({
        name: 'Micheal',
        email: 'micheal.lee@example.com',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Micheal');
    expect(response.body.email).toBe('micheal.lee@example.com');
  });

  it('should view a info manager users by id', async () => {
    const response = await request(app)
      .get(`/api/v1/user/infomanagers`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(
      response.body.some(
        (infoManager: any) => infoManager.id === infoManagerId,
      ),
    ).toBe(true);
  });

  it('should delete a info manager user', async () => {
    const response = await request(app)
      .delete(`/api/v1/user/${infoManagerId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });

  it('should create a viewer acount', async () => {
    const response = await request(app)
      .post('/api/v1/user/')
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send({
        name: 'Nicolas',
        last_name: 'Quintana',
        email: 'nicolas.quintana@exmaple.com',
        password: 'password123',
        userType: 'VIEWER',
      });

    expect(response.status).toBe(201);
    expect(response.body.userType).toBe('VIEWER');

    viewerId = response.body.id;
  });

  it('should view all viewer users by university id', async () => {
    const response = await request(app)
      .get(`/api/v1/user/viewers`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.some((viewer: any) => viewer.id === viewerId)).toBe(
      true,
    );
  });

  it('should modify a viewer user', async () => {
    const response = await request(app)
      .patch(`/api/v1/user/${viewerId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send({
        name: 'Alejandro',
        email: 'alejandro.quintana@example.com',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Alejandro');
    expect(response.body.email).toBe('alejandro.quintana@example.com');
  });

  it('should delete a viewer user', async () => {
    const response = await request(app)
      .delete(`/api/v1/user/${viewerId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });
});

afterAll(async () => {
  const response = await request(app)
    .delete(`/api/v1/user/${universityId}`)
    .set('Authorization', `Bearer ${accessTokenCookie}`);
  expect(response.status).toBe(200);
  await database.disconnect();
});
