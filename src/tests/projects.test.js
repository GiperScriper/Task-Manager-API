const expect = require('expect');
const request = require('supertest');

const { app } = require('../app');
const { Project } = require('../models/project.model');

const projects = [
  { title: 'project #1' },
  { title: 'project #2' },
  { title: 'project #3' },
  { title: 'project #4' },
  { title: 'project #5' },
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

  describe('GET /projects', () => {
    it(`should return project with title ${projects[2].title}`, (done) => {
      request(app)
        .get('/projects/:id')
        .expect(200)
        .expect((project) => {
          expect(project.title).toBeA(projects[2].title);
        })
        .end(done);
    });
  });
});


