const express = require('express')
const projectController = require("./project.controller");

const router = express.Router();

//add project
router.post('/', projectController.createProject);

//get all project
router.get('/', projectController.getAllProject);


//get single project
router.get('/:id', projectController.getSingleProject);


//delete project
router.delete('/:id', projectController.deleteProjet);


//update project
router.put('/:id', projectController.updateProjects);


//team and project
router.post('/teamProject', projectController.assignTeamToProject);


//team and project
router.get('/:id/team-members', projectController.getProjectWithTeamMembers);


router.get('/:id/members', projectController.getTeamMembersWithProjects);

module.exports = { projectRouter } = router