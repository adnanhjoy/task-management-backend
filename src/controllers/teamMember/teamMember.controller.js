const pool = require("../../../config/db");
const { v4: uuidv4 } = require('uuid');

//get all team members
const getAllTeamMembers = async (req, res) => {
    try {
        const allMembers = await pool.query(
            "SELECT * FROM teammembers"
        )
        res.status(200).json({
            data: allMembers.rows
        });
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
}


const getSingleTeamMember = async (req, res) => {
    try {
        const { id } = req.params;

        const member = await pool.query(
            "SELECT * FROM teammembers WHERE id=$1",
            [id]
        )

        res.status(200).json({
            message: 'Success',
            data: member.rows
        })
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


//delete team member

const deleteTeamMembers = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const deleteMembers = await pool.query(
            'DELETE FROM teammembers WHERE id = $1 RETURNING *',
            [id]
        );

        res.status(200).json({
            message: 'Successfully deleted',
            data: deleteMembers.rows
        });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
}



// update team members 

const updateTeamMembers = async (req, res) => {
    // try {
    //     const {id} = req.params;
    //     const { name, email, password, role } = req.body;
    //     const newMembers = await pool.query(
    //         "INSERT INTO teammembers (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    //         [id, name, email, password, role]
    //     );

    //     res.status(200).json({
    //         data: newMembers.rows
    //     });
    // } catch (error) {
    //     res.status(500).json({
    //         error: "There was a server side error"
    //     })
    // }
}


module.exports = {
    getAllTeamMembers,
    getSingleTeamMember,
    addTeamMembers,
    deleteTeamMembers,
    updateTeamMembers
}