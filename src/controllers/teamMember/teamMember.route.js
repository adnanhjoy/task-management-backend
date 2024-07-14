const express = require('express')
const teamMemberController = require("./teamMember.controller");

const router = express.Router();

//Get all members
router.get('/', teamMemberController.getAllTeamMembers);
router.post('/', teamMemberController.addTeamMembers);

module.exports = { teamMemberRouter } = router