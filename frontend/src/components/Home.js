import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'

import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getProducts } from '../actions/productActions'


const Home = () => {

    const [currentPage, setCurrentPage] = useState(1)

    const alert = useAlert();

    const dispatch = useDispatch();

    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products)

    // first thing that will run when everything gets imported this is like a constructor of a class.
    useEffect(() => {

        if (error) {
            return alert.error(error)
        }

        dispatch(getProducts(currentPage));

    }, [dispatch, error, alert, currentPage])

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
                                {products && products.map(product => (
                                    <Product key={product._id} product={product} />
                                ))}
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