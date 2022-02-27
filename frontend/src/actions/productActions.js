import axios from 'axios';

import { ALL_PRODUCTS_FAILED,
     ALL_PRODUCTS_SUCCESS, 
     ALL_PRODUCTS_REQUEST,
     PRODUCT_DETAILS_REQUEST,
     PRODUCT_DETAILS_SUCCESS,
     PRODUCT_DETAILS_FAILED, 
     CLEAR_ERRORS } from '../constants/productConstants'

//this is the function to call all of the Products
export const getProducts = () => async(dispatch) => {
    try {
        //each dispatch is step by step what the function should take.
        dispatch({ type: ALL_PRODUCTS_REQUEST})

        const { data } = await axios.get('/api/v1/products')

        dispatch({ 
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: ALL_PRODUCTS_FAILED,
            payload: error.response.data.message
        })
    }
}

//this is the function to call Product Details
export const getProductDetails = (id) => async(dispatch) => {
    try {
        //each dispatch is step by step what the function should take.
        dispatch({ type: PRODUCT_DETAILS_REQUEST})

        const { data } = await axios.get(`/api/v1/product/${id}`)

        dispatch({ 
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    }catch(error) {
        dispatch({
            type: PRODUCT_DETAILS_FAILED,
            payload: error.response.data.message
        })
    }
}

//Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ 
        type:CLEAR_ERRORS
    })
}