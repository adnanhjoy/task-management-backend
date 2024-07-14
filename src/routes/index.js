const teamMember = require("../controllers/teamMember/teamMember.route");

const router = require("express").Router();

const defaultRoutes = [
    {
        path: "/team",
        handler: teamMember,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.handler);
});

module.exports = router;
