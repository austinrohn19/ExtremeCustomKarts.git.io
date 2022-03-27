import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'

import Search from './Search'

import '../../App.css'

const Header = () => {
  return (
    <Fragment>
      <nav class="navbar row">
        <div class="col-12 col-md-3">
          <div class="navbar-brand">
            <Link to="/">
              <img src="./images/Extreme_Custom_Carts.png" alt="logo" />
            </Link>
          </div>
        </div>
        <div class="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>
        <div class="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/login" class="btn ml-4" id="login_btn">Login</Link>
          <span id="cart" class="ml-3">Cart</span>
          <span class="ml-1" id="cart_count">2</span>
        </div>
      </nav>
    </Fragment>
  )
}

export default Header