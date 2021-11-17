const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

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

    //this is calling in the JSON Web Token
    const token = user.getJwtToken();

    res.status(201).json ({
        success: true,
        token
    })
})
