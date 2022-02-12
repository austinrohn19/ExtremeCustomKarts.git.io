const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    //this is all of the info being gathered for shipping
    shippingInfo:{
        address: {
            type: String,
            required: true
        }, 
        city: {
            type: String,
            required: true
        }, 
        PhoneNumber: {
            type: String,
            required: true
        }, 
        postalCode: {
            type: String,
            required: true
        },
        Country: {
            type: String,
            required: true
        }
    },
    //this is calling the users data that is buying the product
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    //this is the info being gathered for the order being placed
    orderItems: [
        {
            name:{
                type: String, 
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image:{
                type: String, 
                required: true
            },
            price:{
                type: Number, 
                required: true
            },
            //this is calling the info for the selected product to be sold
            Product:{
                type:mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            }
        }
    ],
    //this is all the info gathered for the payment method
    paymentInfo:{
        id:{
            type: String
        },
        status:{
            type: String
        }
    },
    //Date the User paid the bill
    paidAt:{
        type: Date
    },
    //this will be the total price of the item before tax based on price and quantity
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    //tax price based on previous total
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    //shipping price based on what is sold and amount (we can set it for like over $100 its free shipping.)
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    //total price in items price+ tax Price+ shipping price all together.
    TotalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Your order is being Processed!'
    },
    delieveredAt:{
        type: Date
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order',orderSchema)