const pool = require("../../../config/db");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newMembers = await pool.query(
            "INSERT INTO teammembers (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [id, name, email, hashedPassword, role]
        );

        // Generate JWT token
        const token = jwt.sign(
            { id: id, email: email, role: role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            data: newMembers.rows,
            token: token
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
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;
        const newMembers = await pool.query(
            "UPDATE teammembers SET name = $2, email = $3, password = $4, role = $5 WHERE id = $1 RETURNING *",
            [id, name, email, password, role]
        );

        res.status(200).json({
            data: newMembers.rows
        });
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error"
        })
    }
}



const loginMembers = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query(
            "SELECT * FROM teammembers WHERE email = $1",
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.rows[0].id, email: user.rows[0].email, role: user.rows[0].role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ access_token: token, data: user.rows[0] });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: "There was a server side error!" });
    }
};



module.exports = {
    getAllTeamMembers,
    getSingleTeamMember,
    addTeamMembers,
    deleteTeamMembers,
    updateTeamMembers,
    loginMembers
}