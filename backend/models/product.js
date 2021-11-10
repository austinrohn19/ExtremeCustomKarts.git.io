const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    //this is were they will add the products anme
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        //trim removes all blank spaces from start to end
        trim: true,
        maxlength: [100, 'product name cannot exceed 100 characters']
    },

    //this is were they will add the products Price
    price: {
        type: Number,
        required: [true, 'Please enter products price'],
        maxlength: [7, 'product name cannot exceed 100 characters'],
        default: 0.0
    },

    //this is were they will add the products description
    description: {
        type: String,
        required: [true, 'Please enter product descritption'],
    },

    //this is the average rating of the product
    ratings: {
        type: Number,
        default: 0
    },

    //this will be all of the images that you upload, this must be in a array form because of having multiple pictures
    //we will be using cloudary for our picture storage, so we need the URL and the picture ID.
    imgaes: [
        {
            //this is the pictures ID
            public_id: {
                type: String,
                required: true
            },
            //this is the pictures URL
            url: {
                type: String,
                required: true
            },
        }
    ],
    //this is used to assign the Products catergories
    //*make sure to implement sub catagories latert when i can viewe them*//
    category: {
        type: String,
        required: [true, 'Please select this category'],
        //this is the array of all of the categories that we will have
        enum: {
            values: [
                'Carts',
                'Spare parts',
                'Accesories',
                'Custom Parts',
                'Color'['Blue, Red, White, Black'],
            ],
            message: 'please select your Category for this product.'
        }
    },
    //this is the Products seller
    Seller: {
        type: String,
        required: [true, 'Please enter Sellers Information']
    },
    //this is how many of these carts we have left
    stock: {
        type: Number,
        required: [true, 'Please Enter Product Stock'],
        maxlength: [5, 'product stock cant exceed 5 charcters'],
        default: 0
    },
    //this is the review section and how many we have along with the actual reviews
    numofReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    //date it was added to the list
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);