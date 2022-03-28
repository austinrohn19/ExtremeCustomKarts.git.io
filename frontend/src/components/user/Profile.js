import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loader from '../layout/Loader' 
import MetaData from '../layout/MetaData'
 

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={`${user.name}'s Profile`} />
                    <h2 class="mt-5 ml-5">{user.name}'s Profile</h2>
                    <div class="row justify-content-around mt-5 user-info">
                        <div class="col-12 col-md-3">
                            <figure class='avatar avatar-profile'>
                                <img class="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                            </figure>
                            <Link to="/me/update" id="edit_profile" class="btn btn-primary btn-block my-5">
                                Edit Profile
                            </Link>
                        </div>

                        <div class="col-12 col-md-5">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>

                            <h4>Email Address</h4>
                            <p>{user.email}</p>

                            <h4>You have been a member since</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>

                            {user.role !== 'admin' && (
                                <Link to="/orders/me" class="btn btn-danger btn-block mt-5"> My Orders </Link>
                            )}

                            <Link to="/password/update" class="btn btn-primary btn-block mt-3"> Change Password </Link>
                        </div>
                    </div>
                </Fragment>
            )
            }
        </Fragment >
    )
}

export default Profile