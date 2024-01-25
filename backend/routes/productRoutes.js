const express = require('express')
const router = express.Router()

const { getProducts, postProduct, getSingleProduct,filterByCategory} = require('../controllers/productControllers')
const authentication = require('../middleware/authentication')

router.get('/', (req, res , next) => {
    const { category, status } = req.query;
    
    if(category || status){
        filterByCategory(req, res ,next)
    }else{
        getProducts(req, res, next)
    }
})

router.get('/:id', getSingleProduct)

router.use(authentication)
router.post('/', postProduct)

module.exports = router