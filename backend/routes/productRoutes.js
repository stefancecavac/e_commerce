const express = require('express')
const router = express.Router()

const {getProducts , postProduct ,getSingleProduct} = require('../controllers/productControllers')

router.get('/', getProducts)
router.get('/:id', getSingleProduct)
router.post('/', postProduct)

module.exports = router