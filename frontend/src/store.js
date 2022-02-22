import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import{ composeWithDevTools } from 'redux-devtools-extension'

import {productsReducer } from './reducers/productReducers'

const reducer = combineReducers({
    products: productsReducer
})

//this is all of the data that we want to put into the state before we load the application.
let initalState = {}

//this is all of the middleware we want to use in the application.
const middleware = [thunk]

const store =  createStore(reducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;