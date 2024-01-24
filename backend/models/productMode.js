const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    images:[{
        type:String,
        required:true
    }],
   
    category: {
        type:String,
        enum: ['electronic', 'furniture', 'automotive', 'other'],
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)