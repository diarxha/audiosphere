require('dotenv').config();
const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.post("/adduser", (req, res) => {
    console.log(req.body)
    res.send("Response Received: " + req.body)
})

const port = process.env.PORT
app.listen(port, () => console.log("Server on localhost:" + port))