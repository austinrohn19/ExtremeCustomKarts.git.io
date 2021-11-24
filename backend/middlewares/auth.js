const User = require('../models/user')

const jwt = require("jsonwebtoken");
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');

//checks id user is authenticated or not 
exports.isAuthenticatedUser = catchAsyncErrors (async (req, res, next) => {

    //this is authentenicating ht euser on the server side(backend) compared to the client side(frontend) which is a more secure way of authenticating.
    const {token} = req.cookies

    if (!token) {
        return next(new ErrorHandler('login first to access the page.', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)

    next()
})