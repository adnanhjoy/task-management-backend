const express = require('express')
const projectController = require("./project.controller");

const router = express.Router();

//add project
router.post('/', projectController.createProject);

module.exports = { projectRouter } = router