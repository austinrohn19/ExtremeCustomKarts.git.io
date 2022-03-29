import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearErrors, } from '../../actions/userActions'


const ResetPassword = ({ history, match}) => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const params = useParams();
    const Navigate= useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, success } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success('Password Updated Successfully!')
            Navigate('/login')

        }

    }, [dispatch, alert, error, success, Navigate])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(params.token, formData))
    }

  return (
    <Fragment>
        <MetaData title={'Reset Password'} />

        <div class="row wrapper">
            <div class="col-10 col-lg-5">
                <form class="shadow-lg" onSubmit={submitHandler}>
                    <h1 class="mb-3">New Password</h1>

                    <div class="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            class="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div class="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            class="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        class="btn btn-block py-3">
                        Set Password
                    </button>

                </form>
            </div>
        </div>

    </Fragment>
  )
}

export default ResetPassword