const expect = require('expect');
const request = require('supertest');

const { app } = require('../app');
const { Project } = require('../models/project.model');
const { ObjectId } = require('mongoose').Types;
const { projects, populateProjects } = require('./seed/seed.projects');
const { users } = require('./seed/seed.users');

beforeEach(populateProjects);

describe('Projects', () => {
  describe('POST /projects', () => {
    it('should create a new project', (done) => {
      const data = {
        title: 'test project',
        description: 'test description',
      };

      request(app)
        .post('/projects')
        .set('x-auth', users[0].tokens[0].token)
        .send(data)
        .expect(201)
        .expect((res) => {
          expect(res.body).toInclude(data);
        })
        .end(done);
    });

    it('should not create a project with invalid data', (done) => {
      request(app)
        .post('/projects')
        .set('x-auth', users[0].tokens[0].token)
        .send({})
        .expect(400)
        .end(done);
    });
  });

  describe('GET /projects', () => {
    it('should return array of 5 projects', (done) => {
      request(app)
        .get('/projects')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeA('array');
          expect(res.body.data.length).toBe(5);
        })
        .end(done);
    });
  });

  describe('GET /projects/:id', () => {
    it('should return project with valid id', (done) => {
      request(app)
        .get(`/projects/${projects[0]._id.toString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.title).toBe(projects[0].title);
        })
        .end(done);
    });

    it('should return 404 if project not found', (done) => {
      const projectId = new ObjectId().toString();
      request(app)
        .get(`/projects/${projectId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for invalid ids', (done) => {
      const invalidId = '1234567890';
      request(app)
        .get(`/projects/${invalidId}`)
        .expect(404)
        .end(done);
    });
  });

  describe('DELETE /projects/:id', () => {
    it('should remove project with valid id', (done) => {
      const projectId = projects[0]._id.toString();
      request(app)
        .delete(`/projects/${projectId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toInclude(projects[0]);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Project.findById(projectId).then((response) => {
            expect(response).toNotExist();
            done();
          })
          .catch(e => done(e));
        });
    });

    it('should return 404 if project not found', (done) => {
      const projectId = new ObjectId().toString();
      request(app)
        .delete(`/projects/${projectId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for invalid ids', (done) => {
      const invalidId = '1234567890';
      request(app)
        .delete(`/projects/${invalidId}`)
        .expect(404)
        .end(done);
    });
  });

  describe('PUT /projects/:id', () => {
    it('should update title project property', (done) => {
      const projectId =  projects[0]._id.toString();
      const data = { title: 'updated title' };
      request(app)
        .put(`/projects/${projectId}`)
        .send(data)
        .expect(200)
        .expect((res) => {
          expect(res.body.title).toBe(data.title);
        })
        .end((err) => {
          if (err) {
            return done(err);
          }
          Project.findById(projectId).then((project) => {
            expect(project.title).toBe(data.title);
            done();
          });
        });
    });

    it('should return 404 for invalid ids', (done) => {
      const invalidId = '1234567890';
      const data = { title: 'updated title' };
      request(app)
        .put(`/projects/${invalidId}`)
        .send(data)
        .expect(404)
        .end(done);
    });

    it('should return 404 if project not found', (done) => {
      const projectId = new ObjectId().toString();
      const data = { title: 'updated title' };
      request(app)
        .put(`/projects/${projectId}`)
        .send(data)
        .expect(404)
        .end(done);
    });
  });
});
