import axios from 'axios';
import { setAlert } from './alerts';
import {
  
    SET_COMPANY_CURRENT_NAV_LINK,
    DELETE_COMPANY,
    UPDATE_COMPANY,
    DISPLAY_COMPANY,
    INVOICE_COMPANY,
    GET_PROFILE
} from '../actions/types';

export const setCompanyCurrentNavLink = payload => dispatch => {
    dispatch({
        type: SET_COMPANY_CURRENT_NAV_LINK 
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
    dispatch({
        type: DISPLAY_DASHNAV_CURRENT_LINK,
        payload: 'company-form'
    });
};

export const deleteCompany = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/company/${id}`);
      

        dispatch({
            type: DELETE_COMPANY
        });
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(
            setAlert('Company deleted successfully.', 'success', null, false)
        );
    } catch (err) {
        console.log(err);
    }
};
export const invoiceCompany = payload => dispatch => {
    dispatch({
        type: INVOICE_COMPANY,
        payload
    });
    dispatch({
        type: DISPLAY_DASHNAV_CURRENT_LINK,
        payload: 'invoice-form'
    });
};
