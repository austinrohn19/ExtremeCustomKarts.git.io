import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getProducts } from '../actions/productActions'
import { useParams } from 'react-router-dom'

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = () => {
    const params = useParams();

    const [currentPage, setCurrentPage] = useState(1)
    //this is the max and min range for the price filter, base this off of average price of customers goods.
    const [price, setPrice] = useState([1, 25000])
    const [category, setCategory] = useState('')
    //filter by rating
    const [rating, setRating] = useState(0)

    //if you add a category to the front end you must add here to
    const categories = [
        'Carts',
        'Spare parts',
        'Accesories',
        'Custom Parts',
        'Color'
    ]

    const alert = useAlert();

    const dispatch = useDispatch();

    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products)

    const keyword = params.keyword

    // first thing that will run when everything gets imported this is like a constructor of a class.
    useEffect(() => {

        if (error) {
            return alert.error(error)
        }

        dispatch(getProducts(keyword, currentPage, price, category, rating));

    }, [dispatch, error, alert, currentPage, keyword, price, category, rating]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    //pagination and the list of propetties after it are for switching between pages.
    return (
        <div class="container container-fluid">
            <Fragment>
                {loading ? <Loader /> : (
                    <Fragment>
                        <MetaData title={'Best Custom Carts Online!!'} />

                        <h1 id="products_heading">Latest Products</h1>

                        <section id="products" class="container mt-5">
                            <div class="row">

                                {keyword ? (
                                    <Fragment>
                                        <div class="col-6 col-md-3 mt-5 mb-5">
                                            <div class="px-5">
                                                <Range
                                                    marks={{
                                                        1: `$1`,
                                                        25000: `$25000`
                                                    }}
                                                    min={1}
                                                    max={25000}
                                                    defaultValue={[1, 25000]}
                                                    tipFormatter={value => `$${value}`}
                                                    tipProps={{
                                                        placement: 'bottom',
                                                        visible: true
                                                    }}
                                                    value={price}
                                                    onChange={price => setPrice(price)}
                                                />

                                                <hr class="my-5" />

                                                <div class="mt-5">
                                                    <h4 class="mb-3">
                                                        Categories
                                                    </h4>

                                                    <ul class="pl-0">
                                                        {categories.map(category =>
                                                            <li
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    listStyleType: 'none'
                                                                }}
                                                                key={category}
                                                                onClick={() => setCategory(category)}
                                                            >
                                                                {category}

                                                            </li>
                                                        )}

                                                    </ul>
                                                </div>
                                                <hr class="my-3" />

                                                <div class="mt-5">
                                                    <h4 class="mb-3">
                                                        Ratings
                                                    </h4>

                                                    <ul class="pl-0">
                                                        {[5 ,4, 3, 2, 1].map(star =>
                                                            <li
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    listStyleType: 'none'
                                                                }}
                                                                key={star}
                                                                onClick={() => setRating(star)}
                                                            >
                                                                <div class= "rating-outer">
                                                                    <div class = "rating-inner"
                                                                        style={{
                                                                            width: `${star * 20}%`
                                                                        }}
                                                                    >

                                                                    </div>
                                                                </div>

                                                            </li>
                                                        )}

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6 col-md-9">
                                            <div class="row">
                                                {products && products.map(product => (
                                                    <Product key={product._id} product={product} col={4} />
                                                ))}
                                            </div>
                                        </div>
                                    </Fragment>

                                ) : (
                                    products && products.map(product => (
                                        <Product key={product._id} product={product} col={3} />
                                    ))
                                )}
                            </div>
                        </section>
                        {resPerPage <= productsCount && (
                            <div class="d-flex justify-content-center mt-5">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText={'Next'}
                                    prevPageText={'Prev'}
                                    firstPageText={'First'}
                                    lastPageText={'Last'}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </div>
                        )}
                    </Fragment>
                )}

            </Fragment>
        </div>
    )
}

export default Home