const express = require('express')
const router = express.Router()

const {getProducts , postProduct} = require('../controllers/productControllers')

router.get('/', getProducts)
router.post('/', postProduct)

module.exports = router