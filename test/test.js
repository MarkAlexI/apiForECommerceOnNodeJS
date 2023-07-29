let request = require('supertest');
const { expect } = require('expect');
const assert = require('assert');

const app = 'http://localhost:1234';

describe('Testing GET endpoint', () => {
  request = request(app);
  it('Respond with valid HTTP status code from /users', async () => {
    request
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert(response.body.data !== undefined);
      })
      .catch((err) => {
        assert(err === undefined);
      });
  });

  it('Respond with valid HTTP status code from /products', async () => {
    request
      .get('/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert(response.body.data !== undefined);
      })
      .catch((err) => {
        assert(err === undefined);
      });
  });
});
