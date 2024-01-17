const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
} , {timestamps:true})

module.exports = mongoose.model('Product' ,productSchema)