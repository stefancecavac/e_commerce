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
    },
    status:{
        type:String,
        enum: ['new' , 'used'],
        required: true
    }

}, { timestamps: true })

productSchema.index({title: 'text'})

module.exports = mongoose.model('Product', productSchema)