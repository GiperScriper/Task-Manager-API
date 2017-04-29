// Controllers
const projectController = require('../controllers/project.controller');
const router = require('express').Router();

const API = {
  projects: '/projects',
  projectsId: '/projects/:id',
};

router.get(API.projects, projectController.getProjects);
router.post(API.projects, projectController.createProject);
router.get(API.projectsId, projectController.getProjectById);
router.delete(API.projectsId, projectController.deleteProjectById);
router.put(API.projectsId, projectController.updateProjectById);

module.exports = router;
