const expect = require('expect');
const request = require('supertest');

const { app } = require('../app');
const { User } = require('../models/user.model');
const { users, populateUsers } = require('./seed/seed.users');

beforeEach(populateUsers);

describe('Users', () => {
  describe('POST /users', () => {
    it('should create a new user', (done) => {
      const data = {
        email: 'name@mail.com',
        password: 'strongPassword',
      };

      request(app)
        .post('/users')
        .send(data)
        .expect(201)
        .expect((res) => {
          expect(res.body.email).toBe(data.email);
        })
        .end((err) => {
          if (err) {
            return done(err);
          }

          User.findOne({ email: data.email })
            .then((user) => {
              expect(user).toExist();
              expect(user.password).toNotBe(data.password);
              done();
            })
            .catch(e => done(e));
        });
    });

    it('should not create a user with invalid data', (done) => {
      const invalidData = {
        email: 'email',
        password: '123',
      };

      request(app)
        .post('/users')
        .send(invalidData)
        .expect(400)
        .end(done);
    });

    it('should not create a user with non-unique email address', (done) => {
      const data = {
        email: users[0].email,
        password: 'some new password',
      };

      request(app)
        .post('/users')
        .send(data)
        .expect(400)
        .expect((res) => {
          expect(res.body.code).toBe(11000); // 11000 - Mongoose duplicate error code
        })
        .end(done);
    });
  });

  describe('GET /users/current', () => {
    it('should return a current user if authenticated', (done) => {
      request(app)
        .get('/users/current')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
          expect(res.body).toInclude({
            _id: users[0]._id,
            email: users[0].email,
          });
        })
        .end(done);
    });

    it('should return 401 if not authenticated', (done) => {
      request(app)
        .get('/users/current')
        .expect(401)
        .expect((res) => {
          expect(res.body).toNotExist();
        })
        .end(done);
    });
  });

  describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
      const credentials = {
        email: users[1].email,
        password: users[1].password,
      };

      request(app)
        .post('/users/login')
        .send(credentials)
        .expect(200)
        .expect((res) => {
          expect(res.headers['x-auth']).toExist();
          expect(res.body.email).toBe(credentials.email);
        })
        .end(done);
    });

    it('should not login user and not return auth token with invalid credentials', (done) => {
      const credentials = {
        email: users[1].email,
        password: 'invalidPassword',
      };

      request(app)
        .post('/users/login')
        .send(credentials)
        .expect(400)
        .expect((res) => {
          expect(res.headers['x-auth']).toNotExist();
        })
        .end(done);
    });
  });
});

