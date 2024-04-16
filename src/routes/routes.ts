const express = require('express')
const routes = express.Router()
const ChatRoutes = require('./chatsRoutes')
const MessagesRoutes = require('./MessagesRoutes')

routes.use('/', ChatRoutes)
routes.use('/', MessagesRoutes)

module.exports = routes
