const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxlength: [100, 'product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter products price'],
        maxlength: [7, 'product name cannot exceed 100 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product descritption'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    imgaes: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select this category'],
        enum: {
            values: [
                'Carts',
                'Spare parts',
                'Accesories',
                'Custom Parts',
                'Color'
            ],
            message: 'please select your Category for this product.'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter Sellers Information']
    },
    stock: {
        type: Number,
        required: [true, 'Please Enter Product Stock'],
        maxlength: [5, 'product stock cant exceed 5 charcters'],
        default: 0
    },
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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);