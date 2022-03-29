import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import{ composeWithDevTools } from 'redux-devtools-extension'

import {productsReducer, productDetailReducer } from './reducers/productReducers'
import { authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducers';

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,

})

//this is all of the data that we want to put into the state before we load the application.
let initalState = {}

//this is all of the middleware we want to use in the application.
const middleware = [thunk]

const store =  createStore(reducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;