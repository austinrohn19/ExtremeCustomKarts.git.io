const mongoose = require('mongoose');
const validator= require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//this is a built in package so it does not have to be installed in the package.json
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    //user name is being created
    name: {
        type: String ,
        required: [true, 'Please enter your name.'],
        maxlength: [30, 'your name cant exceed 30 characters']
    },
    //email of the user for validation and setting up of the account
    email: {
        type: String, 
        required: [true, 'Please enter your email address'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address.']
    }, 
    //password the user sets
    password: {
        type: String ,
        required: [true, 'Please enter your password'],
        minlength: [8, 'your password must be at least 8 characters.'],
        select: false
    },
    //this is the id and url of the image because we are using cloudary to store our photos in
    avatar: {
        public_id: {
            type: String ,
            requires: true
        },
        url: {
            type: String,
            required: true
        }
    },
    //default setting that is being created
    role: {
        type: String ,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken

}

module.exports = mongoose.model('User', userSchema);