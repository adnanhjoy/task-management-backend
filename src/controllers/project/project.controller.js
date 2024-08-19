const pool = require("../../../config/db");
const { v4: uuidv4 } = require('uuid');

const createProject = async (req, res) => {
    try {
        const { name, color, status, teammembers } = req.body;
        const id = uuidv4();
        const newProject = await pool.query(
            "INSERT INTO project (id, name, color, status, teammembers) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [id, name, color, status, teammembers]
        );

        res.status(200).json({
            data: newProject.rows,
            message: "Success"
        });
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error"
        });
    }
};


module.exports = {
    createProject
}