const express = require('express');
const router = require('./src/routes');
const fs = require("fs");
const cors = require('cors')
require('dotenv').config()
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors())

app.use('/v1', router)

app.get('/', async (req, res) => {
    fs.readFile('./src/pages/index.html', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.write(data);
            res.end()
        }
    })
})

app.listen(PORT, () => {
    console.log(`App listening port ${PORT}`)
})