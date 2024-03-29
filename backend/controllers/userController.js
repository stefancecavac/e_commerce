const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id ) => {
    return jwt.sign({_id : _id} , process.env.SECRET, {expiresIn: '1d'})
}

const loginUser = async(req, res) => {
    const{email, password} = req.body

    try{
        const user = await User.login(email , password)
        const token = createToken(user._id)

        res.status(200).json({...user.toObject(), token})
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

const registerUser = async(req, res) => {
    const{email, password} = req.body

    try{
        const user = await User.register(email , password)
        const token = createToken(user._id)
        res.status(201).json({...user.toObject(), token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginUser, registerUser}