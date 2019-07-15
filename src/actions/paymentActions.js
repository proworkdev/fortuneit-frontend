import axios from 'axios';
import { PAYMENT_SUCCESS_DONE, PAYMENT_SUCCESS_ERROR, PAYMENT_FAILED_DONE, PAYMENT_FAILED_ERROR } from './types';

// If the Payment has been done successfully.
export const planPayment = ({ name, email, currency, price, service, duration, isPaymentVerified, transactionID }) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, currency, price, service, duration, isPaymentVerified, transactionID });

    axios
        .post('/payment/success', body, config)
        .then(res => {
            dispatch({
                type: PAYMENT_SUCCESS_DONE,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: PAYMENT_SUCCESS_ERROR,
                payload: err.response.data
            })
        })
}

// If the Payment has been cancelled by the user himself.
export const paymentCancelled = ({ name, email, currency, price, service, duration, isPaymentVerified, transactionID }) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, currency, price, service, duration, isPaymentVerified, transactionID })

    axios
        .post('/payment/cancelled', body, config)
        .then(res => {
            dispatch({
                type: PAYMENT_FAILED_DONE,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: PAYMENT_FAILED_ERROR,
                payload: err.response.data
            })
        })
}