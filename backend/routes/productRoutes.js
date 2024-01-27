const express = require('express')
const router = express.Router()

const { getProducts, postProduct, getSingleProduct,filterProducts} = require('../controllers/productControllers')
const authentication = require('../middleware/authentication')

router.get('/', (req, res , next) => {
    const { category, status , search } = req.query;
    
    if(category || status || search){
        filterProducts(req, res ,next)
    }else{
        getProducts(req, res, next)
    }
})

router.get('/:id', getSingleProduct)

router.use(authentication)
router.post('/', postProduct)

module.exports = router