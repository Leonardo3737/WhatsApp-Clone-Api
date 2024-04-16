const express = require('express')
const chatRoutes = express.Router();
const ChatsController = require('../controllers/ChatsController')

chatRoutes.get('/getChats', ChatsController.getChats)

module.exports = chatRoutes
export{}
