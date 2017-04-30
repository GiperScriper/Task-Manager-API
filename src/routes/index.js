// Controllers
const projectController = require('../controllers/project.controller');
const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { authToken } = require('../middlewares/auth');

const API = {
  users: '/users',
  currentUser: '/users/current',
  login: '/users/login',
  logout: '/users/logout',
  usersId: '/users/:id',
  projects: '/projects',
  projectsId: '/projects/:id',
};

// Create user
router.post(API.users, userController.createUser);
// login
router.post(API.login, userController.login);
// logout
router.delete(API.logout, authToken, userController.logout);

// router.use(AuthToken);
router.get(API.currentUser, authToken, userController.getCurrentUser);

// Projects
router.get(API.projects, projectController.getProjects);
router.post(API.projects, projectController.createProject);
router.get(API.projectsId, projectController.getProjectById);
router.delete(API.projectsId, projectController.deleteProjectById);
router.put(API.projectsId, projectController.updateProjectById);

module.exports = router;
