import supertest from 'supertest';
import app from './app';

describe('The root path', () => {
  test('should respond with 200 on GET', () => supertest(app).get('/').then(response => {
    expect(response.statusCode).toBe(200);
  }));
});
