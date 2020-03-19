import {
    DISPLAY_DASHNAV_CURRENT_LINK,
    DELETE_COMPANY,
    UPDATE_COMPANY,
    DISPLAY_COMPANY,
    INVOICE_COMPANY
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
export const deleteCompany = payload => dispatch => {
    dispatch({
        type: DELETE_COMPANY
    });
};
export const invoiceCompany = payload => dispatch => {
    dispatch({
        type: INVOICE_COMPANY,
        payload
    });
};
