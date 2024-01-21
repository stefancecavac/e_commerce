const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const authentication = async(req , res , next) => {
    
    const {authorization} = req.headers

    if(!authorization) {
        res.status(400).json({message:' authorization token required'})
    }
    const token = authorization.split(' ')[1]
    
    
    try{
        const{_id} = jwt.verify(token , process.env.SECRET)
        req.user = await User.findOne({_id}).select('_id')
   
        next()
     }
     catch(error){
        res.status(401).json({message: 'not authorized'})
     }
    
}

module.exports = authentication