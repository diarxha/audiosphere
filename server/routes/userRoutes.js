const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/addusers', userController.addUser)
router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.getUserById)
router.put('/users/:id', userController.updateUserById)
router.delete('/songs/:id', userController.deleteUserById)

module.exports = router