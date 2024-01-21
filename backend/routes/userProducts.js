const express = require('express')
const router = express.Router()

const authentication = require('../middleware/authentication')
const {getUserProduct ,deleteUserProduct} = require('../controllers/productControllers')


router.use(authentication)
router.get('/',getUserProduct)
router.delete('/:id',deleteUserProduct)

module.exports = router