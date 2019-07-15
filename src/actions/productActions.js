import axios from 'axios';
import { tokenConfig } from './authActions';
import {
    PRODUCT_FINDER_SUCCESS,
    PRODUCT_FINDER_FAIL,
    LOWEST_OFFERS_SUCCESS,
    LOWEST_OFFERS_FAIL,
    PRODUCTS_FETCH_SUCCESS,
    PRODUCTS_FETCH_FAIL,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILED,
    PRODUCT_FEE_SUCCESS,
    PRODUCT_FEE_FAILURE,
    INVENTORY_LOWEST_PRICES_SUCCESS,
    INVENTORY_LOWEST_PRICES_FAILURE,
    PRODUCT_EVALUATOR_SUCCESS,
    PRODUCT_EVALUATOR_FAILURE,
    PRODUCT_STOCKS_SUCCESS,
    PRODUCT_STOCKS_FAILURE,
    WIZARD_DATA_SUCCESS,
    WIZARD_DATA_FAILURE,
    PRODUCT_ENTRIES_SUCCESS,
    PRODUCT_ENTRIES_FAILURE
} from './types';

export const getAllEntries = () => (dispatch, getState) => {

    axios
        .get('/sellerProducts/fetchAllEntries', tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: PRODUCT_ENTRIES_SUCCESS,
                payload: res.data
            })
        }).catch((err) => {
            dispatch({
                type: PRODUCT_ENTRIES_FAILURE,
                payload: err.response.data
            })
        })

}

export const productWizard = ({
    asin,
    name,
    desc,
    link,
    contact,
    quantity,
    productCost,
    sample,
    setup,
    inspection,
    misc,
    shippingMethod,
    shippingCost,
    miscShippingFee,
    listingServiceFee,
    salePrice,
    targetNetProfitMargin,
    referral,
    fba,
    salesTarget
}) => (dispatch, getState) => {

    const body = JSON.stringify({
        asin,
        name,
        desc,
        link,
        contact,
        quantity,
        productCost,
        sample,
        setup,
        inspection,
        misc,
        shippingMethod,
        shippingCost,
        miscShippingFee,
        listingServiceFee,
        salePrice,
        targetNetProfitMargin,
        referral,
        fba,
        salesTarget
    });

    console.log('Testing Body in Action ==> ', body);

    axios
        .post('/sellerProducts/productWizard', body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: WIZARD_DATA_SUCCESS,
                payload: res.data
            })
        }).catch((err) => {
            dispatch({
                type: WIZARD_DATA_FAILURE,
                payload: err.response
            })
        })

}

export const getStocks = () => (dispatch, getState) => {

    axios
        .get('/sellerProducts/checkStocks', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: PRODUCT_STOCKS_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch({
                type: PRODUCT_STOCKS_FAILURE,
                payload: err.response
            });
        });

}

export const evaluateProduct = ({ sku, principal, shipping, quantity, referral, fba, buyCost, sample, setup, misc, inspection }) => (dispatch, getState) => {

    const body = JSON.stringify({ sku, principal, shipping, quantity, referral, fba, buyCost, sample, setup, misc, inspection });

    axios
        .post('/sellerProducts/productEvaluation', body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: PRODUCT_EVALUATOR_SUCCESS,
                payload: res.data
            })
        }).catch((err) => {
            dispatch({
                type: PRODUCT_EVALUATOR_FAILURE,
                payload: err.response
            })
        })

}

export const checkLowestOffersForInventoryProducts = ({ asin }) => (dispatch, getState) => {

    const body = JSON.stringify({ asin })

    axios
        .post('/sellerProducts/lowestPricesForInventoryData', body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: INVENTORY_LOWEST_PRICES_SUCCESS,
                payload: res.data
            })
        }).catch((err) => {
            dispatch({
                type: INVENTORY_LOWEST_PRICES_FAILURE,
                payload: err.response
            })
        })
}

export const checkProductFees = ({ sellerSku, principal, shipping }) => (dispatch, getState) => {

    const body = JSON.stringify({ sellerSku, principal, shipping });

    axios.post('/sellerProducts/productFee', body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: PRODUCTS_FETCH_SUCCESS,
                payload: res.data
            })
        }).catch((err) => {
            dispatch({
                type: PRODUCTS_FETCH_FAIL,
                payload: err.response
            })
        })
}

export const addNewProduct = ({ sku, asin, productTitle, productBrand, productDescription, productPrice, productManufacturer }) => (dispatch, getState) => {

    const body = JSON.stringify({ sku, asin, productTitle, productBrand, productDescription, productPrice, productManufacturer });

    axios
        .post('/sellerProducts/addProduct', body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_PRODUCT_SUCCESS,
                payload: res.data
            })
        }).catch((err) => {
            dispatch({
                type: ADD_PRODUCT_FAILED,
                payload: err.response.data
            })
        });

}

export const productFinderFunction = ({ searchQuery, email }) => (dispatch, getState) => {

    const body = JSON.stringify({ searchQuery, email });

    axios
        .post('/sellerProducts/productFinder', body, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: PRODUCT_FINDER_SUCCESS,
                payload: res.data
            })
        ).catch(err => {
            dispatch({
                type: PRODUCT_FINDER_FAIL,
                payload: err.response.data
            })
        })

}

export const checkLowestPrices = ({ asin }) => (dispatch, getState) => {

    const body = JSON.stringify({ asin });

    axios
        .post('/sellerProducts/checkLowestPrices', body, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: LOWEST_OFFERS_SUCCESS,
                payload: res.data
            })
        ).catch(err => {
            dispatch({
                type: LOWEST_OFFERS_FAIL,
                payload: err.response.data
            })
        })
}

export const fetchProducts = () => (dispatch, getState) => {

    axios
        .get('/sellerProducts/getProducts', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_PRODUCT_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: ADD_PRODUCT_FAILED,
                payload: err.response.data
            })
        })

}

export const syncProducts = () => (dispatch, getState) => {

    axios
        .get('/sellerProducts/syncProducts', tokenConfig(getState))
        .then(res => {
            console.log('Products Sync Response ==> ', res);
        }).catch(err => {
            console.log('Products Sync Error ==> ', err.response);
        })
}