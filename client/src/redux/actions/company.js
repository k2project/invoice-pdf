import axios from 'axios';
import { setAlert } from './alerts';
import { SET_COMPANY_CURRENT_NAV_LINK } from '../actions/types';

export const setCompanyCurrentNavLink = payload => dispatch => {
    dispatch({
        type: SET_COMPANY_CURRENT_NAV_LINK,
        payload
    });
};

export const deleteCompany = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/company/${id}`);

        dispatch(
            setAlert('Company deleted successfully.', 'success', null, false)
        );
    } catch (err) {
        console.log(err);
    }
};
