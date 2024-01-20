const express = require('express')
const router = express.Router()

const authentication = require('../middleware/authentication')
const {getUserProduct} = require('../controllers/productControllers')


router.use(authentication)
router.get('/',getUserProduct)

module.exports = router