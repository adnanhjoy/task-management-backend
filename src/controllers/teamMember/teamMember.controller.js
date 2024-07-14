const pool = require("../../../config/db");
const { v4: uuidv4 } = require('uuid');

//get all team members
const getAllTeamMembers = async (req, res) => {
    try {
        res.status(200).json({
            data: "hello Data"
        });
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
}


//post team member
const addTeamMembers = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const id = uuidv4();
        const newMembers = await pool.query(
            "INSERT INTO teammembers (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [id, name, email, password, role]
        );

        res.status(200).json({
            data: newMembers.rows
        });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
};

module.exports = {
    getAllTeamMembers,
    addTeamMembers
}