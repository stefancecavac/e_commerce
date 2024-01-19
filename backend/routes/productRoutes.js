const express = require('express')
const router = express.Router()

const {getProducts , postProduct ,getSingleProduct} = require('../controllers/productControllers')
const authentication = require('../middleware/authentication')

router.get('/', getProducts)
router.get('/:id', getSingleProduct)

router.use(authentication)
router.post('/', postProduct)

module.exports = router