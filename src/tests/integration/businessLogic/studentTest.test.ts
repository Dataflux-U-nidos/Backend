import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
});

describe('Integration tests student test', () => {
  it('should get vocational test', async () => {
    const response = await request(app).get('/api/v1/student-test/vocational');
    expect(response.status).toBe(200);
  });

  it('should get psychometric test', async () => {
    const response = await request(app).get(
      '/api/v1/student-test/psychometric',
    );
    expect(response.status).toBe(200);
  });

  it('should get partial vocational test', async () => {
    const response = await request(app).get(
      '/api/v1/student-test/vocational-partial',
    );
    expect(response.status).toBe(200);
  });
});
