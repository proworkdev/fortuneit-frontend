import axios from 'axios';
import { TRANSACTIONS_FETCH_SUCCESS, TRANSACTIONS_FETCH_FAILURE } from './types';
import { tokenConfig } from './authActions';

export const fetchTransactions = () => (dispatch, getState) => {

<<<<<<< HEAD
=======
    console.log('Fetch Transactions Action Hit!');

>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
    axios
        .get('/sellerTransactions/getAllTransactions', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: TRANSACTIONS_FETCH_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: TRANSACTIONS_FETCH_FAILURE,
                payload: err.response.data
            })
        })
}