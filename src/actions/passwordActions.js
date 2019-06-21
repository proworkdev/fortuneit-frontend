import axios from 'axios';
import { PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILURE } from './types';

export const setNewPassword = ({ currentPassword, newPassword, confirmPassword, email }) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ currentPassword, newPassword, confirmPassword, email });

    axios
        .post('/profile/changePassword', body, config)
        .then(res =>
            dispatch({
                type: PASSWORD_RESET_SUCCESS,
                payload: res.data
            })
        ).catch(err => {
            dispatch({
                type: PASSWORD_RESET_FAILURE,
                payload: err.response.data
            })
        });

}