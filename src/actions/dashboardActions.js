import axios from 'axios';
import { tokenConfig } from './authActions';

export const getDashboardMetrics = () => (dispatch, getState) => {

    axios
        .get('/sellerDashboard/getDashboardMetrics', tokenConfig(getState))
        .then((res) => {
            console.log('Dashboard response ==> ', res);
        }).catch((err) => {
            console.log('Dashboard Error ==> ', err);
        })
}