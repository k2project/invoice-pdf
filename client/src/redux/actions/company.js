import axios from 'axios';
import { setAlert } from './alerts';
import {
    SET_COMPANY_CURRENT_NAV_LINK,
    GET_PROFILE,
    COMPANY_DELETED
} from '../actions/types';

export const setCompanyCurrentNavLink = payload => dispatch => {
    dispatch({
        type: SET_COMPANY_CURRENT_NAV_LINK,
        payload
    });
};

export const deleteCompany = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/company/${id}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(
            setAlert('Company deleted successfully.', 'success', null, false)
        );
        dispatch({
            type: COMPANY_DELETED,
            payload: true
        });
        setTimeout(() => {
            dispatch({
                type: COMPANY_DELETED,
                payload: false
            });
        }, 3000);
    } catch (err) {
        console.log(err);
    }
};
