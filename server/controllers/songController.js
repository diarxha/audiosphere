const pool = require('../db')

exports.addSong = async (req, res) => {
    try {
        const { title, artist, duration, genre, file_path, album_id } = req.body;
        const results = await pool.query(
            "INSERT INTO song (title, artist, duration, genre, file_path, album_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [title, artist, duration, genre, file_path, album_id]
        );
        res.status(201).json({
            status: "success",
            data: {
                song: results.rows[0]
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
}

exports.getAllSongs = async (req, res) => {
    try {
        const allSongs = await pool.query("SELECT * FROM song");
        res.json(allSongs.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
}

exports.getSongById = async (req, res) => {
    try {
        const { id } = req.params;
        const song = await pool.query("SELECT * FROM song WHERE song_id = $1", [id]);
        res.json(song.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
}

exports.updateSongById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, artist, duration, genre, file_path, album_id } = req.body;
        const results = await pool.query(
            "UPDATE song SET title = $1, artist = $2, duration = $3, genre = $4, file_path = $5, album_id = $6 WHERE song_id = $7 RETURNING *",
            [title, artist, duration, genre, file_path, album_id, id]
        );
        res.status(200).json({
            status: "success",
            data: {
                song: results.rows[0]
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
}

exports.deleteSongById = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await pool.query("DELETE FROM song WHERE song_id = $1 RETURNING *", [id]);
        if (results.rowCount === 0) {
            return res.status(404).json({ message: "Song not found" });
        }
        res.status(200).json({
            status: "success",
            data: {
                song: results.rows[0]
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
}