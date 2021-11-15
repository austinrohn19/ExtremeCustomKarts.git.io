const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//register a user => /api/v1/register
exports.registerUser = catchAsyncErrors (async (req, res, next) => {

    const { name, email, password }= req.body;
    
})
