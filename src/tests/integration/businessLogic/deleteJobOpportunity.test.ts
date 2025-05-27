import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
});

let accessTokenCookie: string;

describe('create and delete Job Opportunity', () => {
  let jobOpportunityId: string;

  it('should login as ADMIN', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'tesis@gmail.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('ADMIN');
    accessTokenCookie = response.body.accessToken;
  });

  it('should create a new job opportunity', async () => {
    const newJob = {
      name: 'Content Creator',
      description:
        'Produce engaging content for various platforms. Create blog posts, videos, etc.',
      salary: 600000,
    };

    const response = await request(app)
      .post('/api/v1/opportunity')
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send(newJob);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    jobOpportunityId = response.body.id;
  });

  it('should delete the created job opportunity', async () => {
    const response = await request(app)
      .delete(`/api/v1/opportunity/${jobOpportunityId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message.toLowerCase()).toMatch(/eliminad[ao]/);
  });
});

afterAll(async () => {
  await database.disconnect();
});
