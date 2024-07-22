require('dotenv').config();
const express = require("express")
const db = require("./db")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.post("/addusers", async (req, res) => {
    try{
        const results = await db.query
            ("INSERT INTO account (username, password, email) VALUES ($1, $2, $3) RETURNING *",
            [req.body.username, req.body.password, req.body.email])
        console.log(results)
        res.status(201).json({
            status:"success",
            data:{
                account: results.rows[0]
            }
        })
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/users", async (req, res) => {
    try{
        const allUsers = await pool.query("SELECT * FROM account") 
        res.json(allUsers.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/users/:id", async (req, res) => {
    try{
        const {id} = req.params
        const user = await pool.query("SELECT * FROM account WHERE account_id = $1", [id]) 
        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.put("/users/:id", async (req, res) => {
    try{
        const {id} = req.params
        const user = await pool.query("SELECT * FROM account WHERE account_id = $1", [id]) 
        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

const port = process.env.PORT
app.listen(port, () => console.log("Server on localhost:" + port))