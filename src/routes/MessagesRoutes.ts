const express = require('express')
const messageRoutes = express.Router();
const MessagesController = require('../controllers/MessagesController') 

messageRoutes.post('/getMessages', MessagesController.getMessages)
messageRoutes.post('/sendMessage', MessagesController.sendMessage)

module.exports = messageRoutes

export{}