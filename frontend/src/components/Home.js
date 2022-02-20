import React, { Fragment } from 'react'

import MetaData from './layout/MetaData'

const Home = () => {
    return (
        <div class= "container container-fluid">
            <MetaData title={'Best Custom Carts Online!!'} />
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" class="container mt-5">
                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-3 my-3">
                        <div class="card p-3 rounded">
                            <img
                                class="card-img-top mx-auto"
                                src="./images/Test_Cart.png" alt="test Cart"
                            />
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">
                                    <a href="">Custom Golf Cart</a>
                                </h5>
                                <div class="ratings mt-auto">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star-half-o"></i>
                                    <i class="fa fa-star-o"></i>
                                    <span id="no_of_reviews">(5 Reviews)</span>
                                </div>
                                <p class="card-text">$4000.00</p>
                                <a href="#" id="view_btn" class="btn btn-block">View Details</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home