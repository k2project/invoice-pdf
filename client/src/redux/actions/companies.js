import axios from 'axios';
import { setAlert } from './alerts';
import {
    SET_COMPANY_CURRENT_NAV_LINK,
    GET_ALL_COMPANIES,
    COMPANY_DELETED, //for NOT FOUNF page to display text "Company Not Found"
    TASK_TO_UPDATE,
    TASK_DELETED
} from './types';

export const getAllCompanies = () => async dispatch => {
    try {
        const res = await axios.get('/api/company/all');
        dispatch({
            type: GET_ALL_COMPANIES,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};
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
export const setTaskToUpdate = payload => dispatch => {
    dispatch({
        type: TASK_TO_UPDATE,
        payload
    });
};

export const deleteTaskAndClearForm = payload => dispatch => {
    dispatch({
        type: TASK_DELETED,
        payload: true
    });
    setTimeout(() => {
        dispatch({
            type: TASK_DELETED,
            payload: false
        });
    }, 3000);
};
