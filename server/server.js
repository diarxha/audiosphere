require('dotenv').config();
const express = require("express")
const db = require("./db")
const app = express()
const cors = require("cors")

const songRoutes = require('./routes/songRoutes')
const userRoutes = require('./routes/userRoutes')

app.use(express.json())
app.use(cors())

app.use('/api', userRoutes);
app.use('/api', songRoutes);

const port = process.env.PORT
app.listen(port, () => console.log("Server on localhost:" + port))