import axios from 'axios';
import {
    ORDERS_FETCH_SUCCESS,
    ORDERS_FETCH_FAIL,
    ORDERS_BY_DURATION_SUCCESS,
    ORDERS_BY_DURATION_FAILURE
} from './types';
import { tokenConfig } from './authActions';

export const getOrdersForDuration = ({ ordersDate }) => (dispatch, getState) => {

    const body = JSON.stringify({ ordersDate });

    axios
        .post('/sellerOrders/ordersByDuration', body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ORDERS_BY_DURATION_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: ORDERS_BY_DURATION_FAILURE,
                payload: err.response
            })
        })

}

export const addNewOrder = ({ productSelected, orderQuantity, customerName, customerEmail, shippingAddress, billingAddress }) => (dispatch, getState) => {

    const body = JSON.stringify({ productSelected, orderQuantity, customerName, customerEmail, shippingAddress, billingAddress });

    axios
        .post('/sellerOrders/addOrder', body, tokenConfig(getState))
        .then(res => {
            console.log('Checking add order response ==> ', res);
        }).catch(err => {
            console.log('Checking add order error ==> ', err);
        })

}

export const fetchOrders = () => (dispatch, getState) => {

    axios
        .get('/sellerOrders/getOrders', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ORDERS_FETCH_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: ORDERS_FETCH_FAIL,
                payload: err.response.data
            })
        })
}

export const syncOrders = () => (dispatch, getState) => {

    axios
        .get('/sellerOrders/syncOrders', tokenConfig(getState))
        .then(res => {
            console.log('Test Orders response ==> ', res)
        }).catch(err => {
            console.log('Test Orders Error ==> ', err)
        })
}