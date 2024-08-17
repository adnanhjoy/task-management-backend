const { v4: uuidv4 } = require('uuid');

const createProject = async (req, res) => {
    try {
        const { name, color, status, teammembers } = req.body;
        const id = uuidv4();
    } catch (error) {
        res.status(200).json({
            error: "There was a server side error"
        })
    }
}

module.exports = {
    createProject
}