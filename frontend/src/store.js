import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import{ composeWithDevTools } from 'redux-devtools-extension'

import {productsReducer, productDetailReducer } from './reducers/productReducers'
import { authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer
})

//this is all of the data that we want to put into the state before we load the application.
let initialState = {
    cart: {
        cartItems: localStorage.getItem('CartItems')
        ? JSON.parse(localStorage.getItem('CartItems'))
        :[]
    }
}

//this is all of the middleware we want to use in the application.
const middleware = [thunk]

const store =  createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;