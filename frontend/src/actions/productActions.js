import axios from 'axios';

import { ALL_PRODUCTS_FAILED, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_REQUEST, CLEAR_ERRORS } from '../constants/productConstants'

//this is the function to call of the Products
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

//Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ 
        type:CLEAR_ERRORS
    })
}