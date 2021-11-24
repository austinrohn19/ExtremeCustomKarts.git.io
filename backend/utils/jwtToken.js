//Create and send token and save it in a cookie.
const sendToken = (user, statusCode, res) => {

    //Create the JWT token
    const token = user.getJwtToken();

    //Options for the Cookie
    const options = {
        expires: new Date(
            // this is referencing the time *= multiply, 24=hours, 60,minutes, 60=seconds, 1000=miliseconds
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
            ),
        //this is important to make this httpOnly because if not the cookie can be accessed with javascript code and is not longer secure.
        httpOnly: true
    }
    // so this means we are creating a token that is equal to const token and passed the options that we labeled above.
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
}
module.exports = sendToken;