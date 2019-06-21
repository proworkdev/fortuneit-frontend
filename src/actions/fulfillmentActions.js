import axios from 'axios';
import {
    FULFILLMENT_ORDERS_SUCCESS,
    FULFILLMENT_ORDERS_FAILURE,
    FULFILLMENT_DETAILS_SUCCESS,
    FULFILLMENT_DETAILS_FAILURE
} from './types';
import { tokenConfig } from './authActions';

export const getFulfillmentDetails = ({ sellerFulfillmentOrderId }) => (dispatch, getState) => {

    const body = JSON.stringify({ sellerFulfillmentOrderId });

    axios
        .post('/sellerFulfillment/fulfillmentDetails', body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: FULFILLMENT_DETAILS_SUCCESS,
                payload: res.data
            })
        }).catch((err) => {
            dispatch({
                type: FULFILLMENT_DETAILS_FAILURE,
                payload: err.response
            })
        });

}

export const getFulfillmentOrders = () => (dispatch, getState) => {

    axios
        .get('/sellerFulfillment/fulfillmentOrders', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: FULFILLMENT_ORDERS_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: FULFILLMENT_ORDERS_FAILURE,
                payload: err.response
            })
        });

}