const app = require('./app')
const connectDatabase = require('./config/database')

const dotenv = require('dotenv');
const cloudinary = require('cloudinary')

//this code must go at top
//handle Uncaught Exceptions
process.on('uncaughtException', err => {
   console.log(`ERROR: ${err.stack}`);
   console.log('Shutting down error due to Uncaught Exception');
   process.exit(1)
})

//setting up the config file
dotenv.config({path:'backend/config/config.env'})

//setting up the database connection
connectDatabase();

//setting up cloudinary config
cloudinary.config({
   cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET
})

// save this listen function in the const server
const server = app.listen(process.env.PORT, () => {
   console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`) 
})

//handle unhandles promise rejections
process.on('unhandledRejection', err => {
   //this is the error message
   console.log(`ERROR: ${err.stack}`);
   //this will tell us the message on whjy its happening
   console.log("shutting doen the server do to Unhandled Promise Rejection.")
   //this shus down the server
   server.close(() => {
      //this exits the process.
      process.exit(1)
   })
})