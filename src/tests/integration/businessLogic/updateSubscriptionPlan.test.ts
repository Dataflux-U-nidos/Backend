import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
});

let accessTokenCookie: string;
let subscriptionId = '681784e3194c1091fdd8f805';

describe('Update subscription plan by a finances user', () => {
  it('should modify a subscription plan by a finances user', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'marcela.valencia@gmail.com',
      password: 'password123',
    });
    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('FINANCES');
    accessTokenCookie = response.body.accessToken;

    const response2 = await request(app)
      .patch(`/api/v1/subscription-plan/${subscriptionId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send({
        cost: 9.99,
        benefits: [
          'Soporte por email',
          'Acceso limitado a reportes',
          'Hasta 2 proyectos activos',
        ],
      });

    expect(response2.statusCode).toBe(200);
    expect(response2.body.cost).toBe(9.99);
    expect(response2.body.benefits).toContain('Acceso limitado a reportes');
  });
});
