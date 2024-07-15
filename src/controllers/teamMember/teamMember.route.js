const express = require('express')
const teamMemberController = require("./teamMember.controller");

const router = express.Router();

//Get all members
router.get('/', teamMemberController.getAllTeamMembers);
router.get('/:id', teamMemberController.getSingleTeamMember);
router.post('/', teamMemberController.addTeamMembers);
router.delete('/:id', teamMemberController.deleteTeamMembers);

module.exports = { teamMemberRouter } = router