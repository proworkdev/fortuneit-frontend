import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
import {
    PLANS_RECEIVED_SUCCESS,
    PLANS_RECEIVED_FAILED,
    PLAN_CHOSEN
} from './types';

export const fetchAllPlans = () => (dispatch, getState) => {

    axios
        // Sending token along with request
        .get('/seller/plans/viewPlans')
        .then(res =>
            dispatch({
                // If authentication succeedes!
                type: PLANS_RECEIVED_SUCCESS,
                // It contains profile data that has been returned from the server
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, 'PLANS_RECEIVED_FAILED')
            )
            dispatch({
                // If authentication fails!
                type: PLANS_RECEIVED_FAILED
            });
        });
}

export const choosePlan = (planData) => (dispatch, getState) => {

    dispatch({
        type: PLAN_CHOSEN,
        payload: planData
    })

}