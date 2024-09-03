const pool = require("../../../config/db");
const { v4: uuidv4 } = require('uuid');

const createProject = async (req, res) => {
    try {
        const { name, color, status } = req.body;
        const id = uuidv4();
        const newProject = await pool.query(
            "INSERT INTO project (id, name, color, status) VALUES ($1, $2, $3, $4) RETURNING *",
            [id, name, color, status]
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

//get single project
const getSingleProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await pool.query(
            "SELECT * FROM project WHERE id=$1",
            [id]
        )

        res.status(200).json({
            message: 'Success',
            data: project.rows
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
        const { name, color, status } = req.body;

        let fields = [];
        let values = [id];
        let index = 2;

        if (name) {
            fields.push(`name = $${index}`);
            values.push(name);
            index++;
        }
        if (color) {
            fields.push(`color = $${index}`);
            values.push(color);
            index++;
        }
        if (status) {
            fields.push(`status = $${index}`);
            values.push(status);
            index++;
        }

        const query = `UPDATE project SET ${fields.join(', ')} WHERE id = $1 RETURNING *`;

        const updateProject = await pool.query(query, values);

        res.status(200).json({
            data: updateProject.rows
        });
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error"
        });
    }
};



// relation team and projects 
const assignTeamToProject = async (req, res) => {
    try {
        const { projectId, teamMemberId } = req.body;

        await pool.query(
            "INSERT INTO project_teammembers (project_id, teammember_id) VALUES ($1, $2)",
            [projectId, teamMemberId]
        );

        res.status(200).json({
            message: "Team members successfully assigned to project"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "There was a server side error"
        });
    }
};



// get team members project
const getProjectWithTeamMembers = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await pool.query(
            `SELECT * FROM project WHERE id = $1`,
            [id]
        );

        if (project.rows.length === 0) {
            return res.status(404).json({
                error: "Project not found"
            });
        }

        const teamMembers = await pool.query(
            `SELECT tm.* FROM teammembers tm
            INNER JOIN project_teammembers ptm ON tm.id = ptm.teammember_id
            WHERE ptm.project_id = $1`,
            [id]
        );

        res.status(200).json({
            project: project.rows[0],
            teamMembers: teamMembers.rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "There was a server side error"
        });
    }
};





module.exports = {
    createProject,
    getAllProject,
    getSingleProject,
    deleteProjet,
    updateProjects,
    assignTeamToProject,
    getProjectWithTeamMembers
}