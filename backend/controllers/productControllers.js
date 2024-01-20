const Product = require('../models/productMode')
const mongoose = require('mongoose')

const getProducts = async(req , res) => {
    try{ 
        const product = await Product.find({}).sort({createdAt: -1})
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

const getSingleProduct = async(req , res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: 'not a valid ID'})
    }

    try{
        const product = await Product.findById({_id :id})
        if(!product){
            return res.status(400).json({message: 'no such product'})
        }
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json({error: error.message})

    }

}

const getUserProduct = async(req , res) => {

    try{
        const userid = req.user._id
        const product = await Product.find({userid})
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json({error: message.error})
    }
}

const postProduct = async(req , res) => {
    const {title, description,  price } = req.body

    if(!title || !description ||  !price){
       return res.status(400).json({message: 'please fill out all fields'})
    }

    try{
        const userid = req.user._id
        const product = await Product.create({title, description,  price , userid})
        res.status(201).json(product)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {getProducts , postProduct ,getSingleProduct ,getUserProduct}