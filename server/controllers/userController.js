const pool = require('../db')

exports.addUser = async (req, res) => {
    try {
        const results = await pool.query(
            "INSERT INTO account (username, password, email) VALUES ($1, $2, $3) RETURNING *",
            [req.body.username, req.body.password, req.body.email]
        );
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                account: results.rows[0]
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM account");
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM account WHERE account_id = $1", [id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
}

exports.updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM account WHERE account_id = $1", [id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await pool.query("DELETE FROM account WHERE account_id = $1 RETURNING *", [id]);
        if (results.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            status: "success",
            data: {
                account: results.rows[0]
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
}