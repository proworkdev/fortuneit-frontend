import axios from 'axios';
import { REFUNDS_FETCH_SUCCESS, REFUNDS_FETCH_FAILURE } from './types';
import { tokenConfig } from './authActions';

export const getRefundDetails = ({ amazonOrderId }) => (dispatch, getState) => {

    console.log('Refund Details Action Hit!');

    const body = JSON.stringify({ amazonOrderId });

    axios
        .post('/sellerRefunds/refundDetails', body, tokenConfig(getState))
        .then((res) => {
            console.log('Refund Details Response ==> ', res);
        }).catch((err) => {
            console.log('Refund details error ==> ', err);
        })

}

export const fetchRefundsData = () => (dispatch, getState) => {

    console.log('Fetch Refunds Action Hit!');

    axios
        .get('/sellerRefunds/fetchRefunds', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: REFUNDS_FETCH_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: REFUNDS_FETCH_FAILURE,
                payload: err.response.data
            })
        })
}