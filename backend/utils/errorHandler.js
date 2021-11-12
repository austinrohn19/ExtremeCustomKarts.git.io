//ErrorHandler is the child class of Error
class ErrorHandler extends Error {

    constructor(message, statusCode) {
        //super is the constructor of the parent class in this example its the constructor of error
        super(message);
        this.statuscode = statusCode;
        
        //this will create a .stack properties on the give object
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler;