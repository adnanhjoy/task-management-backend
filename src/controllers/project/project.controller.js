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
        console.error(error)
        res.status(500).json({
            error: "There was a server side error"
        });
    }
};



//get all project
const getAllProject = async (req, res) => {
    try {
        const allProjects = await pool.query(
            "SELECT * FROM project"
        )

        res.status(200).json({
            data: allProjects.rows,
            message: "Success"
        })

    } catch (error) {
        res.status(500).json({
            error: "There was a server side error"
        })
    }
}



//delete project
const deleteProjet = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProject = await pool.query(
            'DELETE FROM project WHERE id = $1 RETURNING *',
            [id]
        );

        res.status(200).json({
            message: 'Successfully deleted',
            data: deleteProject.rows
        });
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error"
        })
    }
}


// update project

const updateProjects = async (req, res) => {
    try {
        const { id } = req.params;
        const {  name, color, status, teammembers } = req.body;
        const updateProject = await pool.query(
            "UPDATE project SET name = $2, color = $3, status = $4, teammembers = $5 WHERE id = $1 RETURNING *",
            [id,  name, color, status, teammembers]
        );

        res.status(200).json({
            data: updateProject.rows
        });
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error"
        })
    }
}



module.exports = {
    createProject,
    getAllProject,
    deleteProjet,
    updateProjects
}