const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

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


//logout user => /api/v1/logout

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        Success: true,
        message: 'You have Successfully Logged out, Please come and browers again!'
    })
    
})
