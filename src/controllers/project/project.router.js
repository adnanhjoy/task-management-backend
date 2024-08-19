const express = require('express')
const projectController = require("./project.controller");

const router = express.Router();

//add project
router.post('/', projectController.createProject);

//get all project
router.get('/', projectController.getAllProject);


//delete project
router.delete('/:id', projectController.deleteProjet);

module.exports = { projectRouter } = router