const express = require('express')
const projectController = require("./project.controller");

const router = express.Router();

//add project
router.post('/', projectController.createProject);

//get all project
router.get('/', projectController.getAllProject);


//delete project
router.delete('/:id', projectController.deleteProjet);


//update project
router.put('/:id', projectController.updateProjects);


//team and project
router.post('/teamProject', projectController.teamProjects);

module.exports = { projectRouter } = router