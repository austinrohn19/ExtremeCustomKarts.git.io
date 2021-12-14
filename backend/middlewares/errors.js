const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err }

        error.message = err.message;

        //Wrong Mongoose Object ID Error
        if (err.name === "CastError") {
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        //handling the Mongoose validation Error
        if (err.name === "validationError") {
            const message = object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400)
        }

        //handing mongoose duplicate key Error
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            error = new ErrorHandler(message, 400)
        }

        //Handling wrong JWT error
        if (err.name === "JsonWebTokenError") {
            const message = 'JSON web Token is invaild, please try again.'
            error = new ErrorHandler(message, 400)
        }

        //Handling expired JWT error
        if (err.name === "TokenExpiredError") {
            const message = 'JSON web Token is Expired, please try again.'
            error = new ErrorHandler(message, 400)
        }

        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error',
        })
    }
}