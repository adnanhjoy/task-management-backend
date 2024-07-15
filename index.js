const express = require('express');
const router = require('./src/routes');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());


app.use('/v1', router)

app.get('/', async (req, res) => {
    res.send('Server is runnig')
})

app.listen(PORT, () => {
    console.log(`App listening port ${PORT}`)
})