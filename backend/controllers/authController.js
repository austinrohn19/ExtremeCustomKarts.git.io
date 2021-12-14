const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

const crypto = require('crypto');
const { send } = require('process');

//register a user => /api/v1/register
exports.registerUser = catchAsyncErrors (async (req, res, next) => {

    const { name, email, password }= req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/profile_pic_myqofd',
            url: 'https://res.cloudinary.com/extreme-custom-carts/image/upload/v1637020695/avatars/profile_pic_myqofd.jpg'
        }
    })

    sendToken(user, 200, res)
})

// login user =>/api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password }= req.body;

    //checks if email and password is entered by user
    if(!email || !password) {
        return next(new ErrorHandler('Please enter email and password.', 400))
    }

    //finding user in Database
    // we must use the .select method here because in the user model we have password set to select= false
    const user= await User.findOne({email}).select('+password')

    if (!user) {
        return next(new ErrorHandler('invalid Email, Please try again.',401));
    }

    //check if password is correct or not.
    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch) {
        return next(new ErrorHandler('invalid Password, Please try again.',401));
    }

    sendToken(user, 200, res)
})

//Forgot Password => /api/v1/forgot
exports.forgotPassword = catchAsyncErrors (async (req, res, next) => {

    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return next(new ErrorHandler('user not found with this email address.',404));
    }

    //get reset Token

    const resetToken = user.getResetPasswordToken();

    await user.save({  validateBeforeSave: false })

    //create reset password URL
     const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    //message int he email for the user to get.
     const message = `To reset your password, please press on the link that follow:\n\n${resetUrl}\n\nIf you have not requested this Email, then please ignore this email.`

     try{
         //this is to send the email
        await sendEmail({
            email: user.email,
            subject: 'Extreme Custom Karts Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
     }
         catch (error){
             user.resetPasswordToken = undefined;
             user.resetPasswordExpire = undefined;

             await user.save({validateBeforeSave: false});

             return next(new ErrorHandler(error.message,500))
 
         }
})


//Reset Password => /api/v1/Password/reset/:token
exports.resetPassword = catchAsyncErrors (async (req, res, next) => {
    //Hash the URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest
    ('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now()}
    })

    if(!user) {
        return next(new ErrorHandler('Password reset token is invalid or has Expired', 400))
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password doesnt Match', 400))
    }

    //setup the new Password
    user.password = req.body.password

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)
})

//get current logged in users details => /api/v1/me
exports.getUserProfile = catchAsyncErrors (async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

//update/change password for user => /api/v1/password/update
exports.updatePassword = catchAsyncErrors (async (req, res, next) => {
    //finding the user by there is then also finding the password of that user.
    const user= await User.findById(req.user.id).select('+password');

    //check users previous password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if(!isMatched){
        return next(new ErrorHandler('old Password is incorrect, Please try again!'));
    }

    //save the new password
    user.password = req.body.password;
    await user.save();

    sendToken(user,200,res)
})

//logout user => /api/v1/logout

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        Success: true,
        message: 'You have Successfully Logged out, Please come again!'
    })
    
})