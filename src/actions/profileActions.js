import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
import {
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAIL
} from './types';

export const editSellerProfile = ({ username, email, businessName, productNiche, address, tagline, sellerID, mwsAuthToken, accessKey, accessSecret, marketplaceId }) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Preparing to send the body in JSON format!
    const body = JSON.stringify({ username, email, businessName, productNiche, address, tagline, sellerID, mwsAuthToken, accessKey, accessSecret, marketplaceId });

    axios
        .post('/profile/editProfile', body, config)
        .then(res => {
            dispatch({
                type: PROFILE_UPDATE_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: PROFILE_UPDATE_FAIL,
                payload: err.response
            })
        })
}