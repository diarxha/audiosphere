const express = require('express')
const router = express.Router()
const songController = require('../controllers/songController')

router.post('/songs', songController.addSong)
router.get('/songs', songController.getAllSongs)
router.get('/songs/:id', songController.getSongById)
router.put('/songs/:id', songController.updateSongById)
router.delete('/songs/:id', songController.deleteSongById)

module.exports = router