const bcrypt = require('bcryptjs');
const pool = require('../db')

exports.addUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net)$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const userExists = await pool.query("SELECT * FROM account WHERE username = $1 OR email = $2", [username, email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const results = await pool.query(
            "INSERT INTO account (username, password, email) VALUES ($1, $2, $3) RETURNING *",
            [username, hashedPassword, email]
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
        if (user.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
}

exports.updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;


        const updatedUser = await pool.query(
            "UPDATE account SET username = $1, email = $2 WHERE account_id = $3 RETURNING *",
            [username, email, id]
        );

        if (updatedUser.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            status: "success",
            data: {
                account: updatedUser.rows[0]
            }
        });
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

