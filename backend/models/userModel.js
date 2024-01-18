const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


userSchema.statics.register = async function (email, password) {

    if (!email || !password) {
        throw Error('please fill out all fields')
    }
    if (!validator.isEmail(email)) {
        throw Error('not a valid email')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('not a strong password')
    }


    const exist = await this.findOne({ email })
    if (exist) {
        throw Error('email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}
        



userSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw Error('please fill out all fields')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('incorrect email')
    }

    const compare = await bcrypt.compare(password, user.password)

    if (!compare) {
        throw Error('incorrect password')
    }

    return user

}


module.exports = mongoose.model('User', userSchema)