import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions'

import Search from './Search'


import '../../App.css'

const Header = () => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector(state => state.auth)
  const { cartItems} = useSelector(state => state.cart)

  const logoutHandler = () => {
    dispatch(logout());
    alert.success('You have logged out successfully!')
  }

  return (
    <Fragment>
      <nav class="navbar row">
        <div class="col-12 col-md-3">
          <div class="navbar-brand">
            <Link to="/">
              <img class="logo-image-top" src="./images/Extreme_Custom_Carts.png" alt="logo" />
            </Link>
          </div>
        </div>
        <div class="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>
        <div class="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: 'none' }}>
            <span id="cart" class="ml-3">Cart</span>
            <span class="ml-1" id="cart_count">{cartItems.length}</span>
          </Link>

          {user ? (
            <div class="ml-4 dropdown d-inline">
              <Link to="#!" class="btn dropdown-toggle text-white mr-4"
                type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                <figure class="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    class="rounded-circle"
                  />
                </figure>
                <span>
                  {user && user.name}
                </span>
              </Link>
            <div class= "dropdown-menu" aria-labelledby="dropDownMenuButton">

              {user && user.role !== 'admin' ? (
                <Link class="dropdown-item" to="orders/me">Orders</Link>
              ):(
                <Link class="dropdown-item" to="/dashboard">Dashboard</Link>
              )}
              <Link class="dropdown-item" to="/me">Profile</Link>
              <Link class="dropdown-item text-danger" to="/" onClick={logoutHandler}>Logout</Link>

            </div>

            </div>
          ) : !loading && <Link to="/login" class="btn ml-4" id="login_btn">Login</Link>}

        </div>
      </nav>
    </Fragment>
  )
}

export default Header