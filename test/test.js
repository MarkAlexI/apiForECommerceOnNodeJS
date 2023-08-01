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

describe('Testing POST endpoint', () => {
  const payload = {
    "name": "Cat",
    "price": 50,
    "quantity": 5,
    "image": "h6fg,g7"
  };

  it('Respond with valid HTTP status code from /product', async () => {
    request
      .post('/product')
      .send(payload)
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

describe('Testing PUT endpoint', () => {
  const payload = {
    "name": "Qwerty",
    "price": 2,
    "quantity": 100,
    "image": "dff/hhhj.njg"
  };

  it('Respond with valid HTTP status code', () => {
    request
      .put('/product/6b8472b3-abed-40dd-9c5d-ddf0e5c2d3c8')
      .send(payload)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.error('Error PUT-request: ', err);
        } else {
          console.log('Successful PUT-request: ', res.body);
        }
      });
  });
});

describe('Testing DELETE endpoint', () => {
  const userId = '6b8472b3-abed-40dd-9c5d-ddf0e5c2d3c8';

  it('Have respond from server', () => {
    request
      .delete(`/product/${userId}`)
      .end((err, res) => {
        if (err) {
          console.error('Error DELETE-request: ', err);
        } else {
          console.log('Successful DELETE-request: ', res.body);
        }
      });
  });
});
