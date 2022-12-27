const ErrorHandler = require("../utils/errorhandler")

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Mongodb Wrong Id Error
    if (err.name == "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`
        console.log(err)
        err = new ErrorHandler(message, 400)
    }

    // Mongoose dublicate key erorr

    if (err.code == 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400)
    }

    //WRONG JWT ERROR

    if (err.name == "JsonWebTokenError") {
        const message = `Json Web Token is invalid , try again `
        err = new ErrorHandler(message, 400)
    }

    //JWT EXPIRE ERROR

    if (err.name == "TokenExpiredError") {
        const message = `Json Web Token is expired , try again `
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })

}