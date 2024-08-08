const bcrypt = require('bcryptjs');
const pool = require('../db');
const jwtGenerator = require("../utils/jwtGenerator");

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const userQuery = await pool.query("SELECT * FROM account WHERE email = $1", [email]);
        if (userQuery.rowCount === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = userQuery.rows[0];

        // Verify the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT using jwtGenerator
        const token = jwtGenerator(user.account_id);

        // Return the JWT token
        res.status(200).json({ 
            message: "Login successful",
            token 
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
};
