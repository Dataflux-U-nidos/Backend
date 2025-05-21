import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
});

let accessTokenCookie: string;
let commentId: string;

describe('Comments on mayors', () => {
  it('should create a comment', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'nicolas.mora@example.com',
      password: 'password123',
    });
    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('STUDENT');
    accessTokenCookie = response.body.accessToken;

    const response2 = await request(app)
      .post('/api/v1/comment')
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send({
        majorId: '680c45b52a902d5f7f1d4f15',
        text: 'Odio la carrera',
      });

    expect(response2.status).toBe(201);
    commentId = response2.body.id;
  });

  it('should delete a comment', async () => {
    const response = await request(app)
      .delete(`/api/v1/comment/${commentId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);
    expect(response.status).toBe(200);
  });
});
