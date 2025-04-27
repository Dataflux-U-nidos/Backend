import request from 'supertest';
import { database } from '../../../infrastructure';
import { app } from '../../../server';

beforeAll(async () => {
  await database.connect();
});

let accessTokenCookie: string;
let educationalInstitutionId: string;
let majorId: string;

describe('Integration tests InfoManager - CRUD', () => {
  it('should login as a infoManager', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'andres.garcia@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body.userType).toBe('INFOMANAGER');
    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([
        expect.stringContaining('accessToken='),
        expect.stringContaining('refreshToken='),
      ]),
    );

    const rawCookies = response.headers['set-cookie'];
    const cookies = Array.isArray(rawCookies) ? rawCookies : [rawCookies];
    accessTokenCookie = cookies
      .find((cookie) => cookie.startsWith('accessToken='))
      ?.split('=')[1]
      ?.split(';')[0];
  });

  it('should create a educational institution', async () => {
    const response = await request(app)
      .post('/api/v1/educational-institution/')
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send({
        name: 'Universidad Pontificia Javeriana',
        location_l: 'Bogota',
        price_range: 'HIGH',
        aceptation_difficulty: 'HARD',
        description: 'Las mejor universidad de Colombia.',
        link: 'https://www.javeriana.edu.co/inicio',
        events: [
          {
            name: 'Feria de admisiones',
            description: 'Evento para resolver dudas sobre la universidad',
            date: '2025-04-10T10:00:00.000Z',
            location: 'Campus Bogotá',
          },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Universidad Pontificia Javeriana');
    educationalInstitutionId = response.body._id;
  });

  it('should create a mayor', async () => {
    const response = await request(app)
      .post('/api/v1/major/')
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send({
        name: 'Artes Visuales',
        institutionId: `${educationalInstitutionId}`,
        difficulty: 'MEDIUM',
        price: 1500000,
        description: 'La mejor carrera de artes visuales del pais.',
        pensumLink: 'https://example.com/pensum',
        jobId: '67d9edbfaad7e918f9806fcf',
        focus: 'Arte y diseño',
      });

    expect(response.status).toBe(201);
    majorId = response.body.id;
  });

  it('should view a educational institution', async () => {
    const response = await request(app)
      .get(`/api/v1/educational-institution/${educationalInstitutionId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Universidad Pontificia Javeriana');
  });

  it('should view a mayor', async () => {
    const response = await request(app)
      .get(`/api/v1/major/${majorId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Artes Visuales');
  });

  it('should modify a educational institution', async () => {
    const response = await request(app)
      .patch(`/api/v1/educational-institution/${educationalInstitutionId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send({
        name: 'Universidad de los Andes',
        location_l: 'Bogota',
        price_range: 'HIGH',
        aceptation_difficulty: 'HARD',
        description: 'La mejor mejor universidad de Colombia.',
        link: 'https://www.uniandes.edu.co/inicio',
      });

    expect(response.status).toBe(200);
  });

  it('should modify a mayor', async () => {
    const response = await request(app)
      .patch(`/api/v1/major/${majorId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`)
      .send({
        name: 'Ingeniera Industria;',
        institutionId: `${educationalInstitutionId}`,
        difficulty: 'EASY',
        price: 1900000,
        description: 'La carrera indusplay',
        pensumLink: 'https://example.com/pensum',
        jobId: '67d9edbfaad7e918f9806fcf',
        focus: 'Proyectos y diseño',
      });
    expect(response.status).toBe(200);
  });

  it('should delete a educational institution', async () => {
    const response = await request(app)
      .delete(`/api/v1/educational-institution/${educationalInstitutionId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
  });

  it('should delete a mayor', async () => {
    const response = await request(app)
      .delete(`/api/v1/major/${majorId}`)
      .set('Authorization', `Bearer ${accessTokenCookie}`);

    expect(response.status).toBe(200);
  });
});
