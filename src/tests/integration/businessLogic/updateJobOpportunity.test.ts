import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
});

let accessTokenCookie: string;

describe('update Job Opportunity', () => {
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

  it('should return a list of job opportunities and store one ID', async () => {
    const response = await request(app)
      .get('/api/v1/opportunity/')
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    jobOpportunityId = response.body[0].id;
  });

  it('should update a job opportunity', async () => {
    const updatePayload = {
      name: 'Project Manager',
      description:
        'Oversee project execution and team coordination. Lead cross-functional…',
    };

    const response = await request(app)
      .patch(`/api/v1/opportunity/${jobOpportunityId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send(updatePayload);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Project Manager');
    expect(response.body).toHaveProperty(
      'description',
      'Oversee project execution and team coordination. Lead cross-functional…',
    );
  });
});

afterAll(async () => {
  await database.disconnect();
});
