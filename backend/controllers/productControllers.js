const Product = require('../models/productMode')
const mongoose = require('mongoose')
const User = require('../models/userModel')

const getProducts = async (req, res) => {
    try {
        
        const product = await Product.find({}).sort({ createdAt: -1 })

        res.status(200).json(product)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const getSingleProduct = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'not a valid ID' })
    }

    try {
        const product = await Product.findById({ _id: id }).populate('userid' ,'email')
        if (!product) {
            return res.status(400).json({ message: 'no such product' })
        }
        res.status(200).json(product)
    }
    catch (error) {
        res.status(500).json({ error: error.message })

    }

}

const getUserProduct = async (req, res) => {

    try {
        const userid = req.user._id
        const product = await Product.find({ userid })
        res.status(200).json(product)
    }
    catch (error) {
        res.status(500).json({ error: message.error })
    }
}

const filterProducts = async(req , res) => {
    try{
        
        const { category , status ,search} = req.query

        const filterObject = {};

        if (category) {
            filterObject.category = category;
        }

        if (status) {
            filterObject.status = status;
        }
        if (search) {
            filterObject.$text = { $search: search };
        }

        console.log('Received Category:', category)
        const product = await Product.find(filterObject).sort({createdAt: -1})
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

const postProduct = async (req, res) => {
    const { title, description, price , category ,images , status}  = req.body

    if (!title || !description || !price  || !category || !images || !status)  {
        return res.status(400).json({ error: 'please fill out all fields' })
    }

    try {
        const userid = req.user._id
        const product = await Product.create({ title, description, price, userid, category ,images , status})
        res.status(201).json(product)
        console.log(product)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteUserProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Not a valid ID' })
    }

    try {
        const userId = req.user._id

    
        const product = await Product.findOneAndDelete({ _id: id, userid: userId })

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
};
module.exports = { getProducts, postProduct, getSingleProduct, getUserProduct ,deleteUserProduct ,filterProducts}