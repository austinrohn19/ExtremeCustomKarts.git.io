const app = require('./app')

const dotenv = require('dotenv');
const { model } = require('mongoose');

dotenv.config({path:'backend/config/config.env'})

app.listen(process.env.PORT, () => {
   console.log(`Server started on PORT: ${process.env.PORT}` in ${process.env.NODE_ENV} mode.) 
})