import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    BUSINESS_SUCCESS,
    OTP_SENT_SUCCESS,
    OTP_SENT_FAILURE,
    OTP_RESENT_SUCCESS,
    OTP_RESENT_FAILURE,
    OTP_CONFIRMATION_SUCCESS,
    OTP_CONFIRMATION_FAILED,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILURE,
    PLAN_CHOSEN
} from './types';

// Action for retrieving USER PROFILE DATA using token in header!
export const loadUser = () => (dispatch, getState) => {

    // User loading (Initially, the user is loading)
    // dispatch({ type: USER_LOADING });

    axios
        // Sending token along with request
        .get('/auth/userProfile', tokenConfig(getState))
        .then(res =>
            dispatch({
                // If authentication succeedes!
                type: USER_LOADED,
                // It contains profile data that has been returned from the server
                payload: res.data
            }))
        .catch(err => {
            dispatch({
                // If authentication fails!
                type: AUTH_ERROR
            });
        });
}

// Action for adding Business Info.
export const addBusinessInfo = ({ businessName, productCategory, address, businessTagline, userImage, email }) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ businessName, productCategory, address, businessTagline, userImage, email });

    axios
        .post('/business/businessInfo', body, config)
        .then(res =>
            dispatch({
                type: BUSINESS_SUCCESS,
                payload: res.data
            })
        ).catch(err => {
            console.log('Business Info error ==> ', err);
            // dispatch(
            //     returnErrors(err.response.data, err.response.status, 'BUSINESS_FAILURE')
            // )
            // dispatch({
            //     type: BUSINESS_FAILURE
            // })
        })

}

// Action for resetting new password
export const resetNewPassword = ({ password, confirmPassword }) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ password, confirmPassword });

    axios
        .post('/password/resetPassword', body, config)
        .then(res =>
            dispatch({
                type: PASSWORD_RESET_SUCCESS,
                payload: res.data
            })
        ).catch(err => {
            dispatch(
                returnErrors()
            )
            dispatch({
                type: PASSWORD_RESET_FAILURE
            })
        })

}

// Action for OTP verification(Forgot Password).
export const verifyOtp = ({ otp }) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ otp });

    axios
        .post('/password/verifyOtp', body, config)
        .then(res =>
            dispatch({
                type: OTP_CONFIRMATION_SUCCESS,
                payload: res.data
            })
        ).catch(err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, 'OTP_CONFIRMATION_FAILED')
            )
            dispatch({
                type: OTP_CONFIRMATION_FAILED,
                payload: err.response.data
            })
        })
}

// Action for Forgot Password.
export const forgotThePassword = ({ email }) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email });

    dispatch({ type: USER_LOADING })

    axios
        .post('/password/forgot', body, config)
        .then(res =>
            dispatch({
                type: OTP_SENT_SUCCESS,
                payload: res.data
            })
        ).catch(err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, 'OTP_SENT_FAILURE')
            )
            dispatch({
                type: OTP_SENT_FAILURE
            })
        })

}

// Action for resending OTP.
export const resendOTP = ({ email }) => dispatch => {

    // Headers    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Preparing to send the body in JSON format!
    const body = JSON.stringify({ email });

    axios.post('/emails/resendOtp', body, config)
        .then(res =>
            // If the OTP has been resent successfully.
            dispatch({
                type: OTP_RESENT_SUCCESS,
                payload: res.data
            })
            // If an error has occured while resending the OTP to the server.
        ).catch(err => {
            // Dispatches error data from server to the returnErrors function.
            dispatch(
                returnErrors(err.response.data, err.response.status, 'OTP_RESENT_FAILURE')
            )
            dispatch({
                // Dispatches OTP_RESENT_FAILURE to be further taken care of by authReducer.
                type: OTP_RESENT_FAILURE
            })
        })
}

// Action for OTP confirmation. (Email Confirmation)
export const confirmOTP = ({ otp }) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Preparing to send the body in JSON format!
    const body = JSON.stringify({ otp });

    axios
        .post('/emails/otpConfirmation', body, config)
        .then(res =>
            // If the email has been verified using OTPs.
            dispatch({
                type: OTP_CONFIRMATION_SUCCESS,
                payload: res.data
            })
        ).catch(err => {
            // if the email verification fails.
            dispatch(
                // Dispatches error data from server to the returnErrors function.
                returnErrors(err.response.data, err.response.status, 'OTP_CONFIRMATION_FAILED')
            );
            dispatch({
                // Dispatches OTP_CONFIRMATION_FAILED to be further taken care of by authReducer.
                type: OTP_CONFIRMATION_FAILED
            })
        })
}

// Action for FACEBOOK SignIn
export const facebookSignin = ({ facebookToken, username, email, picture, plan }) => dispatch => {

    // Headers 
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Preparing to send the body in JSON format!
    const body = JSON.stringify({ facebookToken, username, email, picture, plan });

    axios
        .post('/social/facebook', body, config)
        .then(res => {

            // If the Facebook authentication is successful.
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            // If the Facebook authentication fails.
        }).catch(err => {
            dispatch({
                // Dispatches REGISTER_FAIL to be further taken care of by authReducer.
                type: REGISTER_FAIL,
                payload: err.response.data
            })
        })
}

// Action for GOOGLE SignIn
export const googleSignin = ({ googleToken, plan }) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Preparing to send the body in JSON format!
    const body = JSON.stringify({ googleToken, plan });

    axios
        .post('/social/google', body, config)
        // If the Google authentication has been successful.
        .then(res =>
            dispatch({
                type: REGISTER_SUCCESS,
                // Payload contains userdata.
                payload: res.data
            })
        )
        // If the Google authentication fails.
        .catch(err => {
            // Dispatches REGISTER_FAIL to be further taken care of by authReducer.
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data
            })
        })
}

// Action for USER REGISTERATION
export const register = ({ username, email, password, role, status, origin, plan }) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Preparing to send the body in JSON format!
    const body = JSON.stringify({ username, email, password, role, status, origin, plan });

    axios
        .post('/auth/register', body, config)
        .then(res =>
            dispatch({
                // If registeration is successful!
                type: REGISTER_SUCCESS,
                // Payload contains registered user's data
                payload: res.data
            }))
        .catch(err => {
            dispatch({
                // If registeration process fails!
                type: REGISTER_FAIL,
                payload: err.response.data
            });
        });
}

// Action for USER LOGIN
export const login = ({ email, password, origin }) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Preparing to send the body in JSON format!
    const body = JSON.stringify({ email, password, origin });

    axios
        .post('/auth/authenticate', body, config)
        .then(res =>
            dispatch(
                {
                    // If authentication succeedes!
                    type: LOGIN_SUCCESS,
                    // Payload contains logged in user details
                    payload: res.data,
                }))
        .catch(err => {
            dispatch({
                // If authentication fails!
                type: LOGIN_FAIL,
                payload: err.response
            });
        });
}

// Action for USER LOGOUT
export const logout = () => {

    return {
        type: LOGOUT_SUCCESS
    }

}

// Setup config/header & token
export const tokenConfig = getState => {

    // Get token from Local Storage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // If token is present, add it to the headers
    if (token) {
        config.headers['x-auth-token'] = token
    }

    return config;
}