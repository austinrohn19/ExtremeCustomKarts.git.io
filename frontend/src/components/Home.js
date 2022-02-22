import React, { Fragment, useEffect } from 'react'

import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'

const Home = () => {

    const dispatch = useDispatch();

    const { loading, products, error, productsCount } = useSelector(state => state.products)

    // first thing that will run when everything gets imported this is like a constructor of a class.
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    return (
        <div class="container container-fluid">
            <Fragment>
                { loading? <Loader/> : (
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
                    </Fragment>
                )}

            </Fragment>
        </div>
    )
}

export default Home