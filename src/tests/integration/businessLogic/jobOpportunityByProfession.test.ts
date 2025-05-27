import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

let accessTokenCookie: string;
beforeAll(async () => {
  await database.connect();
  const response = await request(app).post('/api/v1/auth/login').send({
    email: 'tesis@gmail.com',
    password: 'password123',
  });
  expect(response.statusCode).toBe(200);
  accessTokenCookie = response.body.accessToken;
});

describe('Add Job opportunity by mayor', () => {
  it('modify a job oportinity do add a mayor', async () => {
    const response = await request(app)
      .patch('/api/v1/major/job-opportunities/6830abcd1234e56789f01260')
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send({
        jobOpportunityId: '6830abcd1234e56789f01271',
      });
    expect(response.statusCode).toBe(200);
  });
});
