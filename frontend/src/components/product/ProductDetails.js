import React, { Fragment, useEffect } from 'react'

import Loader from '../layout/Loader'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors } from '../../actions/productActions'
import { useParams } from 'react-router-dom'

const ProductDetails = ({ match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();

    const { loading, error, product } = useSelector(state => state.productDetails)
    useEffect(() => {
        dispatch(getProductDetails(match.params.id))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, match.params.id])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <div class="row f-flex justify-content-around">
                        <div class="col-12 col-lg-5 img-fluid" id="product_image">
                            <img src="https://i5.walmartimages.com/asr/1223a935-2a61-480a-95a1-21904ff8986c_1.17fa3d7870e3d9b1248da7b1144787f5.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff" alt="sdf" height="500" width="500" />
                        </div>

                        <div class="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Product # sklfjdk35fsdf5090</p>

                            <hr />

                            <div class="rating-outer">
                                <div class="rating-inner"></div>
                            </div>
                            <span id="no_of_reviews">(5 Reviews)</span>

                            <hr />

                            <p id="product_price">$108.00</p>
                            <div class="stockCounter d-inline">
                                <span class="btn btn-danger minus">-</span>

                                <input type="number" class="form-control count d-inline" value="1" readOnly />

                                <span class="btn btn-primary plus">+</span>
                            </div>
                            <button type="button" id="cart_btn" class="btn btn-primary d-inline ml-4">Add to Cart</button>

                            <hr />

                            <p>Status: <span id="stock_status">In Stock</span></p>

                            <hr />

                            <h4 class="mt-2">Description:</h4>
                            <p>Binge on movies and TV episodes, news, sports, music and more! We insisted on 720p High Definition for this 32" LED TV, bringing out more lifelike color, texture and detail. We also partnered with Roku to bring you the best possible content with thousands of channels to choose from, conveniently presented through your own custom home screen.</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>Amazon</strong></p>

                            <button id="review_btn" type="button" class="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                Submit Your Review
                            </button>

                            <div class="row mt-2 mb-5">
                                <div class="rating w-50">

                                    <div class="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">

                                                    <ul class="stars" >
                                                        <li class="star"><i class="fa fa-star"></i></li>
                                                        <li class="star"><i class="fa fa-star"></i></li>
                                                        <li class="star"><i class="fa fa-star"></i></li>
                                                        <li class="star"><i class="fa fa-star"></i></li>
                                                        <li class="star"><i class="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea name="review" id="review" class="form-control mt-3">

                                                    </textarea>

                                                    <button class="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>


    )
}

export default ProductDetails