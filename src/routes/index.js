const teamMember = require("../controllers/teamMember/teamMember.route");
const project = require("../controllers/project/project.router");

const router = require("express").Router();

const defaultRoutes = [
    {
        path: "/team",
        handler: teamMember,
    },
    {
        path: "/project",
        handler: project,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.handler);
});

module.exports = router;
