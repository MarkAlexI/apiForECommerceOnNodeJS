const request = require('supertest');
const { expect } = require('expect');

const app = 'http://localhost:1234';

describe('Testing GET endpoint', () => {
  it('Respond with valid HTTP status code', async () => {
    const response = await request(app)
      .get('/users')

//    expect(response.status.toBe(200));
  //  expext(response.body.status.toBe('success'));
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res) {
        if (err) throw err;
        console.log(res.body);
      });
  });
});
