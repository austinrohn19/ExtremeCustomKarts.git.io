import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layout/MetaData'


import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'


const Cart = () => {

    const dispatch = useDispatch();

    const { cartItems } = useSelector(state => state.cart)

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;

        if(newQty > stock) return;

        dispatch(addItemToCart(id, newQty ))
    }

    const decreaseQty = (id, quantity ) => {
        const newQty = quantity - 1;

        if(newQty <= 0) return;

        dispatch(addItemToCart(id, newQty ))
    }
    return (
        <Fragment>
            {cartItems.length === 0 ? <h2 class="mt-5">Your Cart is Empty</h2> : (
                <Fragment>
                    <h2 class="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>

                    <div class="row d-flex justify-content-between">
                        <div class="col-12 col-lg-8">
                            {cartItems.map(item => (
                                <Fragment>
                                    <hr />

                                    <div class="cart-item" key={item.product}>
                                        <div class="row">
                                            <div class="col-4 col-lg-3 ">
                                                <img class="cart-image-top mx-auto" src={item.image} alt="Laptop" height="90" width="115" />
                                            </div>

                                            <div class="col-5 col-lg-3">
                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
                                            </div>


                                            <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${item.price}</p>
                                            </div>

                                            <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div class="stockCounter d-inline">
                                                    <span class="btn btn-danger minus" onClick= {()=>decreaseQty(item.product, item.quantity )}>-</span>
                                                    <input type="number" class="form-control count d-inline" value={item.quantity} readOnly />

                                                    <span class="btn btn-primary plus" onClick= {()=>increaseQty(item.product, item.quantity )}>+</span>
                                                </div>
                                            </div>

                                            <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" class="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item.product)}></i>
                                            </div>

                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            ))}
                        </div>

                        <div class="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span class="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)),0)} (Units)</span></p>
                                <p>Est. total: <span class="order-summary-values">${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></p>

                                <hr />
                                <button id="checkout_btn" class="btn btn-primary btn-block">Check out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
            <MetaData title={'Cart'} />
        </Fragment>
    )
}

export default Cart