import axios from 'axios';
import {
    MWS_VERIFICATION_SUCCESS,
    MWS_VERIFICATION_FAILED
} from './types';

export const mwsCredentials = ({ sellerID, mwsToken, marketplaceID, accessKey, accessSecret, email }) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ sellerID, mwsToken, marketplaceID, accessKey, accessSecret, email });

    axios
        .post('/mws/checkCredentials', body, config)
        .then(res => {
            dispatch({
                type: MWS_VERIFICATION_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: MWS_VERIFICATION_FAILED,
                payload: err.response.data
            })
        })
}