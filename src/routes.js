const express = require('express')
const router = express.Router();
const homeController = require('./app/controllers/home/homeController')
const authMiddleware = require('./app/middleware/auth')


router.use(authMiddleware)

router.post('/home', homeController.listDeck)


module.exports = router