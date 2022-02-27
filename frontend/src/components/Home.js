import React, { Fragment, useEffect } from 'react'

import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import {useAlert} from 'react-alert'
import { getProducts } from '../actions/productActions'


const Home = () => {

    const alert = useAlert();

    const dispatch = useDispatch();

    const { loading, products, error, productsCount } = useSelector(state => state.products)

    // first thing that will run when everything gets imported this is like a constructor of a class.
    useEffect(() => {

        if(error) {
            return alert.error(error)
        }

        dispatch(getProducts());

    }, [dispatch, error, alert])

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