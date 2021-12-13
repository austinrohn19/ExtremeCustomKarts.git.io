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
        type: String ,
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
    //date the user was created
    createdAt: {
        type: Date,
        default: Date.now
    },
    //this is to send an email to user ot reset there password, store the token and store the expiring time frame of that token.
    resetPasswordToken:String,
    resetPasswrodExpire:Date
})

// Encrypting password before saving user.
// make sure this has the function here not error function because then we cant use the keyword isModified.
userSchema.pre('save', async function (next) {
    //this means make sure the password is changed if it needed to be changed
    if(!this.isModified('password')) {
        next()
    }

    //10 is the salt value of the pawword or pretty much the strength of the password, 10 is recommended. can go higher.
    this.password= await bcrypt.hash(this.password, 10)
})

//Compare user Password 
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//return JSON web Token
userSchema.methods.getJwtToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

//Generate password reset Token
userSchema.methods.getResetPasswordToken = function() {
    //Generate a reset Token
    //randomBytes= how many chartcers there will be in generated random data or the token nummber
    //hex = hexadecimal as it it coverst the charcters from binary to hexadecimals.
    const resetToken = crypto.randomBytes(20).toString('hex');

    //hash and set to resetPasswordToken or encryptingthe Token
    //sha256 puts out a value that is 256 bits long which is used to encrypt the token
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    //set token expired time 
    //this is stating it will expire in 30 minutes
    this.resetPasswordExpire = Date.now() == 30 * 60 * 1000

    return resetToken
}

module.exports = mongoose.model('User',userSchema);