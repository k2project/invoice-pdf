import axios from 'axios';
import { setAlert } from './alerts';
import {
    DISPLAY_DASHNAV_CURRENT_LINK,
    DELETE_COMPANY,
    UPDATE_COMPANY,
    DISPLAY_COMPANY,
    INVOICE_COMPANY,
    GET_PROFILE
} from '../actions/types';

export const displayCurrentLink = payload => dispatch => {
    dispatch({
        type: DISPLAY_DASHNAV_CURRENT_LINK,
        payload
    });
};
export const displayCompany = payload => dispatch => {
    dispatch({
        type: DISPLAY_COMPANY,
        payload
    });
};
export const updateCompany = payload => dispatch => {
    dispatch({
        type: UPDATE_COMPANY,
        payload
    });
};
export const deleteCompany = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/company/${id}`);
        setAlert('Company deleted successfully.', 'success', null, false);
        dispatch({
            type: DELETE_COMPANY
        });
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};
export const invoiceCompany = payload => dispatch => {
    dispatch({
        type: INVOICE_COMPANY,
        payload
    });
};
