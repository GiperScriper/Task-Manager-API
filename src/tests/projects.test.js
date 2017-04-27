const expect = require('expect');
const request = require('supertest');

const { app } = require('../app');
const { Project } = require('../models/project.model');
const { ObjectId } = require('mongoose').Types;

const projects = [
  { _id: new ObjectId(), title: 'project #1' },
  { _id: new ObjectId(), title: 'project #2' },
  { _id: new ObjectId(), title: 'project #3' },
  { _id: new ObjectId(), title: 'project #4' },
  { _id: new ObjectId(), title: 'project #5' },
];

beforeEach((done) => {
  Project.remove({})
  .then(() => {
    Project.insertMany(projects);
  })
  .then(() => done());
});

describe('Projects endpoints', () => {
  describe('POST /projects', () => {
    it('should create a new project', (done) => {
      const data = {
        title: 'test project',
        description: 'test description',
      };

      request(app)
        .post('/projects')
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
          expect(res.body).toBeA('array');
          expect(res.body.length).toBe(5);
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
});
