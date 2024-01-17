const Product = require('../models/productMode')


const getProducts = async(req , res) => {
    try{ 
        const product = await Product.find({}).sort({createdAt: '-1'})
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

const postProduct = async(req , res) => {
    const {title, description, date, price} = req.body

    if(!title || !description || !date || !price){
        res.status(400).json({message: 'please fill out all fields'})
    }

    try{
        const product = await Product.create({title, description, date, price})
        res.status(201).json(product)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {getProducts , postProduct}